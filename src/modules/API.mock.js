'use strict'
// MOCK API implementation
import study1234 from './mockdata/study1234.js'
import form1234 from './mockdata/form1234.js'
import study9999 from './mockdata/study9999.js'
import form9999 from './mockdata/form9999.js'
import participant from './mockdata/participant.js'

export default {

  setToken (token) {
    console.log('API - Setting token: ' + token)
  },

  unsetToken () {
    console.log('API - Unsetting token')
  },

  // Logging in
  async login (email, password) {
    if (email !== 'jameson@test.test' || password !== 'outerZpace') {
      let err = new Error('bad credentials')
      err.response = { status: 401 }
      throw err
    }
    console.log('API - Logging in')
    return {
      _key: '1231232',
      email: 'jameson@test.test',
      token: 'asdasdasdasdasd'
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
        if (disease.indexOf('hea') !== -1) {
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
        if (disease.indexOf('cop') !== -1) {
          resolve([
            {
              term: 'COPD',
              conceptId: '13645005',
              vocabulary: 'SNOMED'
            }
          ])
        }
        if (disease.indexOf('ast') !== -1) {
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
        if (medication.indexOf('asp') !== -1) {
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
      } else {
        setTimeout(function () {
          reject(new Error('Study not found'))
        }, 500)
      }
    })
  },

  async getNewStudiesKeys () {
    console.log('API - getting new study')
    let studyPart = participant.studies.find((s) => {
      return s.studyKey === '9999'
    })
    if (!studyPart) return ['9999']
    else return []
  },

  async getForm (key) {
    console.log('API - getting form', key)
    return new Promise(function (resolve, reject) {
      if (key === '9999') {
        setTimeout(function () {
          resolve(form9999)
        }, Math.floor(Math.random() * 5000))
      } else if (key === '1234') {
        setTimeout(function () {
          resolve(form1234)
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
  }
}
