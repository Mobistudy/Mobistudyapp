'use strict'

// this module mocks the cordova plugins

// device: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
// geolocation: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html
// pedometer: https://github.com/leecrossley/cordova-plugin-pedometer

export default {
  device: {
    cordova: '0',
    model: 'mock',
    platform: 'Android', // also 'iOS'
    uuid: 'c053ba18-e189-4fb1-9ff6-f70397b138fd',
    version: '3.2',
    manufacturer: 'samsung',
    isVirtual: false,
    serial: 'f70397b138fd'
  },
  screen: {
    async forbidSleep () {
      return Promise.resolve()
    },
    async allowSleep () {
      return Promise.resolve()
    }
  },
  geolocation: {
    timerid: null,
    async requestPermission () {
      return Promise.resolve()
    },
    startNotifications (options, cbk, error) {
      let startLat = 51.751985
      let startLong = -1.257609
      let counter = 0
      this.timerid = setInterval(function () {
        counter++
        cbk({
          timestamp: new Date().getTime(),
          coords: {
            latitude: startLat + (counter * 2.1055e-6),
            longitude: startLong + (counter * 1.83055e-5),
            altitude: 69.82,
            accuracy: 9
          }
        })
      }, 1000)
    },
    async stopNotifications () {
      clearInterval(this.timerid)
      return Promise.resolve()
    }
  },
  pedometer: {
    timer : null,
    steps : 0,
    async isAvailable () {
      return true
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
      this.steps = 0
      this.timer = setInterval(() => {
        this.steps ++
        cbk({
          startDate: new Date().getTime(),
          endDate: new Date().getTime(),
          numberOfSteps: this.steps
        })
      }, 1000)
    },
    async stopNotifications () {
      clearInterval(this.timer)
      return Promise.resolve()
    }
  }
}
