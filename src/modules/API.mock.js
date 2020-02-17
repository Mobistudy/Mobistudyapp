// MOCK API implementation
import study1234 from './mockdata/study1234.js'
import form1234 from './mockdata/form1234.js'
import study9999 from './mockdata/study9999.js'
import form9999 from './mockdata/form9999.js'
import participant from './mockdata/participant.js'

export default {
  setToken: function (token) {
    console.log('API - Setting token: ' + token)
  },

  unsetToken: function () {
    console.log('API - Unsetting token')
  },

  // Logging in
  login: async function (email, password) {
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
  registerUser: async (email, password) => {
    console.log('API - Registering user')
    return true
  },

  // Password reset
  resetPW: async (email) => {
    console.log('API - Reset password for email', email)
    return true
  },

  // Change password
  changePW: async (token, newpw) => {
    console.log('API - change PWD')
    return Promise.resolve(true)
  },

  searchDiseaseConcept: async (disease, lang) => {
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

  searchMedicationConcept: async (medication, lang) => {
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
  createProfile: async (profile) => {
    console.log('API - Profile created', profile)
    return true
  },

  // Get the participant profile
  getProfile: async (userKey) => {
    console.log('API - Profile ', participant)
    return participant
  },

  // Updating details
  updateProfile: async (profile) => {
    console.log('API - Profile updated', profile)
    return true
  },

  // Permanently delete the user
  deleteUser: async (userKey) => {
    console.log('API - Permanently delete user')
    return true
  },

  // update status of a study
  updateStudyStatus: async (userKey, studyKey, studyParticipation) => {
    console.log('API - Study status updated', studyParticipation)
    return true
  },

  // search for disease on SNOMED
  searchSNOMEDDisease: async (diseaseDescription) => {
    console.log('API - search disease', diseaseDescription)
    return [{
      label: 'Heart Failure',
      value: 'Heart Failure',
      conceptId: 3344
    }, {
      label: 'Weak Heart',
      value: 'Weak Heart',
      conceptId: 3345
    }, {
      label: 'COPD',
      value: 'COPD',
      conceptId: 2211
    }].filter(i => {
      return i.label.toLowerCase().indexOf(diseaseDescription.toLowerCase()) > -1
    })
  },

  // search for medications on SNOMED
  searchSNOMEDMedication: async (medDescription) => {
    console.log('API - search med', medDescription)
    return [{
      label: 'Aspirin',
      value: 'Aspirin',
      conceptId: 3344
    }, {
      label: 'Paracetamol',
      value: 'Paracetamol',
      conceptId: 3345
    }, {
      label: 'Iboprufen',
      value: 'Iboprufen',
      conceptId: 2211
    }].filter(i => {
      return i.label.toLowerCase().indexOf(medDescription.toLowerCase()) > -1
    })
  },

  getStudyDescription: async (studyKey) => {
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

  getNewStudiesKeys: async () => {
    console.log('API - getting new study')
    return ['9999']
  },

  getForm: async (key) => {
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

  sendAnswers: async (answers) => {
    console.log('API - sending answers', answers)
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve()
      }, 1000)
    })
  },

  sendDataQuery: async (data) => {
    console.log('API - sending query data', data)
    return Promise.resolve()
  }
}
