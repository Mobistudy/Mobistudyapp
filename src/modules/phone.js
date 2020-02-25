'use strict'

// this module groups a bunch of hardware functionalities, basically cordova plugins

// device: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
// insomnia: https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin#readme
// geolocation: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html
// see also HTML standard: https://www.w3schools.com/html/html5_geolocation.asp
// pedometer: https://github.com/leecrossley/cordova-plugin-pedometer

export default {
  device: device,
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
    async requestPermission () {
      return new Promise((resolve, reject) => {
        let id = navigator.geolocation.watchPosition(() => {
          resolve()
          navigator.geolocation.clearWatch(id)
        }, (err) => {
          reject(err)
          navigator.geolocation.clearWatch(id)
        }, { timeout: 5000, enableHighAccuracy: true })
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
        pedometer.isStepCountingAvailable(resolve, reject)
      })
    }
    async requestPermission () {
      return new Promise((resolve, reject) => {
        let id = navigator.geolocation.watchPosition(() => {
          resolve()
          navigator.geolocation.clearWatch(id)
        }, (err) => {
          reject(err)
          navigator.geolocation.clearWatch(id)
        }, { timeout: 5000, enableHighAccuracy: true })
      })
    },
    startNotifications (options, cbk, error) {
      pedometer.startPedometerUpdates((data) => {
        if (this.firstSteps == -1) {
          this.firstSteps = data.numberOfSteps - 1
        }
        data.numberOfSteps -= this.firstSteps
        cbk(data)
      }, error)
    },
    async stopNotifications () {
      return new Promise((resolve, reject) => {
        pedometer.stopPedometerUpdates(resolve, reject)
      })
    }
  }
}
