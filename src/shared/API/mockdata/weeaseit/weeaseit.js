export default {
  _key: '222222',
  teamKey: '1608',
  invitationCode: '000000',
  invitational: true,
  numberOfParticipants: 40,
  createdTS: '2025-02-08T14:25:00.741Z',
  generalities: {
    languages: ['it', 'en'],
    title: {
      it: 'We-ease-it',
      en: 'We-ease-it'
    },
    shortDescription: {
      it: 'Individuazione tempestiva degli effetti collaterali del trattamento del cancro.',
      en: 'Timely identification of side effects of cancer treatment.'
    },
    longDescription: {
      it: `
      <b>Nota informativa sullo studio</b>
      <p>
      Lo scopo di questo studio è quello di valutare l'uso di un'applicazione per smartphone e di un dispositivo indossabile
      per monitorare l'attività fisica e il benessere dei pazienti sotto trattamento per il cancro.
      </p>`,
      en: `
      <b>Study Information Note</b>
      <p>
      The purpose of this study is to evaluate the use of a smartphone application and a wearable device
      to monitor the physical activity and well-being of patients undergoing cancer treatment.
      </p>`
    },
    startDate: '2025-05-01',
    endDate: '2030-12-31',
    principalInvestigators: [
      {
        name: 'Prof.ssa Sara Ramella',
        contact: 's.ramella@policlinicocampus.it',
        institution: 'Università Campus Bio-Medico di Roma'
      }
    ],
    institutions: [
      {
        name: 'Università Campus Bio-Medico di Roma',
        contact: 'Rosa Sicilia, r.sicilia@unicampus.it',
        dataAccess: 'full',
        reasonForDataAccess: {
          it: 'Accesso completo ai dati per completare gli obiettivi dello studio.',
          en: 'Full data access to complete the study objectives.'
        }
      },
      {
        name: 'Fondazione Policlinico Universitario Campus Bio-Medico di Roma',
        contact: '+39 06 225411',
        dataAccess: 'full',
        reasonForDataAccess: {
          it: 'Accesso completo ai dati per completare gli obiettivi dello studio.'
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
    criteriaQuestions: [],
    diseases: [],
    medications: []
  },
  tasks: [
    {
      id: 1,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 24 * 60 * 60, // 2 months
        intervalType: 'd',
        interval: 1
      },
      formKey: '0001', // pain levels
      formName: {
        it: 'Livello di dolore',
        en: 'Pain Level'
      }
    },

    {
      id: 2,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'd',
        interval: 1
      },
      formKey: '0002', // treatments
      formName: {
        it: 'Trattamenti',
        en: 'Treatments'
      }
    },

    {
      id: 3,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'd',
        interval: 1
      },
      formKey: '0003', // treatments
      formName: {
        it: 'Peso',
        en: 'Weight'
      }
    },

    {
      id: 4,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'w',
        interval: 1
      },
      formKey: '0004', // lifestyle
      formName: {
        it: 'Stile di vita',
        en: 'Lifestyle'
      }
    },

    {
      id: 5,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'w',
        interval: 1
      },
      formKey: '0005', // QLQC30
      formName: {
        it: 'Qualità della vita',
        en: 'Quality of Life'
      }
    },

    {
      id: 6,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'w',
        interval: 1
      },
      formKey: '0006', // PROCTCAE
      formName: {
        it: 'Effetti collaterali',
        en: 'Side Effects'
      }
    },

    {
      id: 7,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'd',
        interval: 1
      },
      formKey: '0007', // side effects
      formName: {
        it: 'Trend effetti collaterali',
        en: 'Side Effects trend'
      }
    },

    {
      id: 8,
      type: 'jstyle',
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'd',
        interval: 1
      }
    }
  ],
  consent: {
    invitation: {
      it: 'La invitiamo a partecipare a questo studio clinico riguardante gli effetti collaterali dei trattamenti per il cancro.',
      en: 'We invite you to participate in this clinical study regarding the side effects of cancer treatments.'
    },
    privacyPolicy: {
      it: `<p>Per condurre questo studio è necessario raccogliere dei dati riguardanti la sua persona.</p>
      <p><b>Che tipo di dati verranno raccolti?</b></p>
      <ul>
      <li>
      Informazioni generali quali l'età, il sesso, l'altezza, il peso e le condizioni cliniche generali.
      </li>
      </ul>
      `,
      en: `<p>To conduct this study, it is necessary to collect data regarding you.</p>
      <p><b>What type of data will be collected?</b></p>
      <ul></ul>
      <li>General information such as age, sex, height, weight, and general clinical conditions.</li>
      </ul>`
    },
    taskItems: [
      {
        description: {
          it: 'Accetto di comunicare il livello di dolore giornalmente.',
          en: 'I agree to report my pain level daily.'
        },
        taskId: 1
      },

      {
        description: {
          it: 'Accetto di segnalare se ho preso i miei farmaci giornalieri.',
          en: 'I agree to report if I have taken my daily medications.'
        },
        taskId: 2
      },

      {
        description: {
          it: 'Accetto di comunicare il mio peso ogni giorno.',
          en: 'I agree to report my weight daily.'
        },
        taskId: 3
      },

      {
        description: {
          it: 'Accetto di rispondere al questionario sullo stile di vita ogni settimana.',
          en: 'I agree to respond to the lifestyle questionnaire weekly.'
        },
        taskId: 4
      },

      {
        description: {
          it: 'Accetto di rispondere al questionario sulla qualità della vita ogni settimana.',
          en: 'I agree to respond to the quality of life questionnaire weekly.'
        },
        taskId: 5
      },

      {
        description: {
          it: 'Accetto di rispondere al questionario sugli effetti collaterali ogni settimana.',
          en: 'I agree to respond to the side effects questionnaire weekly.'
        },
        taskId: 6
      },

      {
        description: {
          it: 'Accetto di rispondere al questionario sul trend degli effetti collaterali ogni giorno.',
          en: 'I agree to answer the side effects trend questionnaire daily.'
        },
        taskId: 7
      },

      {
        description: {
          it: 'Accetto di scaricare i dati dallo smartwatch ogni giorno.',
          en: 'I agree to download data from the smartwatch daily.'
        },
        taskId: 8
      }
    ],
    extraItems: [
    ]
  }
}
