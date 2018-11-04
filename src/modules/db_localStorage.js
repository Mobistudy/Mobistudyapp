/* eslint-disable standard/no-callback-literal */

let storage = window.localStorage

export function getUserSession () {
  let session = storage.getItem('session')
  if (typeof session !== 'undefined') {
    return Promise.resolve(JSON.parse(session))
  } else {
    return Promise.resolve(false)
  }
}

export function setUserSession (session) {
  storage.setItem('session', JSON.stringify(session))
  return Promise.resolve(true)
}

export function rmUserSession () {
  storage.removeItem('session')
  return Promise.resolve(true)
}
