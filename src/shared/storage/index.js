// storage implementations

import * as localStorage from './storage.local'
import * as mockStorage from './storage.mock'
import * as encryptedStorage from './storage.encrypted'

let StorageImpl = {}

if (process.env.API_ENDPOINT === 'MOCK') {
  StorageImpl = mockStorage
} else if (process.env.API_ENDPOINT === 'local') {
  StorageImpl = localStorage
} else {
  StorageImpl = encryptedStorage
}

export default StorageImpl
