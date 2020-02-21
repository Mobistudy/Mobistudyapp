export default {
  createdTS: '2020-02-10T10:09:53.222Z',
  name: {
    en: '6MWT Test form',
    sv: '6MWT Testformulär'
  },
  description: {
    en: 'The Clinical Six Minute Walk Test Preperation form',
    sv: 'Ett '
  },
  questions: [{
    id: 'Q1',
    type: 'singleChoice',
    text: {
      en: 'A question about something relevant to 6MWT?',
      sv: 'En fråga som är relevant till 6MWT?'
    },
    helper: {
      en: 'Choose one option.',
      sv: 'Välj ett alternativ.'
    },
    nextDefaultId: 'Q2',
    answerChoices: [{
      id: 'Q1A1',
      text: {
        en: 'Red',
        sv: 'Röd'
      },
      nextQuestionId: 'Q2'
    },
    {
      id: 'Q2',
      text: {
        en: 'Green',
        sv: 'Grön'
      },
      nextQuestionId: 'Q3'
    }]
  },
  {
    id: 'Q2',
    type: 'multipleChoice',
    text: {
      en: 'Choose your letter',
      sv: 'Välj ditt bokstav'
    },
    helper: {
      en: 'Choose as many as you want',
      sv: 'Välj så många du vill'
    },
    nextDefaultId: 'Q3',
    answerChoices: [
      {
        id: 'Q2A1',
        text: {
          en: 'A',
          sv: 'A'
        }
      },
      {
        id: 'Q2A2',
        text: {
          en: 'B',
          sv: 'B'
        }
      }
    ]
  },
  {
    id: 'Q3',
    type: 'freetext',
    text: {
      en: 'Type some free text here',
      sv: 'Skriv lite fri text här'
    },
    nextDefaultId: 'ENDFORM'
  }]
}
