import BLEDevice from '../bledevice'
import CMDS from './jStyle2025CMDs.js'

const DEBUG = process.env.DEBUG
const COMM_TIMEOUT_MS = 5000 // very generous timeout for communication

/**
 * JStyle 2025 protocol, reverse engineered
 * Compatible with 2025E, 2113E
 */
export default class JStyle2025 extends BLEDevice {
  /**
   * @typedef {Object} DeviceTime - time set on the watch
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {string} gpsDate - date according to GPS
   */

  /**
   * @typedef {Object} UserProfile - user profile info
   * @property {number} gender - 1 for male, 2 for female
   * @property {number} age - in years
   * @property {number} height - in cm
   * @property {number} weight - in kg
   * @property {number} strideLength - in cm
   * @property {string} userDeviceId - ?
   */

  /**
   * @typedef {Object} DailyActivitySummary - summary of daily activity
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} steps - number of steps
   * @property {number} exerciseMinutes - exercise time in minutes
   * @property {number} distance - distance in meters
   * @property {number} calories - calories burned
   * @property {number} goal - goal in steps
   * @property {number} activeMinutes - active minutes
   *
   * Example: {"recordCount":1,"year":2025,"month":8,"day":21,"steps":6268,"exerciseMinutes":2887,"distance":4.1,"calories":270.76,"goal":62,"activeMinutes":16},
   */

  /**
   * @typedef {Object} DetailedActivity - summary of detailed activity
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {number} steps - number of steps
   * @property {number} calories - calories burned
   * @property {number} distance - distance in meters
   * @property {Array<number>} detailSteps - array of step details, each element is the number of steps per minute, 10 elements in total
   *
   * Example: "recordCount":16,"year":2025,"month":8,"day":21,"hour":20,"minutes":52,"seconds":40,"steps":27,"calories":0.84,"distance":0.01,"detailSteps":[27,0,0,0,0,0,0,0,0,0]
   */

  /**
   * @typedef {Object} DetailedHR - detailed heart rate record
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {Array<number>} hrs - each element is the heart rate in bpm, 15 elements in total
   */

  /**
   * @typedef {Object} HR - heart rate record
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {number} hr - heart rate in bpm
   *
   * Example: {"recordCount":3,"year":2025,"month":8,"day":22,"hour":10,"minutes":0,"seconds":44,"hr":65}
   */

  /**
   * @typedef {Object} HRV - heart rate variability record
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {number} hrv - heart rate variability in ms
   * @property {number} vascularAge - vascular age in years
   * @property {number} hr - heart rate in bpm
   * @property {number} stressLevel - stress level
   * @property {number} highBP - high blood pressure
   * @property {number} lowBP - low blood pressure
   *
   * Example: {"recordCount":3,"year":2025,"month":8,"day":22,"hour":5,"minutes":42,"seconds":12,"hrv":69,"vascularAge":62,"hr":127,"stressLevel":62,"highBP":125,"lowBP":64}
   */

  /**
   * @typedef {Object} SPO2 - blood oxygen saturation record
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {number} spo2 - blood oxygen saturation in percentage
   *
   * Example: {"recordCount":6,"year":2025,"month":8,"day":22,"hour":6,"minutes":40,"seconds":11,"spo2":98}
   */

  /**
   * @typedef {Object} Temperature - temperature record
   * @property {number} recordCount - count of the record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {number} temperature - temperature in Celsius
   *
   * Example: {"recordCount":4,"year":2025,"month":8,"day":22,"hour":9,"minutes":50,"seconds":0,"temperature":36.6}
   */

  /**
   * @typedef {Object} Sleep - sleep record
   * @property {number} year - year
   * @property {number} month - month (1-12)
   * @property {number} day - day of the month
   * @property {number} hour - hour (0-23)
   * @property {number} minutes - minutes (0-59)
   * @property {number} seconds - seconds (0-59)
   * @property {number} sleepQualityDurationMins - sleep quality duration in minutes
   * @property {Array<number>} sleepQuality - sleep quality during that window of time, can be an array where the numbers represent quality for each minute
   *
   * Example: {"year":2025,"month":8,"day":22,"hour":5,"minutes":16,"seconds":59,"sleepQualityDurationMins":1,"sleepQuality":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,3,3,3,3,2]}
   */

  static #DATA_Service_UUID = '0000fff0-0000-1000-8000-00805f9b34fb'
  static #TX_Characteristic_UUID = '0000fff6-0000-1000-8000-00805f9b34fb'
  static #RX_Characteristic_UUID = '0000fff7-0000-1000-8000-00805f9b34fb'

  #replyCallbacks = {}

  /**
   * Creates a new jStyle instance
   * @param {Object} device - BLE device
   */
  // constructor(device) {
  //   super(device)
  // }

