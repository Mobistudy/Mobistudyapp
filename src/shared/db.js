/**
* Simple DAO from local storage
* Different implementations of local storage can be used, as long as they are promisified
*/
import * as storage from '@shared/storage/storage'

export default {

  async init () {
    return storage.init()
  },
  async emptyDB () {
    return storage.clear()
  },
  async emptyUserData () {
    console.log('Emptying user DB.')
    const appversion = await storage.getItem('app_version')
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
    const studies = await storage.getItem('studiesParticipation')
    return studies.find(sp => sp.studyKey === studyKey)
  },
  async getStudyParticipationTaskItemConsent (studyKey, taskId) {
    if (!studyKey) throw new Error('studyKey must be specified')
    if (!taskId) throw new Error('taskId must be specified')
    const studyParticipation = await this.getStudyParticipation(studyKey)
    return studyParticipation.taskItemsConsent.find(x => x.taskId === Number(taskId))
  },
  async setStudyParticipation (studyPart) {
    const studies = await storage.getItem('studiesParticipation')
    const studyIndex = studies.findIndex(sp => sp.studyKey === studyPart.studyKey)
    studies[studyIndex] = studyPart
    return storage.setItem('studiesParticipation', studies)
  },
  async setStudiesParticipation (studies) {
    return storage.setItem('studiesParticipation', studies)
  },
  async setStudyParticipationTaskItemConsent (studyKey, taskId, task) {
    if (!studyKey) throw new Error('studyKey must be specified')
    if (!taskId) throw new Error('taskId must be specified')
    if (!task) throw new Error('task must be specified')
    const studies = await storage.getItem('studiesParticipation')
    const sudyInd = studies.findIndex(x => x.studyKey === studyKey)
    if (!studies[sudyInd].taskItemsConsent) studies[sudyInd].taskItemsConsent = []
    let taksstatusInd = studies[sudyInd].taskItemsConsent.findIndex(x => x.taskId === taskId)
    if (taksstatusInd < 0) {
      // this case shouldn't happen really
      studies[sudyInd].taskItemsConsent.push(task)
      taksstatusInd = 0
    } else {
      studies[sudyInd].taskItemsConsent[taksstatusInd] = task
    }
    return this.setStudiesParticipation(studies)
  },
  async setTaskCompletion (studyKey, taskId, timestamp) {
    const task = await this.getStudyParticipationTaskItemConsent(studyKey, taskId)
    task.lastExecuted = timestamp
    return this.setStudyParticipationTaskItemConsent(studyKey, taskId, task)
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
    return storage.setItem('miband3', device)
  },
  async getDeviceMiBand3 () {
    return storage.getItem('miband3')
  },
  async removeDeviceMiBand3 () {
    return storage.removeItem('miband3')
  },

  /* PO60 */
  async setDevicePO60 (device) {
    return storage.setItem('po60', device)
  },
  async getDevicePO60 () {
    return storage.getItem('po60')
  },
  async removeDevicePO60 () {
    return storage.removeItem('po60')
  },

  /* Peak flow */
  async addPastPeakFlowMeas (pef) {
    // check if existing
    let data = await storage.getItem('peakflow')
    if (!data) {
      data = []
    }
    data.push(pef)

    return storage.setItem('peakflow', data)
  },
  async getPastPeakFlowMeas () {
    return storage.getItem('peakflow')
  },
  async removePastPeakFlowMeas () {
    return storage.removeItem('peakflow')
  }
}
