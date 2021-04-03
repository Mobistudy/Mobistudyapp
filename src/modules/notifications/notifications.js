
export default {
  async hasPermission () {
    return new Promise((resolve, reject) => {
      cordova.plugins.notification.local.hasPermission(resolve)
    })
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
