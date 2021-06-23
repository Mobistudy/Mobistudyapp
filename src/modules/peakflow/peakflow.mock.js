import { Dialog } from 'quasar'

// simulates a device that sends absurd data
const SEND_BADDATA = false

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
        let pef
        if (SEND_BADDATA) pef = 12000
        else pef = 400 + Math.floor(Math.random() * 200)
        resolve({ pef })
      }, 5000)
    })
  },

  async stopMeasurement () {
    return Promise.resolve(true)
  }
}
