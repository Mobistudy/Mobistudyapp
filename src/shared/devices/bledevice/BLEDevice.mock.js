import { Dialog } from 'quasar'

const SEARCH_FAIL = false
const CONNECT_FAIL = false

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
    return true
  }

  /**
   * Requests permission to access Bluetooth.
   */
  static async requestPermission () {
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Confirm',
        message: 'Do you agree to give this app access to Bluetooth?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        resolve()
      }).onCancel(() => {
        reject()
      }).onDismiss(() => {
        reject()
      })
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

  /**
   * Finds a specific BLE device given its ID
   * @param {string} deviceId - ID of the device
   * @param {Array<string>} serviceNames - UUIDs
   * @param {number} timeout - maximum time in seconds
   * @returns {Promise<BLEDevice>}
   */
  static async findDeviceById (deviceId, serviceNames, timeout) {
    if (SEARCH_FAIL) {
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: deviceId,
          rssi: 200
        })
      }, 2000)
    })
  }

  /**
   * Connects to the device
   * @param {Function} disconnectCallback - called when the device disconnects
   * @returns {Promise}
   */
  async connect (disconnectCallback) {
    if (CONNECT_FAIL) return Promise.reject()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  }

  /**
   * Disconnects the device
   * @returns {Promise}
   */
  async disconnect () {
    return true
  }

  /**
   * Tells if the device is currently connected
   * @returns {Promise<boolean>}
   */
  async isConnected () {
    return true
  }

  /**
   * Starts nitifications on a given service / characteristic
   * @param {string} serviceUUID - service UUID
   * @param {string} characteristicUUID - characteristic UUID
   * @param {Function} dataCallback - called each time new data arrives
   * @returns {Promise}
   */
  async startNotifications (serviceUUID, characteristicUUID, dataCallback) {
    return true
  }

  /**
   * Stops notifications of a given service and characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise}
   */
  async stopNotifications (serviceUUID, characteristicUUID) {
    return true
  }

  /**
   * Reads a characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise<DataView>}
   */
  async readCharacteristic (serviceUUID, characteristicUUID) {
    return true
  }

  /**
   * Writes the characteristic without waiting for a response
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @param {ArrayBuffer} data - contains the data to be sent
   * @returns {Promise}
   */
  async writeCharacteristicWithoutResponse (serviceUUID, characteristicUUID, data) {
    return true
  }
}
