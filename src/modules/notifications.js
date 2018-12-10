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
      let notification = new Notification(text, {
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
    schedule (obj) {
      console.log('Notification mockup - ', obj)
      setTimeout(() => {
        sendNotification(obj.text)
      }, moment(obj.trigger.at).diff(moment())) // time difference in millis from trigger.at and now
    }
  }
}

export default notification
