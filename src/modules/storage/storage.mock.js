'use strict'
// use these flags for testing:
const FAIL_INIT = false
const DB_CORRUPTED = false

let memStorage = {}

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
  if (memStorage[key]) return Promise.resolve(JSON.parse(memStorage[key]))
  else return Promise.resolve()
}

export async function setItem (key, value) {
  memStorage[key] = JSON.stringify(value)
  return Promise.resolve()
}

export async function removeItem (key) {
  delete memStorage[key]
  return Promise.resolve()
}

export async function clear () {
  memStorage = {}
  return Promise.resolve()
}
