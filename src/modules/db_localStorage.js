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

export function pushToServerQueue (obj) {
  let serverQueue = storage.getItem('serverQueue')
  if (serverQueue === null) {
    serverQueue = []
  } else {
    serverQueue = JSON.parse(serverQueue)
  }
  serverQueue.push(obj)
  storage.setItem('serverQueue', JSON.stringify(serverQueue))
  return Promise.resolve(true)
}

export function retrieveServerQueue () {
  let serverQueue = storage.getItem('serverQueue')
  if (serverQueue === null) {
    return Promise.resolve([])
  } else {
    return Promise.resolve(JSON.parse(serverQueue))
  }
}

export function clearServerQueue () {
  storage.removeItem('serverQueue')
  return Promise.resolve(true)
}
