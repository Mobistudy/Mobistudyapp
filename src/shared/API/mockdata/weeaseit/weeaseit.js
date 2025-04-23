export default {
  _key: '222222',
  teamKey: '1608',
  invitationCode: '000000',
  invitational: true,
  numberOfParticipants: 40,
  createdTS: '2025-02-08T14:25:00.741Z',
  generalities: {
    languages: ['it'],
    title: {
      it: 'We-ease-it'
    },
    shortDescription: {
      it: 'Individuazione tempestiva degli effetti collaterali del trattamento del cancro.'
    },
    longDescription: {
      it: `
      <b>Nota informativa sullo studio</b>
      <p>
      Lo scopo di questo studio è quello di valutare l'uso di un'applicazione per smartphone e di un dispositivo indossabile
      per monitorare l'attività fisica e il benessere dei pazienti sotto trattamento per il cancro.
      </p>
`
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
          it: 'Accesso completo ai dati per completare gli obiettivi dello studio.'
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
        untilSecs: 60 * 60 * 24 * 60, // 2 months
        intervalType: 'd',
        interval: 1
      },
      formKey: '0001', // pain levels
      formName: {
        it: 'Livello di dolore'
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
        it: 'Trattamenti'
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
        it: 'Peso'
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
      formKey: '0004', // treatments
      formName: {
        it: 'Stile di vita'
      }
    }
  ],
  consent: {
    invitation: {
      it: 'La invitiamo a partecipare a questo studio clinico riguardante gli effetti collaterali dei trattamenti per il cancro.'
    },
    privacyPolicy: {
      it: `<p>Per condurre questo studio è necessario raccogliere dei dati riguardanti la sua persona.</p>
      <p><b>Che tipo di dati verranno raccolti?</b></p>
      <ul>
      <li>
      Informazioni generali quali l'età, il sesso, l'altezza, il peso e le condizioni cliniche generali.
      </li>
      </ul>
      `
    },
    taskItems: [
      {
        description: {
          it: 'Accetto di comunicare il livello di dolore giornalmente.'
        },
        taskId: 1
      },

      {
        description: {
          it: 'Accetto di segnalare se ho preso i miei farmaci giornalieri.'
        },
        taskId: 2
      },

      {
        description: {
          it: 'Accetto di comunicare il mio peso ogni giorno.'
        },
        taskId: 3
      },

      {
        description: {
          it: 'Accetto di rispondere al questionario sullo stile di vita ogni settimana.'
        },
        taskId: 4
      }
    ],
    extraItems: [
    ]
  }
}
