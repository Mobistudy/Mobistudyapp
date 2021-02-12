'use strict'

let storage
let namespace = 'DB_VERSION_1.0'

export async function init () {
  // Hoping that doing a new init on the same namespace several times won't do any harm.
  return new Promise((resolve, reject) => {
    storage = new cordova.plugins.SecureStorage(
      () => {
        resolve()
      },
      () => {
        reject() // Sends storage variable back to be used to open screen lock
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
      () => {
        resolve()
      },
      () => {
        reject()
      },
      key,
      JSON.stringify(value)
    )
  })
}

export async function getItem (key) {
  return new Promise((resolve, reject) => {
    if (storage === undefined) {
      reject('Storage not initialized')
      return
    }
    storage.get(
      (value) => {
        resolve(JSON.parse(value))
      },
      (error) => {
        if (error.message.includes('not found') || error.message.includes('could not be found')) { // The left hand condition relates to Android and rightmost to iOS.
          resolve()
        } else {
          if (error.message === 'Failed to obtain information about private key') {
            // the database has been corrupted
            const event = new Event('dbcorrupted')
            document.dispatchEvent(event)
          }
          reject(error)
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
        resolve()
      },
      () => {
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
        resolve()
      },
      () => {
        reject()
      }
    )
  })
}
