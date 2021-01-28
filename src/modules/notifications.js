import { Platform } from 'quasar'

export default {
  async hasPermission () {
    // has permission does not make sense on Android (android does not need permissions) and does not work on iOS
    // so we'll return immediately that we do not have permission if on iOS and
    // that we do have permission on Android
    if (Platform.is.android) return Promise.resolve(true)
    else return Promise.resolve(false)
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      // notification.registerPermission(resolve) ???
      cordova.plugins.notification.local.requestPermission(resolve)
    })
  },
  async schedule (obj) {
    return new Promise((resolve, reject) => {
      cordova.plugins.notification.local.schedule(obj, resolve)
    })
  },
  async cancelAll () {
    return new Promise((resolve, reject) => {
      cordova.plugins.notification.local.cancelAll(resolve)
    })
  }
}
