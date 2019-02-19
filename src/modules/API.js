'use strict'

// This wraps the API either from a mock or the actual server

import * as mockAPI from './mockAPI'
import * as serverAPI from './serverAPI'

let API = {}
if (process.env.API_ENDPOINT === 'MOCK') {
  API = Object.assign(mockAPI, API)
} else {
  API = Object.assign(serverAPI, API)
}

export default API
