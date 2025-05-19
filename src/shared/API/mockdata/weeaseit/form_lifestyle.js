export default {
  _key: '0004',
  teamKey: '1608',
  createdTS: '2025-05-18',
  name: {
    it: 'Stile di vita',
    en: 'Lifestyle'
  },
  description: {
    it: 'Questionario per la valutazione dello stile di vita.',
    en: 'Questionnaire for lifestyle assessment.'
  },
  summaryFunction: 'return { smokedTimesWeek: answers[1].answer, exerciseTotalTime: answers[2].answer * answers[3].answer, alcoholTimesWeek: answers[4].answer, socialContactsWeek: answers[5].answer, unprescribedMedsWeek: answers[6].answer, sexTimesWeek: answers[7].answer, hobbiesTotalTime: answers[8].answer * answers[9].answer };',
  summaryFunctionDescription: {
    smokedTimesWeek: {
      name: {
        en: 'Times smoked',
        it: 'Volte fumate'
      },
      type: 'number',
      description: {
        en: 'Number of times smoked in the last week',
        it: 'Numero di volte fumate nella scorsa settimana'
      }
    },
    exerciseTotalTime: {
      name: {
        en: 'Total exercise time',
        it: 'Tempo totale di esercizio'
      },
      type: 'number',
      description: {
        en: 'Total time of exercise in the last week',
        it: 'Tempo totale di esercizio nella scorsa settimana'
      }
    },
    alcoholTimesWeek: {
      name: {
        en: 'Alcohol consumption',
        it: 'Consumo di alcol'
      },
      type: 'number',
      description: {
        en: 'Number of times drank in the last week',
        it: 'Numero di volte bevute nella scorsa settimana'
      }
    },
    socialContactsWeek: {
      name: {
        en: 'Social contacts',
        it: 'Contatti sociali'
      },
      type: 'number',
      description: {
        en: 'Number of social contacts in the last week',
        it: 'Numero di contatti sociali nella scorsa settimana'
      }
    },
    unprescribedMedsWeek: {
      name: {
        en: 'Medications not prescribed',
        it: 'Medicinali non prescritti'
      },
      type: 'number',
      description: {
        en: 'Number of medications other than prescribed taken in the last week',
        it: 'Numero di medicinali non prescritti per il trattamento assunti nella scorsa settimana'
      }
    },
    sexTimesWeek: {
      name: {
        en: 'Sexual relations',
        it: 'Rapporti sessuali'
      },
      type: 'number',
      description: {
        en: 'Number of sexual relations in the last week',
        it: 'Numero di rapporti sessuali nella scorsa settimana'
      }
    },
    hobbiesTotalTime: {
      name: {
        en: 'Total time for hobbies',
        it: 'Tempo totale per gli hobby'
      },
      type: 'number',
      description: {
        en: 'Total time in minutes dedicated to hobbies in the last week',
        it: 'Tempo totale in minuti dedicato agli hobby nella scorsa settimana'
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Cosa ha fumato nella scorsa settimana?',
        en: 'What did you smoke in the last week?'
      },
      helper: {
        it: 'Se sì indichi quante volte, altrimenti salti la domanda o indichi 0.',
        en: 'If yes, please indicate how many times, otherwise skip the question or indicate 0.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            it: 'Nulla',
            en: 'Nothing'
          }
        },
        {
          id: 'Q1A2',
          text: {
            it: 'Vape',
            en: 'Vape'
          }
        },
        {
          id: 'Q1A3',
          text: {
            it: 'iQOS',
            en: 'iQOS'
          }
        },
        {
          id: 'Q1A4',
          text: {
            it: 'Tabacco',
            en: 'Tobacco'
          }
        },
        {
          id: 'Q1A5',
          text: {
            it: 'Pipa',
            en: 'Pipe'
          }
        },
        {
          id: 'Q1A6',
          text: {
            it: 'Sigaro',
            en: 'Cigar'
          }
        },
        {
          id: 'Q1A7',
          text: {
            it: 'Sigarette',
            en: 'Cigarettes'
          }
        },
        {
          id: 'Q1A8',
          text: {
            it: 'Altro',
            en: 'Other'
          }
        }
      ]
    },

    {
      id: 'Q2',
      text: {
        it: 'Quante volte ha fumato nella scorsa settimana?',
        en: 'How many times did you smoke in the last week?'
      },
      helper: {
        it: 'Indichi 0 se non ha fumato.',
        en: 'Indicate 0 if you did not smoke.'
      },
      type: 'number',
      min: 0,
      max: 500
    },

    {
      id: 'Q3',
      text: {
        it: 'Quante volte ha fatto attività fisica nella scorsa settimana?',
        en: 'How many times did you exercise in the last week?'
      },
      helper: {
        it: 'Indichi 0 se non ha svolto attività fisica.',
        en: 'Indicate 0 if you did not exercise.'
      },
      type: 'number',
      min: 0,
      max: 21
    },

    {
      id: 'Q4',
      text: {
        it: 'Ogni volta per quanto tempo?',
        en: 'How long each time?'
      },
      helper: {
        it: 'Indichi il tempo in minuti. Inserisca 0 se non ha svolto attività fisica.',
        en: 'Indicate the time in minutes. Enter 0 if you did not exercise.'
      },
      type: 'number',
      min: 0,
      max: 300
    },

    {
      id: 'Q5',
      text: {
        it: 'Quante volte ha bevuto alcolici nella scorsa settimana?',
        en: 'How many times did you drink alcohol in the last week?'
      },
      helper: {
        it: 'Scriva 0 se non ha bevuto alcolici.',
        en: 'Write 0 if you did not drink alcohol.'
      },
      type: 'number',
      min: 0,
      max: 50
    },

    {
      id: 'Q6',
      text: {
        it: 'Quante volte ha avuto contatti con le persone della tua rete sociale nelle scorsa settimana?',
        en: 'How many times did you have contact with people in your social network in the last week?'
      },
      helper: {
        it: 'Scriva 0 se non ha avuto contatti.',
        en: 'Write 0 if you did not have contacts.'
      },
      type: 'number',
      min: 0,
      max: 50
    },

    {
      id: 'Q7',
      text: {
        it: 'Quante volte ha assunto medicinali o sedativi diversi da quelli prescritti per il trattamento?',
        en: 'How many times did you take medications or sedatives other than those prescribed for treatment?'
      },
      helper: {
        it: 'Scriva 0 se non ha assunto medicinali.',
        en: 'Write 0 if you did not take medication.'
      },
      type: 'number',
      min: 0,
      max: 50
    },

    {
      id: 'Q8',
      text: {
        it: 'Quante volte ha avuto rapporti intimi di natura sessuale?',
        en: 'How many times did you have intimate sexual relations?'
      },
      helper: {
        it: 'Scriva 0 se non ha avuto rapporti intimi.',
        en: 'Write 0 if you did not have intimate relations.'
      },
      type: 'number',
      min: 0,
      max: 50
    },

    {
      id: 'Q9',
      text: {
        it: 'Quante volte ha dedicato del tempo ai suoi hobby?',
        en: 'How many times did you dedicate time to your hobbies?'
      },
      helper: {
        it: 'Scriva 0 se non ha dedicato tempo ai suoi hobby.',
        en: 'Write 0 if you did not dedicate time to your hobbies.'
      },
      type: 'number',
      min: 0,
      max: 50
    },

    {
      id: 'Q10',
      text: {
        it: 'Ogni volta per quanto tempo?',
        en: 'How long each time?'
      },
      helper: {
        it: 'Tempo in minuti. Scriva 0 se non ha dedicato agli hobby.',
        en: 'In minutes. Write 0 if you did not dedicate time to hobbies.'
      },
      type: 'number',
      min: 0,
      max: 500
    }
  ]
}
