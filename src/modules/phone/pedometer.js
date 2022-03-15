import { Dialog, Platform } from 'quasar'

let pedometer = {
  firstSteps: -1,
  async isAvailable () {
    return new Promise((resolve, reject) => {
      window.pedometer.isStepCountingAvailable(resolve, reject)
    })
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (Platform.is.ios) {
        window.pedometer.queryData(function (data) {
          resolve()
        }, function (data) {
          reject()
        }, {
          startDate: new Date(new Date().getTime() - 10000),
          endDate: new Date()
        })
      } else {
        // to make it more robust, it could stop updates before this
        // in case the updates are running (very unlikely)
        window.pedometer.startPedometerUpdates(function (data) {
          resolve()
          window.pedometer.stopPedometerUpdates()
        }, function (err) {
          reject(err)
        })
      }
    })
  },
  startNotifications (options, cbk, error) {
    this.firstSteps = -1
    window.pedometer.startPedometerUpdates((data) => {
      if (this.firstSteps === -1) {
        this.firstSteps = data.numberOfSteps - 1
      }
      data.numberOfSteps -= this.firstSteps
      cbk(data)
    }, error)
  },
  async stopNotifications () {
    return new Promise((resolve, reject) => {
      window.pedometer.stopPedometerUpdates(resolve, reject)
    })
  }
}

let pedometerMock = {
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
}

export {
  pedometer, pedometerMock
}
