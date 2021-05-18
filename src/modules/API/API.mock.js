'use strict'
// MOCK API implementation
import study1234 from './mockdata/study1234'
import form1234 from './mockdata/form1234'
import study9999 from './mockdata/study9999'
import studyAAMOS from './mockdata/studyAAMOS.json'
import formAAMOSaboutasthma from './mockdata/formAAMOSaboutasthma.json'
import formAAMOSaboutyou from './mockdata/formAAMOSaboutyou.json'
import formAAMOSdaily from './mockdata/formAAMOSdaily.json'
import formAAMOSweekly from './mockdata/formAAMOSweekly.json'
import form9999 from './mockdata/form9999'
import form9999 from './mockdata/form9999Health'
import form9999 from './mockdata/form9999whoqol'
import participant from './mockdata/participant'

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
        token: 'asdasdasdasdasd'
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
      if (studyKey === '1234') {
        setTimeout(function () {
          resolve(study1234)
        }, 2000)
      } else if (studyKey === '9999') {
        setTimeout(function () {
          resolve(study9999)
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
          return s.studyKey === '1234'
        })
        if (!studyPart) resolve(['1234'])
        else resolve([])
      }, 100)
    })
  },

  // retrieves an invitational study based on a code
  async getInvitationalStudy (invitationalCode) {
    console.log('API - getting invitational study')
    return new Promise((resolve, reject) => {
      if (invitationalCode === study9999.invitationCode) {
        resolve(study9999)
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
      if (key === '1234') {
        setTimeout(function () {
          resolve(form1234)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '9999') {
        setTimeout(function () {
          resolve(form9999)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '9999Health') {
        setTimeout(function () {
          resolve(form9999)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '9999whoqol') {
        setTimeout(function () {
          resolve(form9999)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '2606718') {
        setTimeout(function () {
          resolve(formAAMOSaboutasthma)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '2613568') {
        setTimeout(function () {
          resolve(formAAMOSaboutyou)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '2608088') {
        setTimeout(function () {
          resolve(formAAMOSdaily)
        }, Math.floor(Math.random() * 2000))
      } else if (key === '2707817') {
        setTimeout(function () {
          resolve(formAAMOSweekly)
        }, Math.floor(Math.random() * 2000))
      } else {
        reject(new Error('Questionnaire not found'))
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
  }
}
