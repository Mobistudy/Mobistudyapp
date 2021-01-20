'use strict'
import BLEDevice from 'modules/bledevice/BLEDevice'

const NO_DATA_FAIL = false
const AMOUNT_OF_DATA = 10

export default {
  device: undefined,
  deviceToSearch: 'PO60',

  async scan (searchTime) {
    try {
      const devices = await BLEDevice.scan(this.deviceToSearch, searchTime)
      return devices
    } catch (error) {
      console.log('Could not find device:', error)
    }
  },

  async connect () {
    return this.device.connect()
  },
  async disconnect () {
    return this.device.disconnect()
  },

  async isConnected () {
    return this.device.isConnected()
  },

  async getAllData () {
    if (!this.device) return Promise.reject()
    if (NO_DATA_FAIL) return Promise.reject()
    const startTimestamp = new Date()
    const endTimestamp = new Date(startTimestamp.getTime + 5000)
    let allData = []
    for (let i = 0; i < AMOUNT_OF_DATA; i++) {
      allData.push({
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp,
        hrMax: this.randomNum(140, 160),
        hrMin: this.randomNum(50, 80),
        hrAvg: this.randomNum(50, 160),
        SPO2Max: this.randomNum(90, 99),
        SPO2Min: this.randomNum(50, 95),
        SPO2Avg: this.randomNum(50, 99)
      })
    }
    return Promise.resolve(allData)
  },

  async getLatestData () {
    if (!this.device) return Promise.reject()
    if (NO_DATA_FAIL) return Promise.reject()
    const startTimestamp = new Date()
    const endTimestamp = new Date(startTimestamp.getTime + 5000)
    let latestData = {
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp,
      hrMax: this.randomNum(140, 160),
      hrMin: this.randomNum(50, 80),
      hrAvg: this.randomNum(50, 160),
      SPO2Max: this.randomNum(90, 99),
      SPO2Min: this.randomNum(50, 95),
      SPO2Avg: this.randomNum(50, 99)
    }
    return Promise.resolve(latestData)
  },
  randomNum (min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
  }

}
