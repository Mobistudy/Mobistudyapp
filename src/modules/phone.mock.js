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
  geolocation: {
    getCurrentPosition (cbk) {
      cbk({
        timestamp: new Date().getTime(),
        coords: {
          latitude: 51.751985,
          longitude: -1.257609,
          accuracy: 9
        }
      })
    },
    watchPosition (cbk) {
      let startLat = 51.751985
      let startLong = -1.257609
      let counter = 0
      return setInterval(function () {
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
    clearWatch (id) {
      clearInterval(id)
    }
  },
  pedometer: {
    timer : null,
    steps : 0,
    isStepCountingAvailable (cbk) {
      cbk(true)
    },
    startPedometerUpdates (cbk) {
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
    stopPedometerUpdates (cbk) {
      clearInterval(this.timer)
      cbk()
    }
  }
}
