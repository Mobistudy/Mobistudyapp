'use strict'

// This wraps the API either from a mock or the actual server

import * as mockAPI from './mockAPI'

let API = {}
API = Object.assign(mockAPI, API)

export default API
