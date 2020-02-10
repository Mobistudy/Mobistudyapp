export default {
  _key: '9999',
  publishedTS: '2018-12-09T09:30:32.492Z',
  generalities: {
    languages: ['en', 'sv'],
    title: 'Pregnancy Hypertension Study',
    shortDescription: 'Self management of hypertension in pregnancy.',
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
    'sex': [
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
