let motion = {
  callback: undefined,
  motionHandler (event) {
    let simplifiedEvent = {
      timestamp: new Date().getTime(),
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
    this.motionHandler = this.motionHandler.bind(this)
    window.addEventListener('devicemotion', this.motionHandler, false)
  },
  async stopNotifications () {
    window.removeEventListener('devicemotion', this.motionHandler)
    this.callback = null
  }
}

let motionMock = {
  timer: null,
  async isAvailable () {
    return Promise.resolve(true)
  },
  async requestPermission () {
    return Promise.resolve(true)
  },
  startNotifications (options, cbk, error) {
    this.timer = setInterval(() => {
      let fakeSmaple = Math.sin((new Date().getTime() / 1000) * 2 * Math.PI)
      cbk({
        timestamp: new Date().getTime(),
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
