export default {
  _key: 'lindangenQol',
  createdTS: '2019-10-25T10:09:53.222Z',
  name: {
    en: 'WHO Quality of Life',
    sv: 'WHO Livskvalitet'
  },
  description: {
    en: `This questionnaire assesses the quality of life.`,
    sv: 'Denna enkät utvärderar livskvalitet.'
  },
  questions:
    [{
      id: 'Q1',
      text: {
        en: 'How would you rate your quality of life?',
        sv: 'Hur värderar du din livskvalitet?'
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
            en: 'Very poor',
            sv: 'Väldigt dålig'
          }
        },
        {
          id: 'Q1A2',
          text: {
            en: 'Poor',
            sv: 'Dålig'
          }
        },
        {
          id: 'Q1A3',
          text: {
            en: 'Neither poor nor good',
            sv: 'Varken bra eller dålig'
          }
        },
        {
          id: 'Q1A4',
          text: {
            en: 'Good',
            sv: 'Bra'
          }
        },
        {
          id: 'Q1A5',
          text: {
            en: 'Very good',
            sv: 'Väldigt bra'
          }
        }
        ]
    },
    {
      id: 'Q2',
      text: {
        en: 'How satisfied are you with your health?',
        sv: 'Hur nöjd är du med din hälsa?'
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
            en: 'Very dissatisfied',
            sv: 'Väldigt missnöjd'
          }
        },
        {
          id: 'Q2A2',
          text: {
            en: 'Dissatisfied',
            sv: 'Missnöjd'
          }
        },
        {
          id: 'Q2A3',
          text: {
            en: 'Neither satisfied nor dissatisfied',
            sv: 'Varken nöjd eller missnöjd'
          }
        },
        {
          id: 'Q2A4',
          text: {
            en: 'Satisfied',
            sv: 'Nöjd'
          }
        },
        {
          id: 'Q2A5',
          text: {
            en: 'Very satisfied',
            sv: 'Väldigt nöjd'
          }
        }
        ],
      nextDefaultId: 'ENDFORM'
    }]
}
