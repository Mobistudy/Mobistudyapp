'use strict'

/**
* DAO from local storage
* Different implementations of local storage can be used, as long as they are promisified
*/

// use standard local storage for testst on browsers
import * as storage from './db_localStorage'
// use native local storage for apps
// import * as DB from './db_nativeStorage'

// TODO: the best solution would be including encryption, eg via https://www.npmjs.com/package/secure-web-storage

export async function emptyDB () {
  return storage.clear()
}

/* AUTHENTICATION */
export async function getUserSession () {
  return storage.getItem('session')
}

export async function setUserSession (session) {
  return storage.setItem('session', session)
}

export async function removeUserSession () {
  return storage.removeItem('session')
}

/* STUDY MANAGEMENT */
export async function getStudies () {
  let studyList = await storage.getItem('studies')
  if (studyList === null) {
    studyList = []
  }
  return studyList
}

export async function addStudy (studyKey, config) {
  let studyList = await getStudies()
  studyList.push({
    key: studyKey,
    start: new Date(),
    config: config
  })
  return storage.setItem('studies', studyList)
}

export async function setStudies (studies) {
  return storage.setItem('studies', studies)
}

export async function updateStudy (studyKey, config) {
  let studyList = await getStudies()
  let idx = studyList.findIndex(x => x.key === studyKey)
  if (idx !== -1) {
    let newStudy = {
      key: studyKey,
      start: studyList[idx].start,
      config: config
    }
    studyList.splice(idx, 1, newStudy)
    return storage.setItem('studies', studyList)
  } else {
    throw new Error('Study not found')
  }
}

export async function removeStudy (studyKey) {
  let studyList = await getStudies()
  let idx = studyList.findIndex(x => x.key === studyKey)
  if (idx !== -1) {
    studyList.splice(idx, 1)
    return storage.setItem('studies', studyList)
  } else {
    throw new Error('Study not found')
  }
}

/* DATA/QUESTIONNAIRE HANDLING */
export async function pushToServerQueue (obj) {
  let serverQueue = await storage.getItem('serverQueue')
  if (serverQueue === null) {
    serverQueue = []
  }
  serverQueue.push(obj)
  return storage.setItem('serverQueue', serverQueue)
}

export async function retrieveServerQueue () {
  let serverQueue = await storage.getItem('serverQueue')
  if (serverQueue === null) {
    return []
  } else {
    return serverQueue
  }
}

export function removeServerQueue () {
  return storage.removeItem('serverQueue')
}
