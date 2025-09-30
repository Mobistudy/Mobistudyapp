/**
 * this module mocks the cordova plugins of phone.js
 * */
import { audioRecorderMock } from './audiorecorder'
import { geolocationMock } from './geolocation'
import { motionMock } from './motion'
import { pedometerMock } from './pedometer'
import { screenMock } from './screen'
import { orientationMock } from './orientation'

const PIN_SET = true

export default {
  device: {
    init () {
    },
    manufacturer: 'samsung',
    model: 'mock',
    OSType: 'Android',
    OSversion: '3.2',
    timeZone: 'Europe/Rome'
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
