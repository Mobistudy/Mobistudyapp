'use strict'
import PulseOxDevice from 'modules/po60/PulseOxDevice'

export default {
  device: undefined,
  deviceToSearch: 'PO60',
  /**
   * Finds all Miband3 around and returns an array of device objects, each containing an ID (MAC address) and RSSI
   * If a timeout occurs or BLE is not activated, the promise is rejected
   * @param {Number} searchTime max number of milliseconds to search for a Miband3
   */
  async scan (searchTime) {
    const foundDevices = await PulseOxDevice.scan(this.deviceToSearch, searchTime)
    if (!foundDevices) return Promise.reject()
    return foundDevices
  },

  async connect (device) {
    if (!this.device) this.device = new PulseOxDevice(device) // Return the first device found
    return this.device.connect()
  },

  async disconnect () {
    if (!this.device) return Promise.reject()
    return this.device.disconnect()
  },

  async isConnected () {
    if (!this.device) return Promise.reject()
    return this.device.isConnected()
  },

  async getAllData () {
    if (!this.device) return Promise.reject()
    return this.device.getAllData()
  },

  async getLatestData () {
    if (!this.device) return Promise.reject()
    return this.device.getLatestData()
  }

}
