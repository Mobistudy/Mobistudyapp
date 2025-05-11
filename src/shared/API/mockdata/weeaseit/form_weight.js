export default {
  _key: '0003',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Peso',
    en: 'Weight'
  },
  description: {
    it: 'Riporta il tuo peso.',
    en: 'Report your weight.'
  },
  summaryFunction: 'return { weight: answers[0].answer };',
  summaryFunctionDescription: {
    weight: {
      name: {
        en: 'Weight (kg)',
        it: 'Peso (kg)'
      },
      type: 'number',
      description: {
        en: 'Self declared weight in kg',
        it: 'Peso auto dichiarato in kg'
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Quanto pesi oggi?',
        en: 'What is your weight today?'
      },
      helper: {
        it: 'Inserisci il peso in kg. È possibile specificare numeri con la virgola.',
        en: 'Enter the weight in kg. You can specify decimals.'
      },
      type: 'number',
      min: 40,
      max: 200
    }
  ]
}
