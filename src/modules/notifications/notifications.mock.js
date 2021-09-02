import { Dialog } from 'quasar'

// Mock of the notifications, uses the browser notifcations API
export default {
  timeoutIDs: [],
  isAuthorized: false,

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
    for (let not of obj) {
      let millis = not.trigger.at.getTime() - (new Date().getTime())
      if (millis < 0) {
        // discard the notification, it's in the past
        continue
      }
      if (millis <= 2147483647) {
        let timeoutID = setTimeout(function () {
          Dialog.create({
            title: 'Notification',
            message: not.text,
            cancel: true,
            persistent: true
          })
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
    console.log('all notifications cancelled')
  }
}
