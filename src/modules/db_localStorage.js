/* eslint-disable standard/no-callback-literal */

let storage = window.localStorage
let moment = require('moment')

/* AUTHENTICATION */
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

/* STUDY MANAGEMENT */
export function addStudy (studyKey) {
  return getStudies().then(function (studyList) {
    studyList.push({
      key: studyKey,
      start: moment().format()
    })
    storage.setItem('studies', JSON.stringify(studyList))
    return Promise.resolve(true)
  })
}

export function removeStudy (studyKey) {
  return getStudies().then(function (studyList) {
    let idx = studyList.findIndex(x => x.key === studyKey)
    if (idx !== -1) {
      studyList.splice(idx, 1)
      storage.setItem('studies', JSON.stringify(studyList))
      return Promise.resolve(true)
    } else {
      return Promise.reject(new Error('Study not found'))
    }
  })
}

export function getStudies () {
  let studyList = storage.getItem('studies')
  if (studyList === null) {
    studyList = []
  } else {
    studyList = JSON.parse(studyList)
  }
  return Promise.resolve(studyList)
}

/* DATA/QUESTIONNAIRE HANDLING */
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
