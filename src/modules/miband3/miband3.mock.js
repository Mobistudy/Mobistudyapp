'use strict'

// this module emulates a Mibadn3 fitness tracker

const SEARCH_FAIL = false

export default {
  liveHRTimer: undefined,
  /**
   * Finds Miband3s
   * If a timeout ocurrs, the promise is rejected
   * @param {Number} timeout max number of milliseconds to search for a Miband3
   */
  async search (searchTime) {
    if (SEARCH_FAIL) {
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      setInterval(() => {
        resolve([
          {
            id: 'AAAAAAA' + this.randomNum(10), // 1/100 chance that the id will be the same, oh well.
            rssi: -(this.randomNum(10) * this.randomNum(10))
          }
        ])
      }, searchTime)
    })
  },
  /**
   * Connects to a MiBand3
   * @param {Object} device a device object as returned by search() + can contain an authentication key
   * @param {Function} disconnectCallback called if the device is disconnected
   */
  async connect (device, disconnectCallback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        device.connected = true
        resolve(true)
      }, 1000)
    })
  },
  /**
   * Disconnects from the tracker
   */
  async disconnect () {
    return Promise.resolve(true)
  },
  /**
   * Returns true if connected to a Miband3
   */
  async isConnected () {
    if (Math.random() > 0.2) {
      return Promise.resolve(true)
    } else { return Promise.resolve(false) }
  },
  /**
   * Authenticates a Miband3
   * @param {boolean} required if true requries a full authentication
   */
  async authenticate (required) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  },

  /**
   * Configures a Miband3
   * @param {Object} user a user configuration like { height: 180, weight: 80, dobYear: 1978, dobMonth: 12, dob: 3, sex: 'male' }
   * @param {number} hrFreq how often HR is measured in minutes
   */
  async configure (user, hrFreq) {
    return Promise.resolve(true)
  },
  /**
   * Retrieves information about the device
   */
  async getDeviceInfo () {
    return Promise.resolve({
      id: 'AAAA',
      battery: 80,
      charging: false,
      swVersion: '11',
      hwVersion: '3',
      serialNumebr: 'asdasd'
    })
  },
  /**
   * Retrieves the data stored on the tracker
   * @param {Date} startDate a JS Date object from which we want to retrieve the data
   * @param {Function} cbk called at every sample of data retrieved
   */
  async getStoredData (startDate, cbk) {
    // return Promise.reject()
    return new Promise((resolve, reject) => {
      let amountPackages = 0
      let interval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
          ++amountPackages
          cbk({
            date: new Date(startDate.getTime() + amountPackages * 60000),
            activityType: this.randomNum(5),
            intensity: this.randomNum(10),
            steps: this.randomNum(20),
            hr: this.randomNum(100),
            buffer: new ArrayBuffer(8)
          })
        }
        if (amountPackages === 1440) {
          clearInterval(interval)
          resolve()
        }
      }, 10)
    })
  },
  randomNum (max) {
    return 1 + Math.floor(Math.random() * Math.floor(max))
  },
  /**
   * Starts live streaming of heart rate
   * @param {function} callback retrieves the heart rate, as a single number
   */
  async startLiveHR (callback) {
    this.liveHRTimer = setInterval(() => {
      for (let i = 0; i < 10; i++) {
        callback(Error.Error, (60 + Math.floor(Math.random() * 15)))
      }
    }, 1000)
    return Promise.resolve(true)
  },
  /**
   * Stops streaming heart rate
   */
  async stopLiveHR () {
    clearInterval(this.liveHRTimer)
    return Promise.resolve(true)
  }
}
