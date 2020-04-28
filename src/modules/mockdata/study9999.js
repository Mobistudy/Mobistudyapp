export default {
  _key: '9999',
  publishedTS: '2019-12-09T09:30:32.492Z',
  generalities: {
    languages: ['en'],
    title: {
      en: 'Rehabilitation in COPD'
    },
    shortDescription: {
      en: 'Home-based rehabilitation programme for COPD patients.'
    },
    longDescription: {
      en: `The aim of this study is to foster exercise in COPD patienst.
      Patients are asked to attend an exercise session at least twice per week at their local facility, like a gym or a park to do physical activity.
      Patients can choose their preferred form of exercise and can report their sessions using their app of choice.`
    },
    startDate: '2020-04-01',
    endDate: '2022-10-12',
    principalInvestigators: [
      {
        name: 'Carl Magnus Olsson',
        contact: 'carl@something.com',
        institution: 'University of Malmö'
      },
      {
        name: 'Ahmed Ahmed',
        contact: 'ahmed@sus.org',
        institution: 'Skåne University Hospital'
      }
    ],
    institutions: [
      {
        name: 'University of Malmö',
        contact: 'Malmö, Sweden',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'Data access to study physical exercise'
        }
      },
      {
        name: 'Skåne University Hospital',
        contact: 'https://vard.skane.se/',
        dataAccess: 'none'
      }
    ]
  },
  inclusionCriteria: {
    minAge: 18,
    maxAge: 100,
    sex: [
      'female'
    ],
    lifestyle: {
      active: 'notrequired',
      smoker: 'notrequired'
    },
    criteriaQuestions: [
      {
        title: {
          en: 'Are you already involved in a rehabilitation programme?'
        },
        answer: 'no'
      }
    ]
  },
  tasks: [
    {
      id: 1,
      type: 'dataQuery',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        intervalType: 'd',
        interval: 1,
        weekDays: [ ]
      },
      dataType: 'activity',
      aggregated: true,
      bucket: 'week'
    },
    {
      id: 2,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        occurrences: 20,
        intervalType: 'd',
        interval: 2
      },
      formKey: '9999'
    }
  ],
  consent: {
    invitation: {
      en: `We would like to invite you to take part in this research study about rehabilitation for COPD patients.
      In order to participate, you need to have been diagnosed with COPD and not currently being involved in a rehabilitation programme.
      You must be capable of doing light physical exercise and must own a smartphone.
      You will do your preferred exercise twice a week and report it through your favourite app.
      The participation to this study is voluntary and you can withdraw at any moment.`
    },
    privacyPolicy: {
      en: `We are going to collect data about your physical activity as collected by your phone.
      The data will be stored on Mobstudy servers and be used by the University of Malmö for analysis.
      Your may be published on scientific journals after having been aggregated and anonymised.`
    },
    taskItems: [
      {
        description: {
          en: 'I agree to send my data related to physical activity every week.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to answer the physical exercise questionnaire every other day.'
        },
        taskId: 2
      }
    ]
  }
}
