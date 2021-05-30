'use strict'

import { Dialog } from 'quasar'
// import axios from 'axios'
// import config from '../../project.config.js'

// this module mocks the cordova plugins of phone.js

const PIN_SET = true

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
  postcodes: {
    getPostcode (position) {
      return Promise.resolve({ postcode: 'OX1 4DS' })
    }
  },
  weather: {
    getWeather (position) {
      return Promise.resolve({
        location: 'Oxford',
        description: 'Rain',
        icon: 'http://openweathermap.org/img/w/10d.png',
        temperature: Math.floor(Math.random() * 30),
        humidity: Math.round(Math.floor(Math.random() * 100) * 100) / 100,
        clouds: Math.round(Math.floor(Math.random() * 100) * 100) / 100,
        wind: Math.round(Math.floor(Math.random() * 100) * 100) / 100
      })
    },
    getPollution (position) {
      return Promise.resolve({
        aqi: Math.floor(Math.random() * 5)
      })
    },
    getPollen (position) {
      return Promise.resolve({
        risk: {
          grass_pollen: 'Low',
          tree_pollen: 'Low',
          weed_pollen: 'Low'
        },
        species: {}
      })
    }
  },
  pin: {
    async isPINSet () {
      if (PIN_SET) return Promise.resolve()
      else return Promise.reject()
    }
  }
}
