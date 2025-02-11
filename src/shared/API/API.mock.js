// MOCK API implementation
import studyTest from './mockdata/studyTest'
import formTest from './mockdata/formTest'

import synergyhgb from './mockdata/synergy/synergyhgb'
import acceptance1hgb from './mockdata/synergy/acceptance1hgb'
import acceptance1ouh from './mockdata/synergy/acceptance1ouh'
import acceptance2hgb from './mockdata/synergy/acceptance2hgb'
import acceptance3hgb from './mockdata/synergy/acceptance3hgb'

import participant from './mockdata/participant'
import environmentmock from './mockdata/environment'
import synergyouh from './mockdata/synergy/synergyouh'

export default {

  getServersList: () => {
    return [
      {
        id: 'malmo',
        url: 'https://app.mobistudy.org/api',
        names: {
          en: 'Malmo University',
          sv: 'Malmö Universitet',
          es: 'Universidad de Malmo',
          it: 'Università di Malmo'
        }
      },
      {
        id: 'ucbm',
        url: 'https://mobistudy.ucbm.it/api',
        names: {
          en: 'Campus Bio Medico University of Rome',
          sv: 'Campus Bio Medico universitetet i Rom',
          es: 'Universidad Campus Bio-Medico de Roma',
          it: 'Università Campus Bio-Medico di Roma'
        }
      }
    ]
  },

  setBaseUrl (url) {
    console.log('API - Setting base URL: ' + url)
  },

  setToken (token) {
    console.log('API - Setting token: ' + token)
  },

  unsetToken () {
    console.log('API - Unsetting token')
  },

  // Logging in
  async login (email, password) {
    if (email !== 'jameson@test.test' || password !== 'moon landing') {
      const err = new Error('bad credentials')
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
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('API - Registering user')
        resolve()
      }, 2000)
    })
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

  // token renewal
  renewToken: async () => {
    console.log('API - Token renewal')
    return 'bababbabababbababababbaba'
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
    const study = participant.studies.find((s) => {
      return s._key === studyKey
    })
    if (study) {
      const taskI = study.taskItemsConsent.findIndex(t => {
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
      } else if (studyKey === synergyhgb._key) {
        setTimeout(function () {
          resolve(synergyhgb)
        }, 1000)
      } else if (studyKey === synergyouh._key) {
        setTimeout(function () {
          resolve(synergyhgb)
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
        const studyPart = participant.studies.find((s) => {
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
      if (invitationalCode === synergyhgb.invitationCode) {
        resolve(synergyhgb)
      } if (invitationalCode === synergyouh.invitationCode) {
        resolve(synergyouh)
      } else {
        const err = new Error('Cannot retrieve invitational study based on code.')
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
      } else if (key === acceptance1hgb._key) {
        setTimeout(function () {
          resolve(acceptance1hgb)
        }, 1000)
      } else if (key === acceptance1ouh._key) {
        setTimeout(function () {
          resolve(acceptance1ouh)
        }, 1000)
      } else if (key === acceptance2hgb._key) {
        setTimeout(function () {
          resolve(acceptance2hgb)
        }, 1000)
      } else if (key === acceptance3hgb._key) {
        setTimeout(function () {
          resolve(acceptance3hgb)
        }, 1000)
      } else {
        reject(new Error('Questionnaire not found ' + key))
      }
    })
  },

  setTaskDone (studyKey, taskId, timestamp) {
    const study = participant.studies.find((s) => {
      return s.studyKey === studyKey
    })
    if (study) {
      const taskItem = study.taskItemsConsent.find(ti => ti.taskId === taskId)
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

  async getEnvironmentFromPosition (lat, long) {
    console.log('API - getting environment', lat, long)
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(environmentmock)
      }, 1500)
    })
  },

  async sendTasksResults (data) {
    console.log('API - sending tasks results', data)
    this.setTaskDone(data.studyKey, data.taskId, data.createdTS)
    return Promise.resolve()
  }
}
