export default {
  _key: '0001',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Livello di dolore',
    en: 'Pain Level'
  },
  description: {
    it: 'Questo breve questionario è necessario per indicare il proprio livello di dolore.',
    en: 'This short questionnaire is needed to indicate your pain level.'
  },
  summaryFunction: 'return { painLevel: answers[0].answer };',
  summaryFunctionDescription: {
    painLevel: {
      name: {
        en: 'Pain Level',
        it: 'Livello di dolore'
      },
      type: 'number',
      description: {
        en: 'Self declared pain level',
        it: 'Livello di dolore auto dichiarato'
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Qual è il massimo del dolore che hai provato ieri?',
        en: 'What was the maximum pain you felt yesterday?'
      },
      helper: {
        it: 'Inserisci un numero tra 0 e 10, dove 0 significa “Nessun dolore”, 5 significa “dolore moderato” e 10 significa “Il peggior dolore possibile”',
        en: 'Enter a number between 0 and 10, where 0 means “No pain”, 5 means “Moderate pain” and 10 means “Worst possible pain”'
      },
      type: 'number',
      min: 0,
      max: 10
    },

    {
      id: 'Q2',
      text: {
        it: 'Dove hai provato più dolore?',
        en: 'Where did you feel the most pain?'
      },
      type: 'freetext'
    }
  ]
}
