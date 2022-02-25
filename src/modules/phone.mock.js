'use strict'

import { Dialog } from 'quasar'
// import axios from 'axios'
// import config from '../../project.config.js'

// this module mocks the cordova plugins of phone.js

const PIN_SET = true

export default {
  device: {
    load () {
    },
    manufacturer: 'samsung',
    model: 'mock',
    OSversion: '3.2'
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
    async isAvailable () {
      return Promise.resolve(true)
    },
    async requestPermission () {
      return new Promise((resolve, reject) => {
        Dialog.create({
          title: 'Confirm',
          message: 'Would you like to give access to the GPS?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          resolve()
        }).onCancel(() => {
          reject()
        }).onDismiss(() => {
          reject()
        })
      })
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
            accuracy: counter < 5 ? 60 : 10
          }
        })
      }, 1000)
    },
    async stopNotifications () {
      clearInterval(this.timerid)
      return Promise.resolve()
    },
    async getCurrentPosition () {
      return {
        timestamp: new Date().getTime(),
        coords: {
          latitude: 51.751985,
          longitude: -1.257609,
          altitude: 69.82,
          accuracy: 30
        }
      }
    }
  },
  pedometer: {
    timer: null,
    steps: 0,
    async isAvailable () {
      return Promise.resolve(true)
    },
    async requestPermission () {
      return new Promise((resolve, reject) => {
        Dialog.create({
          title: 'Confirm',
          message: 'Would you like to give access to the pedometer?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          resolve()
        }).onCancel(() => {
          reject()
        }).onDismiss(() => {
          reject()
        })
      })
    },
    startNotifications (options, cbk, error) {
      this.steps = 0
      this.timer = setInterval(() => {
        this.steps++
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
  },
  pin: {
    async isPINSet () {
      if (PIN_SET) return Promise.resolve()
      else return Promise.reject()
    }
  },
  motion: {
    timer: null,
    async isAvailable () {
      return Promise.resolve(true)
    },
    async requestPermission () {
      return Promise.resolve(true)
    },
    startNotifications (options, cbk, error) {
      this.timer = setInterval(() => {
        let fakeSmaple = Math.sin((new Date().getTime() / 1000) * 2 * Math.PI)
        cbk({
          timestamp: new Date().getTime(),
          acc: {
            x: fakeSmaple,
            y: fakeSmaple,
            z: fakeSmaple
          },
          accG: {
            x: fakeSmaple,
            y: fakeSmaple,
            z: fakeSmaple
          },
          rotRate: {
            alpha: fakeSmaple,
            beta: fakeSmaple,
            gamma: fakeSmaple
          },
          interval: 500
        })
      }, 500)
    },
    async stopNotifications () {
      clearInterval(this.timer)
      return Promise.resolve()
    }
  },
  orientation: {
    timer: undefined,
    async isAvailable () {
      return Promise.resolve(true)
    },
    async requestPermission () {
      return Promise.resolve(true)
    },
    startNotifications (options, cbk, error) {
      this.timer = setInterval(() => {
        let fakeSmaple = Math.sin((new Date().getTime() / 1000) * 2 * Math.PI)
        cbk({
          timestamp: new Date().getTime(),
          abs: fakeSmaple,
          alpha: fakeSmaple,
          beta: fakeSmaple,
          gamma: fakeSmaple
        })
      }, 500)
    },
    async stopNotifications () {
      clearInterval(this.timer)
      return Promise.resolve()
    }
  },

  vibrate (ms) {
    console.log('vibrating...')
  }
}
