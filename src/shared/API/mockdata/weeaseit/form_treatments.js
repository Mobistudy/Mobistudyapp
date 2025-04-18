export default {
  _key: '0002',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Trattamenti'
  },
  description: {
    it: 'Breve promemoria per i farmaci.'
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Hai ricordato di prendere le medicine seguendo la prescrizione del medico?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            it: 'Si'
          }
        },
        {
          id: 'Q1A2',
          text: {
            it: 'No'
          }
        },
        {
          id: 'Q1A3',
          text: {
            it: 'Non sono sicuro/sicura'
          }
        }
      ]
    }
  ]
}
