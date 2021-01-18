'use strict'

const SEARCH_FAIL = false
const CONNECT_FAIL = false
const NO_DATA_FAIL = false
const AMOUNT_OF_DATA = 10

export default {
  device: undefined,
  deviceToSearch: 'PO60',

  async scan (searchTime) {
    if (SEARCH_FAIL) {
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const nearestDevice = {
          id: '01:22:32:43:1D:09',
          rssi: 100
        }
        this.device = nearestDevice
        resolve(nearestDevice)
      }, searchTime)
    })
  },

  async connect () {
    if (!this.device) throw new Error('Interface has no device object initialized.')
    if (CONNECT_FAIL) return Promise.reject()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  },

  async isConnected () {
    return Promise.resolve(true)
  },

  async disconnect () {
    return Promise.resolve(true)
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