  /**
   * Finds all jStyle devices by name prefix
   * @param {string} name - name prefix to search for
   * @param {number} timeout - maximum time in milliseconds to wait for the devices
   * @returns {Promise<Array<JStyle2025>>} - array of jStyle devices found
   */
  static async findAllJStylesByNamePrefix (name, timeout = 10000) {
    const devices = await BLEDevice.findAllDevicesByName(name, [JStyle2025.#DATA_Service_UUID], timeout)
    if (DEBUG) console.log('JStyles found', devices)
    const jstyles = []
    if (devices && devices.length > 0) {
      for (const device of devices) {
        if (device.name.startsWith(name)) {
          jstyles.push(new JStyle2025(device))
        }
      }
    }
    return jstyles
  }

  /**
   * Finds a specific jStyle device by its ID
   * @param {string} id - ID of the device
   * @param {number} timeout - maximum time in milliseconds to wait for the device
   * @returns {Promise<JStyle2025>}
   */
  static async findJStyleById (id, timeout = 10000) {
    const device = await BLEDevice.findDeviceById(id, [JStyle2025.#DATA_Service_UUID], timeout)
    return new JStyle2025(device)
  }

  /**
   * Connects to the jStyle
   * @param {Function} disconnectCallback - called when the device disconnects
   * @returns {PromiseLike}
   */
  async connect (disconnectCallback) {
    await super.connect(disconnectCallback)

    return this.startNotifications(JStyle2025.#DATA_Service_UUID, JStyle2025.#RX_Characteristic_UUID, (response) => {
      // target.value
      if (DEBUG) console.log('<- Got data from RX characteristic', response)
      if (response.byteLength > 0) {
        const cmd = response.getUint8(0)

        if (this.#replyCallbacks[cmd]) {
          this.#replyCallbacks[cmd](response)
        } else {
          console.warn('No callback for command ' + cmd)
        }
      } else {
        console.warn('Response with no data?')
      }
    })
  }

  /**
   * Sends a command to the watch, adds a final CRC too
   * @param {number} command - command to be sent, as a number (should fit within 1 byte)
   * @param {DataView} data - any associated data, as DataView, should be no longer than 14 bytes
   * @returns {PromiseLike}
   */
  async #sendCommand (command, data) {
    if (DEBUG) console.log('-> Sending command ' + command)
    const outData = new Uint8Array(16)
    // copy command
    outData[0] = command & 0xff

    let crc = 0
    for (let i = 0; i < outData.length - 1; i++) {
      // copy the data
      if ((data != null) && (i > 0) && (i < data.byteLength)) {
        outData[i] = data.getUint8(i - 1)
      }
      crc += outData[i]
    }
    // add CRC
    outData[outData.length - 1] = crc & 0xff

    return super.writeCharacteristic(JStyle2025.#DATA_Service_UUID, JStyle2025.#TX_Characteristic_UUID, outData)
  }

  /**
   * Converts a number (integer) given as hex to a number as decimal
   * @param {string} num - number in hex
   * @returns {number}
   */
  #fromNumAsHexToNumAsDec (num) {
    return parseInt(num.toString(16))
  }

  /**
   * Convert a number (integer) given as decimal to a number as hex
   * @param {number} num - number in decimal
   * @returns {string}
   */
  #fromNumAsDecToNumAsHex (num) {
    return parseInt('' + num, 16)
  }

  /**
   * Waits for a reply to a given command
   * @param {number} command - command to wait for, as a number (should fit within 1 byte)
   * @returns {Promise<DataView>}
   */
  async #waitForReply (command) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        // time out no reply !
        delete this.#replyCallbacks[command]
        console.error('timeout! command ' + command)
        reject()
      }, COMM_TIMEOUT_MS)
      this.#replyCallbacks[command] = (btvalues) => {
        // got a reply before timeout
        clearTimeout(timeoutId)
        delete this.#replyCallbacks[command]
        resolve(btvalues)
      }
    })
  }

  /**
   * Gets the device version as string
   * @returns {Promise<string>}
   */
  async getDeviceVersion () {
    const replyPromise = this.#waitForReply(CMDS.getDeviceVersion).then((btvalues) => {
      if (DEBUG) console.log('Got device version reply ', btvalues)
      const ver = btvalues.getUint8(1) + '.' + btvalues.getUint8(2) + '.' + btvalues.getUint8(3) + '.' + btvalues.getUint8(4)
      return ver
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.getDeviceVersion)
    return replyPromise
  }

  /**
   * Gets the device battery level
   * @returns {Promise<number>}
   */
  async getBatteryLevel () {
    const replyPromise = this.#waitForReply(CMDS.getBatteryLevel).then((btvalues) => {
      if (DEBUG) console.log('Got device battery reply ', btvalues)
      const level = btvalues.getUint8(1)
      return level
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.getBatteryLevel)
    return replyPromise
  }

  /**
   * Gets the device name
   * @returns {Promise<string>} - device name
   */
  async getName () {
    const replyPromise = this.#waitForReply(CMDS.getName).then((btvalues) => {
      if (DEBUG) console.log('Got device name reply ', btvalues)
      const decoder = new TextDecoder('utf8')
      const nameDV = new DataView(btvalues.buffer, 1, 15)
      const name = decoder.decode(nameDV).replace(/\0/g, '') // remove null characters
      return name
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.getName)
    return replyPromise
  }

  /**
   * Gets the device MAC address
   * @returns {Promise<string>} - Bluetooth MAC address in format XX:XX:XX:XX:XX:XX
   */
  async getMACAddress () {
    const replyPromise = this.#waitForReply(CMDS.getMACAddress).then((btvalues) => {
      if (DEBUG) console.log('Got device MAC address reply ', btvalues)
      let macAddress = ''
      for (let i = 1; i < 7; i++) {
        macAddress += ('0' + btvalues.getUint8(i).toString(16)).slice(-2).toUpperCase()
        if (i < 6) {
          macAddress += ':'
        }
      }
      return macAddress
    })
    await this.#sendCommand(CMDS.getMACAddress)
    return replyPromise
  }

  /**
   * Gets the device time
   * @returns {Promise<DeviceTime>}
   */
  async getTime () {
    const replyPromise = this.#waitForReply(CMDS.getTime).then((btvalues) => {
      if (DEBUG) console.log('Got device time reply ' + btvalues)
      /** @type {DeviceTime} */
      const deviceTime = {
        year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(1)),
        month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(2)),
        day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
        hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
        minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
        seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
        gpsDate: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(9)) + '.' + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(10)) + '.' + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(11))
      }
      return deviceTime
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.getTime)
    return replyPromise
  }

  /**
   * Sets the clock date and time
   * @param {Date} dateTime - current date and time as JS date
   * @returns {Promise<void>}
   */
  async setTime (dateTime) {
    // message, contains 8 bytes
    const buffer = new ArrayBuffer(8)
    // same buffer, as dataview
    const dateTimeConfig = new DataView(buffer)

    const yearPost2k = dateTime.getFullYear() - 2000
    dateTimeConfig.setUint8(0, this.#fromNumAsDecToNumAsHex(yearPost2k))

    const monthFrom1 = dateTime.getMonth() + 1
    dateTimeConfig.setUint8(1, this.#fromNumAsDecToNumAsHex(monthFrom1))

    const day = dateTime.getDate()
    dateTimeConfig.setUint8(2, this.#fromNumAsDecToNumAsHex(day))

    const hour = dateTime.getHours()
    dateTimeConfig.setUint8(3, this.#fromNumAsDecToNumAsHex(hour))

    const minutes = dateTime.getMinutes()
    dateTimeConfig.setUint8(4, this.#fromNumAsDecToNumAsHex(minutes))

    const secs = dateTime.getSeconds()
    dateTimeConfig.setUint8(5, this.#fromNumAsDecToNumAsHex(secs))

    // time zone offset in hours
    let offset = 0
    const TZOffsetH = Math.round((-dateTime.getTimezoneOffset()) / 60)
    if (TZOffsetH < 0) {
      // offset is stored as ABS
      offset = -TZOffsetH
    } else {
      // offset is offsetted!
      offset = TZOffsetH + 0x80
    }

    dateTimeConfig.setUint8(7, offset)

    const replyPromise = this.#waitForReply(CMDS.setTime).then((btvalues) => {
      if (DEBUG) console.log('Got device time set OK ' + btvalues)
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.setTime, dateTimeConfig)
    if (DEBUG) console.log('Set time command sent')
    return replyPromise
  }

  /**
     * Gets the user profile infor
     * @returns {Promise<UserProfile>}
     */
  async getUserProfile () {
    const replyPromise = this.#waitForReply(CMDS.getUserProfile).then((btvalues) => {
      if (DEBUG) console.log('Got user profile ' + btvalues)
      const decoder = new TextDecoder()
      const userDeviceIdDV = new DataView(btvalues.buffer, 6, 5)
      const userDeviceId = decoder.decode(userDeviceIdDV)
      /** @type {UserProfile} */
      const userProfile = {
        gender: btvalues.getUint8(1),
        age: btvalues.getUint8(2),
        height: btvalues.getUint8(3),
        weight: btvalues.getUint8(4),
        strideLength: btvalues.getUint8(5),
        userDeviceId
      }
      return userProfile
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.getUserProfile)
    return replyPromise
  }

  /**
   * Sets the user profile
   * @param {UserProfile} profile - user profile
   */
  async setUserProfile (profile) {
    const buffer = new ArrayBuffer(5)
    // same buffer, as dataview
    const userProfileDV = new DataView(buffer)

    userProfileDV.setUint8(0, profile.gender)
    userProfileDV.setUint8(1, profile.age)
    userProfileDV.setUint8(2, profile.height)
    userProfileDV.setUint8(3, profile.weight)
    userProfileDV.setUint8(4, profile.strideLength)

    const replyPromise = this.#waitForReply(CMDS.setUserProfile).then((btvalues) => {
      if (DEBUG) console.log('Got user profile set OK ' + btvalues)
    })
    // first we send the command, then we wait
    await this.#sendCommand(CMDS.setUserProfile, userProfileDV)
    return replyPromise
  }

  /**
   * Sets automatic data collection mode
   * @param {number} startHour - hour to start automatic data collection (0-23)
   * @param {number} startMinute - minute to start automatic data collection (0-59)
   * @param {number} stopHour - hour to stop automatic data collection (0-23)
   * @param {number} stopMinute - minute to stop automatic data collection (0-59)
   * @param {number} intervalMinutes - interval in minutes for automatic data collection, default is 15 minutes
   * @param {number} type - type of automatic data collection, 1=AutoHeartRate, 2=AutoSpo2, 3=AutoTemp, 4=AutoHrv
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async setAutoMode (startHour, startMinute, stopHour, stopMinute, intervalMinutes = 15, type = 1) {
    if (intervalMinutes < 1 || intervalMinutes > 60) {
      throw new Error('Interval minutes must be between 1 and 60')
    }
    if (type < 1 || type > 4) {
      throw new Error('Type must be between 1 and 4')
    }
    const buffer = new ArrayBuffer(9)
    const automodeDV = new DataView(buffer)

    automodeDV.setUint8(0, 0x02) // open = true
    automodeDV.setUint8(1, this.#fromNumAsDecToNumAsHex(startHour))
    automodeDV.setUint8(2, this.#fromNumAsDecToNumAsHex(startMinute))
    automodeDV.setUint8(3, this.#fromNumAsDecToNumAsHex(stopHour))
    automodeDV.setUint8(4, this.#fromNumAsDecToNumAsHex(stopMinute))
    automodeDV.setUint8(5, 255) // week days, 255 means all days
    automodeDV.setUint16(6, intervalMinutes, true) // time in minutes, little endian
    automodeDV.setUint8(8, type) // type: 1=AutoHeartRate, 2=AutoSpo2, 3=AutoTemp, 4=AutoHrv

    const replyPromise = this.#waitForReply(CMDS.setAutoMode).then((btvalues) => {
      if (DEBUG) console.log('Got automode set OK ' + btvalues)
    })
    await this.#sendCommand(CMDS.setAutoMode, automodeDV)
    return replyPromise
  }

  /**
   * Gets the automatic data collection mode
   * @param {mode} type - type of automatic data collection, 1=AutoHeartRate, 2=AutoSpo2, 3=AutoTemp, 4=AutoHrv
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async getAutoMode (type) {
    if (type < 1 || type > 4) {
      throw new Error('Type must be between 1 and 4')
    }
    const replyPromise = this.#waitForReply(CMDS.getAutoMode).then((btvalues) => {
      if (btvalues.getUint8(0) === CMDS.getAutoMode) {
        if (DEBUG) console.log('Got automode reply ' + btvalues)
        const enabled = btvalues.getUint8(1)
        const startHour = this.#fromNumAsHexToNumAsDec(btvalues.getUint8(2)) // start hour
        const startMinutes = this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)) // start minutes
        const stopHour = this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)) // stop hour
        const stopMinutes = this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)) // stop minutes
        // Reverse order of the bits (LSB first) and only includes 7 bits
        // 00000101 gives 1-0-1-0-0-0-0
        // last bit is Monday, second last bit is Tuesday, etc.
        // supposing that Monday is the first day of the week !
        const weekDays = {
          monday: btvalues.getUint8(6) & 0x01,
          tuesday: btvalues.getUint8(6) >> 1 & 0x01,
          wednesday: btvalues.getUint8(6) >> 2 & 0x01,
          thursday: btvalues.getUint8(6) >> 3 & 0x01,
          friday: btvalues.getUint8(6) >> 4 & 0x01,
          saturday: btvalues.getUint8(6) >> 5 & 0x01,
          sunday: btvalues.getUint8(6) >> 6 & 0x01
        }
        const intervalMinutes = btvalues.getUint16(7, true) // interval in minutes

        return { enabled, startHour, startMinutes, stopHour, stopMinutes, weekDays, intervalMinutes }
      } else {
        throw new Error('Unexpected command ' + btvalues.getUint8(0) + ' received when querying automatic mode')
      }
    })

    const buffer = new ArrayBuffer(1)
    const automodeDV = new DataView(buffer)
    automodeDV.setUint8(0, type) // type: 1=AutoHeartRate, 2=AutoSpo2, 3=AutoTemp, 4=AutoHrv
    await this.#sendCommand(CMDS.getAutoMode, automodeDV)
    return replyPromise
  }

  /**
    * Clears data from watch
    */
  async clearData () {
    const replyPromise = this.#waitForReply(CMDS.clearData).then((btvalues) => {
      if (DEBUG) console.log('Got clear data OK ' + btvalues)
    })
    await this.#sendCommand(CMDS.clearData)
    return replyPromise
  }

  /**
    * Queries activity summary data, one summary record per day
    * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
    * @returns {Promise<Array<DailyActivitySummary>>} - array of activity records, each record is an object with year, month, day, steps, time, distance and calories
    */
  async getDailyActivitySummaryHistory (fromDate) {
    /**
       * @type {Array<DailyActivitySummary>}
       */
    const activityHistory = []

    const historyConfigDV = new DataView(new ArrayBuffer(6))
    historyConfigDV.setUint8(0, 0) // mode: 0=start, 2=continue, 0x99=delete

    if (fromDate) {
      const yearPost2k = fromDate.getFullYear() - 2000
      historyConfigDV.setUint8(3, this.#fromNumAsDecToNumAsHex(yearPost2k))

      const monthFrom1 = fromDate.getMonth() + 1
      historyConfigDV.setUint8(4, this.#fromNumAsDecToNumAsHex(monthFrom1))

      const day = fromDate.getDate()
      historyConfigDV.setUint8(5, this.#fromNumAsDecToNumAsHex(day))
    }

    let recordsBurstSent = 0

    return new Promise((resolve, reject) => {
      let timeoutId
      function startCommTimer () {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
          // time out no reply !
          delete this.#replyCallbacks[CMDS.getDailyActivitySummaryHistory]
          console.error('timeout for daily activity summary history')
          reject()
        }, COMM_TIMEOUT_MS)
      }

      // assign callback for this command
      this.#replyCallbacks[CMDS.getDailyActivitySummaryHistory] = (btvalues) => {
        // got a reply before timeout
        clearTimeout(timeoutId)

        if (DEBUG) console.log('Got activity history data')
        recordsBurstSent++
        let shouldFinish = false

        // records take either 26 or 27 bytes
        // additionally, an "end record" (record with just the end flag) takes only 2 bytes
        let recordSize = 27
        const packetLen = btvalues.byteLength
        if (packetLen >= 26) {
          if (packetLen % 26 === 0) {
            recordSize = 26
          } else if (packetLen % 27 === 0) {
            recordSize = 27
          } else {
            // cases where the packet size is not mulitple of 27 or 26 bytes
            // the packet may contain an extra "end record"
            if ((packetLen - 2) % 26 === 0) {
              recordSize = 26
            } else if ((packetLen - 2) % 27 === 0) {
              recordSize = 27
            } else {
              console.warn('Packet size is ' + packetLen + ', strange! Let\'s finish it here')
              // packet size is strange, let's finish acquisition
              shouldFinish = true
            }
          }
          // get the number of records in this packet
          const nRecords = Math.floor(packetLen / recordSize)
          if (DEBUG) console.log('records in this packet: ' + nRecords, 'record size: ' + recordSize)
          if (nRecords === 0) {
            console.warn('No records in this packet, but we got some data, maybe the packet is not well formed?')
            // no more data is expected to arrive
            shouldFinish = true
          } else {
            for (let i = 0; i < nRecords; i++) {
              // structure of an activity record:
              // byte 0 = command
              // byte 1 = record counter if 0xff = no more records (end record)
              // byte 2 = year (minus 2000)
              // byte 3 = month
              // byte 4 = day of month
              // bytes 5-8 = step count
              // bytes 9-12 = exercise minutes
              // bytes 13-16 = distance (x 100)
              // bytes 17-20 = calories (x 100)
              // bytes 21-(22) = goal (only byte 21 if count is 26, else bytes 21-22)
              // bytes 22-26 (23-26) = active minutes

              if (btvalues.getUint8(i * recordSize) === CMDS.getDailyActivitySummaryHistory) {
                const recordCount = btvalues.getUint8(1 + i * recordSize)

                const flag = 1 + (i + 1) * recordSize
                if (flag < packetLen && btvalues.getUint8(flag) === 0xff) {
                  if (DEBUG) console.log('Got end record, will finish acquisition')
                  // no more data
                  shouldFinish = true
                }

                let goal = 0
                if (recordSize === 26) {
                  goal = btvalues.getUint8(21 + i * recordSize, true)
                } else {
                  goal = btvalues.getUint8(21 + i * recordSize) + (btvalues.getUint8(22 + i * recordSize) << 8)
                }
                /**
               * @type {DailyActivitySummary}
               */
                const activityRecord = {
                  recordCount,
                  year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(2 + i * recordSize)),
                  month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3 + i * recordSize)),
                  day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4 + i * recordSize)),
                  steps: btvalues.getUint32(5 + i * recordSize, true), // 32 bits u integer, little endian
                  // swapping exercise minutes with active minutes after veryfing experimentally that active minutes
                  // are less than exercise minutes, which doesn't make sense
                  activeMinutes: btvalues.getUint32(9 + i * recordSize, true),
                  distance: btvalues.getUint32(13 + i * recordSize, true) / 100,
                  calories: btvalues.getUint32(17 + i * recordSize, true) / 100,
                  goal,
                  // swapped with activeMinutes
                  exerciseMinutes: btvalues.getUint32((recordSize - 4) + i * recordSize, true)
                }
                if (DEBUG) console.log('activity sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day, activityRecord)
                activityHistory.push(activityRecord)
              } else {
                console.error('Got unexpected command ' + btvalues.getUint8(i * recordSize) + ' in activity history')
                // shouldn't happen, maybe the recordsize is not well estimated?
              }
            }
            // if there is any record left
            if (DEBUG) console.log('Bytes left after records: ' + (packetLen - nRecords * recordSize))
            if (packetLen >= (nRecords * recordSize) + 2) {
              // maybe there's the end record?
              if (btvalues.getUint8(nRecords * recordSize) === CMDS.getDailyActivitySummaryHistory) {
                if (DEBUG) console.log('first byte is activity history command, checking for end record')
                if (btvalues.getUint8((nRecords * recordSize) + 1) === 0xff) {
                  if (DEBUG) console.log('Second byte is end record, no more activity records')
                  shouldFinish = true
                }
              }
            }
          }
        } else {
          if (DEBUG) console.log('Packet length is too short, got ' + packetLen + ', likely an end record?')
          // not enough data just signal that it's finished
          shouldFinish = true
        }

        if (shouldFinish) {
          if (DEBUG) console.log('No more activity records due, return data')
          // no need to get more records, return the ones we have so far

          resolve(activityHistory)
        } else {
          if (DEBUG) console.log('More activity records due, waiting for next one')
          startCommTimer()

          if (recordsBurstSent >= 50) {
            if (DEBUG) console.log('needing to send continue command')
            recordsBurstSent = 0
            // send a continue message
            historyConfigDV.setUint8(0, 2) // mode: 0=start, 2=continue, 0x99=delete
            this.#sendCommand(CMDS.getDailyActivitySummaryHistory, historyConfigDV).catch(reject)
          }
        }
      } // end of callback for this command

      startCommTimer()
      this.#sendCommand(CMDS.getDailyActivitySummaryHistory, historyConfigDV).catch(reject)
    })
  }

  /**
   * Deletes daily activity summary history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteDailyActivitySummaryHistory (fromDate) {
    const replyPromise = this.#waitForReply(CMDS.getDailyActivitySummaryHistory).then((btvalues) => {
      if (DEBUG) console.log('Daily activity summary history deleted', btvalues)
    })

    const historyConfigDV = new DataView(new ArrayBuffer(6))
    historyConfigDV.setUint8(0, 0x99) // mode: 0=start, 2=continue, 0x99=delete

    if (fromDate) {
      const yearPost2k = fromDate.getFullYear() - 2000
      historyConfigDV.setUint8(3, this.#fromNumAsDecToNumAsHex(yearPost2k))

      const monthFrom1 = fromDate.getMonth() + 1
      historyConfigDV.setUint8(4, this.#fromNumAsDecToNumAsHex(monthFrom1))

      const day = fromDate.getDate()
      historyConfigDV.setUint8(5, this.#fromNumAsDecToNumAsHex(day))
    }

    await this.#sendCommand(CMDS.getDailyActivitySummaryHistory, historyConfigDV)
    return replyPromise
  }

  /**
  * Queries sleep data
  * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
  * @returns {Promise<Array<Sleep>>} - array of activity records
  */
  async getSleepHistory (fromDate) {
    const sleepHistory = []

    const historyConfigDV = new DataView(new ArrayBuffer(9))
    historyConfigDV.setUint8(0, 0) // mode: 0=start, 2=continue, 0x99=delete

    if (fromDate) {
      const yearPost2k = fromDate.getFullYear() - 2000
      historyConfigDV.setUint8(3, this.#fromNumAsDecToNumAsHex(yearPost2k))

      const monthFrom1 = fromDate.getMonth() + 1
      historyConfigDV.setUint8(4, this.#fromNumAsDecToNumAsHex(monthFrom1))

      const day = fromDate.getDate()
      historyConfigDV.setUint8(5, this.#fromNumAsDecToNumAsHex(day))

      const hour = fromDate.getHours()
      historyConfigDV.setUint8(6, this.#fromNumAsDecToNumAsHex(hour))

      const minutes = fromDate.getMinutes()
      historyConfigDV.setUint8(7, this.#fromNumAsDecToNumAsHex(minutes))

      const seconds = fromDate.getSeconds()
      historyConfigDV.setUint8(8, this.#fromNumAsDecToNumAsHex(seconds))
    }

    let packetsSent = 0

    /**
     * Decode Binary - Coded Decimal (BCD) value
     * this function takes a byte where each nibble (4 bits) represents a decimal digit (0-9) and converts it
     * into a two-character string representing those two digits
     * @param {number} byte
     * @returns {number} - the decoded decimal value
     */
    const decodeBCD = (byte) => {
      const firstDigit = (byte & 0xf0) >>> 4
      const secondDigit = byte & 0x0f
      return firstDigit * 10 + secondDigit
    }

    return new Promise((resolve, reject) => {
      let timeoutId
      function startCommTimer () {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
          // time out no reply !
          delete this.#replyCallbacks[CMDS.getDailyActivitySummaryHistory]
          console.error('timeout for daily activity summary history')
          reject()
        }, COMM_TIMEOUT_MS)
      }

      // assign callback for this command
      this.#replyCallbacks[CMDS.getSleeepHistory] = (btvalues) => {
        // got a reply before timeout
        clearTimeout(timeoutId)

        if (DEBUG) console.log('Got activity history data')
        packetsSent++
        let shouldFinish = (btvalues.getUint8(btvalues.byteLength - 1) === 0xff) && (btvalues.getUint8(btvalues.byteLength - 2) === CMDS.getSleeepHistory)

        if (btvalues.byteLength === 130 || (shouldFinish && length === 132)) {
          // One minute sleep data

          if (btvalues.getUint8(0) === CMDS.getSleeepHistory) {
            const sleepLength = btvalues.getUint8(9)
            const sleepMinutes = []
            for (let i = 0; i < sleepLength; i++) {
              sleepMinutes.push(btvalues.getUint8(10 + i))
            }

            const sleepRecord = {
              year: 2000 + decodeBCD(btvalues.getUint8(3)),
              month: decodeBCD(btvalues.getUint8(4)),
              day: decodeBCD(btvalues.getUint8(5)),
              hour: decodeBCD(btvalues.getUint8(6)),
              minutes: decodeBCD(btvalues.getUint8(7)),
              seconds: decodeBCD(btvalues.getUint8(8)),
              sleepQualityDurationMins: 1,
              sleepQuality: sleepMinutes
            }

            sleepHistory.push(sleepRecord)
            if (DEBUG) console.log('Sleep record: ', sleepRecord)
          } else {
            console.error('Got unexpected command ' + btvalues.getUint8(0) + ' in sleep history')
            // maybe finish?
          }
        } else {
          const recordSize = 34
          const packetLen = btvalues.byteLength

          if (packetLen >= 34) {
            // get the number of records in this packet
            const nRecords = Math.floor(packetLen / recordSize)
            if (DEBUG) console.log('records in this packet: ' + nRecords, 'record size: ' + recordSize)
            if (nRecords === 0) {
              console.warn('No records in this packet, but we got some data, maybe the packet is not well formed?')
              // no more data is expected to arrive
              shouldFinish = true
            } else {
              for (let i = 0; i < nRecords; i++) {
                // structure of an activity record:
                // byte 0 =  command
                // byte 1 =
                // byte 2 =
                // byte 3 = year (minus 2000)
                // byte 4 = month
                // byte 5 = day of month
                // byte 6 = hour
                // byte 7 = minutes
                // byte 8 = seconds
                // byte 9 = sleep length in 5 minutes
                // bytes 10-34 = sleep details, each byte is a 5 minute period

                const sleepLength = btvalues.getUint8(9 + i * recordSize)
                const sleep5Minutes = []
                for (let j = 0; j < sleepLength; j++) {
                  sleep5Minutes.push(btvalues.getUint8(10 + j + i * recordSize))
                }

                const sleepRecord = {
                  year: 2000 + decodeBCD(btvalues.getUint8(3 + i * recordSize)),
                  month: decodeBCD(btvalues.getUint8(4 + i * recordSize)),
                  day: decodeBCD(btvalues.getUint8(5 + i * recordSize)),
                  hour: decodeBCD(btvalues.getUint8(6 + i * recordSize)),
                  minutes: decodeBCD(btvalues.getUint8(7 + i * recordSize)),
                  seconds: decodeBCD(btvalues.getUint8(8 + i * recordSize)),
                  sleepQualityDurationMins: 5,
                  sleepQuality: sleep5Minutes
                }

                sleepHistory.push(sleepRecord)
                if (DEBUG) console.log('Sleep record: ', sleepRecord)
              }
            }
          } else {
            if (DEBUG) console.log('Packet length is too short, got ' + packetLen + ', likely an end record?')
            // not enough data just signal that it's finished
            shouldFinish = true
          }
        }

        if (shouldFinish) {
          if (DEBUG) console.log('No more sleep records due, return data')
          // no need to get more records, return the ones we have so far
          resolve(sleepHistory)
        } else {
          if (DEBUG) console.log('More sleep records due, waiting for next one')
          startCommTimer()

          if (packetsSent >= 50) {
            if (DEBUG) console.log('needing to send continue command')
            packetsSent = 0
            // send a continue message
            historyConfigDV.setUint8(0, 2) // mode: 0=start, 2=continue, 0x99=delete
            this.#sendCommand(CMDS.getSleeepHistory, historyConfigDV).catch(reject)
          }
        }
      }
      startCommTimer()

      this.#sendCommand(CMDS.getSleeepHistory, historyConfigDV).catch(reject)
    })
  }

  /**
   * Deletes sleep history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteSleepHistory (fromDate) {
    const replyPromise = this.#waitForReply(CMDS.getSleeepHistory).then((btvalues) => {
      if (DEBUG) console.log('Sleep history deleted', btvalues)
    })

    const historyConfigDV = new DataView(new ArrayBuffer(9))
    historyConfigDV.setUint8(0, 0x99) // mode: 0=start, 2=continue, 0x99=delete

    if (fromDate) {
      const yearPost2k = fromDate.getFullYear() - 2000
      historyConfigDV.setUint8(3, this.#fromNumAsDecToNumAsHex(yearPost2k))

      const monthFrom1 = fromDate.getMonth() + 1
      historyConfigDV.setUint8(4, this.#fromNumAsDecToNumAsHex(monthFrom1))

      const day = fromDate.getDate()
      historyConfigDV.setUint8(5, this.#fromNumAsDecToNumAsHex(day))

      const hour = fromDate.getHours()
      historyConfigDV.setUint8(6, this.#fromNumAsDecToNumAsHex(hour))

      const minutes = fromDate.getMinutes()
      historyConfigDV.setUint8(7, this.#fromNumAsDecToNumAsHex(minutes))

      const seconds = fromDate.getSeconds()
      historyConfigDV.setUint8(8, this.#fromNumAsDecToNumAsHex(seconds))
    }

    await this.#sendCommand(CMDS.getSleeepHistory, historyConfigDV)
    return replyPromise
  }

  /**
   * As all history commands are similar, this function is used to get history data
   * @param {number} command - command to get history for, as a number (should fit within 1 byte)
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @param {number} recordSize - size of the record in bytes
   * @param {Function} parseOneRecord - function to parse one record, should take a DataView as argument and return an object with the parsed data
   * @returns {Promise<Array>} - array of records, each record is an object with the parsed data
   */
  async #getHistory (command, fromDate, recordSize, parseOneRecord) {
    const history = []

    const historyConfigDV = new DataView(new ArrayBuffer(9))
    /**
     * mode:
     * 99: Delete step details,
     * 0: Read the most recent step details.
     * 2: Continue reading the next segment of data at the position last read
     */
    const mode = 0
    historyConfigDV.setUint8(0, mode)

    if (fromDate) {
      const yearPost2k = fromDate.getFullYear() - 2000
      historyConfigDV.setUint8(3, this.#fromNumAsDecToNumAsHex(yearPost2k))

      const monthFrom1 = fromDate.getMonth() + 1
      historyConfigDV.setUint8(4, this.#fromNumAsDecToNumAsHex(monthFrom1))

      const day = fromDate.getDate()
      historyConfigDV.setUint8(5, this.#fromNumAsDecToNumAsHex(day))

      const hour = fromDate.getHours()
      historyConfigDV.setUint8(6, this.#fromNumAsDecToNumAsHex(hour))

      const minutes = fromDate.getMinutes()
      historyConfigDV.setUint8(7, this.#fromNumAsDecToNumAsHex(minutes))

      const seconds = fromDate.getSeconds()
      historyConfigDV.setUint8(8, this.#fromNumAsDecToNumAsHex(seconds))
    }

    let recordsBurstSent = 0

    return new Promise((resolve, reject) => {
      let timeoutId
      function startCommTimer () {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
          // time out no reply !
          delete this.#replyCallbacks[CMDS.getDailyActivitySummaryHistory]
          console.error('timeout for daily activity summary history')
          reject()
        }, COMM_TIMEOUT_MS)
      }

      this.#replyCallbacks[command] = (btvalues) => {
        // got a reply before timeout
        clearTimeout(timeoutId)

        if (DEBUG) console.log('Got history data', btvalues)
        recordsBurstSent++
        let shouldFinish = false

        const packetLen = btvalues.byteLength
        if (packetLen && (btvalues.getUint8(0) === command)) {
          if (btvalues.getUint8(packetLen - 1) === 0xff) {
            // end of data is signalled by 0xff byte
            shouldFinish = true
          }
          if (packetLen >= recordSize) {
            // get the number of records in this packet
            const nRecords = Math.floor(packetLen / recordSize)
            if (DEBUG) console.log('records in this packet: ' + nRecords)
            if (nRecords === 0) {
              console.warn('No records in this packet, finish acquisition')
              // no more data is expected to arrive
              shouldFinish = true
            } else {
              for (let i = 0; i < nRecords; i++) {
                if (btvalues.getUint8(i * recordSize) === command) {
                  const recordDV = new DataView(btvalues.buffer, i * recordSize, recordSize)
                  const parsedRecord = parseOneRecord(recordDV)

                  history.push(parsedRecord)
                } else {
                  console.error('Got unexpected command ' + btvalues.getUint8(i * recordSize) + ' when querying for command ' + command)
                  // shouldn't happen, maybe the recordsize is not well estimated?
                  shouldFinish = true
                }
              }
            }
          } else {
            if (DEBUG) console.log('Packet length is too short, got ' + packetLen + ', likely an end record?')
            // not enough data just signal that it's finished
            shouldFinish = true
          }
        } else {
          console.error('Got unexpected command ' + btvalues.getUint8(0) + ' when querying for command ' + command)
          shouldFinish = true
        }

        if (shouldFinish) {
          if (DEBUG) console.log('No more records, return data')
          // no need to get more records, return the ones we have so far
          resolve(history)
        } else {
          if (DEBUG) console.log('More records due, waiting next one')
          startCommTimer()

          if (recordsBurstSent >= 50) {
            if (DEBUG) console.log('needing to send continue command')
            recordsBurstSent = 0
            // send a continue message
            historyConfigDV.setUint8(0, 2) // mode: 2=continue
            this.#sendCommand(command, historyConfigDV).catch(reject)
          }
        }
      }
      startCommTimer()
      this.#sendCommand(command, historyConfigDV).catch(reject)
    })
  }

  /**
   * Generic function to delete history data from the watch
   * @param {number} command - command to delete history for, as a number (should fit within 1 byte)
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async #deleteHistory (command, fromDate) {
    const replyPromise = this.#waitForReply(command).then((btvalues) => {
      if (DEBUG) console.log('Detailed activity history deleted', btvalues)
    })

    const historyConfigDV = new DataView(new ArrayBuffer(9))
    historyConfigDV.setUint8(0, 0x99) // mode: 0=start, 2=continue, 0x99=delete

    if (fromDate) {
      const yearPost2k = fromDate.getFullYear() - 2000
      historyConfigDV.setUint8(3, this.#fromNumAsDecToNumAsHex(yearPost2k))

      const monthFrom1 = fromDate.getMonth() + 1
      historyConfigDV.setUint8(4, this.#fromNumAsDecToNumAsHex(monthFrom1))

      const day = fromDate.getDate()
      historyConfigDV.setUint8(5, this.#fromNumAsDecToNumAsHex(day))

      const hour = fromDate.getHours()
      historyConfigDV.setUint8(6, this.#fromNumAsDecToNumAsHex(hour))

      const minutes = fromDate.getMinutes()
      historyConfigDV.setUint8(7, this.#fromNumAsDecToNumAsHex(minutes))

      const seconds = fromDate.getSeconds()
      historyConfigDV.setUint8(8, this.#fromNumAsDecToNumAsHex(seconds))
    }

    await this.#sendCommand(command, historyConfigDV)
    return replyPromise
  }

  /**
   * Queries detailed activity data
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<DetailedActivity>} - array of activity records
   */
  async getDetailedActivityHistory (fromDate) {
    return this.#getHistory(
      CMDS.getDetailedActivityHistory,
      fromDate,
      25, // record size is 25 bytes
      (btvalues) => {
        // structure of an activity record:
        // byte 0 = command
        // byte 1 = record counter if 0xff = no more records (end record)
        // byte 2 = always 0 ?
        // byte 3 = year (minus 2000)
        // byte 4 = month
        // byte 5 = day of month
        // byte 6 = hour
        // byte 7 = minutes
        // byte 8 = seconds
        // bytes 9-10 = step count
        // bytes 11-12 = calories (x 100)
        // bytes 13-14 = distance (x 100)
        // bytes 15-24 = detail step, one uitn8 each, 10 bytes total

        const detailSteps = []
        for (let j = 0; j < 10; j++) {
          detailSteps.push(btvalues.getUint8(15 + j))
        }
        /**
       * @type {DetailedActivity}
       */
        const activityRecord = {
          recordCount: btvalues.getUint8(1),
          year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
          month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
          day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
          hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
          minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(7)),
          seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(8)),
          steps: btvalues.getUint16(9, true), // 16 bits u integer, little endian
          calories: btvalues.getUint16(11, true) / 100,
          distance: btvalues.getUint16(13, true) / 100,
          detailSteps
        }
        if (DEBUG) console.log('activity sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day + 'T' + activityRecord.hour + ':' + activityRecord.minutes + ':' + activityRecord.seconds, activityRecord)
        return activityRecord
      })
  }

  /**
   * Deletes detailed activity history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteDetailedActivityHistory (fromDate) {
    return this.#deleteHistory(CMDS.getDetailedActivityHistory, fromDate)
  }

  /**
   * Queries detailed heart rate history.
   * WARNING: this methods does not seem to work properly with the latest firmware version.
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<DetailedHR>>} - array of heart rate records
   */
  async getDetailedHRHistory (fromDate) {
    return this.#getHistory(
      CMDS.getDetailedHRHistory,
      fromDate,
      24, // record size is 24 bytes
      (btvalues) => {
        // structure of a HR record:
        // byte 0 = command
        // byte 1 = record counter, it is reset after 255
        // byte 2 = ?
        // byte 3 = year (minus 2000)
        // byte 4 = month
        // byte 5 = day of month
        // byte 6 = hour
        // byte 7 = minutes
        // byte 8 = seconds
        // bytes 9-23 = heart rate data, one uint8 each, 15 bytes total

        const hrs = []
        for (let j = 0; j < 15; j++) {
          hrs.push(btvalues.getUint8(9 + j))
        }
        /**
               * @type {DetailedHR}
               */
        const activityRecord = {
          recordCount: btvalues.getUint8(1),
          year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
          month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
          day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
          hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
          minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(7)),
          seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(8)),
          hrs
        }
        if (DEBUG) console.log('hrs sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day + 'T' + activityRecord.hour + ':' + activityRecord.minutes + ':' + activityRecord.seconds, activityRecord)
      })
  }

  /**
   * Deletes detailed HR history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteDetailedHRHistory (fromDate) {
    return this.#deleteHistory(CMDS.getDetailedHRHistory, fromDate)
  }

  /**
   * Gets the heart rate history
   * This is a simplified version of getDetailedHRHistory, which returns only the heart rate per sample
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<HR>>} - array of heart rate records
   */
  async getHRHistory (fromDate) {
    return this.#getHistory(
      CMDS.getHRHistory,
      fromDate,
      10, // record size is 10 bytes
      (btvalues) => {
        // structure of a HR record:
        // byte 0 = command
        // byte 1 = record counter if 0xff = no more records (end record)
        // byte 2 = ?
        // byte 3 = year (minus 2000)
        // byte 4 = month
        // byte 5 = day of month
        // byte 6 = hour
        // byte 7 = minutes
        // byte 8 = seconds
        // bytes 9 = heart rate

        /**
               * @type {HR}
               */
        const activityRecord = {
          recordCount: btvalues.getUint8(1),
          year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
          month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
          day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
          hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
          minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(7)),
          seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(8)),
          hr: btvalues.getUint8(9)
        }
        if (DEBUG) console.log('hrs sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day + 'T' + activityRecord.hour + ':' + activityRecord.minutes + ':' + activityRecord.seconds, activityRecord)
        return activityRecord
      })
  }

  /**
   * Deletes HR history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteHRHistory (fromDate) {
    return this.#deleteHistory(CMDS.getHRHistory, fromDate)
  }

  /**
   * Gets the HRV history
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<HRV>>} - array of HRV records
   */
  async getHRVHistory (fromDate) {
    return this.#getHistory(
      CMDS.getHRVHistory,
      fromDate,
      15, // record size is 15 bytes
      (btvalues) => {
        // structure of a HRV record:
        // byte 0 = command
        // byte 1 = record counter
        // byte 2 = ?
        // byte 3 = year (minus 2000)
        // byte 4 = month
        // byte 5 = day of month
        // byte 6 = hour
        // byte 7 = minutes
        // byte 8 = seconds
        // bytes 9 = HRV value
        // byte 10 = vascular age
        // byte 11 = heart rate
        // byte 12 = stress level
        // byte 13 = high BP
        // byte 14 = low BP

        /**
       * @type {HRV}
       */
        const activityRecord = {
          recordCount: btvalues.getUint8(1),
          year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
          month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
          day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
          hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
          minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(7)),
          seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(8)),
          hrv: btvalues.getUint8(9),
          vascularAge: btvalues.getUint8(10),
          hr: btvalues.getUint8(11),
          stressLevel: btvalues.getUint8(12),
          highBP: btvalues.getUint8(13),
          lowBP: btvalues.getUint8(14)
        }
        if (DEBUG) console.log('hrv sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day + 'T' + activityRecord.hour + ':' + activityRecord.minutes + ':' + activityRecord.seconds, activityRecord)
        return activityRecord
      })
  }

  /**
   * Deletes HRV history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteHRVHistory (fromDate) {
    return this.#deleteHistory(CMDS.getHRVHistory, fromDate)
  }

  /**
   * Gets the temperature history
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<Temperature>>} - array of temperature records
   */
  async getTemperatureHistory (fromDate) {
    return this.#getHistory(
      CMDS.getTemperatureHistory,
      fromDate,
      11,
      (btvalues) => {
        // structure of a temperature record:
        // byte 0 = command
        // byte 1 = record counter if 0xff = no more records (end record)
        // byte 2 = ?
        // byte 3 = year (minus 2000)
        // byte 4 = month
        // byte 5 = day of month
        // byte 6 = hour
        // byte 7 = minutes
        // byte 8 = seconds
        // bytes 9-10 = temperature in Celsius * 10, little endian

        /**
       * @type {Temperature}
       */
        const activityRecord = {
          recordCount: btvalues.getUint8(1),
          year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
          month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
          day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
          hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
          minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(7)),
          seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(8)),
          temperature: btvalues.getInt16(9, true) / 10
        }
        if (DEBUG) console.log('temperature sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day + 'T' + activityRecord.hour + ':' + activityRecord.minutes + ':' + activityRecord.seconds, activityRecord)
        return activityRecord
      })
  }

  /**
   * Deletes temperature history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteTemperatureHistory (fromDate) {
    return this.#deleteHistory(CMDS.getTemperatureHistory, fromDate)
  }

  /**
   * Gets the SPO2 history
   * @param {Date} fromDate - date from which to start querying, if not provided, queries all data
   * @returns {Promise<Array<SPO2>>} - array of SPO2 records
   */
  async getSPO2History (fromDate) {
    return this.#getHistory(
      CMDS.getSPO2History,
      fromDate,
      10,
      (btvalues) => {
        // structure of a SPO2 record:
        // byte 0 = command
        // byte 1 = record counter if 0xff = no more records (end record)
        // byte 2 = ?
        // byte 3 = year (minus 2000)
        // byte 4 = month
        // byte 5 = day of month
        // byte 6 = hour
        // byte 7 = minutes
        // byte 8 = seconds
        // bytes 9 = SPO2 value

        /**
       * @type {SPO2}
       */
        const activityRecord = {
          recordCount: btvalues.getUint8(1),
          year: 2000 + this.#fromNumAsHexToNumAsDec(btvalues.getUint8(3)),
          month: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(4)),
          day: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(5)),
          hour: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(6)),
          minutes: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(7)),
          seconds: this.#fromNumAsHexToNumAsDec(btvalues.getUint8(8)),
          spo2: btvalues.getUint8(9)
        }
        if (DEBUG) console.log('spo2 sample ' + activityRecord.year + '-' + activityRecord.month + '-' + activityRecord.day + 'T' + activityRecord.hour + ':' + activityRecord.minutes + ':' + activityRecord.seconds, activityRecord)
        return activityRecord
      })
  }

  /**
   * Deletes SPO2 history from the watch
   * @param {Date} fromDate - date from which to start deleting, if not provided, deletes all data
   * @returns {Promise<void>} - resolves when the command is sent and reply is received
   */
  async deleteSPO2History (fromDate) {
    return this.#deleteHistory(CMDS.getSPO2History, fromDate)
  }
}
