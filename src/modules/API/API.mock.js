'use strict'
// MOCK API implementation
import studyTest from './mockdata/studyTest'
import formTest from './mockdata/formTest'

import studyLindangen from './mockdata/studyLindngen'
import formLindangenCovid from './mockdata/formLindangenCovid'
import formLindangenHealth from './mockdata/formLindangenHealth'
import formLindangenQoL from './mockdata/formLindangenQoL'

import studyAAMOS from './mockdata/studyAAMOS.json'
import formAAMOSdaily from './mockdata/formAAMOSdaily.json'
import formAAMOSweekly from './mockdata/formAAMOSweekly.json'

import participant from './mockdata/participant'
import environmentmock from './mockdata/environment'

export default {

  setToken (token) {
    console.log('API - Setting token: ' + token)
  },

  unsetToken () {
    console.log('API - Unsetting token')
  },

  // Logging in
  async login (email, password) {
    if (email !== 'jameson@test.test' || password !== 'moon landing') {
      let err = new Error('bad credentials')
      err.response = { status: 401 }
      throw err
    } else {
      console.log('API - Logging in')
      return {
        _key: '1231232',
        email: 'jameson@test.test',
        token: 'asdasdasdasdasd',
        role: 'participant'
      }
    }
  },

  // Registration
  async registerUser (email, password) {
    console.log('API - Registering user')
    return true
  },

  // Password reset
  async resetPW (email) {
    console.log('API - Reset password for email', email)
    return true
  },

  // Change password
  async changePW (token, newpw) {
    console.log('API - change PWD')
    return Promise.resolve(true)
  },

  async searchDiseaseConcept (disease, lang) {
    console.log('API - searching for', disease)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (disease.toLowerCase().indexOf('hea') !== -1) {
          resolve([
            {
              term: 'heart failure',
              conceptId: '123456',
              vocabulary: 'SNOMED'
            },
            {
              term: 'congenital heart disease',
              conceptId: '172635',
              vocabulary: 'SNOMED'
            }
          ])
        }
        if (disease.toLowerCase().indexOf('cop') !== -1) {
          resolve([
            {
              term: 'COPD',
              conceptId: '13645005',
              vocabulary: 'SNOMED'
            }
          ])
        }
        if (disease.toLowerCase().indexOf('ast') !== -1) {
          resolve([
            {
              term: 'asthma',
              conceptId: '987653',
              vocabulary: 'SNOMED'
            }
          ])
        }
        resolve([])
      }, 1000)
    })
  },

  async searchMedicationConcept (medication, lang) {
    console.log('API - searching for', medication)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (medication.toLowerCase().indexOf('asp') !== -1) {
          resolve([
            {
              term: 'aspirin',
              conceptId: '126374',
              vocabulary: 'SNOMED'
            }
          ])
        }
        resolve([])
      }, 1000)
    })
  },

  // Create the participant profile
  async createProfile (profile) {
    console.log('API - Profile created', profile)
    return true
  },

  // Get the participant profile
  async getProfile (userKey) {
    console.log('API - Profile ', participant)
    return participant
  },

  // Updating details
  async updateProfile (profile) {
    console.log('API - Profile updated', profile)
    return true
  },

  // Permanently delete the user
  async deleteUser (userKey) {
    console.log('API - Permanently delete user')
    return true
  },

  // update status of a study
  async updateStudyStatus (userKey, studyKey, studyParticipation) {
    console.log('API - Study status updated', studyParticipation)
    let found = false
    for (let i = 0; i < participant.studies.length; i++) {
      if (participant.studies[i].studyKey === studyKey) {
        participant.studies[i] = studyParticipation
        found = true
      }
    }
    if (!found) participant.studies.push(studyParticipation)
    return true
  },

  // update status of a task item consent
  updateTaskItemConsent: async function (studyKey, taskId, taskItemConsent) {
    console.log('API - Study task item consent', taskItemConsent)
    let study = participant.studies.find((s) => {
      return s._key === studyKey
    })
    if (study) {
      let taskI = study.taskItemsConsent.findIndex(t => {
        return t.taskId === taskId
      })
      if (taskI) study.taskItemsConsent[taskI] = taskItemConsent
    }
    return true
  },

  async getStudyDescription (studyKey) {
    console.log('API- getting study ' + studyKey)
    return new Promise(function (resolve, reject) {
      if (studyKey === studyTest._key) {
        setTimeout(function () {
          resolve(studyTest)
        }, 2000)
      } else if (studyKey === studyLindangen._key) {
        setTimeout(function () {
          resolve(studyLindangen)
        }, 1000)
      } else if (studyKey === studyAAMOS._key) {
        setTimeout(function () {
          resolve(studyAAMOS)
        }, 1000)
      } else {
        setTimeout(function () {
          reject(new Error('Study ' + studyKey + ' not found'))
        }, 500)
      }
    })
  },

  async getNewStudiesKeys () {
    console.log('API - getting new study')
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        let studyPart = participant.studies.find((s) => {
          return s.studyKey === studyTest._key
        })
        if (!studyPart) resolve([studyTest._key])
        else resolve([])
      }, 100)
    })
  },

  // retrieves an invitational study based on a code
  async getInvitationalStudy (invitationalCode) {
    console.log('API - getting invitational study')
    return new Promise((resolve, reject) => {
      if (invitationalCode === studyLindangen.invitationCode) {
        resolve(studyLindangen)
      } else if (invitationalCode === studyAAMOS.invitationCode) {
        resolve(studyAAMOS)
      } else {
        let err = new Error('Cannot retrieve invitational study based on code.')
        err.response = { status: 400 }
        reject(err)
      }
    })
  },

  async getForm (key) {
    console.log('API - getting form', key)
    return new Promise(function (resolve, reject) {
      if (key === formTest._key) {
        setTimeout(function () {
          resolve(formTest)
        }, Math.floor(1000))
      } else if (key === formLindangenCovid._key) {
        setTimeout(function () {
          resolve(formLindangenCovid)
        }, Math.floor(1000))
      } else if (key === formLindangenHealth._key) {
        setTimeout(function () {
          resolve(formLindangenHealth)
        }, Math.floor(1000))
      } else if (key === formLindangenQoL._key) {
        setTimeout(function () {
          resolve(formLindangenQoL)
        }, Math.floor(1000))
      } else if (key === formAAMOSdaily._key) {
        setTimeout(function () {
          resolve(formAAMOSdaily)
        }, Math.floor(1000))
      } else if (key === formAAMOSweekly._key) {
        setTimeout(function () {
          resolve(formAAMOSweekly)
        }, Math.floor(1000))
      } else {
        reject(new Error('Questionnaire not found ' + key))
      }
    })
  },

  setTaskDone (studyKey, taskId, timestamp) {
    let study = participant.studies.find((s) => {
      return s.studyKey === studyKey
    })
    if (study) {
      let taskItem = study.taskItemsConsent.find(ti => ti.taskId === taskId)
      if (taskItem) {
        taskItem.lastExecuted = timestamp
      }
    } else {
      throw new Error(`Study ${studyKey} not found in participant profile`)
    }
  },

  async sendAnswers (answers) {
    console.log('API - sending answers', answers)
    this.setTaskDone(answers.studyKey, answers.taskId, answers.createdTS)
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000)
    })
  },

  async sendDataQuery (data) {
    console.log('API - sending query data', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  },

  async sendSMWTData (report) {
    console.log('API - sending 6MWT data', report)
    this.setTaskDone(report.studyKey, report.taskId, report.createdTS)
    return Promise.resolve()
  },

  async sendQCSTData (report) {
    console.log('API - sending QCST data', report)
    this.setTaskDone(report.studyKey, report.taskId, report.createdTS)
    return Promise.resolve()
  },

  async sendMiBand3Data (data) {
    console.log('API - sending miband3 data', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  },

  async sendPO60Data (data) {
    console.log('API - sending po60 data', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  },

  async sendPosition (data) {
    console.log('API - sending position', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  },

  async getEnvironmentFromPosition (lat, long) {
    console.log('API - getting environment', lat, long)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(environmentmock)
      }, 1500)
    })
  },

  async sendPeakFlow (data) {
    console.log('API - sending peakflow data', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  },

  async sendFingerTappingData (data) {
    console.log('API - sending tapping data', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  }
}
