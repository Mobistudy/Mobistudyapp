export default {
  _key: '0001',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Livello di dolore'
  },
  description: {
    it: 'Questo breve questionario è necessario per indicare il proprio livello di dolore.'
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Quanto dolore hai provato ieri?'
      },
      helper: {
        it: 'Inserisci un numero tra 0 e 10, dove 0 significa “Nessun dolore”, 5 significa “dolore moderato” e 10 significa “Il peggior dolore possibile”'
      },
      type: 'number',
      min: 0,
      max: 10
    },

    {
      id: 'Q2',
      text: {
        it: 'Dove hai provato più dolore?'
      },
      type: 'freetext'
    }
  ]
}
