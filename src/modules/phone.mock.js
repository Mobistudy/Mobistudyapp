'use strict'

import { Dialog } from 'quasar'

// this module mocks the cordova plugins of phone.js

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
  metronome: {
    metronomeID: null,
    audioContext: null,
    nextNoteTime: 0.0, // When the next note should be played
    currentQuarterNote: 0,
    volume: 0.1, // 1 = 100% volume
    scheduleBeeping (beatNumber, time) {
      // Create an oscillator
      const osc = this.audioContext.createOscillator()
      const envelope = this.audioContext.createGain()

      // Four-step cadence
      osc.frequency.value = (beatNumber % 4 === 0) ? 1000 : 800
      envelope.gain.value = this.volume
      envelope.gain.exponentialRampToValueAtTime(this.volume, time + 0.001)
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

      osc.connect(envelope)
      envelope.connect(this.audioContext.destination)

      osc.start(time)
      osc.stop(time + 0.03)
    },
    nextBeep (cadence) {
      let bpm = (cadence === 625 ? 96 : 88) // Current tempo, cadence gets converted to bpm
      let secondsPerBeat = 60.0 / bpm
      this.nextNoteTime += secondsPerBeat // Add beat length to last beat time

      this.currentQuarterNote++ // Advance the beat number, wrap to zero
      if (this.currentQuarterNote === 4) {
        this.currentQuarterNote = 0
      }
    },
    async start (cadence, indicator) {
      // For legacy browsers
      const AudioContext = window.AudioContext || window.webkitAudioContext
      this.audioContext = new AudioContext()

      this.currentQuarterNote = 0
      this.nextNoteTime = this.audioContext.currentTime + 0.05

      this.metronomeID = setInterval(() => {
        while (this.nextNoteTime < this.audioContext.currentTime + 0.1) {
          this.scheduleBeeping(this.currentQuarterNote, this.nextNoteTime)
          this.nextBeep(cadence)
          indicator.click()
        }
      }, 25)
    },
    async stop () {
      clearInterval(this.metronomeID)
      console.log('Stopping metronome')
    }
  },
  media: {
    async playSound (soundfile) {
      if (soundfile !== undefined) {
        var audio = new Audio(soundfile.currentSrc)
        audio.play()
      }
    }
  },
  textToSpeech: {
    speech: null,
    language: null, // If language is unset (userinfo.user.language), defaults to device language
    volume: 0.5,
    async playVoice (text) {
      if ('speechSynthesis' in window) {
        this.speech = new SpeechSynthesisUtterance()
        this.speech.volume = this.volume
        this.speech.text = text
        this.speech.lang = this.language
        console.log(this.speech)
        if (this.speech !== null) {
          window.speechSynthesis.speak(this.speech)
        }
      } else {
        console.log('Text-to-speech is not supported on this device')
      }
    }
  }
}
