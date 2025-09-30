// this module groups a bunch of hardware functionalities, some cordova plugins and some standard APIs

// device: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
// insomnia: https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin
// geolocation: https://www.w3schools.com/html/html5_geolocation.asp
// pedometer: https://github.com/leecrossley/cordova-plugin-pedometer
// audio recorder: https://github.com/edimuj/cordova-plugin-audioinput (use latest code)
// pin: https://github.com/shangyilim/cordova-plugin-pincheck
// motion and orientation: https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent
// vibration: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-vibration/

import { audioRecorder } from './audiorecorder.js'
import { geolocation } from './geolocation.js'
import { pedometer } from './pedometer.js'
import { screen } from './screen.js'
import { motion } from './motion.js'
import { orientation } from './orientation.js'

function detectOS () {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

export default {
  device: {
    init () {
      if (!window.device) throw new Error('Cannot load device specifications')
      this.manufacturer = window.device.manufacturer
      this.model = window.device.model
      this.OSversion = window.device.version
    },
    manufacturer: window?.device?.manufacturer,
    model: window?.device?.model,
    OSType: detectOS(),
    OSversion: window?.device?.version,
    appVersion: process.env.APP_VERSION,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  screen,
  geolocation,
  pedometer,
  motion,
  orientation,

  pin: {
    async isPINSet () {
      return new Promise((resolve, reject) => {
        if (window.cordova && window.cordova.plugins.PinCheck) {
          window.cordova.plugins.PinCheck.isPinSetup(
            () => {
              // all OK
              resolve()
            },
            (failure) => {
              // pin is not setup
              reject(new Error(failure))
            })
        } else {
          reject(new Error('NO_PIN_PLUGIN'))
        }
      })
    }
  },

  vibrate (ms) {
    navigator.vibrate(ms)
  },

  audioRecorder
}
