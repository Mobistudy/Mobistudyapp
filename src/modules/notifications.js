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
    schedule (obj) {
      let millis = moment(obj.trigger.at).diff(moment())
      if (millis < 0) millis = 0
      console.log('Notification mockup scheduled in ' + millis, obj)
      setTimeout(function () {
        console.info('Notification mockup!!! ' + obj.text)
        // if (Notification && Notification.permission === 'granted') {
        //   Notification('Mobistudy', {
        //     body: obj.text
        //   })
        // }
      }, millis) // time difference in millis from trigger.at and now
    }
  }
}

export default notification
