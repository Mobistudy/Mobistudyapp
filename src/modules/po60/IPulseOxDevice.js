'use strict'
import PulseOxDevice from 'modules/po60/PulseOxDevice'

export default {
  device: undefined,
  deviceToSearch: 'PO60',

  async requestPermission () {
    return PulseOxDevice.requestPermission()
  },

  async scan (searchTime) {
    const foundDevices = await PulseOxDevice.scan(this.deviceToSearch, searchTime)
    if (!foundDevices) return Promise.reject()
    return foundDevices
  },

  async scanForId (deviceId, searchTime) {
    const device = await PulseOxDevice.scanForId(deviceId, searchTime)
    if (!device) return Promise.reject()
    return device
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
