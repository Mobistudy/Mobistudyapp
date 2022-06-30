// Mock of the notifications, uses the browser notifcations API
export default {
  timeoutIDs: [],
  async hasPermission () {
    let isgranted = Notification.permission === 'granted'
    console.log('NOTIFICATIONS - permission for notifications?', isgranted)
    return isgranted
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      Notification.requestPermission(function (permission) {
        let isgranted = (permission === 'granted')
        console.log('NOTIFICATIONS - requesting permission for notifications, granted?', isgranted)
        resolve(isgranted)
      })
    })
  },
  async schedule (obj) {
    for (let not of obj) {
      let millis = not.trigger.at.getTime() - Date.now()
      if (millis < 0) {
        // discard the notification, it's in the past
        continue
      }
      console.log('NOTIFICATIONS - scheduled ' + not.trigger.at + ' in ' + millis, not)
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
  },
  async cancelAll () {
    for (let timeoutID of this.timeoutIDs) {
      clearTimeout(timeoutID)
    }
    console.log('NOTIFICATIONS - all notifications cancelled')
  }
}
