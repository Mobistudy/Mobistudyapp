import moment from 'moment'

let notification
if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.notification && cordova.plugins.notification.local) {
  notification = cordova.plugins.notification.local
}
// mock the plugin when on browser
if (!notification) {
  var sendNotification = function (text) {
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission(function (permission) {
        if (!('permission' in Notification)) {
          Notification.permission = permission
        }
        sendNotification(text)
      })
    } else {
      let notification = new Notification('Mobistudy', {
        body: text
      })
      notification.onclick = function () {
        parent.focus()
        window.focus()
        this.close()
      }
    }
  }
  notification = {
    timeoutIDs: [],
    hasPermission (callback) {
      let isgranted = Notification.permission === 'granted'
      callback(isgranted)
    },
    requestPermission (callback) {
      Notification.requestPermission(function (permission) {
        let isgranted = permission === 'granted'
        callback(isgranted)
      })
    },
    schedule (obj, callback) {
      let millis = moment(obj.trigger.at).diff(moment())
      if (millis < 0) millis = 0
      console.log('Notification mockup scheduled in ' + millis, obj)
      if (millis <= 2147483647) {
        let timeoutID = setTimeout(function () {
          if (Notification && Notification.permission === 'granted') {
            Notification('Mobistudy', {
              body: obj.text
            })
          }
        }, millis) // time difference in millis from trigger.at and now
        this.timeoutIDs.push(timeoutID)
      } else {
        console.info('Notification too far in the future: ' + (millis / 86400000))
      }
      callback()
    },
    cancelAll (callback) {
      for (let timeoutID of this.timeoutIDs) {
        clearTimeout(timeoutID)
      }
      callback()
    }
  }
}

export default {
  async hasPermission () {
    return new Promise((resolve, reject) => {
      notification.hasPermission(resolve)
    })
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      notification.requestPermission(function (isgranted) {
        if (isgranted) resolve()
        else reject(new Error('No permissions'))
      })
    })
  },
  async schedule (obj) {
    return new Promise((resolve, reject) => {
      notification.schedule(obj, resolve)
    })
  },
  async cancelAll () {
    return new Promise((resolve, reject) => {
      notification.cancelAll(resolve)
    })
  }
}
