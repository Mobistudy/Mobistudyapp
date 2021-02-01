'use strict'

/**
* Simple DAO from local storage
* Different implementations of local storage can be used, as long as they are promisified
*/
import * as storage from 'modules/storage'

export default {

  async init () {
    return storage.init()
  },
  async emptyDB () {
    return storage.clear()
  },
  async emptyUserData () {
    let appversion = await storage.getItem('app_version')
    await storage.clear()
    // do not delete the app version, only delete user data
    await storage.setItem('app_version', appversion)
  },

  /* APP VERSION */
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
  async getStudyParticipationTaskItemConsent (studyKey) {
    let studyParticipation = await this.getStudyParticipation(studyKey)
    return (studyParticipation.taskItemsConsent)
  },
  async setStudyParticipation (studyPart) {
    let studies = await storage.getItem('studiesParticipation')
    let studyIndex = studies.findIndex(sp => sp.studyKey === studyPart.studyKey)
    console.log('Setting study:', studyIndex)
    studies[studyIndex] = studyPart
    return storage.setItem('studiesParticipation', studies)
  },
  async setStudiesParticipation (studies) {
    return storage.setItem('studiesParticipation', studies)
  },
  async setTaskCompletion (studyKey, taskId, timestamp) {
    if (!studyKey) throw new Error('studyKey must be specified')
    if (!taskId) throw new Error('taskId must be specified')
    if (!timestamp) throw new Error('timestamp must be specified')
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
  /* Study descriptions */
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
  async getTaskDescription (studyKey, taskId) {
    const studyDes = await this.getStudyDescription(studyKey)
    if (!studyDes) throw new Error('study with key ' + studyKey + ' does not exist')
    return studyDes.tasks.find(x => x.id === Number(taskId))
  },
  async getLastCompletedTaskDate (studyKey, taskId) {
    let taskItemConsent = await this.getStudyParticipationTaskItemConsent(studyKey)
    let lastCompleted = taskItemConsent.find(x => x.taskId === Number(taskId)).lastExecuted
    return lastCompleted
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
  },

  /* MIBAND3 */
  async setDeviceMiBand3 (device) {
    return storage.setItem('miband3', JSON.stringify(device))
  },
  async getDeviceMiBand3 () {
    let device = await storage.getItem('miband3')
    if (!device) return
    return JSON.parse(device)
  },
  async removeDeviceMiBand3 () {
    return storage.removeItem('miband3')
  },

  /* PO60 */

  async setDevicePO60 (device) {
    return storage.setItem('po60', JSON.stringify(device))
  },
  async getDevicePO60 () {
    let device = await storage.getItem('po60')
    if (!device) return
    return JSON.parse(device)
  },
  async removeDevicePO60 () {
    return storage.removeItem('po60')
  }
}
