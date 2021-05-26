export default {
  createdTS: '2019-10-25T10:09:53.222Z',
  name: {
    en: 'Health questionnaire',
    sv: 'Hälsoenkät'
  },
  description: {
    en: `This questionnaire is about your general health.`,
    sv: 'Denna enkät handlar om din allmänna hälsa.'
  },
  questions:
    [{
      id: 'Q1',
      text: {
        en: 'How much time do you spend in a normal week on physical training that leaves you out of breath – for example running, fitness training, or ball sports?',
        sv: 'Hur mycket tid ägnar du en vanlig vecka åt fysisk träning som får dig att bli andfådd, till exempel löpning, motionsgymnastik eller bollsport?'
      },
      helper: {
        en: 'Choose one option.',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices:
        [{
          id: 'Q1A1',
          text: {
            en: '0 minutes/no time',
            sv: '0 minuter/ingen tid'
          }
        },
        {
          id: 'Q1A2',
          text: {
            en: 'Less than 30 minutes',
            sv: 'Mindre än 30 minuter'
          }
        },
        {
          id: 'Q1A3',
          text: {
            en: '30-59 minutes (0.5-1 hour)',
            sv: '30-59 minuter (0,5-1 timme)'
          }
        },
        {
          id: 'Q1A4',
          text: {
            en: '60-89 minutes (1-1.5 hours)',
            sv: '60-89 minuter (1-1,5 timmar)'
          }
        },
        {
          id: 'Q1A5',
          text: {
            en: '90-119 minutes (1.5-2 hours)',
            sv: '90-119 minuter (1,5-2 timmar)'
          }
        },
        {
          id: 'Q1A6',
          text: {
            en: '2 hours or more',
            sv: '2 timmar eller mer'
          }
        }
        ]
    },
    {
      id: 'Q2',
      text: {
        en: 'How often do you eat vegetables and root vegetables? This means all kinds of vegetables, leguminous plants and root vegetables (but not potatoes). Includes fresh, frozen, preserved or cooked vegetables, vegetable juice, vegetable soups etc.',
        sv: 'Hur ofta äter du grönsaker och rotfrukter? Gäller alla typer av grönsaker, baljväxter och rotfrukter (utom potatis). Gäller färska, frysta, konserverade, stuvade, grönsaksjuicer, grönsakssoppor m.m.'
      },
      helper: {
        en: 'Choose one option.',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices:
        [{
          id: 'Q2A1',
          text: {
            en: '3 times a day or more',
            sv: '3 gånger om dagen eller mer'
          }
        },
        {
          id: 'Q2A2',
          text: {
            en: 'Twice a day',
            sv: 'Två gånger om dagen'
          }
        },
        {
          id: 'Q2A3',
          text: {
            en: '5-6 times a week',
            sv: '5-6 gånger i veckan'
          }
        },
        {
          id: 'Q2A4',
          text: {
            en: '3-4 times a week',
            sv: '3-4 gånger i veckan'
          }
        },
        {
          id: 'Q2A5',
          text: {
            en: '1-2 times a week',
            sv: '1-2 gånger i veckan'
          }
        },
        {
          id: 'Q2A6',
          text: {
            en: 'Less than one time per week, or never',
            sv: 'Mindre än en gång per vecka, eller aldrig'
          }
        }
        ],
      nextDefaultId: 'ENDFORM'
    }]
}
