import miband3Driver from './Miband3Driver'

export default {
  /**
   * Finds all Miband3 around and returns an array of device objects, each containing an ID (MAC address) and RSSI
   * If a timeout occurs or BLE is not activated, the promise is rejected
   * @param {Number} timeout max number of milliseconds to search for a Miband3
   */
  async search (searchTime) {
    return new Promise((resolve, reject) => {
      const devices = []
      window.ble.startScan([], (device) => {
        if (device.name === 'Mi Band 3' && !deviceExists(devices, device)) {
          devices.push(device)
        }
      }, reject)
      setTimeout(window.ble.stopScan, searchTime, (success) => {
        resolve(devices)
      }, reject)
    })
    function deviceExists (devices, device) {
      return devices.find((d) => d.id === device.id)
    }
  },

  async searchForId (deviceId, searchTime) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        window.ble.stopScan()
        reject()
      }, searchTime)

      window.ble.startScan([], (deviceFound) => {
        if (deviceFound.id === deviceId) {
          window.ble.stopScan()
          clearTimeout(timeoutId)
          resolve(deviceFound)
        }
      }, (failureResponse) => {
        console.log('Start scan failed.', failureResponse)
        clearTimeout(timeoutId)
        reject()
      })
    })
  },

  /**
   * Connects to a MiBand3
   * @param {Object} device a device object as returned by search() + can contain an authentication key
   * @param {Function} disconnectCallback called if the device is disconnected
   */
  async connect (device) {
    // generate the key if not inside device
    if (!device.key) {
      const key = miband3Driver.generateKey()
      device.key = key
    }
    // init
    miband3Driver.init(device.id, device.key)
    // connect
    return miband3Driver.connect()
  },

  /**
   * Disconnects from the tracker
   */
  async disconnect () {
    return miband3Driver.disconnect()
  },

  /**
   * Returns true if connected to a Miband3
   */
  async isConnected () {
    return miband3Driver.isConnected()
  },

  /**
   * Authenticates the phone with the Miband3
   * @param {boolean} full if true the full authentication is performed
   */
  async authenticate (full) {
    return miband3Driver.authenticate(full)
    // return miband3Driver.stopAllNotifications()
  },

  /**
   * Configures a Miband3
   * @param {Object} user a user configuration like { height: 180, weight: 80, dob: '1974-11-21', sex: 'male', language: 'en' }
   * @param {number} hrFreq how often HR is measured in minutes
   */
  async configure (user, hrFreq) {
    // configures:
    // user, language = EN, dateFormat = 'DD/MM/YYYY, hrFreq, wearLocation=LEFT
    // displayOnlift = not [22:00 - 8:00], nightMode = [22:00 - 8:00],
    // screens = [home, HR, status], HRsleep support = YES, timeFormat = 24G

    // Default settings
    await miband3Driver.setLanguage('EN_en')
    console.log('-language set')

    await miband3Driver.setDateFormat(true)
    console.log('-date format set')

    await miband3Driver.setDistanceType(false)
    console.log('-distance type set')

    await miband3Driver.setTimeFormat('24h')
    console.log('-time format set')

    // Synch phone time with miband watch time
    await miband3Driver.setCurrentTimeStatus()
    console.log('-current time set')

    // Setting night mode between 22:00 and 8:00
    const dateStartHour = new Date()
    dateStartHour.setHours(20)
    dateStartHour.setMinutes(0)
    const dateEndHour = new Date()
    dateEndHour.setHours(8)
    dateEndHour.setMinutes(0)
    await miband3Driver.setNightMode(dateStartHour, dateEndHour)
    console.log('-night mode set')

    await miband3Driver.setHRSleepSupport(true)
    console.log('-hr sleep support set')

    // setting screen pages
    const screens = ['heartRate', 'status']
    await miband3Driver.setupScreens(screens)
    console.log('-scren setup set')

    // User supplied settings
    await miband3Driver.setHeartRateMeasurementInterval(hrFreq)
    console.log('-hr measurements interval set')

    // make sure thee DOB is a date
    const DOB = new Date(user.dob)
    await miband3Driver.setUser(
      user.height,
      user.weight,
      DOB.getFullYear(),
      DOB.getMonth() + 1,
      DOB.getDate(),
      user.sex === 'female' // false for male
    )
    return miband3Driver.stopAllNotifications() // TODO: Seems to work here, but not in authenticate(), why?
  },

  /**
   * Retrieves information about the device
   */
  async getDeviceInfo () {
    const time = await miband3Driver.getTimeStatus()
    const battery = await miband3Driver.getBatteryStatus()
    const hardware = await miband3Driver.getHardwareInfo()
    const software = await miband3Driver.getSoftwareInfo()
    const serialNumber = await miband3Driver.getSerialNumber()
    // let serialNr = await miband3.getSerialNumber() needs to be implemented
    return Promise.resolve({
      id: miband3Driver.deviceId,
      serialNumber,
      battery, // Object with battery status data
      hwVersion: hardware,
      swVersion: software,
      clock: time
    })
  },

  /**
   * Retrieves the data stored on the tracker
   * @param {Date} startDate a JS Date object from which we want to retrieve the data
   * @param {Function} cbk called at every sample of data retrieved
   */
  async getStoredData (startDate, cbk) {
    function interfaceCallback (data) { // Filters the noisy heart rate values, eg 0 and 255.
      if (data.hr === 0 || data.hr === 255) {
        data.hr = Number.NaN
      }
      if (data.date.getTime() > startDate.getTime()) cbk(data) // Filter our the dates that are previous to our startDate
    }
    return miband3Driver.fetchStoredData(startDate, interfaceCallback)
  },

  /**
   * Starts live streaming of heart rate
   * @param {function} callback retrieves the heart rate, as a single number
   */
  async startLiveHR (callback) {
    return miband3Driver.startHRContinuousMonitoring(callback)
  },

  /**
   * Stops streaming heart rate
   */
  async stopLiveHR () {
    return miband3Driver.stopHRMonitoring()
  }
}
