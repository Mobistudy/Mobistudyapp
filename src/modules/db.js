'use strict'

/**
* Simple DAO from local storage
* Different implementations of local storage can be used, as long as they are promisified
*/

// use standard local storage for testst on browsers
import * as storage from './db_localStorage'
// use native local storage for apps
// import * as DB from './db_nativeStorage'

// TODO: the best solution would be including encryption, eg via https://www.npmjs.com/package/secure-web-storage

export default {
  version: 'localStorage',
  async emptyDB () {
    // TODO: we need to keep app_version and other non-user dependant variables !!!
    return storage.clear()
  },
  async getCurrentAppVersion () {
    return storage.getItem('app_version')
  },
  async setCurrentAppVersion (version) {
    return storage.setItem('app_version', version)
  },
  /* AUTHENTICATION */
  async getUserSession () {
    return storage.getItem('session')
  },
  async setUserSession (session) {
    return storage.setItem('session', session)
  },
  async removeUserSession () {
    return storage.removeItem('session')
  },

  /* STUDY MANAGEMENT */
  async getStudiesParticipation () {
    return storage.getItem('studiesParticipation')
  },
  async getStudyParticipation (studyKey) {
    let studies = await storage.getItem('studiesParticipation')
    return studies.find(sp => sp.studyKey === studyKey)
  },
  async setStudyParticipation (studyPart) {
    let studies = await storage.getItem('studiesParticipation')
    let studyIndex = studies.findIndex(sp => sp.studyKey === studyPart.studyKey)
    studies[studyIndex] = studyPart
    return storage.setItem('studiesParticipation', studies)
  },
  async setStudiesParticipation (studies) {
    return storage.setItem('studiesParticipation', studies)
  },
  async setTaskCompletion (studyKey, taskId, timestamp) {
    let studies = await storage.getItem('studiesParticipation')
    let sudyInd = studies.findIndex(x => x.studyKey === studyKey)
    if (!studies[sudyInd].taskItemsConsent) studies[sudyInd].taskItemsConsent = []
    let taksstatusInd = studies[sudyInd].taskItemsConsent.findIndex(x => x.taskId === taskId)
    if (taksstatusInd < 0) {
      // this case shouldn't happen really
      studies[sudyInd].taskItemsConsent.push({
        taskId: taskId, consented: true, lastExecuted: timestamp
      })
      taksstatusInd = 0
    } else {
      studies[sudyInd].taskItemsConsent[taksstatusInd].lastExecuted = timestamp
    }
    await this.setStudiesParticipation(studies)
    return Promise.resolve()
  },
  async getStudyDescription (studyKey) {
    return storage.getItem('study_' + studyKey)
    // return Promise.reject(new Error('test'))
  },
  async setStudyDescription (studyKey, config) {
    return storage.setItem('study_' + studyKey, config)
  },
  async removeStudy (studyKey) {
    return storage.removeItem('study_' + studyKey)
  },

  /* FORMS */
  async getFormDescription (formkey) {
    return storage.getItem('form_' + formkey)
  },
  async setFormDescription (formkey, decription) {
    return storage.setItem('form_' + formkey, decription)
  },
  async removeFormDescription (formkey) {
    return storage.removeItem('form_' + formkey)
  }
}
