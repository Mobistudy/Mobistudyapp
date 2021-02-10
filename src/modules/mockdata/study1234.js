export default {
  _key: '1234',
  publishedTS: '2019-11-09T11:09:20.498Z',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: 'COPD study',
      sv: 'KOL-forskningsstudie'
    },
    shortDescription: {
      en: 'This is a sample study for COPD patients.',
      sv: 'Detta är en provstudie för KOLS-patienter.'
    },
    longDescription: {
      en: 'This study is about COPD, we want to assess your COPD level.',
      sv: 'Denna studie handlar om KOL, vi vill utvärdera din KOL-nivå.'
    },
    startDate: new Date(new Date().getTime() - 1296000000).toISOString(), // 15 days ago
    endDate: new Date(new Date().getTime() + 5184000000).toISOString(), // 60 days from now
    principalInvestigators: [
      {
        name: 'Dario Salvi',
        contact: 'dario@mau.se',
        institution: 'University of Malmo'
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
        reasonForDataAccess: {
          en: 'Full access needed for data analysis.',
          sv: 'Full åtkomst behövs för dataanalys.'
        }
      },
      {
        name: 'University of Malmo',
        contact: 'Nordenskiöldsgatan 1, 211 19 Malmö',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'Full access needed for data analysis.',
          sv: 'Full åtkomst behövs för dataanalys.'
        }
      }
    ]
  },
  inclusionCriteria: {
    minAge: 18,
    maxAge: 100,
    sex: [
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
        title: {
          en: 'Do you have COPD?',
          sv: 'Har du KOL?'
        },
        answer: 'yes'
      }
    ],
    diseases: [{ name: 'COPD', conceptId: '123123123' }],
    medications: []
  },
  tasks: [
    {
      id: 1,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 2592000, // 1 month
        interval: 1,
        months: [],
        monthDays: [],
        weekDays: []
      },
      formKey: '1234',
      formName: {
        en: 'COPD form',
        sv: 'KOL formulär'
      }
    },
    {
      id: 2,
      type: 'dataQuery',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        interval: 1,
        occurrences: 20,
        months: [],
        monthDays: [],
        weekDays: []
      },
      dataType: 'steps',
      aggregated: true,
      bucket: 'hour'
    },
    {
      id: 3,
      type: 'smwt',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        intervalType: 'd',
        interval: 7,
        untilSecs: 2592000 // 1 month
      },
      dataType: 'distance'
    },
    {
      id: 4,
      type: 'qcst',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        intervalType: 'd',
        interval: 7,
        untilSecs: 2592000 // 1 month
      },
      dataType: 'steps'
    },
    {
      id: 5,
      type: 'miband3',
      hrInterval: 5,
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 2592000, // 1 month
        interval: 1
      }
    },
    {
      id: 6,
      type: 'po60',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 2592000, // 1 month
        interval: 1
      }
    }
  ],
  consent: {
    invitation: {
      en: 'You are invited to participate to a research study about COPD.',
      sv: 'Du är inbjuden att delta i en forskningsstudie om KOL.'
    },
    privacyPolicy: {
      en: 'We will take care of your data, trust us.',
      sv: 'Vi tar hand om dina uppgifter, litar på oss.'
    },
    taskItems: [
      {
        description: {
          en: 'I agree to answer the COPD form, every day.',
          sv: 'Jag accepterar att besvara KOLS-formuläret varje dag.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to send my data about steps, every day.',
          sv: 'Jag accepterar att skicka min information om steg varje dag'
        },
        taskId: 2
      },
      {
        description: {
          en: 'I agree to perform the Six Minute Walk Test once a week.',
          sv: 'Jag accepterar att utföra Six Minute Walk Test en gång i veckan.'
        },
        taskId: 3
      },
      {
        description: {
          en: 'I agree to perform the Queen\'s College Step Test once a week.',
          sv: 'Jag accepterar att utföra Queen\'s College Step Test en gång i veckan.'
        },
        taskId: 4
      },
      {
        description: {
          en: 'I agree to perform the Asthma Control Questionnaire once a week.',
          sv: 'Jag accepterar att utföra Asthma Control Questionnaire en gång i veckan.'
        },
        taskId: 5
      }
    ],
    extraItems: []
  }
}
