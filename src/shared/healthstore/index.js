// healthstore implementations

import HS from './healthstore'
import HSMock from './healthstore.mock'

let HSImpl = {}

if (process.env.HEALTHSTORE === 'MOCK') {
  HSImpl = HSMock
} else {
  HSImpl = HS
}

export default HSImpl
