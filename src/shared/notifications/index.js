// Notifications implementations

import nots from './notifications'
import notsMock from './notifications.mock'
import notsWeb from './notifications.web'

let notsImpl = {}

if (process.env.NOTIFICATIONS === 'MOCK') {
  notsImpl = notsMock
} else if (process.env.NOTIFICATIONS === 'WEB') {
  notsImpl = notsWeb
} else {
  notsImpl = nots
}

export default notsImpl
