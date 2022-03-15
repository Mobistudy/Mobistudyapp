/**
 * Sweep sound generator.
 * Uses the browser auido synthetizer.
 */
export default {
  init () {
    let ContextClass = (window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext)

    if (ContextClass) {
      // Web Audio API is available.
      this.context = new ContextClass()
    } else {
      throw new Error('no audio available')
    }
  },
  sweep (freq1, freq2, duration, type, volume) {
    let currTime = this.context.currentTime
    let oscillator = this.context.createOscillator()
    let gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode()

    // oscillator.type = 0;
    oscillator.frequency.value = freq1

    oscillator.connect(gainNode)
    gainNode.connect(this.context.destination)

    let typeN = oscillator.type === parseInt(oscillator.type)

    if (type === 'sine') {
      typeN ? oscillator.type = 0 : oscillator.type = 'sine'
    } else if (type === 'square') {
      typeN ? oscillator.type = 1 : oscillator.type = 'square'
    } else if (type === 'sawtooth') {
      typeN ? oscillator.type = 2 : oscillator.type = 'sawtooth'
    } else if (type === 'triangle') {
      typeN ? oscillator.type = 3 : oscillator.type = 'triangle'
    } else {
      console.error('type unrecognized')
      return
    }

    oscillator.start ? oscillator.start(0) : oscillator.noteOn(0)

    gainNode.gain.value = volume
    // linear increase
    oscillator.frequency.linearRampToValueAtTime(freq1, currTime)

    // gainNode.gain.linearRampToValueAtTime(volume, currTime);

    oscillator.frequency.linearRampToValueAtTime(freq2, currTime + duration * 1)

    // gainNode.gain.linearRampToValueAtTime(volume, currTime + duration * 1);

    oscillator.stop ? oscillator.stop(currTime + duration * 1) : oscillator.noteOff(currTime + duration * 1)

  // oscillator.start(0);
  }
}
