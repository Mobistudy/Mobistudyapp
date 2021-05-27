'use strict'

import DB from 'modules/db'

// smart peak flow meter cordova-plugin
export default {
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.requestPermissions(resolve, reject)
    })
  },

  async startCalibration (maxTime) {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.startCalibration(resolve, reject)
      setTimeout(() => {
        cordova.plugins.spf.stopCalibration(reject(new Error('Calibration reached maxTime')),
          reject(new Error('Error in stopping calibration')))
      }, maxTime)
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
    return DB.getPastPeakFlowMeas()
  }
}
