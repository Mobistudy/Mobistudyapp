// MOCK API implementation

export function setToken (token) {
  console.log('API- Setting token: ' + token)
}

export function unsetToken () {
  console.log('API- Unsetting token')
}

// Logging in
export async function login (email, password) {
  if (email !== 'jameson@test.test' || password !== '12345678') {
    let enahncedError = new Error('bad credentials')
    enahncedError.response = { status: 401 }
    throw enahncedError
  }
  console.log('API- Logging in')
  return {
    _key: '1231232',
    email: 'jameson@test.test',
    token: 'asdasdasdasdasd'
  }
}

// Registration
export async function registerUser (email, password) {
  console.log('API- Registering user')
  return true
}

// Password reset
export async function resetPW (email) {
  console.log('API- Reset profile for email' + email)
  return true
}

// Change password
export async function changePW (token, newpw) {
  return Promise.resolve(true)
}

// Create the participant profile
export async function createProfile (profile) {
  console.log('API- Profile created', profile)
  return true
}

// Get the participant profile
export async function getProfile (userKey) {
  let profile = {
    userKey: '1231232',
    createdTS: '2018-12-10T09:30:32.492Z',
    name: 'Jameson',
    surname: 'Lee',
    gender: 'male',
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
}

// Updating details
export async function updateProfile (profile) {
  console.log('API- Profile updated', profile)
  return true
}

// Permanently delete the user
export async function deleteUser (userKey) {
  console.log('API- permanently delete user')
  return true
}

// update status of a study
export async function updateStudyStatus (userKey, studyKey, studyParticipation) {
  console.log('API- Study status updated', studyParticipation)
  return true
}

// search for disease on SNOMED
export async function searchSNOMEDDisease (diseaseDescription) {
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
}

// search for medications on SNOMED
export async function searchSNOMEDMedication (medDescription) {
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
}

export async function getStudyDescription (studyKey) {
  console.log('API- getting study ' + studyKey)
  return new Promise(function (resolve, reject) {
    if (studyKey === '9999') {
      setTimeout(function () {
        resolve(
          {
            _key: '9999',
            'created': '2018-12-09T09:30:32.492Z',
            'updated': '2018-12-09T09:30:32.492Z',
            'published': '2018-12-09T09:30:32.492Z',
            'generalities': {
              'title': 'My amazing study',
              shortDescription: 'This is a study about amazing people',
              longDescription: 'We want to understand how amazing you are',
              'startDate': '2018-09-11',
              'endDate': '2020-10-12',
              'principalInvestigators': [
                {
                  'name': 'Arvin Goburdhun',
                  'contact': 'arvin@something.com',
                  'institution': 'University of Oxford'
                }
              ],
              'institutions': [
                {
                  'name': 'University of Oxford',
                  'contact': 'asdasd',
                  'dataAccess': 'full',
                  'reasonForDataAccess': 'Data Access to allow clinical decisions'
                },
                {
                  'name': 'NHS Oxfordshire',
                  'contact': 'https://www.oxfordhealth.nhs.uk/'
                }
              ]
            },
            'inclusionCriteria': {
              'minAge': 18,
              'maxAge': 100,
              'gender': [
                'male',
                'female',
                'other'
              ],
              'lifestyle': {
                'active': 'yes',
                'smoker': 'notrequired'
              },
              'criteriaQuestions': [
                {
                  'title': 'Are you pregnant?',
                  'answer': 'yes'
                }
              ],
              'diseases': {
                'COPD': '123123123'
              },
              'medications': {
                'Aspirin': '13123123'
              }
            },
            'tasks': [
              {
                'id': 1,
                'type': 'dataQuery',
                'scheduling': {
                  'startEvent': 'consent',
                  'startDelaySecs': 0,
                  'untilSecs': 2592000, // 1 month
                  'intervalType': 'd',
                  'interval': 12,
                  'weekDays': [ 1, 4, 7 ]
                },
                'dataType': 'steps',
                'aggregated': true,
                'bucket': 'week'
              },
              {
                'id': 2,
                'type': 'form',
                'scheduling': {
                  'startEvent': 'consent',
                  'startDelaySecs': 0,
                  'occurrences': 20,
                  'intervalType': 'd',
                  'interval': 12
                },
                'formKey': '1234'
              }
            ],
            'consent': {
              'invitation': 'We would like to invite you to take part in our research study.',
              'privacyPolicy': 'This is a semi-automatically generated text.',
              'taskItems': [
                {
                  'description': 'I agree to send my data related to steps every week.',
                  'taskId': 1
                },
                {
                  'description': 'I agree to answer the QoL form every day.',
                  'taskId': 2
                }
              ],
              'extraItems': [
                {
                  'description': 'I agree to answer the QoL form every day.',
                  'optional': true,
                  'taskId': 2
                },
                {
                  'description': 'I agree to do some analysis',
                  'optional': false
                }
              ]
            }
          }
        )
      }, 2000)
    } else if (studyKey === '1234') {
      setTimeout(function () {
        resolve({
          _key: '1234',
          published: '2018-11-09T11:09:20.498Z',
          generalities: {
            title: 'COPD Study',
            shortDescription: 'It\'s a study',
            longDescription: 'This study is about COPD, we want to assess your COPD level.',
            startDate: new Date(new Date().getTime() - 1296000000).toISOString(), // 15 days ago
            endDate: new Date(new Date().getTime() + 5184000000).toISOString(), // 60 days from now
            principalInvestigators: [
              {
                name: 'J Lee',
                contact: 'IBME Oxford',
                institution: 'University of Oxford'
              },
              {
                name: 'C Velardo',
                contact: 'IBME Oxford',
                institution: 'University of Oxford'
              }
            ],
            institutions: [
              {
                name: 'University of Oxford, IBME',
                contact: 'Old Road Campus',
                dataAccess: 'full',
                reasonForDataAccess: 'Data Access to allow clinical decisions'
              },
              {
                name: 'University of Oxford, Worcester',
                contact: 'Worcester College',
                dataAccess: 'full',
                reasonForDataAccess: 'Data Access to allow clinical decisions'
              }
            ]
          },
          inclusionCriteria: {
            minAge: 18,
            maxAge: 100,
            gender: [
              'male',
              'female',
              'other'
            ],
            lifestyle: {
              active: 'notrequired',
              smoker: 'notrequired'
            },
            criteriaQuestions: [
              {
                title: 'Are you a smoker?',
                answer: 'no'
              }
            ],
            diseases: {
              'Acute exacerbation of COPD': '195951007'
            },
            medications: {}
          },
          tasks: [
            {
              id: 1,
              type: 'form',
              scheduling: {
                startEvent: 'consent',
                intervalType: 'd',
                // untilSecs: 2592000, // 1 month
                interval: 1,
                months: [],
                monthDays: [],
                weekDays: []
              },
              formKey: '1234',
              formName: 'COPD Form'
            },
            {
              id: 2,
              type: 'dataQuery',
              scheduling: {
                startEvent: 'consent',
                intervalType: 'd',
                interval: 1,
                // occurrences: 20,
                months: [],
                monthDays: [],
                weekDays: [1, 3, 5]
              },
              dataType: 'steps',
              aggregated: true,
              bucket: 'hour'
            }
          ],
          consent: {
            invitation: 'Something something consent',
            privacyPolicy: 'Something something consent',
            taskItems: [
              {
                description: 'You agree to answer the "COPD Form" form. 5 days after you have consented. Until 12 days after you have consented. Repeated daily.',
                taskId: 1
              },
              {
                description: 'You agree to send your data about Steps. Repeated daily.',
                taskId: 2
              }
            ],
            extraItems: []
          }
        })
      }, 2000)
    } else {
      setTimeout(function () {
        reject(new Error('Study not found'))
      }, 1000)
    }
  })
}

export async function getNewStudiesKeys () {
  return ['9999']
}

export async function getForm (key) {
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
}

export function sendAnswers (answers) {
  console.log('API - sending answers', answers)
  return Promise.resolve()
}

export function sendDataQuery (data) {
  console.log('API - sending query data', data)
  return Promise.resolve()
}
