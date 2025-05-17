export default {
  _key: '000xxx',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'PHQ-9. Identificazione di condizioni di depressione.'
  },
  description: {
    it: 'PHQ-9 è uno strumento per screening, diagnosi, monitoraggio e misura della gravità della depressione. Può essere somministrato ripetutamente allo scopo di misurare il trend della depressione sotto terapia.'
  },
  summaryFunction: 'return { total: answers.reduce((acc, curr, idx)=>{ return acc + ( (idx==9)? 0 : (parseInt(curr.answer.slice(-1)) -1) ) }, 0) };',
  summaryFunctionDescription: {
    total: {
      name: {
        en: 'Total',
        it: 'Totale'
      },
      type: 'number',
      description: {
        en: 'Total PHQ-9 score',
        it: 'Punteggio totale PHQ-9'
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Scarso interesse o piacere nel fare le cose'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q1A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q1A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q1A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q2',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Sentirsi “giù”, di cattivo umore, disperato'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q2A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q2A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q2A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q2A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q3',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Soffrire d’insonnia o dormire troppo'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q3A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q3A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q3A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q3A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q4',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Sentirsi stanco o con poche energie'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q4A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q4A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q4A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q4A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q5',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Avere scarso appetito o perso peso o essere bulimico'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q5A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q5A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q5A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q5A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q6',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Sentirsi contrariato, “un fallito”, lasciarsi andare o sentirsi abbandonato dalla famiglia'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q6A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q6A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q6A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q6A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q7',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Difficoltà nel concentrarsi sulle cose, per es. nel leggere il giornale o nel guardare la TV'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q7A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q7A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q7A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q7A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q8',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Muoversi o parlare lentamente tanto da non essere compreso da altri. Oppure, sentirsi agitato e muoversi più del solito'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q8A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q8A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q8A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q8A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q9',
      text: {
        it: 'Nelle ultime 2 settimane, quanto spesso sei stato disturbato dal seguente problema? <br> Pensare che sarebbe meglio morire o ferirsi in qualche modo'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q9A1',
          text: {
            it: 'Mai'
          }
        },
        {
          id: 'Q9A2',
          text: {
            it: 'Qualche giorno'
          }
        },
        {
          id: 'Q9A3',
          text: {
            it: 'Più della metà dei giorni'
          }
        },
        {
          id: 'Q9A4',
          text: {
            it: 'Quasi tutti i giorni'
          }
        }
      ]
    },

    {
      id: 'Q10',
      text: {
        it: 'In presenza di qualcuno dei problemi sopra descritti, quanto la loro presenza ha reso difficile il tuo lavoro, l’aver cura della tua casa o lo stare con altre persone?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q10A1',
          text: {
            it: 'Nessuna difficoltà'
          }
        },
        {
          id: 'Q10A2',
          text: {
            it: 'Qualche difficoltà'
          }
        },
        {
          id: 'Q10A3',
          text: {
            it: 'Molto difficile'
          }
        },
        {
          id: 'Q10A4',
          text: {
            it: 'Estremamente difficile'
          }
        }
      ]
    }
  ]
}
