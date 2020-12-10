'use strict'

let storage
let namespace = 'DB_VERSION_1.0'

export async function init () {
  // Hoping that doing a new init on the same namespace several times won't do any harm.
  return new Promise((resolve, reject) => {
    storage = new cordova.plugins.SecureStorage(
      () => {
        console.log('Secure storage init success')
        resolve()
      },
      () => {
        console.log('Secure storage init failure')
        reject(storage) // Sends storage variable back to be used to open screen lock
      },
      namespace
    )
  })
}

export async function setItem (key, value) {
  return new Promise((resolve, reject) => {
    if (storage === undefined) {
      reject()
      return
    }
    storage.set(
      (key) => {
        console.log('Secure storage setItem success with key:', key)
        resolve()
      },
      (error) => {
        console.error('Secure storage setItem error:', error)
        reject()
      },
      key,
      JSON.stringify(value)
    )
  })
}

export async function getItem (key) {
  console.log('Getting item using key:', key)
  return new Promise((resolve, reject) => {
    if (storage === undefined) {
      reject('Storage not initialized')
      return
    }
    storage.get(
      (value) => {
        console.log('Secure storage getItem success')
        console.log('Item retreived:', value)
        resolve(JSON.parse(value))
      },
      (error) => {
        console.error('Secure storage getItem failure', error)
        console.log('Error printed', error.message)
        if (error.message.includes('not found') || error.message.includes('could not be found')) { // The left hand condition relates to Android and rightmost to iOS.
          resolve()
        } else {
          if (error.message.includes('Failed to obtain information')) { // TODO: Storage bug
            reject()
          } else {
            reject()
          }
        }
      },
      key
    )
  })
}

export async function removeItem (key) {
  return new Promise((resolve, reject) => {
    if (storage === undefined) {
      reject('Storage not initialized')
      return
    }
    storage.remove(
      () => {
        console.log('Secure storage removeItem success')
        resolve()
      },
      () => {
        console.log('Secure storage removeItem failure')
        reject()
      },
      key
    )
  })
}

export async function clear () {
  return new Promise((resolve, reject) => {
    if (storage === undefined) {
      reject('Storage not initialized')
      return
    }
    storage.clear(
      () => {
        console.log('Secure storage clear success')
        resolve()
      },
      () => {
        console.log('Secure storage clear failure')
        reject()
      }
    )
  })
}

export async function openScreenLockSettingsAndroid () {
  return new Promise((resolve, reject) => {
    storage.secureDevice(
      () => {
        console.log('Resolved')
        resolve()
      },
      () => {
        console.log('Rejected')
        reject()
      })
  })
}
