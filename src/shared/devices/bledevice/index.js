// BLE device implementations

import BLEWeb from './BLEDevice.web'
import BLEMock from './BLEDevice.mock'
import BLECordova from './BLEDevice.cordova'

let BLEImpl = {}

if (process.env.BLE === 'MOCK') {
  BLEImpl = BLEMock
} else if (process.env.BLE === 'WEB') {
  BLEImpl = BLEWeb
} else {
  BLEImpl = BLECordova
}

export default BLEImpl
