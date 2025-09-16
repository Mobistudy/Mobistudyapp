const DEBUG = process.env.DEBUG

export default {
  async hasPermission () {
    return new Promise((resolve, reject) => {
      cordova.plugins.notification.local.hasPermission(resolve)
    })
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      if (DEBUG) console.log('requesting notification permission')
      cordova.plugins.notification.local.requestPermission(resolve)
    })
  },
  async schedule (obj) {
    return new Promise((resolve, reject) => {
      if (DEBUG) console.log('scheduling', obj)
      cordova.plugins.notification.local.schedule(obj, resolve)
    })
  },
  async cancelAll () {
    return new Promise((resolve, reject) => {
      if (DEBUG) console.log('canceling all notifications')
      cordova.plugins.notification.local.cancelAll(resolve)
    })
  },
  registerNotificationsListener (callback, scope) {
    // Possible events: add, trigger, click, clear, cancel, update, clearall and cancelall
    cordova.plugins.notification.local.on('trigger', callback, scope)
  },
  unregisterNotificationsListener (callback, scope) {
    cordova.plugins.notification.local.un('trigger', callback, scope)
  }
}
