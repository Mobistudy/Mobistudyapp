'use strict'

import spf from 'cordova-plugin-spf'

// smart peak flow meter cordova-plugin
export default {
  async startCalibration () {
    return new Promise((resolve, reject) => {
      if (!spf) reject(new Error('Cordova spf is not installed'))
      spf.startCalibration(resolve, reject)
    })
  },

  async stopCalibration () {
    return new Promise((resolve, reject) => {
      if (!spf) reject(new Error('Cordova spf is not installed'))
      spf.stopCalibration(resolve, reject)
    })
  },

  async startMeasurement () {
    return new Promise((resolve, reject) => {
      if (!spf) reject(new Error('Cordova spf is not installed'))
      spf.startMeasurement(resolve, reject)
    })
  },

  async stopMeasurement () {
    return new Promise((resolve, reject) => {
      if (!spf) reject(new Error('Cordova spf is not installed'))
      spf.stopMeasurement(resolve, reject)
    })
  },

  async getStoredData (startDate) {

  }
}
