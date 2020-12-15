const storage = window.localStorage

const FAIL_INIT = false
const DB_CORRUPTED = false

export async function init () {
  if (FAIL_INIT) return Promise.reject()
  return Promise.resolve()
}

export async function getItem (key) {
  if (DB_CORRUPTED) {
    const event = new Event('dbcorrupted')
    document.dispatchEvent(event)
    return Promise.reject()
  }
  return Promise.resolve(JSON.parse(storage.getItem(key)))
}

export async function setItem (key, value) {
  return Promise.resolve(storage.setItem(key, JSON.stringify(value)))
}

export async function removeItem (key) {
  return Promise.resolve(storage.removeItem(key))
}

export async function clear () {
  return Promise.resolve(storage.clear())
}
