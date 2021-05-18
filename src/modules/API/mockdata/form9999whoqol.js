export default {
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
            en: '(1) Very poor',
            sv: '(1) Väldigt dålig'
          }
        },
        {
          id: 'Q1A2',
          text: {
            en: '(2) Poor',
            sv: '(2) Dålig'
          }
        },
        {
          id: 'Q1A3',
          text: {
            en: '(3) Neither poor nor good',
            sv: '(3) Varken bra eller dålig'
          }
        },
        {
          id: 'Q1A4',
          text: {
            en: '(4) Good',
            sv: '(4) Bra'
          }
        },
        {
          id: 'Q1A5',
          text: {
            en: '(5) Very good',
            sv: '(5) Väldigt bra'
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
            en: '(1) Very dissatisfied',
            sv: '(1) Väldigt missnöjd'
          }
        },
        {
          id: 'Q2A2',
          text: {
            en: '(2) Dissatisfied',
            sv: '(2) Missnöjd'
          }
        },
        {
          id: 'Q2A3',
          text: {
            en: '(3) Neither satisfied nor dissatisfied',
            sv: '(3) Varken nöjd eller missnöjd'
          }
        },
        {
          id: 'Q2A4',
          text: {
            en: '(4) Satisfied',
            sv: '(4) Nöjd'
          }
        },
        {
          id: 'Q2A5',
          text: {
            en: '(5) Very satisfied',
            sv: '(5) Väldigt nöjd'
          }
        }
        ],
      nextDefaultId: 'ENDFORM'
    }]
}
