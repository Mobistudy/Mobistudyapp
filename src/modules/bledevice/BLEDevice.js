export default class BLEDevice {
    device = undefined
    deviceId = undefined
    disconnectCallback = undefined

    constructor (device) {
      this.device = device
      this.deviceId = this.device.id
    }

    /**
     * Requests permission to access bluetooth
     * the promise is returned either immediately if permissions are given
     * and there are BLE devices around (visible in a scan)
     * or because of a timeout or no devices around
     * in other words, it's impossible to say if permission was really given or not
     */
    static async requestPermission () {
      return new Promise((resolve, reject) => {
        // we need to get permissions from iOS or Android
        // there is no explicit call for that, so we start a scan and wait for the user to confirm
        // the scan does not produce any callback until it finds a device
        // given that it is possible that no device is found or that permission is denied,
        // we use a timeout to stop searching after a short time
        let timer = setTimeout(() => {
          // after the timeout we resolve because it's impossible to say if the scan failed because
          // of no device found or because  of denied permission
          window.ble.stopScan(resolve, reject)
        }, 5000)

        window.ble.startScan([], function () {
          // we got a result, scanning can stop
          window.ble.stopScan()
          // no need of the timeout anuy longer
          clearTimeout(timer)
          resolve()
        }, reject)
      })
    }

    static async scan (deviceName, searchTime) {
      return new Promise((resolve, reject) => {
        const devices = []
        window.ble.startScan([], (deviceFound) => {
          if (deviceFound.name === deviceName && !deviceExists(devices, deviceFound)) devices.push(deviceFound)
        }, (failureResponse) => {
          console.log('Start scan failed.', failureResponse)
          reject()
        })
        setTimeout(() => {
          window.ble.stopScan((success) => {
            resolve(devices)
          }, (failureResponse) => {
            console.log('Stop scan failed.', failureResponse)
            resolve()
          })
        }, searchTime)
      })
      function deviceExists (devices, device) {
        return devices.find((d) => d.id === device.id)
      }
    }

    static async scanForId (deviceId, searchTime) {
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
    }

    async connect () {
      return new Promise((resolve, reject) => {
        this.disconnectCallback = reject
        window.ble.connect(
          this.deviceId,
          success => {
            resolve(success)
          },
          failureResponse => {
            console.error('Connect failed.', failureResponse)
            if (this.disconnectCallback) this.disconnectCallback(failureResponse)
          }
        )
      })
    }
    async disconnect () {
      if (this.deviceId === null || this.deviceId === undefined) {
        return Promise.resolve()
      } else {
        return new Promise((resolve, reject) => {
          window.ble.disconnect(
            this.deviceId,
            success => {
              console.log('Disconnect succeded.')
              resolve(success)
            },
            failureResponse => {
              console.log('Disconnect failed.', failureResponse)
              reject(failureResponse)
            }
          )
        })
      }
    }
    async isConnected () {
      if (!this.deviceId) return Promise.resolve(false)
      return new Promise((resolve, reject) => {
        window.ble.isConnected(
          this.deviceId,
          success => {
            console.log('IsConnected succeeded.')
            resolve(true)
          },
          failure => {
            console.log('IsConnected failed.', failure)
            resolve(false)
          }
        )
      })
    }
    async writeWithoutResponse (data) {
      return new Promise((resolve, reject) => {
        window.ble.writeWithoutResponse(
          this.deviceId,
          this.SERVICE_UUID,
          this.WRITE_CHAR_UUID,
          data.buffer,
          successResponse => {
            console.log('Write without response succeeded.')
            resolve(successResponse)
          },
          failureResponse => {
            console.log('Write without response failed.')
            reject(failureResponse)
          }
        )
      })
    }
}
