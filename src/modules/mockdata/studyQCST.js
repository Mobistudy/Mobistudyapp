export default {
  _key: 'QCST',
  publishedTS: '2018-12-09T09:30:32.492Z',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: 'Six Minute Walk Test Study',
      sv: 'Six Minute Walk Test Studie'
    },
    shortDescription: {
      en: 'The purpose of the test is to measure functional exercise capacity especially in chronic respiratory disease and heart failure.',
      sv: 'Syftet med testet är att mäta funktionell träningskapacitet, särskilt vid kronisk luftvägssjukdom och hjärtsvikt.'
    },
    longDescription: {
      en: 'The purpose of the test is to measure functional exercise capacity especially in chronic respiratory disease and heart failure.The test has also been used in healthy older adults, people undergoing knee or hip arthroplasty, fibromyalgia, and scleroderma. This app is able to send the results of your tests to a server hosted by the University of Malmö. The data is made available to the personnel of the Skånes Universitetssjukhus so that doctors and nurses are able to review them. In order to be able to send the results of your tests, you need to be given a set credentials by your care givers at the hospital.',
      sv: 'Syftet med testet är att mäta funktionell träningskapacitet, speciellt vid kronisk luftvägssjukdom och hjärtsvikt. Testet har också använts hos friska äldre vuxna, personer som genomgår knä- eller höftartroplastik, fibromyalgi och sklerodermi. Denna app kan skicka resultaten av dina tester till en server som är värd för universitetet i Malmö. Uppgifterna görs tillgängliga för personalen vid Skånes Universitetssjukhus så att läkare och sjuksköterskor kan granska dem. För att kunna skicka resultaten från dina tester måste du få en fast referens av dina vårdgivare på sjukhuset.'
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
      type: 'qcst',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        interval: 1,
        occurrences: 20,
        months: [],
        monthDays: [],
        weekDays: [1, 3, 5]
      },
      dataType: 'steps'
    }
  ],
  consent: {
    invitation: {
      en: 'We would like to invite you to take part in our research study.',
      sv: 'Vi vill inbjuda dig att delta i vår forskningsstudie..'
    },
    privacyPolicy: {
      en: 'We are going to collect your answers to the form and the distance walked during the Six Minute Walk Test.',
      sv: 'Vi kommer att samla dina svar på formuläret och distansen som uppmätts under Six Minute Walk Test.'
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
          en: 'I agree to perform the Six Minute Walk Test once a week.',
          sv: 'Jag accepterar att utföra Six Minute Walk Test en gång i veckan.'
        },
        taskId: 2
      }
    ]
  }
}
