'use strict'
import { Platform } from 'quasar'

// smart peak flow meter cordova-plugin
export default {

  /**
   * Requests permission to access the microphone
   */
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))

      if (Platform.is.ios) {
        cordova.plugins.spf.startCalibration(() => {
          cordova.plugins.spf.stopCalibration()
          resolve()
        }, reject)
      } else {
        cordova.plugins.spf.requestPermissions(resolve, reject)
      }
    })
  },

  /**
   * Starts the calibration process, the promise is resolved once the process is completed
   */
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

  /**
   * Stops the calibration process
   */
  async stopCalibration () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.stopCalibration(resolve, reject)
    })
  },

  /**
   * Starts the peak flow measurement, promise is resolved when the measurement is completed
   */
  async startMeasurement () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      var success = function (message) {
        if (message.state === 'completed') {
          resolve({
            pef: message.peakFlowRate
          })
        }
      }
      cordova.plugins.spf.startMeasurement(success, reject)
    })
  },

  /**
   * Stops the peak flow measurements
   */
  async stopMeasurement () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.stopMeasurement(resolve, reject)
    })
  }
}
