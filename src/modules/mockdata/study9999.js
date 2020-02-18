export default {
  _key: '9999',
  publishedTS: '2018-12-09T09:30:32.492Z',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: 'Pregnancy in Hypertension Study',
      sv: 'Graviditet i hypertoniundersökning'
    },
    shortDescription: {
      en: 'Self management of hypertension in pregnancy.',
      sv: 'Självhantering av hypertoni under graviditet'
    },
    longDescription: {
      en: 'This study tries to identify early markers of hypertension in pregnancy using a wireless blood pressure cuff.',
      sv: 'Denna studie försöker identifiera tidiga markörer för hypertoni under graviditet med hjälp av en trådlös manschet.'
    },
    startDate: '2020-01-01',
    endDate: '2022-10-12',
    principalInvestigators: [
      {
        name: 'Arvin Goburdhun',
        contact: 'arvin@something.com',
        institution: 'University of Oxford'
      }
    ],
    institutions: [
      {
        name: 'University of Oxford',
        contact: 'Oxford, UK',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'Data Access to allow clinical decisions',
          sv: 'Dataåtkomst för att tillåta kliniska beslut'
        }
      },
      {
        name: 'NHS Oxfordshire',
        contact: 'https://www.oxfordhealth.nhs.uk/',
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
          en: 'Are you pregnant?',
          sv: 'Är du gravid?'
        },
        answer: 'yes'
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
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 12,
        weekDays: [ 1, 4, 7 ]
      },
      dataType: 'steps',
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
          en: 'I agree to send my data related to steps every week.',
          sv: 'Jag accepterar att skicka min information relaterad till steg varje vecka.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to answer the questionnaire every other day.',
          sv: 'Jag accepterar att besvara frågeformuläret varannan dag'
        },
        taskId: 2
      }
    ]
  }
}
