/**
 * Base class for BLE devices.
 * Uses the cordova BLE plugin https://github.com/don/cordova-plugin-ble-central
 */
export default class BLEDevice {
  // eslint-disable-next-line space-before-function-paren
  constructor(nativeDevice) {
    this.device = nativeDevice
    this.disconnectCallback = null
  }

  /**
   * Tells if BLE is available
   * @returns {Promise{boolean}} returns a promise with true if available
   */
  static async isBLEAvailable () {
    if (!window.ble) return false
    return new Promise((resolve, reject) => {
      window.ble.isEnabled(
        function () {
          resolve(true)
        },
        function () {
          resolve(false)
        }
      )
    })
  }

  /**
   * Requests permission to access Bluetooth.
   * Because of how this is implemented in the plugin,
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
      const timer = setTimeout(() => {
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

  /**
   * Finds BLE devices given a name prefix and a list of service UUIDs
   * @param {string} namePrefix - prefix of a name
   * @param {Array<string>} serviceNames - UUIDs
   * @param {number} searchTime - time in seconds
   * @returns {Promise<Array<BLEDevice>>}
   */
  static async findDevicesByName (namePrefix, serviceNames, searchTime) {
    return new Promise((resolve, reject) => {
      const devices = []
      window.ble.startScan(serviceNames, (deviceFound) => {
        if (deviceFound.name.startsWith(namePrefix) && !deviceExists(devices, deviceFound)) {
          const dev = new BLEDevice(deviceFound)
          devices.push(dev)
        }
      }, (failureResponse) => {
        console.error('Start scan failed.', failureResponse)
        reject()
      })
      setTimeout(() => {
        window.ble.stopScan((success) => {
          resolve(devices)
        }, (failureResponse) => {
          console.error('Stop scan failed.', failureResponse)
          resolve()
        })
      }, searchTime)
    })
    function deviceExists (devices, device) {
      return devices.find((d) => d.id === device.id)
    }
  }

  /**
   * Finds a specific BLE device given its ID
   * @param {string} deviceId - ID of the device
   * @param {Array<string>} serviceNames - UUIDs
   * @param {number} timeout - maximum time in seconds
   * @returns {Promise<BLEDevice>}
   */
  static async findDeviceById (deviceId, serviceNames, timeout) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        window.ble.stopScan()
        reject()
      }, timeout)

      window.ble.startScan(serviceNames, (deviceFound) => {
        if (deviceFound.id === deviceId) {
          window.ble.stopScan()
          clearTimeout(timeoutId)
          resolve(deviceFound)
        }
      }, (failureResponse) => {
        console.error('Start scan failed.', failureResponse)
        clearTimeout(timeoutId)
        reject()
      })
    })
  }

  /**
   * Connects to the device
   * @param {Function} disconnectCallback - called when the device disconnects
   * @returns {Promise}
   */
  async connect (disconnectCallback) {
    return new Promise((resolve, reject) => {
      window.ble.connect(
        this.device.id,
        success => {
          this.disconnectCallback = disconnectCallback
          resolve(success)
        },
        failureResponse => {
          console.error('Connect failed', failureResponse)
          this.disconnectCallback()
        }
      )
    })
  }

  /**
   * Disconnects the device
   * @returns {Promise}
   */
  async disconnect () {
    if (!this.device === null) {
      return Promise.resolve()
    } else {
      return new Promise((resolve, reject) => {
        window.ble.disconnect(
          this.device.id,
          success => {
            this.disconnectCallback = null
            console.log('Disconnect succeded')
            resolve(success)
          },
          failureResponse => {
            console.error('Disconnect failed.', failureResponse)
            reject(failureResponse)
          }
        )
      })
    }
  }

  /**
   * Tells if the device is currently connected
   * @returns {Promise<boolean>}
   */
  async isConnected () {
    if (!this.device) return Promise.resolve(false)
    return new Promise((resolve, reject) => {
      window.ble.isConnected(
        this.deviceId,
        success => {
          console.log('IsConnected succeeded')
          resolve(true)
        },
        failure => {
          console.log('IsConnected failed', failure)
          resolve(false)
        }
      )
    })
  }

  /**
   * Starts nitifications on a given service / characteristic
   * @param {string} serviceUUID - service UUID
   * @param {string} characteristicUUID - characteristic UUID
   * @param {Function} dataCallback - called each time new data arrives
   * @returns {Promise}
   */
  async startNotifications (serviceUUID, characteristicUUID, dataCallback) {
    return new Promise((resolve, reject) => {
      let okTimer = setTimeout(() => {
        resolve()
      }, 200) // wait for notifications to start

      window.ble.startNotification(this.device.id, serviceUUID, characteristicUUID, (data) => {
        if (okTimer) {
          // if we receive data earlier than the timeout, resolve
          clearTimeout(okTimer)
          okTimer = false
          resolve()
        }
        const dataView = data.buffer ? data : new DataView(data)
        dataCallback(dataView)
      }, (err) => {
        console.error('Cannot start notifications', err)
        clearTimeout(okTimer)
        okTimer = false
        reject()
      })
    })
  }

  /**
   * Stops notifications of a given service and characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise}
   */
  async stopNotifications (serviceUUID, characteristicUUID) {
    return new Promise((resolve, reject) => {
      window.ble.stopNotification(this.device.id, serviceUUID, characteristicUUID, resolve, reject)
    })
  }

  /**
   * Reads a characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise<DataView>}
   */
  async readCharacteristic (serviceUUID, characteristicUUID) {
    return new Promise((resolve, reject) => {
      window.ble.read(this.device.id, serviceUUID, characteristicUUID, (data) => {
        const dataView = data.buffer ? data : new DataView(data)
        resolve(dataView)
      }, reject)
    })
  }

  /**
   * Writes the characteristic without waiting for a response
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @param {ArrayBuffer} data - contains the data to be sent
   * @returns {Promise}
   */
  async writeCharacteristicWithoutResponse (serviceUUID, characteristicUUID, data) {
    return new Promise((resolve, reject) => {
      window.ble.writeWithoutResponse(
        this.device.id,
        serviceUUID,
        characteristicUUID,
        data, resolve, reject)
    })
  }
}
