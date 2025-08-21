// JStyle implementations

import JStyle2025 from './jStyle2025'
import JStyle2025Mock from './JStyle2025.mock'

let JStyleImpl = {}

if (process.env.BLE === 'MOCK') {
  JStyleImpl = JStyle2025Mock
} else {
  JStyleImpl = JStyle2025
}

export default JStyleImpl
