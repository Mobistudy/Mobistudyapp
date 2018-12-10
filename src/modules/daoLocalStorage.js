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
export async function getStudiesParticipation () {
  return storage.getItem('studiesParticipation')
}

export async function setStudiesParticipation (studies) {
  return storage.setItem('studiesParticipation', studies)
}

export async function getStudyDescription (studyKey) {
  return storage.getItem('study_' + studyKey)
}

export async function setStudyDescription (studyKey, config) {
  return storage.setItem('study_' + studyKey, config)
}

export async function removeStudy (studyKey) {
  return storage.removeItem('study_' + studyKey)
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
