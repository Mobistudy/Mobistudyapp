const SEARCH_FAIL = false
const CONNECT_FAIL = false

export default class BLEDevice {
    device = undefined
    deviceId = undefined
    disconnectCallback = undefined

    constructor (device) {
      this.device = device
      this.deviceId = this.device.id
    }

    static async scan (deviceName, searchTime) {
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
    }

    static async scanForId (deviceName, searchTime) {
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
    }

    async connect () {
      if (!this.device) throw new Error('Interface has no device object initialized.')
      if (CONNECT_FAIL) return Promise.reject()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    }
    disconnect () {
      return Promise.resolve(true)
    }
    async isConnected () {
      return Promise.resolve(true)
    }
}
