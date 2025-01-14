import { Dialog } from 'quasar'

const geolocation = {
  watchid: null,
  async isAvailable () {
    if ('geolocation' in navigator) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(() => {
        // got a position, permissions should be OK now
        resolve(true)
      }, (err) => {
        if (err.code !== 1) {
          // code 1 means no permissions
          // see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
          // in all other cases permissions should have been given
          resolve(true)
        } else {
          reject(err)
        }
      }, { timeout: 5000 })
    })
  },
  copyPosition (pos) {
    // we need to create a copy of the position object because
    // Chromium does something strange that is not serialisable as JSON
    const copyPos = {}
    // copyPos.timestamp = new Date().getTime() // use current timestamp because some phones mess up the timestamps
    copyPos.timestamp = new Date(pos.timestamp)
    copyPos.coords = {}
    copyPos.coords.latitude = pos.coords.latitude
    copyPos.coords.longitude = pos.coords.longitude
    copyPos.coords.altitude = pos.coords.altitude
    if (pos.coords.accuracy) copyPos.coords.accuracy = pos.coords.accuracy
    if (pos.coords.altitudeAccuracy) copyPos.coords.altitudeAccuracy = pos.coords.altitudeAccuracy
    if (pos.coords.heading) copyPos.coords.heading = pos.coords.heading
    if (pos.coords.speed) copyPos.coords.speed = pos.coords.speed
    return copyPos
  },
  startNotifications (options, cbk, error) {
    this.watchid = navigator.geolocation.watchPosition((position) => {
      const copyPos = this.copyPosition(position)
      cbk(copyPos)
    }, error, options)
  },
  async stopNotifications () {
    navigator.geolocation.clearWatch(this.watchid)
    return Promise.resolve()
  },
  async getCurrentPosition (options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const copyPos = this.copyPosition(position)
        resolve(copyPos)
      }, reject, options)
    })
  }
}

const geolocationMock = {
  timerid: null,
  async isAvailable () {
    return Promise.resolve(true)
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Confirm',
        message: 'Would you like to give access to the GPS?',
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
    const startLat = 51.751985
    const startLong = -1.257609
    let counter = 0
    this.timerid = setInterval(function () {
      counter++
      cbk({
        timestamp: new Date(),
        coords: {
          latitude: startLat + (counter * 2.1055e-6),
          longitude: startLong + (counter * 1.83055e-5),
          altitude: 69.82,
          accuracy: counter < 5 ? 60 : 10
        }
      })
    }, 1000)
  },
  async stopNotifications () {
    clearInterval(this.timerid)
    return Promise.resolve()
  },
  async getCurrentPosition () {
    return {
      timestamp: new Date().getTime(),
      coords: {
        latitude: 51.751985,
        longitude: -1.257609,
        altitude: 69.82,
        accuracy: 30
      }
    }
  }
}

export { geolocation, geolocationMock }
