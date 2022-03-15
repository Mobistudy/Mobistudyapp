/**
 * this module mocks the cordova plugins of phone.js
 * */
import { audioRecorderMock } from './audioRecorder.js'
import { geolocationMock } from './geolocation'
import { motionMock } from './motion.js'
import { pedometerMock } from './pedometer'
import { screenMock } from './screen.js'
import { orientationMock } from './orientation.js'

const PIN_SET = true

export default {
  device: {
    load () {
    },
    manufacturer: 'samsung',
    model: 'mock',
    OSversion: '3.2'
  },
  screen: screenMock,
  geolocation: geolocationMock,
  pedometer: pedometerMock,
  pin: {
    async isPINSet () {
      if (PIN_SET) return Promise.resolve()
      else return Promise.reject()
    }
  },
  motion: motionMock,
  orientation: orientationMock,

  vibrate (ms) {
    console.log('vibrating...')
  },

  audioRecorder: audioRecorderMock
}
