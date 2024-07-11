/**
 * Base class for BLE devices.
 * Uses the WEB BLE API.
 */
export default class BLEDevice {
  constructor() {
    this.device = null
    this.server = null
    this.characteristics = new Map()
    this.GATTcallbacks = new Map()
  }

  /**
   * Tells if BLE is available
   * @returns {Promise{boolean}} returns a promise with true if available
   */
  static async isAvailable () {
    return navigator.bluetooth.getAvailability()
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
    return Promise.resolve(true)
  }

  /**
   * Finds BLE devices given a name prefix and a list of service UUIDs.
   * The user has to select the device, which means that only one device is returned.
   * @param {string} namePrefix - prefix of a name
   * @param {Array<string>} serviceNames - UUIDs
   * @returns {Promise<Array<BLEDevice>>}
   */
  static async findDevicesByName (namePrefix, serviceNames) {
    return navigator.bluetooth.requestDevice({
      filters: [
        { namePrefix },
        { services: serviceNames }
      ]
    })
  }

  /**
   * Finds a specific BLE device given its ID
   * @param {string} deviceId - ID of the device
   * @param {Array<string>} serviceNames - UUIDs
   * @returns {Promise<BLEDevice>}
   */
  static async findDeviceById (deviceId, serviceNames) {
    const devices = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: serviceNames
    })

    return devices.find((d) => {
      return (d.id === deviceId)
    })
  }

  /**
   * Connects to the device
   * @param {Function} disconnectCallback - called when the device disconnects
   * @returns {Promise}
   */
  async connect (disconnectCallback) {
    this.server = await this.device.gatt.connect()
    this.device.addEventListener('gattserverdisconnected', disconnectCallback)
  }

  /**
   * Disconnects the device
   * @returns {Promise}
   */
  async disconnect () {
    if (this.device && this.device.gatt.connected) {
      this.device.gatt.disconnect()
    }
  }

  /**
   * Tells if the device is currently connecte
   * @returns {Promise<boolean>}
   */
  async isConnected () {
    if (!this.device) return false
    if (this.device && this.device.gatt) return this.device.gatt.connected
    else return false
  }

  /**
   * Starts nitifications on a given service / characteristic
   * @param {string} serviceUUID - service UUID
   * @param {*} characteristicUUID - characteristic UUID
   * @param {Function} dataCallback - called each time new data arrives
   * @returns {Promise}
   */
  async startNotifications (serviceUUID, characteristicUUID, dataCallback) {
    const service = await this.server.getPrimaryService(serviceUUID)
    const characteristic = await service.getCharacteristic(characteristicUUID)

    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      let value = event.target.value
      // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
      value = value.buffer ? value : new DataView(value)
      dataCallback(value)
    })

    return characteristic.startNotifications()
  }

  /**
   * Stops notifications of a given service and characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise}
   */
  async stopNotifications (serviceUUID, characteristicUUID) {
    const service = await this.server.getPrimaryService(serviceUUID)
    const characteristic = await service.getCharacteristic(characteristicUUID)
    return characteristic.stopNotifications()
  }

  /**
   * Reads a characteristic
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @returns {Promise}
   */
  async readCharacteristic (serviceUUID, characteristicUUID) {
    const service = await this.server.getPrimaryService(serviceUUID)
    const characteristic = await service.getCharacteristic(characteristicUUID)
    return characteristic.readValue()
  }

  /**
   * Writes the characteristic without waiting for a response
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @param {ArrayBuffer} data - contains the data to be sent
   * @returns {Promise}
   */
  async writeCharacteristicWithoutResponse (serviceUUID, characteristicUUID, data) {
    const service = await this.server.getPrimaryService(serviceUUID)
    const characteristic = await service.getCharacteristic(characteristicUUID)
    return characteristic.writeValueWithoutResponse(data)
  }
}
