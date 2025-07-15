/**
 * Base class for BLE devices.
 * Uses the WEB BLE API.
 */
export default class BLEDevice {
  // eslint-disable-next-line space-before-function-paren
  constructor(device) {
    this.device = device
    this.server = null
    this.GATTcallbacks = new Map()
  }

  #addNotificationsCallback (serviceUUID, characteristicUUID, callback) {
    const key = `${serviceUUID}-${characteristicUUID}`
    this.GATTcallbacks.set(key, callback)
  }

  #getNotificationsCallback (serviceUUID, characteristicUUID) {
    const key = `${serviceUUID}-${characteristicUUID}`
    return this.GATTcallbacks.get(key)
  }

  #removeNotificationsCallback (serviceUUID, characteristicUUID) {
    const key = `${serviceUUID}-${characteristicUUID}`
    this.GATTcallbacks.delete(key)
  }

  getName () {
    return this.device.name
  }

  getId () {
    return this.device.id
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
   * This is a no-op in the WEB BLE API, as permissions are requested during device discovery.
   */
  static async requestPermission () {
    return Promise.resolve(true)
  }

  /**
   * Finds BLE a device given a name prefix and a list of service UUIDs.
   * In WEB BLE, the user has to select the device, which means that only one device will be returned.
   * @param {string} namePrefix - prefix of a name
   * @param {Array<string>} serviceNames - UUIDs
   * @returns {Promise<BLEDevice>} one BLEDevice
   */
  static async findDeviceByName (namePrefix, serviceNames) {
    const dev = await navigator.bluetooth.requestDevice({
      filters: [
        { namePrefix },
        { services: serviceNames }
      ]
    })

    return new BLEDevice(dev)
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
   * Starts notifications on a given service / characteristic
   * @param {string} serviceUUID - service UUID
   * @param {string} characteristicUUID - characteristic UUID
   * @param {Function} dataCallback - called each time new data arrives
   * @returns {Promise}
   */
  async startNotifications (serviceUUID, characteristicUUID, dataCallback) {
    const service = await this.server.getPrimaryService(serviceUUID)
    const characteristic = await service.getCharacteristic(characteristicUUID)

    this.#addNotificationsCallback(serviceUUID, characteristicUUID, dataCallback)
    characteristic.addEventListener('characteristicvaluechanged', dataCallback)

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
    await characteristic.stopNotifications()

    const callback = this.#getNotificationsCallback(serviceUUID, characteristicUUID)
    characteristic.removeEventListener('characteristicvaluechanged', callback)
    this.#removeNotificationsCallback(serviceUUID, characteristicUUID)
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
   * Writes the characteristic and waits for a response
   * @param {string} serviceUUID - service identifier
   * @param {string} characteristicUUID - characteristic identifier
   * @param {ArrayBuffer} data - contains the data to be sent
   * @returns {Promise}
   */
  async writeCharacteristic (serviceUUID, characteristicUUID, data) {
    const service = await this.server.getPrimaryService(serviceUUID)
    const characteristic = await service.getCharacteristic(characteristicUUID)
    return characteristic.writeValue(data)
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
