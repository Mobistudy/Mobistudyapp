/**
 * Base class for BLE devices.
 * Uses the cordova BLE plugin https://github.com/don/cordova-plugin-ble-central
 */
const DEBUG = process.env.DEBUG

export default class BLEDevice {
  // eslint-disable-next-line space-before-function-paren
  constructor(nativeDevice) {
    this.device = nativeDevice
    this.disconnectCallback = null
    this.id = nativeDevice.id
    this.name = nativeDevice.name || nativeDevice.id // use id if name is not set
    this.rssi = nativeDevice.rssi || undefined // signal strength, undefined if not available
  }

  /**
   * Tells if BLE is available
   * @returns {Promise{boolean}} returns a promise with true if available
   */
  static async isAvailable () {
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
  static async findAllDevicesByName (namePrefix, serviceNames, searchTime) {
    function deviceExists (devices, device) {
      return devices.find((d) => d.id === device.id)
    }
    return new Promise((resolve, reject) => {
      const devices = []
      window.ble.startScan(serviceNames, (deviceFound) => {
        if (deviceFound.name.startsWith(namePrefix) && !deviceExists(devices, deviceFound)) {
          const dev = new BLEDevice(deviceFound)
          if (DEBUG) console.log('Found JSTyle', dev)
          devices.push(dev)
        }
      }, (failureResponse) => {
        if (DEBUG) console.error('Start scan failed.', failureResponse)
        reject()
      })
      setTimeout(() => {
        window.ble.stopScan((success) => {
          if (DEBUG) console.log('Scan stopped, identified devices', devices)
          resolve(devices)
        }, (failureResponse) => {
          if (DEBUG) console.error('Stop scan failed.', failureResponse)
          resolve(devices)
        })
      }, searchTime)
    })
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
        if (DEBUG) console.error('Start scan failed.', failureResponse)
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
          if (DEBUG) console.error('Connect failed', failureResponse)
          reject(failureResponse)
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
      if (DEBUG) console.log('Disconnecting device')
      return window.ble.withPromises.disconnect(this.device.id)
    }
  }

  /**
   * Tells if the device is currently connected
   * @returns {Promise<boolean>}
   */
  async isConnected () {
    if (!this.device) return Promise.resolve(false)
    else return window.ble.withPromises.isConnected(this.deviceId, false)
  }

  /**
   * Starts notifications on a given service / characteristic
   * @param {string} serviceUUID - service UUID
   * @param {string} characteristicUUID - characteristic UUID
   * @param {Function} dataCallback - called each time new data arrives, data is passed as DataView
   * @returns {Promise} a promise that resolves when notifications are started
   */
  async startNotifications (serviceUUID, characteristicUUID, dataCallback) {
    if (DEBUG) console.log('Starting notifications for service', serviceUUID, 'characteristic', characteristicUUID)
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
        if (DEBUG) console.log('Notification received', data)
        // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
        const dataView = data.buffer ? data : new DataView(data)
        dataCallback(dataView)
      }, (err) => {
        if (DEBUG) console.error('Cannot start notifications', err)
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
    if (DEBUG) console.log('Stopping notifications for service', serviceUUID, 'characteristic', characteristicUUID)
    return window.ble.withPromises.stopNotification(this.device.id, serviceUUID, characteristicUUID)
  }

  /**
   * Reads a characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise<DataView>}
   */
  async readCharacteristic (serviceUUID, characteristicUUID) {
    const data = await window.ble.withPromises.read(this.device.id, serviceUUID, characteristicUUID)
    const dataView = data.buffer ? data : new DataView(data)
    return dataView
  }

  /**
   * Writes the characteristic and waits for a response
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @param {ArrayBuffer} data - contains the data to be sent
   * @returns {Promise}
   */
  async writeCharacteristic (serviceUUID, characteristicUUID, data) {
    if (DEBUG) console.log('Writing to service', serviceUUID, 'characteristic', characteristicUUID, 'data', data)
    return window.ble.withPromises.write(
      this.device.id,
      serviceUUID,
      characteristicUUID,
      data.buffer)
  }

  /**
   * Writes the characteristic without waiting for a response
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @param {ArrayBuffer} data - contains the data to be sent
   * @returns {Promise}
   */
  async writeCharacteristicWithoutResponse (serviceUUID, characteristicUUID, data) {
    if (DEBUG) console.log('Writing without response to service', serviceUUID, 'characteristic', characteristicUUID, 'data', data)
    return window.ble.withPromises.writeWithoutResponse(
      this.device.id,
      serviceUUID,
      characteristicUUID,
      data.buffer)
  }
}
