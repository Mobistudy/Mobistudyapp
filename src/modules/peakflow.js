'use strict'

// smart peak flow meter cordova-plugin
export default {
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.requestPermissions(resolve, reject)
    })
  },

  async startCalibration () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.startCalibration(resolve, reject)
    })
  },

  async stopCalibration () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.stopCalibration(resolve, reject)
    })
  },

  async startMeasurement () {
    console.log('start measure')

    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      var success = function (message) {
        console.log(message)
        if (message.state === 'completed') {
          console.log(message.peakFlowRate)
          resolve({
            pef: message.peakFlowRate
          })
        }
      }
      cordova.plugins.spf.startMeasurement(success, reject)
    })
  },

  async stopMeasurement () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.stopMeasurement(resolve, reject)
    })
  },

  async getStoredData (startDate) {

  }
}
