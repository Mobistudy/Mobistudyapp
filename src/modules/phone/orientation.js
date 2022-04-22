let orientation = {
  callback: undefined,
  startTS: 0,
  orientationHandler (event) {
    let simplifiedEvent = {
      msFromStart: new Date().getTime() - this.startTS,
      abs: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    }
    if (event.webkitCompassHeading) simplifiedEvent.heading = event.webkitCompassHeading
    if (event.webkitCompassAccuracy) simplifiedEvent.acc = event.webkitCompassAccuracy
    this.callback(simplifiedEvent)
  },
  async isAvailable () {
    if (typeof DeviceOrientationEvent !== 'undefined') return Promise.resolve(true)
    else return Promise.resolve(false)
  },
  async requestPermission () {
    if (typeof (DeviceOrientationEvent.requestPermission) === 'function') {
      return DeviceOrientationEvent.requestPermission()
    }
    return Promise.resolve(true)
  },
  startNotifications (options, cbk, error) {
    this.callback = cbk
    this.startTS = new Date().getTime()
    this.orientationHandler = this.orientationHandler.bind(this)
    window.addEventListener('deviceorientation', this.orientationHandler, false)
  },
  async stopNotifications () {
    window.removeEventListener('deviceorientation', this.orientationHandler)
    this.callback = null
  }
}

let orientationMock = {
  timer: undefined,
  startTS: 0,
  async isAvailable () {
    return Promise.resolve(true)
  },
  async requestPermission () {
    return Promise.resolve(true)
  },
  startNotifications (options, cbk, error) {
    this.startTS = new Date().getTime()
    this.timer = setInterval(() => {
      let fakeSmaple = Math.sin((new Date().getTime() / 1000) * 2 * Math.PI)
      cbk({
        msFromStart: new Date().getTime() - this.startTS,
        abs: fakeSmaple,
        alpha: fakeSmaple,
        beta: fakeSmaple,
        gamma: fakeSmaple
      })
    }, 500)
  },
  async stopNotifications () {
    clearInterval(this.timer)
    return Promise.resolve()
  }
}

export { orientation, orientationMock }
