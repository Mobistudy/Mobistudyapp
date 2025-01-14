// smart peak flow meter cordova-plugin
export default {

  /**
   * Requests permission to access the microphone
   */
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (!cordova.plugins.spf) reject(new Error('Cordova spf is not installed'))
      cordova.plugins.spf.requestPermissions(resolve, reject)
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

      // set a timeout in case the plugin does not callback
      let timerID = setTimeout(() => {
        cordova.plugins.spf.stopMeasurement()
        reject('Timeout')
      }, 30000)

      cordova.plugins.spf.startMeasurement((message) => {
        console.log(message)
        clearTimeout(timerID)
        timerID = setTimeout(() => {
          cordova.plugins.spf.stopMeasurement()
          reject('Timeout')
        }, 5000)

        if (message.state === 'completed') {
          clearTimeout(timerID)
          resolve({
            pef: message.peakFlowRate
          })
        }
      }, reject)
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
