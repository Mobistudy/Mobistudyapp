'use strict'

export default {
  /**
   * Finds the first Miband3 around and returns an object containing the ID (MAC address)
   * If a timeout ocurrs, the promise is rejected
   * @param {Number} timeout max number of milliseconds to search for a Miband3
   */
  async search (searchTime, amount, cbk, cbkFailureSearch) {
    // TODO
  },
  /**
   * Connects to a MiBand3
   * @param {Object} device a device object as returned by search() + can contain an authentication key
   * @param {Function} disconnectCallback called if the device is disconnected
   * @param {Function} authRequiredCallback called when connected but auth has not been completed yet
   */
  async connect (device, disconnectCallback, authRequiredCallback) {
    // TODO
  },

  /**
   * Disconnects from the tracker
   */
  async disconnect (device) {
    // TODO
  },

  /**
   * Returns true if connected to a Miband3
   */
  async isConnected (device) {
    // TODO
  },

  /**
   * Authenticates the phone with the Miband3
   * @param {*} required if required the full authentication is performed
   */
  async authenticate (required) {
    // TODO
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
  },

  /**
   * Retrieves the data stored on the tracker
   * @param {Date} startDate a JS Date object from which we want to retrieve the data
   * @param {Function} cbk called at every sample of data retrieved
   */
  async getStoredData (startDate, cbk) {
    // TODO
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
