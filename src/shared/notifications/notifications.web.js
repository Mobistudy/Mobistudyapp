// Browser notifcations API
export default {
  timeoutIDs: [],
  clickListener: undefined,
  async hasPermission () {
    const isgranted = Notification.permission === 'granted'
    console.log('NOTIFICATIONS - permission for notifications?', isgranted)
    return isgranted
  },
  async requestPermission () {
    return new Promise((resolve, reject) => {
      Notification.requestPermission(function (permission) {
        const isgranted = (permission === 'granted')
        console.log('NOTIFICATIONS - requesting permission for notifications, granted?', isgranted)
        resolve(isgranted)
      })
    })
  },
  async schedule (obj) {
    for (const not of obj) {
      const millis = not.trigger.at.getTime() - Date.now()
      if (millis < 0) {
        // discard the notification, it's in the past
        continue
      }
      console.log('NOTIFICATIONS - scheduled ' + not.trigger.at + ' in ' + millis, not)
      if (millis <= 2147483647) {
        const timeoutID = setTimeout(function () {
          if (Notification && Notification.permission === 'granted') {
            new Notification('Mobistudy', {
              body: not.text
            }).addEventListener('click', () => {
              this.clickListener()
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
    for (const timeoutID of this.timeoutIDs) {
      clearTimeout(timeoutID)
    }
    console.log('NOTIFICATIONS - all notifications cancelled')
  },
  registerNotificationsListener (callback, scope) {
    this.clickListener = callback
    this.clickListener.bind(scope)
  },
  unregisterNotificationsListener (callback, scope) {
    this.clickListener = undefined
  }
}
