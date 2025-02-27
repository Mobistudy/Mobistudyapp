import { Dialog } from 'quasar'

// Mock of the notifications, uses the browser notifcations API
export default {
  timeoutIDs: [],
  isAuthorized: false,
  clickListener: undefined,
  async hasPermission () {
    return this.isAuthorized
  },
  async requestPermission () {
    if (!this.isAuthorized) {
      return new Promise((resolve, reject) => {
        Dialog.create({
          title: 'Confirm',
          message: 'Allow this app to send notifications?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.isAuthorized = true
          resolve(this.isAuthorized)
        }).onCancel(() => {
          this.isAuthorized = false
          resolve(this.isAuthorized)
        }).onDismiss(() => {
          this.isAuthorized = false
          resolve(this.isAuthorized)
        })
      })
    } else return true
  },
  async schedule (obj) {
    for (const not of obj) {
      const millis = not.trigger.at.getTime() - (new Date().getTime())
      if (millis < 0) {
        // discard the notification, it's in the past
        continue
      }
      if (millis <= 2147483647) {
        console.log('NOTIFICATIONS - scheduling', not)
        // time difference in millis from trigger.at and now
        const timeoutID = setTimeout(() => {
          console.log('NOTIFICATIONS - trigger!')
          Dialog.create({
            title: 'Notification',
            message: not.text,
            cancel: true,
            persistent: true
          }).onOk(() => {
            console.log('accepted', this)
            console.log(this.clickListener)
            if (this.clickListener) this.clickListener()
          })
        }, millis)
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
    console.log('added notification listener')
  },
  unregisterNotificationsListener (callback, scope) {
    this.clickListener = undefined
  }
}
