import { Dialog, Platform } from 'quasar'

const pedometer = {
  firstSteps: -1,
  async isAvailable () {
    return new Promise((resolve, reject) => {
      window.pedometer.isStepCountingAvailable(resolve, reject)
    })
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (Platform.is.ios) {
        // on iOS we can use the query of old data,
        // so no need to wait for actual steps
        window.pedometer.queryData(function (data) {
          resolve()
        }, function () {
          reject()
        }, {
          // query the last 5 hours
          startDate: new Date(new Date().getTime() - 18000000),
          endDate: new Date()
        })
      } else {
        // TODO: to make it more robust, it could stop updates before this
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
      data.startDate = new Date(data.startDate)
      data.endDate = new Date(data.endDate)
      cbk(data)
    }, error)
  },
  async stopNotifications () {
    return new Promise((resolve, reject) => {
      window.pedometer.stopPedometerUpdates(resolve, reject)
    })
  }
}

const pedometerMock = {
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
        startDate: new Date(),
        endDate: new Date(),
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
