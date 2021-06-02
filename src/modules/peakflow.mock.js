'use strict'

// MOCK smart peak flow meter
export default {

  /**
   * a function call for each functions in the cordova-spf plugin
   */
  async requestPermission () {
    // return Promise.resolve(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
  },

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
  },

  /**
   * Retrieves data from phone storage
   * @param {Date} startDate a JS Date object from which we want to retrieve the data
   */

  async getStoredData (startDate) {
    let retval = []
    // let dateNow = Date.now()
    for (let day = 0; day < 21; day++) {
      // let retDate = startDate
      retval.push({
        // date: retDate.getDate() + day,
        date: new Date(startDate - day * 24 * 60 * 60 * 1000),
        pef: Math.floor(Math.random() * 1000)
      })
    }
    return Promise.resolve(retval)
    // return retval
  }
}
