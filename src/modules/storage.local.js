const storage = window.localStorage

export async function init () {
  return Promise.resolve()
}

export async function getItem (key) {
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

export async function openScreenLockSettingsAndroid () {
  return Promise.resolve()
}
