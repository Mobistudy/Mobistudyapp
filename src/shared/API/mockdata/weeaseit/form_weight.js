export default {
  _key: '0003',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Peso'
  },
  description: {
    it: 'Riporta il tuo peso.'
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Quanto pesi oggi?'
      },
      helper: {
        it: 'Inserisci il peso in kg. È possibile specificare numeri con la virgola.'
      },
      type: 'number',
      min: 40,
      max: 200
    }
  ]
}
