'use strict'

import { Platform } from 'quasar'
import axios from 'axios'

// this module groups a bunch of hardware functionalities, basically cordova plugins

// device: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
// insomnia: https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin#readme
// geolocation: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html
// see also HTML standard: https://www.w3schools.com/html/html5_geolocation.asp
// pedometer: https://github.com/leecrossley/cordova-plugin-pedometer

export default {
  device: window.device,
  screen: {
    async forbidSleep () {
      return new Promise((resolve, reject) => {
        window.plugins.insomnia.keepAwake(resolve, reject)
      })
    },
    async allowSleep () {
      return new Promise((resolve, reject) => {
        window.plugins.insomnia.allowSleepAgain(resolve, reject)
      })
    }
  },
  geolocation: {
    watchid: null,
    async isAvailable () {
      if (typeof navigator.geolocation === 'undefined') return Promise.resolve(false)
      else return Promise.resolve(true)
    },
    async requestPermission () {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(() => {
          // got a position, permissions should be OK now
          resolve(true)
        }, (err) => {
          if (err.code !== 1) {
            // code 1 means no permissions
            // see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
            // in all other cases permissions should have been given
            resolve(true)
          } else {
            reject(err)
          }
        }, { timeout: 2000 })
      })
    },
    startNotifications (options, cbk, error) {
      this.watchid = navigator.geolocation.watchPosition((position) => {
        // we need to create a copy of the position object because
        // Chromium does something strange that is not serialisable as JSON
        var copyPos = {}
        copyPos.timestamp = new Date().getTime() // use current timestamp because some phones mess up the timestamps
        copyPos.coords = {}
        copyPos.coords.latitude = position.coords.latitude
        copyPos.coords.longitude = position.coords.longitude
        copyPos.coords.altitude = position.coords.altitude
        if (position.coords.accuracy) copyPos.coords.accuracy = position.coords.accuracy
        if (position.coords.altitudeAccuracy) copyPos.coords.altitudeAccuracy = position.coords.altitudeAccuracy
        if (position.coords.heading) copyPos.coords.heading = position.coords.heading
        if (position.coords.speed) copyPos.coords.speed = position.coords.speed

        cbk(copyPos)
      }, error, options)
    },
    async stopNotifications () {
      navigator.geolocation.clearWatch(this.watchid)
      return Promise.resolve()
    }
  },
  pedometer: {
    firstSteps: -1,
    async isAvailable () {
      return new Promise((resolve, reject) => {
        window.pedometer.isStepCountingAvailable(resolve, reject)
      })
    },
    async requestPermission () {
      return new Promise((resolve, reject) => {
        if (Platform.is.ios) {
          window.pedometer.queryData(function (data) {
            resolve()
          }, function (data) {
            reject()
          }, {
            startDate: new Date(new Date().getTime() - 10000),
            endDate: new Date()
          })
        } else {
          // to make it more robust, it could stop updates before this
          // in case the updates are running (very unlikely)
          window.pedometer.startPedometerUpdates(function (data) {
            resolve()
            window.pedometer.stopPedometerUpdates()
          }, function (err) {
            reject(err)
          })
        }
      })
    },
    startNotifications (options, cbk, error) {
      this.firstSteps = -1
      window.pedometer.startPedometerUpdates((data) => {
        if (this.firstSteps === -1) {
          this.firstSteps = data.numberOfSteps - 1
        }
        data.numberOfSteps -= this.firstSteps
        cbk(data)
      }, error)
    },
    async stopNotifications () {
      return new Promise((resolve, reject) => {
        window.pedometer.stopPedometerUpdates(resolve, reject)
      })
    }
  },
  postcodes: {
    getPostcode (position) {
      var longitude = position.coords.longitude
      var latitude = position.coords.latitude
      var postcodeLimit = 1
      var queryString = 'https://api.postcodes.io/postcodes?lon=' + longitude + '&lat=' + latitude + '&limit=' + postcodeLimit
      return new Promise((resolve, reject) => {
        axios
          .get(queryString)
          .then(response => {
            resolve({ postcode: response.data.result[0].postcode })
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  pin: {
    async isPINSet () {
      return new Promise((resolve, reject) => {
        if (window.cordova && window.cordova.plugins.PinCheck) {
          window.cordova.plugins.PinCheck.isPinSetup(
            (success) => {
              resolve()
            },
            (failure) => {
              reject(new Error(failure))
            })
        } else {
          reject(new Error('NO_PIN_PLUGIN'))
        }
      })
    }
  }
}
