// Miband 3 implementations

import Miband from './miband3'
import MibandMock from './miband3.mock'

let MibandImpl = {}

if (process.env.BLE === 'MOCK') {
  MibandImpl = MibandMock
} else {
  MibandImpl = Miband
}

export default MibandImpl
