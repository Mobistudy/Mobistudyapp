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

/* Profile */

export async function getProfile () {
  return storage.getItem('profile')
}

export async function setProfile (profile) {
  return storage.setItem('profile', profile)
}

/* STUDY MANAGEMENT */
export async function getStudiesParticipation () {
  return storage.getItem('studiesParticipation')
}

export async function setStudiesParticipation (studies) {
  return storage.setItem('studiesParticipation', studies)
}

export async function setTaskCompletion (studyKey, taskId, timestamp) {
  let studies = await storage.getItem('studiesParticipation')
  let sudyInd = studies.findIndex(x => x.studyKey === studyKey)
  if (!studies[sudyInd].tasksStatus) studies[sudyInd].tasksStatus = []
  let taksstatusInd = studies[sudyInd].tasksStatus.findIndex(x => x.taskId === taskId)
  if (taksstatusInd < 0) {
    // this case shouldn't happen really
    studies[sudyInd].tasksStatus.push({
      taskId: taskId, consented: true, lastExecuted: timestamp
    })
    taksstatusInd = 0
  } else {
    studies[sudyInd].tasksStatus[taksstatusInd].lastExecuted = timestamp
  }
  await setStudiesParticipation(studies)
  return Promise.resolve()
}

export async function getStudyDescription (studyKey) {
  return storage.getItem('study_' + studyKey)
  // return Promise.reject(new Error('test'))
}

export async function setStudyDescription (studyKey, config) {
  return storage.setItem('study_' + studyKey, config)
}

export async function removeStudy (studyKey) {
  return storage.removeItem('study_' + studyKey)
}

/* QUESTIONNAIRES/FORMS */
export async function getFormDescription (formkey) {
  return storage.getItem('form_' + formkey)
}

export async function setFormDescription (formkey, decription) {
  return storage.setItem('form_' + formkey, decription)
}

export async function removeFormDescription (formkey) {
  return storage.removeItem('form_' + formkey)
}
