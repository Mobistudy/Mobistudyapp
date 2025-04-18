export default {
  _key: '0004',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Stile di vita'
  },
  description: {
    it: 'Questionario per la valutazione dello stile di vita.'
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Nelle scorse due settimana indichi quante volte ha svolto la seguente attività:<br><br><b>Assistere un adulto malato o disabile</b>'
      },
      helper: {
        it: 'Se sì indichi quante volte, altrimenti salti la domanda o indichi 0.'
      },
      type: 'number',
      min: 0,
      max: 10
    },

    {
      id: 'Q2',
      text: {
        it: 'Nelle scorse due settimana indichi quante volte ha svolto la seguente attività:<br><br><b>Svolgere attività con nipoti, nipotini o bambini del vicinato</b>'
      },
      helper: {
        it: 'Se sì indichi quante volte, altrimenti salti la domanda o indichi 0.'
      },
      type: 'number',
      min: 0,
      max: 10
    },

    {
      id: 'Q3',
      text: {
        it: 'Nelle scorse due settimana indichi quante volte ha svolto la seguente attività:<br><br><b>Svolgere attività di volontariato con bambini o giovani</b>'
      },
      helper: {
        it: 'Se sì indichi quante volte, altrimenti salti la domanda o indichi 0.'
      },
      type: 'number',
      min: 0,
      max: 10
    }
  ]
}
