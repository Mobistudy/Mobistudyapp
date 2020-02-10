// MOCK API implementation
import study1234 from './mockdata/study1234.js'

export default {
  setToken: function (token) {
    console.log('API- Setting token: ' + token)
  },

  unsetToken: function () {
    console.log('API- Unsetting token')
  },

  // Logging in
  login: async function (email, password) {
    if (email !== 'jameson@test.test' || password !== '12345678aAbB!') {
      let err = new Error('bad credentials')
      err.response = { status: 401 }
      throw err
    }
    console.log('API- Logging in')
    return {
      _key: '1231232',
      email: 'jameson@test.test',
      token: 'asdasdasdasdasd'
    }
  },

  // Registration
  registerUser: async (email, password) => {
    console.log('API- Registering user')
    return true
  },

  // Password reset
  resetPW: async (email) => {
    console.log('API- Reset profile for email' + email)
    return true
  },

  // Change password
  changePW: async (token, newpw) => {
    return Promise.resolve(true)
  },

  // Create the participant profile
  createProfile: async (profile) => {
    console.log('API- Profile created', profile)
    return true
  },

  // Get the participant profile
  getProfile: async (userKey) => {
    let profile = {
      userKey: '1231232',
      createdTS: '2018-12-10T09:30:32.492Z',
      name: 'Jameson',
      surname: 'Lee',
      sex: 'male',
      completed: false,
      dateOfBirth: '1986-11-10',
      diseases: [],
      medications: [],
      lifestyle: {
        active: false,
        smoker: true
      },
      studies: [
        {
          studyKey: '1234',
          currentStatus: 'accepted',
          acceptedTS: '2018-12-10T09:30:32.492Z',
          reminders: true,
          criteriaAnswers: [ 'Yes', 'No' ],
          taskItemsConsent: [
            { taskId: 1, consented: true, lastExecuted: new Date(new Date().getTime() - 86400000).toISOString() },
            { taskId: 2, consented: true, lastExecuted: new Date(new Date().getTime() - 172800000).toISOString() }
          ]
        }
      ]
    }
    console.log('API- Profile got', profile)
    return profile
  },

  // Updating details
  updateProfile: async (profile) => {
    console.log('API- Profile updated', profile)
    return true
  },

  // Permanently delete the user
  deleteUser: async (userKey) => {
    console.log('API- permanently delete user')
    return true
  },

  // update status of a study
  updateStudyStatus: async (userKey, studyKey, studyParticipation) => {
    console.log('API- Study status updated', studyParticipation)
    return true
  },

  // search for disease on SNOMED
  searchSNOMEDDisease: async (diseaseDescription) => {
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
      } else {
        setTimeout(function () {
          reject(new Error('Study not found'))
        }, 1000)
      }
    })
  },

  getNewStudiesKeys: async () => {
    return ['9999']
  },

  getForm: async (key) => {
    return new Promise(function (resolve, reject) {
      if (key === '123456') {
        setTimeout(function () {
          resolve({
            'created': '2018-10-25T10:09:53.222Z',
            'name': 'My cool form',
            'description': 'a short form',
            'questions': [{
              'id': 'Q1',
              'type': 'singleChoice',
              'text': 'What do you prefer?',
              'helper': 'Some details here',
              'nextDefaultId': 'Q2',
              'answerChoices': [{
                'id': '1',
                'text': 'Red',
                'nextQuestionId': 'Q2'
              }, {
                'id': '2',
                'text': 'Green',
                'nextQuestionId': 'Q3'
              }]
            }, {
              'id': 'Q2',
              'type': 'multipleChoice',
              'text': 'Best options',
              'helper': 'Some details here',
              'nextDefaultId': 'Q3',
              'answerChoices': [{
                'id': 'Q2A1',
                'text': 'A'
              }, {
                'id': 'Q2A2',
                'text': 'B'
              }]
            }, {
              'id': 'Q3',
              'type': 'freetext',
              'text': 'Type some freetext here',
              'helper': 'freetext',
              'nextDefaultId': 'ENDFORM'
            }]
          })
        }, Math.floor(Math.random() * 5000))
      } else if (key === '1234') {
        setTimeout(function () {
          resolve({
            'name': 'COPD Form',
            'description': 'Form for COPD Patients',
            'questions': [
              {
                'id': 'Q1',
                'text': 'Are you ready for this test?',
                'helper': 'Do you want to continue?',
                'type': 'singleChoice',
                'answerChoices': [
                  {
                    'id': 'Q1A1',
                    'text': 'Yes',
                    'nextQuestionId': 'Q2'
                  },
                  {
                    'id': 'Q1A2',
                    'text': 'NO',
                    'nextQuestionId': 'ENDFORM'
                  }
                ]
              },
              {
                'id': 'Q2',
                'text': 'Fill in description.',
                'type': 'freetext',
                'nextDefaultId': 'Q3',
                'answerChoices': [
                  {
                    'id': 'Q2A1'
                  }
                ]
              },
              {
                'id': 'Q3',
                'text': 'Preferred food',
                'type': 'multiChoice',
                'nextDefaultId': 'ENDFORM',
                'answerChoices': [
                  {
                    'id': 'Q3A1',
                    'text': 'Ice cream'
                  },
                  {
                    'id': 'Q3A2',
                    'text': 'Cake'
                  },
                  {
                    'id': 'Q3A3',
                    'text': 'Chocolate'
                  }
                ]
              }
            ],
            'created': '2018-11-09T10:49:50.473Z'
          })
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
