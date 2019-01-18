'use strict'

// This wraps the API either from a mock or the actual server

// import * as actualAPI from './mockAPI'
import * as actualAPI from './serverAPI'

let API = {}
API = Object.assign(actualAPI, API)

export default API
