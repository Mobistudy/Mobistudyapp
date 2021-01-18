'use strict'

// this module emulates a Mibadn3 fitness tracker

const SEARCH_FAIL = false
const CONNECT_FAIL = false
const STOREDDATA_FAIL = false
const NO_DATA_FAIL = false

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
      setTimeout(() => {
        resolve([
          {
            id: '00:11:22:33:FF:EE',
            rssi: 200
          },
          {
            id: '01:22:32:43:1D:09',
            rssi: 100
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
    if (!device) throw new Error('Valid device must be passed in connect()')
    if (CONNECT_FAIL) return Promise.reject()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        device.key = 'ababababababa'
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
    return Promise.resolve(true)
  },
  /**
   * Authenticates a Miband3
   * @param {boolean} full if true requries a full authentication
   */
  async authenticate (full) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
  },

  /**
   * Configures a Miband3
   * @param {Object} user a user configuration like { height: 180, weight: 80, dob: '1974-11-21', sex: 'male' }
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
      id: '00:11:22:33:FF:EE',
      serialNumber: '180a-555-333',
      battery: {
        chargeLevel: 80,
        currentlyCharging: 0,
        lastChargedDate: new Date(),
        numOfCharges: 4,
        amountCharged: 50
      },
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
    if (STOREDDATA_FAIL) return Promise.reject()
    return new Promise((resolve, reject) => {
      let amountPackages = 0
      let interval = setInterval(() => {
        if (NO_DATA_FAIL) {
          clearInterval(interval)
          resolve()
          return
        }
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
