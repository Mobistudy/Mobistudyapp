'use strict'

// MOCK smart peak flow meter
export default {
  async startCalibration () {
    // return Promise.resolve(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
  },

  async stopCalibration () {
    return Promise.resolve(true)
  },

  async startMeasurement () {
    return Promise.resolve({
      pef: Math.floor(Math.random() * 1000)
    })
  },

  async stopMeasurement () {
    return Promise.resolve(true)
  }

}
