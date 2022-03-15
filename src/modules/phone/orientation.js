let orientation = {
  callback: undefined,
  orientationHandler (event) {
    let simplifiedEvent = {
      timestamp: new Date().getTime(),
      abs: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    }
    if (event.webkitCompassHeading) simplifiedEvent.heading = event.webkitCompassHeading
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
