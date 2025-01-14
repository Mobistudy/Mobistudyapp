// API implementations

import API from './API'
import APIMock from './API.mock'

let APIimpl = {}

if (process.env.API_ENDPOINT === 'MOCK') {
  APIimpl = APIMock
} else {
  APIimpl = API
}

export default APIimpl
