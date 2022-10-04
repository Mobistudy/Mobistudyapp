// MOCK API implementation
import studyTest from './mockdata/studyTest'
import formTest from './mockdata/formTest'

import studyPainApp1 from './mockdata/studyPainApp1'
import studyPainApp2 from './mockdata/studyPainApp2'
import formPainAppVAS from './mockdata/formPainAppVAS'

import parkAppStudy from './mockdata/parkapp/studyParkapp'
import NMSQuest from './mockdata/parkapp/questNMS'
import PDSS2 from './mockdata/parkapp/questPDSS2'
import BDI2 from './mockdata/parkapp/questBDI2'
import PDQ8 from './mockdata/parkapp/questPDQ8'
import UMARS from './mockdata/parkapp/questUMARS'
import TAM from './mockdata/parkapp/questTAM'

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
    profile._key = '098765'
    return profile
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
      } else if (studyKey === studyPainApp1._key) {
        setTimeout(function () {
          resolve(studyPainApp1)
        }, 1000)
      } else if (studyKey === studyPainApp2._key) {
        setTimeout(function () {
          resolve(studyPainApp2)
        }, 1000)
      } else if (studyKey === parkAppStudy._key) {
        setTimeout(function () {
          resolve(parkAppStudy)
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
      if (invitationalCode === studyPainApp1.invitationCode) {
        resolve(studyPainApp1)
      } if (invitationalCode === studyPainApp2.invitationCode) {
        resolve(studyPainApp2)
      } else if (invitationalCode === parkAppStudy.invitationCode) {
        resolve(parkAppStudy)
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
        }, 1000)
      } else if (key === formPainAppVAS._key) {
        setTimeout(function () {
          resolve(formPainAppVAS)
        }, 500)
      } else if (key === NMSQuest._key) {
        setTimeout(function () {
          resolve(NMSQuest)
        }, 500)
      } else if (key === PDSS2._key) {
        setTimeout(function () {
          resolve(PDSS2)
        }, 500)
      } else if (key === BDI2._key) {
        setTimeout(function () {
          resolve(BDI2)
        }, 500)
      } else if (key === PDQ8._key) {
        setTimeout(function () {
          resolve(PDQ8)
        }, 500)
      } else if (key === UMARS._key) {
        setTimeout(function () {
          resolve(UMARS)
        }, 500)
      } else if (key === TAM._key) {
        setTimeout(function () {
          resolve(TAM)
        }, 500)
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

  async sendAttachment (studyKey, taskId, filename, fileData) {
    console.log('API - sending attachment', fileData)
    return new Date().getTime() + '.json'
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

  async sendTasksResults (data) {
    console.log('API - sending tasks results', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  }
}
