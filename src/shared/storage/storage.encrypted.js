let storage
const namespace = 'DB_VERSION_1.0'

export async function init () {
  return new Promise((resolve, reject) => {
    storage = new cordova.plugins.SecureStorage(
      () => {
        resolve()
      },
      () => {
        reject()
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
          // data was not found, that's OK, resolve with undefined
          resolve()
        } else {
          // there was an issue accessing the DB
          if (error.message === 'Failed to obtain information about private key') {
            // the database has been corrupted!
            // dispatch an event so that it can be treated somehow
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
