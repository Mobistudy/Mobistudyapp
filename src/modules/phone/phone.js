// this module groups a bunch of hardware functionalities, some cordova plugins and some standard APIs

// device: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
// insomnia: https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin
// geolocation: https://www.w3schools.com/html/html5_geolocation.asp
// pedometer: https://github.com/leecrossley/cordova-plugin-pedometer
// audio recorder: https://github.com/edimuj/cordova-plugin-audioinput (use latest code)
// pin: https://github.com/shangyilim/cordova-plugin-pincheck
// motion and orientation: https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
// vibration: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-vibration/

import { audioRecorder } from './audioRecorder.js'
import { geolocation } from './geolocation.js'
import { pedometer } from './pedometer.js'
import { screen } from './screen.js'
import { motion } from './motion.js'
import { orientation } from './orientation.js'

export default {
  device: {
    load () {
      if (!window.device) throw new Error('Cannot load device specifications')
      this.manufacturer = window.device.manufacturer
      this.model = window.device.model
      this.OSversion = window.device.version
    },
    manufacturer: window?.device?.manufacturer,
    model: window?.device?.model,
    OSversion: window?.device?.version
  },
  screen: screen,
  geolocation: geolocation,
  pedometer: pedometer,
  motion: motion,
  orientation: orientation,

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
  },

  vibrate (ms) {
    navigator.vibrate(3000)
  },

  audioRecorder: audioRecorder
}
