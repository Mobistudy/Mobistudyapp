import { Dialog } from 'quasar'

const motion = {
  callback: undefined,
  startTS: 0,
  motionHandler (event) {
    const simplifiedEvent = {
      msFromStart: new Date().getTime() - this.startTS,
      acc: {
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z
      },
      accG: {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
      },
      rotRate: {
        alpha: event.rotationRate.alpha,
        beta: event.rotationRate.beta,
        gamma: event.rotationRate.gamma
      },
      interval: event.interval
    }
    this.callback(simplifiedEvent)
  },
  async isAvailable () {
    if (typeof DeviceMotionEvent !== 'undefined') return Promise.resolve(true)
    else return Promise.resolve(false)
  },
  async requestPermission () {
    if (typeof (DeviceMotionEvent.requestPermission) === 'function') {
      return DeviceMotionEvent.requestPermission()
    } else return Promise.resolve(true)
  },
  startNotifications (options, cbk, error) {
    this.callback = cbk
    this.startTS = new Date().getTime()
    this.motionHandler = this.motionHandler.bind(this)
    window.addEventListener('devicemotion', this.motionHandler, false)
  },
  async stopNotifications () {
    window.removeEventListener('devicemotion', this.motionHandler)
    this.callback = null
  }
}

const motionMock = {
  timer: null,
  startTS: 0,
  async isAvailable () {
    return Promise.resolve(true)
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Confirm',
        message: 'Would you like to give access to motion sensors?',
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
    this.startTS = new Date().getTime()
    this.timer = setInterval(() => {
      const fakeSmaple = Math.sin((new Date().getTime() / 1000) * 2 * Math.PI)
      cbk({
        msFromStart: new Date().getTime() - this.startTS,
        acc: {
          x: fakeSmaple,
          y: fakeSmaple,
          z: fakeSmaple
        },
        accG: {
          x: fakeSmaple,
          y: fakeSmaple,
          z: fakeSmaple
        },
        rotRate: {
          alpha: fakeSmaple,
          beta: fakeSmaple,
          gamma: fakeSmaple
        },
        interval: 500
      })
    }, 500)
  },
  async stopNotifications () {
    clearInterval(this.timer)
    return Promise.resolve()
  }
}

export { motion, motionMock }
