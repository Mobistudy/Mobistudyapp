import moment from 'moment'
import { Platform } from 'quasar'

let notification

// mock the plugin when on browser
if (process.env.NOTIFICATIONS === 'MOCK') {
  // var sendNotification = function (text) {
  //   if (Notification && Notification.permission !== 'granted') {
  //     Notification.requestPermission(function (permission) {
  //       if (!('permission' in Notification)) {
  //         Notification.permission = permission
  //       }
  //       sendNotification(text)
  //     })
  //   } else {
  //     let notification = new Notification('Mobistudy', {
  //       body: text
  //     })
  //     notification.onclick = function () {
  //       parent.focus()
  //       window.focus()
  //       this.close()
  //     }
  //   }
  // }
  notification = {
    timeoutIDs: [],
    hasPermission (callback) {
      let isgranted = Notification.permission === 'granted'
      console.log('permission for notifications?', isgranted)
      callback(isgranted)
    },
    requestPermission (callback) {
      Notification.requestPermission(function (permission) {
        let isgranted = permission === 'granted'
        console.log('requesting permission for notifications, granted?', isgranted)
        callback(isgranted)
      })
    },
    schedule (nots, callback) {
      for (let not of nots) {
        let millis = moment(not.trigger.at).diff(moment())
        if (millis < 0) millis = 0
        console.log('notification scheduled ' + not.trigger.at + ' in ' + millis, not)
        if (millis <= 2147483647) {
          let timeoutID = setTimeout(function () {
            if (Notification && Notification.permission === 'granted') {
              Notification('Mobistudy', {
                body: not.text
              })
            }
          }, millis) // time difference in millis from trigger.at and now
          this.timeoutIDs.push(timeoutID)
        } else {
          // console.info('Notification too far in the future: ' + (millis / 86400000))
        }
      }
      callback()
    },
    cancelAll (callback) {
      for (let timeoutID of this.timeoutIDs) {
        clearTimeout(timeoutID)
      }
      console.log('all notifications cancelled')
      callback()
    }
  }
} else {
  notification = cordova.plugins.notification.local
}

export default {
  async hasPermission () {
    if (Platform.is.cordova) {
      // has permission does not make sense on Android and does not work on iOS
      // so we'll return immediately that we do not have permission if on iOS and
      // that we do have permission on Android
      if (Platform.is.android) return Promise.resolve(true)
      else return Promise.resolve(false)
    } else {
      // on web, it actually makes sense
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      // notification.registerPermission(resolve) ???
      notification.requestPermission(resolve)
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
