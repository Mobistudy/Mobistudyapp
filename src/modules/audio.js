'use strict'

// This module contains useful methods for handling audio

export default {
  metronome: {
    metronomeID: null,
    audioContext: null,
    nextNoteTime: 0.0, // When the next note should be played
    currentQuarterNote: 0,
    volume: 0.2, // 1 = 100% volume
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
    // Pass in reference, this.$refs.<SOUND>
    playSound (soundfile) {
      if (soundfile !== undefined) {
        var audio = new Audio(soundfile.currentSrc)
        audio.play()
      }
    }
  },
  textToSpeech: {
    speech: null,
    language: null, // If language is unset (userinfo.user.language), defaults to device language
    volume: 1,
    playVoice (text) {
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
