import { Dialog } from 'quasar'

// MOCK smart peak flow meter
export default {

  async requestPermission () {
    // return Promise.resolve(false)
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

  async startCalibration () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
  },

  async stopCalibration () {
    return Promise.resolve()
  },

  async startMeasurement () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          pef: Math.floor(Math.random() * 1000)
        })
      }, 5000)
    })
  },

  async stopMeasurement () {
    return Promise.resolve(true)
  }
}
