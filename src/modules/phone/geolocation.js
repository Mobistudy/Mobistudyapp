import { Dialog } from 'quasar'

let geolocation = {
  watchid: null,
  async isAvailable () {
    if (typeof navigator.geolocation === 'undefined') return Promise.resolve(false)
    else return Promise.resolve(true)
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
      }, { timeout: 2000 })
    })
  },
  startNotifications (options, cbk, error) {
    this.watchid = navigator.geolocation.watchPosition((position) => {
      // we need to create a copy of the position object because
      // Chromium does something strange that is not serialisable as JSON
      var copyPos = {}
      copyPos.timestamp = new Date().getTime() // use current timestamp because some phones mess up the timestamps
      copyPos.coords = {}
      copyPos.coords.latitude = position.coords.latitude
      copyPos.coords.longitude = position.coords.longitude
      copyPos.coords.altitude = position.coords.altitude
      if (position.coords.accuracy) copyPos.coords.accuracy = position.coords.accuracy
      if (position.coords.altitudeAccuracy) copyPos.coords.altitudeAccuracy = position.coords.altitudeAccuracy
      if (position.coords.heading) copyPos.coords.heading = position.coords.heading
      if (position.coords.speed) copyPos.coords.speed = position.coords.speed

      cbk(copyPos)
    }, error, options)
  },
  async stopNotifications () {
    navigator.geolocation.clearWatch(this.watchid)
    return Promise.resolve()
  },
  async getCurrentPosition () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }
}

let geolocationMock = {
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
    let startLat = 51.751985
    let startLong = -1.257609
    let counter = 0
    this.timerid = setInterval(function () {
      counter++
      cbk({
        timestamp: new Date().getTime(),
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
