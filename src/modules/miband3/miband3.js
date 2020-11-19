'use strict'
import miband3Driver from './Miband3Driver'

export default {
  /**
   * Finds all Miband3 around and returns an array of device objects, each containing an ID (MAC address) and RSSI
   * If a timeout occurs or BLE is not activated, the promise is rejected
   * @param {Number} timeout max number of milliseconds to search for a Miband3
   */
  async search (searchTime) {
    return new Promise((resolve, reject) => {
      let devices = []
      window.ble.startScan([], (device) => {
        if (device.name === 'Mi Band 3') {
          devices.push(device)
        }
      }, reject)
      setTimeout(window.ble.stopScan, searchTime, (success) => {
        resolve(devices)
      }, reject)
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
      let key = miband3Driver.generateKey()
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
  },

  /**
   * Configures a Miband3
   * @param {Object} user a user configuration like { height: 180, weight: 80, dobYear: 1978, dobMonth: 12, dob: 3, sex: 'male' }
   * @param {number} hrFreq how often HR is measured in minutes
   */
  async configure (user, hrFreq) {
    // configures:
    // user, language = EN, dateFormat = 'DD/MM/YYYY, hrFreq, wearLocation=LEFT
    // displayOnlift = not [22:00 - 8:00], nightMode = [22:00 - 8:00],
    // screens = [home, HR, status], HRsleep support = YES, timeFormat = 24G
    // after this notifications are unregistered from the config channels
    // TODO
  },

  /**
   * Retrieves information about the device
   */
  async getDeviceInfo () {
    // TODO
    // see example:
    // {
    //   id: 'AAAA',
    //   battery: 80,
    //   charging: false,
    //   swVersion: '11',
    //   hwVersion: '3',
    //   serialNumebr: 'asdasd'
    // }
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
      cbk(data)
    }
    return miband3Driver.fetchStoredData(startDate, interfaceCallback)
  },

  /**
   * Starts live streaming of heart rate
   * @param {function} callback retrieves the heart rate, as a single number
   */
  async startLiveHR (callback) {
    // TODO
  },

  /**
   * Stops streaming heart rate
   */
  async stopLiveHR () {
    // TODO
  }
}
