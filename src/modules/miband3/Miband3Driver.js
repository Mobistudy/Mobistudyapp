/* eslint-disable no-undef, used to skip cordova ble es-lint warning. */
/**
 * Author: Daniel Abella with the help of
 * Dario Salvi
 * based on work done by Volodymyr Shymanskyy - https://github.com/vshymanskyy/miband-js
 * and work done by José Rebelo as well as work done by the good folks at https://gadgetbridge.org/
 */

// Imports

// eslint-disable-next-line camelcase
import crypto_aes from 'browserify-aes'
import CustomDate from './CustomDate'

const customUUID = x => `0000${x}-0000-3512-2118-0009af100700`
// const standardUUID = x => `0000${x}-0000-1000-8000-00805f9b34fb`

var Miband3 = {
  authenticationKey: undefined,
  deviceId: undefined,
  // services
  hrMonitorService: '180d',
  mibandCustomService0: 'fee0',
  mibandCustomService1: 'fee1',
  // characteristics
  authenticationCharacteristic: customUUID('0009'),
  notificationCharacteristic: customUUID('0003'),
  hrMonitorControlCharacteristic: '2a39',
  hrMonitorMeasureCharacteristic: '2a37',
  timeCharacteristic: '2a2b',
  batteryCharacteristic: customUUID('0006'),
  deviceInformationService: '180a',
  hardwareCharacteristic: '2a27',
  softwareCharacteristic: '2a28',
  storageControlCharacteristic: customUUID('0004'),
  storageDataCharacteristic: customUUID('0005'),
  rawDataCharacteristic: customUUID('0002'),
  configCharacteristic: customUUID('0003'),
  manufacturerNameCharacteristic: '2a29',
  modelNumberCharacteristic: '2a24',
  serialNumberCharacteristic: '2a25',
  firmwareCharacteristic: '2a26',
  userCharacteristic: customUUID('0008'),
  stepCountCharacteristic: customUUID('0007'),
  sensorCharacteristic: customUUID('0001'),

  crypto: window.crypto || window.msCrypto,
  textDecoder: new TextDecoder(),

  messages: {
    authentication: {
      keySentOK: '100101',
      encryptionValueReceived: '100201',
      notAuthenticated: '100304',
      authenticated: '100301',
      sendKey: '01',
      requestEncryptionValue: '02',
      sendEncryptedKey: '03',
      authFlag: '00'
    },
    heartRate: {
      turnOffHROneShot: '150200',
      turnOffHRContinuous: '150100',
      turnOnHRContinuous: '150101',
      ping: '16'
    },
    rawData: {
      rawHRAndACC: '010319',
      rawHR: '010219',
      rawAcc: '010119',
      ping: '02'
    },
    storedData: {
      activityType: '01',
      response: '01',
      startDate: '01',
      success: '01',
      failure: '00' // Not sure if corret...
    },
    setup: {
      dateTimeFormat: '060a00',
      hourFormat: '060200',
      distance: '060300',
      changeScreens: [
        '0a',
        '01',
        '30',
        '00',
        '00',
        '00',
        '06',
        '00',
        '00',
        '00',
        '00',
        '00'
      ],
      sendUserInfo: '4f',
      setLanguage: '061700',
      setUserInfo: '0x4f',
      dateFormat: '061e00', // After 00 --> MM/dd/yyyy in hex characters
      nightMode: '1a',
      wearLocation: '200000',
      fitnessGoalStart: '100000',
      fitnessGoalEnd: '0000',
      defaultStepGoal: '8000',
      scrollWristOff: '060d0000',
      displayOnLift: '060500',
      goalNotification: '060600',
      enableHRSleepSupport: '150001',
      disableHRSleepSupport: '150000',
      disableHRExpose: '06010000',
      enableHRExpose: '06010001',
      setHRInterval: '14',
      response: '10',
      okResponse: '01'
    }
  },

  // this is used to keep track of running notifications
  runningNotifications: new Map(),

  // TODO: remove, just use the keys in Map
  runningNotificationCharacteristics: [],

  /**
   * Initialises the instance of the MiBand3 driver
   * @param {string} deviceId this is the device id provide dby the ble-central plugin (MAC address)
   * @param {string} key authentication key used for this device
   */
  init: async function (deviceId, key) {
    this.deviceId = deviceId
    this.authenticationKey = key
  },

  scan: async function (searchTime, cbk, ckbFailureSearch) {
    return new Promise((resolve, reject) => {
      ble.startScan([], (device) => {
        if (device.name === 'Mi Band 3') cbk(device)
      }, (failure) => {
        ckbFailureSearch()
        reject()
      })
      setTimeout(() => {
        ble.stopScan((success) => {
          resolve()
        }, (failure) => {
          resolve()
        })
      }, searchTime)
    })
  },

  /**
   * Connects to the device using ble-central, does not authenticate
   */
  connect: async function () {
    return new Promise((resolve, reject) => {
      ble.connect(
        this.deviceId,
        success => {
          resolve(success)
        },
        error => {
          console.error('Connection error:', error)
          // connectFailedCallback(device)
          reject(error)
        }
      )
    })
  },

  /**
   * Disconnects the Miband3 device, TODO: disconnect callback?
   */
  disconnect: async function () {
    if (this.deviceId === null || this.deviceId === undefined) {
      return Promise.resolve()
    } else {
      return new Promise((resolve, reject) => {
        ble.disconnect(
          this.deviceId,
          success => {
            resolve(success)
          },
          failure => {
            console.log('Failed to disconnect:', failure)
            reject(failure)
          }
        )
      })
    }
  },

  /**
   * Tells if the drivers is connected to a device
   */
  isConnected: async function () {
    if (!this.deviceId) return Promise.resolve(false)
    return new Promise((resolve, reject) => {
      ble.isConnected(
        this.deviceId,
        success => {
          resolve(true)
        },
        failure => {
          console.log('Failure is connected', failure)
          resolve(false)
        }
      )
    })
  },

  fullAuthentication: async function () {
    console.log('Full auth')
    return this.sendAuthenticationKey()
  },

  halfAuthentication: async function () {
    console.log('Half auth')
    return this.requestEncryptionValue()
  },

  /**
   * Authenticate the device
   * @param {boolean} deviceAuthenticated if true, the device has already been authenticated once
   */
  authenticate: async function (deviceAuthenticated) {
    this.registerNotification(
      this.mibandCustomService1,
      this.authenticationCharacteristic
    )

    return new Promise((resolve, reject) => {
      ble.startNotification(
        this.deviceId,
        this.mibandCustomService1,
        this.authenticationCharacteristic,
        dataResponse => {
          let value = Buffer.from(dataResponse)
          const command = value.slice(0, 3).toString('hex')

          if (command === this.messages.authentication.keySentOK) {
            console.log('Initial key sent: OK')
            // let currentDate = new Date()
            // this.setTimeStatus(currentDate)
            this.requestEncryptionValue()
          } else if (
            command === this.messages.authentication.encryptionValueReceived
          ) {
            console.log('Creating and sending encrypted key: OK')
            let encryptionValue = value.slice(3)
            let encryptedKey = this.createEncryptedKey(encryptionValue)
            this.sendEncryptedKey(encryptedKey)
          } else if (
            command === this.messages.authentication.notAuthenticated
          ) {
            console.log('Not authenticated')
            reject()
          } else if (command === this.messages.authentication.authenticated) {
            console.log('Authenticated')
            resolve()
            // TODO: Can't currently stop notifications and start another one, issue raised: https://github.com/don/cordova-plugin-ble-central/issues/552
          }
        },
        failure => {
          console.log('Start auth notification failure:', failure)
          reject()
        }
      )

      if (!deviceAuthenticated) {
        this.fullAuthentication(this.device)
      } else {
        this.halfAuthentication(this.device)
      }
    })
  },

  sendAuthenticationKey: function () {
    let packet = this.hexStringToHexBuffer(
      this.messages.authentication.sendKey +
        this.messages.authentication.authFlag +
        this.authenticationKey
    )
    this.sendWithoutResponse(
      this.mibandCustomService1,
      this.authenticationCharacteristic,
      packet
    )
  },

  requestEncryptionValue: function () {
    let packet = this.hexStringToHexBuffer(
      this.messages.authentication.requestEncryptionValue +
        this.messages.authentication.authFlag
    )
    this.sendWithoutResponse(
      this.mibandCustomService1,
      this.authenticationCharacteristic,
      packet
    )
  },

  createEncryptedKey: function (encryptionValue) {
    let keyAsBuffer = Buffer.from(this.authenticationKey, 'hex')
    let cipher = crypto_aes
      .createCipheriv('aes-128-ecb', keyAsBuffer, '')
      .setAutoPadding(false)
    let encrypted = Buffer.concat([
      cipher.update(encryptionValue),
      cipher.final()
    ])
    return encrypted
  },

  sendEncryptedKey: function (encryptedKey) {
    let packet = this.hexStringToHexBuffer(
      this.messages.authentication.sendEncryptedKey +
        this.messages.authentication.authFlag +
        encryptedKey.toString('hex')
    )
    this.sendWithoutResponse(
      this.mibandCustomService1,
      this.authenticationCharacteristic,
      packet
    )
  },

  /**
   * It seems that messages can be sent to the config characteristic if the preamble command is correct, no matter the length of the packet.
   * @param {*} service
   * @param {*} characteristic
   * @param {*} packet
   * @param {*} okResponse
   */
  sendAndVerifyConfiguration: async function (
    service,
    characteristic,
    packet,
    command
  ) {
    this.registerNotification(service, characteristic)
    return new Promise((resolve, reject) => {
      ble.startNotification(
        this.deviceId,
        service,
        characteristic,
        dataResponse => {
          let response = Buffer.from(dataResponse).toString('hex')
          let responseMessage = this.messages.setup.response
          let okResponse = this.messages.setup.okResponse
          if (response === responseMessage + command + okResponse) {
            resolve()
          } else {
            reject() // TODO: Do i reject if if the right command was not received as a response?
          }
          // TODO: check if i can unsubscribe to all notifications once authenticated and configurations are sent.
        },
        failure => {
          console.log('Config fail:', failure)
          reject(failure)
        }
      )
      this.sendWithoutResponse(service, characteristic, packet)
    })
  },

  /**
   * Sets the device's language
   * @param {string} lang the language to be set. The format is: en_US, or fr_FR for example.
   */
  setLanguage: async function (lang) {
    let command = this.messages.setup.setLanguage
    let packet = this.hexStringToHexBuffer(
      command + this.convertLangAndCountryStringToHex(lang)
    )
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  convertLangAndCountryStringToHex (langAndCountry) {
    if (langAndCountry.length !== 5) return
    return Buffer.from(langAndCountry).toString('hex')
  },

  /**
   * Sets night mode
   * @param {Date} startTime start time, if null or undefined, night mode is always OFF
   * @param {Date} endTime end time
   */
  setNightMode: async function (startTime, endTime) {
    let packet = ''
    let command = ''
    if (startTime !== null && endTime !== null) {
      let startHour = this.createByteStringFromInt(startTime.getHours())
      let startMinute = this.createByteStringFromInt(startTime.getMinutes())
      let endHour = this.createByteStringFromInt(endTime.getHours())
      let endMinute = this.createByteStringFromInt(endTime.getMinutes())
      let schedule = '01'
      command = this.messages.setup.nightMode
      let message = startHour + startMinute + endHour + endMinute
      packet = this.hexStringToHexBuffer(command + schedule + message)
    } else {
      let off = '00'
      command = this.messages.setup.nightModeOff
      packet = this.hexStringToHexBuffer(command + off)
    }
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Decide if you want date and time, or only one of those
   * Currently only allows date and time, doesn't seem to set only time, and such a setting doesn't exist in Gadgetbridge app.
   */
  setDisplayDateTime: async function () {
    let dateAndTime = '03'
    // let timeOnly = '00' // Does not work currently, for some reason.
    let command = this.messages.setup.dateTimeFormat
    let packet = this.hexStringToHexBuffer(
      command + dateAndTime
    )
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Sets time format: 24h or 12h
   * Defaults to 24h
   * @param {string} format "24h" or "12h"
   */
  setTimeFormat: async function (format) {
    let packet = ''
    let command = this.messages.setup.hourFormat
    if (format === '12h') {
      let twelveHourFormat = '00'
      packet = this.hexStringToHexBuffer(command + twelveHourFormat)
    } else {
      let twentyFourHourFormat = '01'
      packet = this.hexStringToHexBuffer(command + twentyFourHourFormat)
    }
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Sets the format of the date
   * Currently only sets day/month/year
   * @param {boolean} dayFirst if true, the format is day/month/year, else it's month/day/year
   */
  setDateFormat: async function (dayFirst) {
    let packet = ''
    let format = ''
    let message = ''
    if (dayFirst) {
      format = 'dd/MM/yyyy'
      message = Buffer.from(format).toString('hex')
    } else {
      format = 'MM/dd/yyyy'
      message = Buffer.from(format).toString('hex')
    }
    let command = this.messages.setup.dateFormat
    packet = this.hexStringToHexBuffer(command + message)
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Sets the distance metric: meters or feet
   * Currently only supports meters
   * @param {boolean} meters if true uses meters, else uses feet
   */
  setDistanceType: async function (meters) {
    let packet = ''
    let message = ''
    let command = this.messages.setup.distance
    if (meters) {
      let metric = '00'
      message = command + metric
    } else {
      let imperial = '01'
      message = command + imperial
    }
    packet = this.hexStringToHexBuffer(message)
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Sets the wear position
   * @param {boolean} right if true watch is worn on the right
   */
  setWearLocation: async function (right) {
    let packet = ''
    let message = ''
    let command = this.messages.setup.wearLocation
    if (right) {
      let right = '82'
      message = command + right
    } else {
      let left = '02'
      message = command + left
    }
    packet = this.hexStringToHexBuffer(message)
    await this.sendWithResponse(
      this.mibandCustomService0,
      this.userCharacteristic,
      packet
    )
  },

  /**
   * Sets the goal in steps
   * @param {number} goalSteps
   */
  setStepGoal: async function (goalSteps) {
    let stepsHex = this.createByteStringFromInt(goalSteps)
    if (stepsHex.length === 2) {
      stepsHex = stepsHex + '00'
    } else if (stepsHex.length === 4) {
      stepsHex = stepsHex.substring(2, 4) + stepsHex.substring(0, 2)
    }

    let packet = this.hexStringToHexBuffer(
      this.messages.setup.fitnessGoalStart +
        stepsHex +
        this.messages.setup.fitnessGoalEnd
    )

    await this.sendWithResponse(
      this.mibandCustomService0,
      this.userCharacteristic,
      packet
    )
  },

  /**
   * Sets screens and its order
   * A small battery icon is shown when the battery is running out on the main clock screen.
   * However if the user is to see the battery status, the status screen needs to be enabled which also includes the
   * step count.
   * @param {string[]} screens an array of "clock", "heartRate", "status", "more", "notifications", "activity" and "weather"
   */
  setupScreens: async function (screens) {
    let packet = ''
    let messageArray = this.messages.setup.changeScreens
    let command = '0a'
    let pos = 1
    if (screens.includes('notifications')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '02'
      )
      messageArray[4] = this.parsePositionToString(pos)
      pos++
    }
    if (screens.includes('weather')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '04'
      )
      messageArray[5] = this.parsePositionToString(pos)
      pos++
    }
    if (screens.includes('activity')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '08'
      )
      messageArray[6] = this.parsePositionToString(pos)
      pos++
    }
    if (screens.includes('more')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '10'
      )
      messageArray[7] = this.parsePositionToString(pos)
      pos++
    }
    if (screens.includes('status')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '20'
      )
      messageArray[8] = this.parsePositionToString(pos)
      pos++
    }
    if (screens.includes('heartRate')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '40'
      )
      messageArray[9] = this.parsePositionToString(pos)
      pos++
    }
    if (screens.includes('timer')) {
      messageArray[1] = this.performOROperationOnStringBytes(
        messageArray[1],
        '80'
      )
      messageArray[10] = this.parsePositionToString(pos)
      pos++
    }
    for (let i = 4; i <= 11; i++) {
      if (messageArray[i] === '00') {
        messageArray[i] = this.paddHex(parseInt(pos++, 16).toString(16))
      }
    }
    let reducer = (accumulator, currentValue) => accumulator + currentValue
    packet = this.hexStringToHexBuffer(messageArray.reduce(reducer))
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  performOROperationOnStringBytes (firstValue, secondValue) {
    let ORValue = this.paddHex(
      (parseInt(firstValue, 16) | parseInt(secondValue, 16)).toString(16)
    )
    return ORValue
  },

  parsePositionToString (pos) {
    let value = this.paddHex(parseInt(pos, 10).toString(16))
    return value
  },

  /**
   * Activates display when wrist is lifted
   * @param {string} type, on, off, schedule
   */
  activateDisplayOnWristLift: async function (type, startTime, endTime) {
    let packet = ''
    let message = ''
    let command = this.messages.setup.displayOnLift
    if (type === 'on') {
      let on = '01'
      message = command + on
    } else if (type === 'off') {
      let off = '00'
      message = command + off
    } else if (type === 'schedule') {
      let startHour = this.createByteStringFromInt(startTime.getHours())
      let startMinute = this.createByteStringFromInt(startTime.getMinutes())
      let endHour = this.createByteStringFromInt(endTime.getHours())
      let endMinute = this.createByteStringFromInt(endTime.getMinutes())
      let schedule = '01'
      message =
        command + schedule + startHour + startMinute + endHour + endMinute
    }
    packet = this.hexStringToHexBuffer(message)
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Shows message when goal is reached
   * Currently only turns it off
   * @param {boolean} enable
   */
  setGoalNotification: async function (enable) {
    let packet = ''
    let message = ''
    let command = this.messages.setup.goalNotification
    if (enable) {
      let on = '01'
      message = command + on
    } else {
      let off = '00'
      message = command + off
    }
    packet = this.hexStringToHexBuffer(message)
    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet,
      command
    )
  },

  /**
   * Sets support for HR supporte sleep detection
   * @param {boolean} on
   */
  setHRSleepSupport: async function (on) {
    let packet = ''
    let message = ''
    if (on) {
      message = this.messages.setup.enableHRSleepSupport
    } else {
      message = this.messages.setup.disableHRSleepSupport
    }
    packet = this.hexStringToHexBuffer(message)

    return this.sendWithResponse(
      this.hrMonitorService,
      this.hrMonitorControlCharacteristic,
      packet
    )
  },

  /**
   * Sets HR avaialble to non authenticated apps
   * Currently only supports disabled
   * @param {boolean} on
   */
  setExposeHRToThirdParty: async function (on) {
    let packet = ''
    let message = ''

    if (on) {
      message = this.messages.setup.enableHRExpose
    } else {
      message = this.messages.setup.disableHRExpose
    }

    packet = this.hexStringToHexBuffer(message)

    await this.sendAndVerifyConfiguration(
      this.mibandCustomService0,
      this.configCharacteristic,
      packet
    )
  },

  /**
   * Sets the HR measurement interval
   * @param {number} interval
   */
  setHeartRateMeasurementInterval: async function (interval) {
    // if hrMonitorControlCharacteristic can send notifications, register to them and observe response
    let intervalString = this.createByteStringFromInt(interval)

    let packet = this.hexStringToHexBuffer(
      this.messages.setup.setHRInterval + intervalString // convert interval to hex
    )
    return this.sendWithResponse(
      this.hrMonitorService,
      this.hrMonitorControlCharacteristic,
      packet
    )
  },

  /**
   * Technically does not turn off the measurement interval. Instead it sets it to a high amount of minutes.
   */
  turnOffHRMeasurementInterval: async function () {
    this.setHeartRateMeasurementInterval(256) // Once every 24 hrs
  },

  /** Sets the user profile
   * @param height: height in cm
   * @param weight: weight in kg
   * @param birthYear: DOB year
   * @param birthMonth: DOB month
   * @param birthDay: DOB day
   * @param sex: false for male
   **/
  setUser: async function (
    height, // number
    weight, // number
    birthYear, // number
    birthMonth, // number
    birthDay, // number
    sex // boolean, false for male
  ) {
    let heightString = this.paddHexToBytes(
      this.createByteStringFromInt(height),
      4
    )
    let height1 = heightString.substring(2, 4) // Is this the right order? Little or big endian, not certain, needs to ask Dario.
    let height2 = heightString.substring(0, 2)

    let weightString = this.paddHexToBytes(
      this.createByteStringFromInt(weight * 200),
      4
    )
    let weight1 = weightString.substring(2, 4) // Same, little or big endian?
    let weight2 = weightString.substring(0, 2)

    let birthYearString = this.createByteStringFromInt(birthYear)
    let birthYear1 = birthYearString.substring(2, 4)
    let birthYear2 = birthYearString.substring(0, 2)
    let birthMonth1 = this.createByteStringFromInt(birthMonth)
    let birthDay1 = this.createByteStringFromInt(birthDay)

    let sex1 = sex ? '01' : '00' // 01 if true/female, 00 if false/male

    // Random hex values, easter egg.
    let alias1 = '44'
    let alias2 = '41'
    let alias3 = '44'
    let alias4 = '53'

    let packet = this.hexStringToHexBuffer(
      this.messages.setup.sendUserInfo +
        '00' +
        '00' +
        birthYear1 +
        birthYear2 +
        birthMonth1 +
        birthDay1 +
        sex1 +
        height1 +
        height2 +
        weight1 +
        weight2 +
        alias1 +
        alias2 +
        alias3 +
        alias4
    )
    await this.sendWithResponse(
      this.mibandCustomService0,
      this.userCharacteristic,
      packet
    )
  },

  createByteStringFromInt (value) {
    let hexInt = parseInt(value, 10)
    let byteString = this.paddHex(hexInt.toString(16))
    return byteString
  },

  paddHex: function (hexValue) {
    let paddedHexValue = ''
    if (hexValue.length % 2 !== 0) {
      paddedHexValue += '0' + hexValue
    } else {
      return hexValue
    }
    return paddedHexValue
  },

  paddHexToBytes: function (hexValue, bytes) {
    let paddedHexValue = hexValue.slice()
    while (paddedHexValue.length % bytes !== 0) {
      paddedHexValue = '0' + paddedHexValue
    }
    return paddedHexValue
  },

  // STORED DATA
  /**
   * Fetches stored data from a given date
   * @returns a promise which is solved if the fecthing starts
   * @param {date} startDate
   * @param {function} dataCallback callback function with data in it. Example data: { timestamp: date, activityType: 1, intensity: 30, steps: 10, heartRate: 65, buffer: Uint8Array }
   */
  fetchStoredData: async function (startDate, dataCallback) {
    let actualStartDate // actual start date as communicated by the watch
    let sampleCounter = 0
    let totalSamples = 0
    // register to storage control
    this.registerNotification(
      this.mibandCustomService0,
      this.storageControlCharacteristic
    )
    return new Promise((resolve, reject) => {
      ble.startNotification(
        this.deviceId,
        this.mibandCustomService0,
        this.storageControlCharacteristic,
        responseData => {
          let dataHex = Buffer.from(responseData).toString('hex')
          if (dataHex.substring(0, 6) === '100101') {
            actualStartDate = this.createDateFromHexString(
              dataHex.substring(14, 26)
            )
            console.log('Actual start date:', actualStartDate)
            totalSamples = this.getTotalSamplesFromBuffer(Buffer.from(responseData))
            console.log('Total samples:', totalSamples)
            sampleCounter = 0
            // here we know we should receive data, so we register for the characteristic
            this.registerNotification(
              this.mibandCustomService0,
              this.storageDataCharacteristic
            )
            ble.startNotification(
              this.deviceId,
              this.mibandCustomService0,
              this.storageDataCharacteristic,
              dataResponse => {
                // got data!
                let buffer = new Uint8Array(dataResponse)
                let sampleArray = this.createSingleActivitySamplesFromSeveral(
                  actualStartDate,
                  sampleCounter,
                  buffer
                )
                console.log('Buffer:', buffer)
                console.log('Samples:', sampleArray)
                for (let sample of sampleArray) {
                  dataCallback(
                    sample
                  )
                }
                sampleCounter += Math.floor(buffer.length / 4)
              },
              reject
            )

            // start fetch sequence
            this.sendFetchCommand().catch(reject)
          }
          if (dataHex === '100201') {
            // Fetch completed
            let fifteenMinutes = 15 * 60 * 1000
            let lastDateReceived = new Date(actualStartDate.getTime() + totalSamples * 1000 * 60)
            let currentDate = new Date()
            if (this.differenceInMinutes(lastDateReceived, currentDate) > 15) {
              let nextStartDate = new Date(lastDateReceived.getTime() + fifteenMinutes)
              actualStartDate = nextStartDate
              this.sendStartDateAndActivity(nextStartDate, 1)
            } else {
              resolve() // Data was received that was close enough to the current time, and hence we will not ask for more packets. Not sure how else to this issue.
              // If the above if statement is not implemented then the we keep a preamble packet with the same date and will continue to ask for that packet indefinitely.
            }
          }
          if (dataHex === '100204') {
            // No data was found, can be triggered if a data was already sent recently, or if there is no data left to fetch.
            resolve()
          }
        },
        reject
      )

      this.sendStartDateAndActivity(startDate, 1).catch(reject)
    })
  },

  getTotalSamplesFromBuffer (buffer) {
    let totalSamples = (buffer[6] << 24) | (buffer[5] << 16) | (buffer[4] << 8) | (buffer[3])
    return totalSamples
  },

  /**
   * Creates an array of sample objects, TODO: add buffer to sample
   * @param {Buffer} samples Contains 1-4 samples of recorded activity
   */
  createSingleActivitySamplesFromSeveral (
    actualStartDate,
    amountOfSamples,
    samples
  ) {
    // let packageNumber = samples[0] // First item in buffer array is always the package number
    let sampleObjectArray = []
    for (let i = 1; i < samples.length; i += 4) {
      let sample = {
        date: new Date(
          actualStartDate.getTime() + 60000 * amountOfSamples++
        ), // adding minutes to the start date
        activityType: samples[i],
        intensity: samples[i + 1],
        steps: samples[i + 2],
        hr: samples[i + 3] // Should add a buffer array of each value in the object?
      }
      sampleObjectArray.push(sample)
    }
    return sampleObjectArray
  },

  differenceInMinutes (date1, date2) {
    let diff = (date2.getTime() - date1.getTime()) / 1000
    diff /= 60
    return Math.round(diff)
  },

  createDateFromHexString: function (hexString) {
    let year = parseInt(
      hexString.substring(2, 4) + hexString.substring(0, 2),
      16
    )
    let month = parseInt(hexString.substring(4, 6), 16) - 1
    let day = parseInt(hexString.substring(6, 8), 16)
    let hour = parseInt(hexString.substring(8, 10), 16)
    let minutes = parseInt(hexString.substring(10, 12), 16)
    let seconds = 0
    let date = new Date(year, month, day, hour, minutes, seconds)
    return date
  },

  // activity type not currently supported, only fetches activity 01
  sendStartDateAndActivity: async function (date, activityType) {
    let customDate = new CustomDate(date)
    console.log('Custom date:', customDate.date)
    let dateMessage = customDate.getDateStringPacket()
    let packet = this.hexStringToHexBuffer(
      this.messages.storedData.startDate +
        this.messages.storedData.activityType +
        dateMessage.substring(0, 16) // Removes last 3 bytes because they shouldn't be sent in this case (milliseconds in 3 bytes representing fractions are not send for some reason)
    )
    return this.sendWithoutResponse(
      this.mibandCustomService0,
      this.storageControlCharacteristic,
      packet
    )
  },

  sendFetchCommand: async function () {
    let packet = this.hexStringToHexBuffer('02')
    return this.sendWithoutResponse(
      this.mibandCustomService0,
      this.storageControlCharacteristic,
      packet
    )
  },

  // Real-time step count measurement

  /**
   * Starts monitoring steps
   * @param {function} dataCallback called when step count is available
   * @param {function} errorCallback
   */
  startStepCountMonitoring: async function (dataCallback) {
    this.registerNotification(
      this.mibandCustomService0,
      this.stepCountCharacteristic
    )
    return new Promise((resolve, reject) => {
      ble.startNotification(
        this.deviceId,
        this.mibandCustomService0,
        this.stepCountCharacteristic,
        dataResponse => {
          let data = Buffer.from(dataResponse).toString('hex')
          dataCallback({
            timestamp: new Date(),
            steps: this.parseStepCount(this.convertToLittleEndian(data))
          })
        },
        failure => {
          reject()
        }
      )
    })
  },

  convertToLittleEndian: function (value) {
    let littleEndian = value
      .match(/../g)
      .reverse()
      .join('')
    return littleEndian
  },

  parseStepCount: function (value) {
    let parsedValue = ''
    for (let i = 0; i < value.length; i += 2) {
      if (!(value.charAt(i) === '0' && value.charAt(i + 1) === '0')) {
        parsedValue += value.charAt(i) + value.charAt(i + 1)
      }
    }
    return parseInt(parsedValue, 16)
  },

  // Raw data measurement

  /**
   * Starts raw data monitoring
   * @param {boolean} ppg if true streams PPG raw data
   * @param {boolean} acceleration if true streams raw accelerometry
   * @param {function} dataCallback called when data is available
   */
  startRawDataMonitoring: async function (ppg, acceleration, dataCallback) {
    await this.turnOffHRMeasuring()
    this.registerNotification(
      this.mibandCustomService0,
      this.rawDataCharacteristic
    )
    return new Promise((resolve, reject) => {
      ble.startNotification(
        this.deviceId,
        this.mibandCustomService0,
        this.rawDataCharacteristic,
        dataResponse => {
          const dataArray = [...new Uint8Array(dataResponse)]
          let type = ''
          if (dataArray[0] === 1) {
            type = 'ACC'
            if (dataArray.length >= 16) {
              dataCallback(
                {
                  timestamp: new Date(),
                  data: this.createSeveralFromSingleRawData(
                    dataArray.splice(2),
                    type
                  )
                },
                type
              )
            }
          } else if (dataArray[0] === 2) {
            type = 'HR'
            dataCallback(
              {
                timestamp: new Date(),
                data: this.createSeveralFromSingleRawData(
                  dataArray.splice(2),
                  type
                )
              },
              type
            )
          }
          // TODO?
          // dataCallback({
          //   type: type,
          //   data: {
          //     x: 12,
          //     y: 0,
          //     z: 333
          //   }
          //   OR
          //   data: 2323
          // })
        },
        failure => {
          console.log('Failed to start raw HR notifications:', failure)
          reject()
        }
      )

      // Error callback, if register to notifications doesnt work (same as rej), second if there is a disconnect, if disconnect callback is called then errorcallback is not necessary
      if (ppg && acceleration) {
        let enableMessage = this.messages.rawData.rawHRAndACC
        this.enableRawData(enableMessage)
          .then(this.turnOnContinuousHRMeasuring())
          .then(this.sendStartRawDataCommand())
          .then(
            this.pingRawData(
              this.messages.rawData.rawHRAndACC,
              this.messages.rawData.ping
            )
          )
          .then(resolve())
          .catch(reject())
      } else if (acceleration) {
        let enableMessage = this.messages.rawData.rawAcc
        this.enableRawData(enableMessage)
          .then(this.sendStartRawDataCommand())
          .then(
            this.pingRawData(
              this.messages.rawData.rawAcc,
              this.messages.rawData.ping
            )
          )
          .then(resolve())
          .catch(reject()) // '0x02' to sensor characteristic
      } else if (ppg) {
        let enableMessage = this.messages.rawData.rawHR
        this.enableRawData(enableMessage)
          .then(this.turnOnContinuousHRMeasuring())
          .then(this.sendStartRawDataCommand())
          .then(
            this.pingRawData(
              this.messages.rawData.rawHR,
              this.messages.rawData.ping
            )
          )
          .then(resolve())
      } else {
        reject() // Parameters are incorrect.
      }
    })
  },

  createSeveralFromSingleRawData: function (rawData, type) {
    let rawDataArray = []
    for (let i = 0; i < rawData.length; i += 2) {
      if (type === 'HR') {
        let tot = (rawData[i + 1] << 8) | rawData[i]
        rawDataArray.push(tot)
      } else if (type === 'ACC') {
        let tot = (rawData[i + 1] << 8) | rawData[i]
        let value = this.fromTwosComplement(tot, 2)
        rawDataArray.push(value)
      }
    }
    return rawDataArray
  },

  // taken from http://www.java2s.com/example/nodejs/number/converts-the-given-twos-complement-representation-to-the-represented.html
  fromTwosComplement: function (twosComplement, numberBytes) {
    var numberBits = (numberBytes || 1) * 8
    let throwString = "Two's complement out of range given " +
        numberBytes +
        ' byte(s) to represent.'
    if (twosComplement < 0 || twosComplement > (1 << numberBits) - 1) {
      throw throwString
    }

    // If less than the maximum positive: 2^(n-1)-1, the number stays positive
    if (twosComplement <= Math.pow(2, numberBits - 1) - 1) { return twosComplement }

    // Else convert to it's negative representation
    return -((~twosComplement & ((1 << numberBits) - 1)) + 1)
  },

  enableRawData: async function (message) {
    let packet = this.hexStringToHexBuffer(message)
    await this.sendWithoutResponse(
      this.mibandCustomService0,
      this.sensorCharacteristic,
      packet
    )
  },

  sendStartRawDataCommand: async function () {
    let packet = this.hexStringToHexBuffer('02')
    return this.sendWithoutResponse(
      this.mibandCustomService0,
      this.sensorCharacteristic,
      packet
    )
  },

  pingRawData: async function (ping1, ping2) {
    this.rawDataTimer =
      this.rawDataTimer ||
      setInterval(() => {
        let packet = this.hexStringToHexBuffer(ping1)
        this.sendWithoutResponse(
          this.mibandCustomService0,
          this.sensorCharacteristic,
          packet
        )
        packet = this.hexStringToHexBuffer(ping2)
        this.sendWithoutResponse(
          this.mibandCustomService0,
          this.sensorCharacteristic,
          packet
        )
      }, 30000)
  },

  stopRawNotifications: async function () {
    clearInterval(this.rawDataTimer)
    this.rawDataTimer = undefined
    let packet = this.hexStringToHexBuffer('03')
    await this.sendWithoutResponse(
      // Stopping notifications first and then sending without response does not work. Why???
      this.mibandCustomService0,
      this.sensorCharacteristic,
      packet
    )

    return this.stopNotification(
      this.mibandCustomService0,
      this.rawDataCharacteristic
    )
  },

  // Real-time HR measurement

  startHRContinuousMonitoring: async function (callback) {
    this.startHRNotifications(callback)
    await this.turnOffHRMeasuring()
    await this.turnOnContinuousHRMeasuring()
    await this.pingHRControlMonitor()
  },

  stopHRContinuousMonitoring: async function () {
    clearInterval(this.hrPingTimer)
    this.hrPingTimer = undefined
    return this.turnOffContinuousHRMeasuring()
  },

  turnOffHRMeasuring: async function () {
    await this.turnOffOneShotHRMeasuring()
    return this.turnOffContinuousHRMeasuring()
  },

  turnOffOneShotHRMeasuring: async function () {
    let packet = this.hexStringToHexBuffer(
      this.messages.heartRate.turnOffHROneShot
    )
    return this.sendWithResponse(
      this.hrMonitorService,
      this.hrMonitorControlCharacteristic,
      packet
    )
  },

  turnOffContinuousHRMeasuring: async function () {
    let packet = this.hexStringToHexBuffer(
      this.messages.heartRate.turnOffHRContinuous
    )
    return this.sendWithResponse(
      this.hrMonitorService,
      this.hrMonitorControlCharacteristic,
      packet
    )
  },

  startHRNotifications: function (callback) {
    this.registerNotification(
      this.hrMonitorService,
      this.hrMonitorMeasureCharacteristic
    )

    ble.startNotification(
      this.deviceId,
      this.hrMonitorService,
      this.hrMonitorMeasureCharacteristic,
      responseData => {
        let value = Buffer.from(responseData)
        let hrValue = '0x' + value.toString('hex')
        callback(parseInt(hrValue))
      },
      failure => {
        console.log('Failed to start HR notifications:', failure)
      }
    )
  },

  turnOnContinuousHRMeasuring: async function () {
    let packet = this.hexStringToHexBuffer(
      this.messages.heartRate.turnOnHRContinuous
    )
    return this.sendWithResponse(
      this.hrMonitorService,
      this.hrMonitorControlCharacteristic,
      packet
    )
  },

  pingHRControlMonitor: async function () {
    this.hrPingTimer =
      this.hrPingTimer ||
      setInterval(() => {
        let packet = this.hexStringToHexBuffer(this.messages.heartRate.ping)
        this.sendWithResponse(
          this.hrMonitorService,
          this.hrMonitorControlCharacteristic,
          packet
        )
      }, 12000)
  },

  // Stop HR Monitoring, both raw and real-time. This needs an own function because the notifications need to stop after messages have been sent for some reason.

  stopHRMonitoring: async function () {
    this.stopRawNotifications()
    this.stopHRContinuousMonitoring()
  },

  // Setting and getting device time, battery, hw info and sw info.

  getTimeStatus: async function () {
    let data = await this.read(
      this.mibandCustomService0,
      this.timeCharacteristic
    )
    let dataBuffer = Buffer.from(data)

    let year = dataBuffer.readUInt16LE(0),
      mon = dataBuffer[2] - 1,
      day = dataBuffer[3],
      hrs = dataBuffer[4],
      min = dataBuffer[5],
      sec = dataBuffer[6]
    return new Date(year, mon, day, hrs, min, sec)
  },

  setCurrentTimeStatus: async function () { // TODO: Convert to UTC
    let currentDate = new Date()
    return this.setTimeStatus(currentDate)
  },

  setTimeStatus: async function (date) {
    let customDate = new CustomDate(date)
    let packetContent = customDate.getDateStringPacket()
    console.log('Setting time status:', packetContent)
    let packet = this.hexStringToHexBuffer(packetContent)

    return this.sendWithResponse(
      this.mibandCustomService0,
      this.timeCharacteristic,
      packet
    )
  },

  getBatteryStatus: async function () {
    let data = await this.read(
      this.mibandCustomService0,
      this.batteryCharacteristic
    )
    let dataBuffer = Buffer.from(data)

    const batteryStatus = {
      chargeLevel: dataBuffer[1],
      currentlyCharging: dataBuffer[2],
      lastChargedDate: new Date(dataBuffer.readUInt16LE(3), dataBuffer[4] - 1, dataBuffer[5], dataBuffer[6], dataBuffer[7], dataBuffer[8]),
      numOfCharges: dataBuffer[9],
      amountCharged: dataBuffer[10]
    }

    return batteryStatus
  },

  getHardwareInfo: async function () {
    let data = await this.read(
      this.deviceInformationService,
      this.hardwareCharacteristic
    )
    let dataString = this.dataToASCII(new Uint8Array(data))
    return dataString
  },

  getSoftwareInfo: async function () {
    let data = await this.read(
      this.deviceInformationService,
      this.softwareCharacteristic
    )
    let dataString = this.dataToASCII(new Uint8Array(data))
    return dataString
  },

  getSerialNumber: async function () {
    let data = await this.read(this.deviceInformationService, this.serialNumberCharacteristic)
    let dataString = this.dataToASCII(new Uint8Array(data))
    return dataString
  },

  // BLE communication functions

  read: async function (service, characteristic) {
    return new Promise((resolve, reject) => {
      ble.read(
        this.deviceId,
        service,
        characteristic,
        responseData => {
          resolve(responseData)
        },
        failure => {
          console.log(failure)
          alert('Failed to read characteristic from device.')
          reject()
        }
      )
    })
  },

  sendWithoutResponse: async function (service, characteristic, data) {
    var dataInBits = new Uint8Array(data)
    return new Promise((resolve, reject) => {
      ble.writeWithoutResponse(
        this.deviceId,
        service,
        characteristic,
        dataInBits.buffer,
        successResponse => {
          resolve(successResponse)
        },
        failure => {
          console.log('Write without response failed')
          reject(failure)
        }
      )
    })
  },

  sendWithResponse: async function (service, characteristic, data) {
    const dataInBits = new Uint8Array(data)
    console.log('Sending packet:', data, dataInBits, this.deviceId, service, characteristic)
    return new Promise((resolve, reject) => {
      ble.write(
        this.deviceId,
        service,
        characteristic,
        dataInBits.buffer,
        successResponse => {
          console.log('Response:', successResponse)
          if (!successResponse) resolve() // IOS doesnt send a response for some strange reason.
          let response = Buffer.from(successResponse).toString('hex')
          if (response === '4f4b') {
            // User step goals set properly, probably also an OK response for a bunch of other messages.
            // Sleep support set properly, same confirmation response is used for several characteristics.
            resolve(successResponse)
          } else {
            reject()
          }
        },
        failure => {
          console.log('Failed to send:', failure)
          reject()
        }
      )
    })
  },

  registerNotification: function (service, characteristic) {
    if (!this.runningNotifications.has(characteristic)) {
      this.runningNotificationCharacteristics.push(characteristic)
      this.runningNotifications.set(characteristic, service)
    }
  },

  stopAllNotifications: async function () {
    while (this.runningNotificationCharacteristics.length > 0) {
      let characteristic = this.runningNotificationCharacteristics.pop()
      let service = this.runningNotifications.get(characteristic)
      await this.stopNotification(service, characteristic)
      this.runningNotifications.delete(characteristic)
    }
    return Promise.resolve()
  },

  stopNotification: async function (service, characteristic) {
    return new Promise((resolve, reject) => {
      ble.stopNotification(
        this.deviceId,
        service,
        characteristic,
        success => {
          resolve()
        },
        failure => {
          console.log('Failed to stop notifications', failure)
          reject()
        }
      )
    })
  },

  generateKey: function () {
    let keyArray = new Uint8Array(16)
    keyArray = crypto.getRandomValues(keyArray)
    this.authenticationKey = Buffer.from(keyArray).toString('hex')
    return this.authenticationKey
  },

  delay: async function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  dataToASCII: function (data) {
    let dataString = this.textDecoder.decode(data)
    return dataString
  },

  hexStringToHexBuffer: function (data) {
    let hexBuffer = Buffer.from(data, 'hex')
    return hexBuffer
  }
}

export default Miband3
