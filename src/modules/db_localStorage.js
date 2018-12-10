var storage = window.localStorage

export async function getItem (key) {
  return JSON.parse(storage.getItem(key))
}

export async function setItem (key, value) {
  return storage.setItem(key, JSON.stringify(value))
}

export async function removeItem (key, value) {
  return storage.removeItem(key)
}

export async function clear () {
  return storage.clear()
}
