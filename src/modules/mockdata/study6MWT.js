export default {
  _key: 'SMWT',
  publishedTS: '2018-12-09T09:30:32.492Z',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: '6MWT',
      sv: '6MWT'
    },
    shortDescription: {
      en: 'Six Minute Walk Test (6MWT).',
      sv: 'Six Minute Walk Test (6MWT).'
    },
    longDescription: {
      en: 'The purpose of the test is to measure functional exercise capacity especially in chronic respiratory disease and heart failure.',
      sv: 'Denna studie försöker identifiera tidiga markörer för hypertoni under graviditet med hjälp av en trådlös manschet.'
    },
    startDate: new Date(new Date().getTime() - 1296000000).toISOString(), // 15 days ago
    endDate: new Date(new Date().getTime() + 5184000000).toISOString(), // 60 days from now
    principalInvestigators: [
      {
        name: 'Elin Forsnor',
        contact: 'elin@something.com',
        institution: 'University of Malmö'
      }
    ],
    institutions: [
      {
        name: 'University of Malmö',
        contact: 'Malmö, SE',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'Data Access to allow clinical decisions',
          sv: 'Dataåtkomst för att tillåta kliniska beslut'
        }
      },
      {
        name: 'SUS Malmö',
        contact: 'https://vard.skane.se/skanes-universitetssjukhus-sus/',
        dataAccess: 'none'
      }
    ]
  },
  inclusionCriteria: {
    minAge: 18,
    maxAge: 100,
    sex: [
      'female',
      'male',
      'other'
    ],
    lifestyle: {
      active: 'notrequired',
      smoker: 'notrequired'
    },
    criteriaQuestions: [
      {
        title: {
          en: 'Do you have CHF and/or pHTN?',
          sv: 'Har du hjärtsvikt och/eller pulmonell hypertoni?'
        },
        answer: 'yes'
      }
    ]
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
      formKey: '6MWT',
      formName: {
        en: '6MWT form',
        sv: '6MWT formulär'
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
        weekDays: [1, 3, 5]
      },
      dataType: 'distance',
      aggregated: true,
      bucket: 'hour'
    }
  ],
  consent: {
    invitation: {
      en: 'We would like to invite you to take part in our research study.',
      sv: 'Vi vill inbjuda dig att delta i vår forskningsstudie..'
    },
    privacyPolicy: {
      en: 'We are going to collect your answers to the form and the number of steps per week.',
      sv: 'Vi kommer att samla in dina svar på formuläret och antalet steg per vecka.'
    },
    taskItems: [
      {
        description: {
          en: 'I agree to send my data related to distance every week.',
          sv: 'Jag accepterar att skicka min information relaterad till distans varje vecka.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to perform the 6MWT once a week.',
          sv: 'Jag accepterar att utföra 6MWT en gång i veckan.'
        },
        taskId: 2
      }
    ]
  }
}
