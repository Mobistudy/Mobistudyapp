import { Dialog, Platform } from 'quasar'

let audioRecorder = {
  /**
     * Checks if the audio capture is installed
     * @returns a promise
     */
  async isAvailable () {
    if (typeof (window.audioinput) === 'undefined') return Promise.resolve(false)
    else return Promise.resolve(true)
  },
  /**
     * Requests permissions to access microphone
     * @returns a promise
     */
  async requestPermission () {
    return new Promise((resolve, reject) => {
      window.audioinput.checkMicrophonePermission(function (hasPermission) {
        if (hasPermission) {
          resolve()
        } else {
          window.audioinput.getMicrophonePermission(function (hasPermission) {
            if (hasPermission) {
              resolve()
            } else {
              reject()
            }
          })
        }
      })
    })
  },
  /**
     * Starts the audio recording on a file
     * @param {object} options - object describing options
     * { fileName : 'name of the file to be saved', folder: 'cache' (default) or 'shared' }
     * @param {function} cbk - callback containing sound samples, currently unused
     * @param {function} error - callback for when error happen
     */
  startRecording (options, cbk, error) {
    // reject the start if an error occurrs during start
    window.addEventListener('audioinputerror', error, false)

    // select folder
    let folder = cordova.file.cacheDirectory
    if (options && options.folder === 'shared') {
      if (Platform.is.ios) folder = window.cordova.file.documentsDirectory
      else folder = window.cordova.file.externalDataDirectory
    }

    if (!options || !options.fileName) throw new Error('A sound filename must be passed in the options')
    let filename = options.fileName

    var captureCfg = {
      sampleRate: window.audioinput.SAMPLERATE.CD_AUDIO_44100Hz,
      bufferSize: 8192,
      channels: 1,
      format: window.audioinput.FORMAT.PCM_16BIT,
      audioSourceType: window.audioinput.AUDIOSOURCE_TYPE.DEFAULT,
      fileUrl: folder + filename,
      streamToWebAudio: false
    }

    window.audioinput.initialize(captureCfg, () => {
      // Start the capture
      window.audioinput.start(captureCfg)
    })
  },
  /**
   * Stops the audio recording
   */
  async stopRecording () {
    window.audioinput.stop()
  }
}

let audioRecorderMock = {
  async isAvailable () {
    return Promise.resolve(true)
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Confirm',
        message: 'Would you like to give access to the microphone?',
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
  startRecording (options, cbk, error) {
    window.localStorage.setItem(options.folder + '_' + options.fileName, 'aaaaaa')
    return true
  },
  async stopRecording () {
    return Promise.resolve(true)
  }
}

export { audioRecorder, audioRecorderMock }
