'use strict'

// This wraps the HealthStore either from a mock or the actual implementation

import * as mockHS from './mockHealthstore'
import * as cordovaHS from './cordovaHealthstore'

let HS = {}
if (process.env.HEALTHSTORE === 'MOCK') {
  HS = Object.assign(mockHS, HS)
} else {
  HS = Object.assign(cordovaHS, HS)
}

export default HS
