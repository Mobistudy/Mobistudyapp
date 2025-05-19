export default {
  _key: '0005',
  teamKey: '1608',
  createdTS: '2025-05-18',
  name: {
    it: 'NCI- PRO-CTCAE',
    en: 'NCI- PRO-CTCAE'
  },
  description: {
    it: 'Quando un individuo è in terapia per un tumore, talvolta può sviluppare diversi sintomi ed effetti collaterali.Per ciascuna domanda, selezionare la risposta (una sola) che meglio corrisponde all’esperienza vissuta negli ultimi sette giorni.',
    en: 'As individuals go through treatment for their cancer they sometimes experience different symptoms and side effects.For each question, please select the one response that best describes your experiences over the past 7 days.'
  },
  summaryFunction: 'return { symptomsNumber: answers.reduce( (acc, ans) => { return acc + ans.answer.length }, 0 ) };',
  summaryFunctionDescription: {
    symptomsNumber: {
      name: {
        en: 'Symptoms number',
        it: 'Numero di sintomi'
      },
      type: 'number',
      description: {
        en: 'Number of symptoms selected',
        it: 'Numero di sintomi selezionati'
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Seleziona i sintomi percepiti negli ultimi 7 giorni',
        en: 'Select the symptoms you have experienced in the last 7 days'
      },
      type: 'multiChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            en: 'Dry mouth',
            it: 'SENSAZIONE DI BOCCA SECCA'
          },
          nestedQuestions: [
            {
              id: 'Q1A1Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your DRY MOUTH at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la SENSAZIONE DI BOCCA SECCA nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q1A1Q1A1',
                  text: {
                    en: 'None',
                    it: 'Per nulla'
                  }
                },
                {
                  id: 'Q1A1Q1A2',
                  text: {
                    en: 'Mild',
                    it: 'Un po’'
                  }
                },
                {
                  id: 'Q1A1Q1A3',
                  text: {
                    en: 'Moderate',
                    it: 'Abbastanza'
                  }
                },
                {
                  id: 'Q1A1Q1A4',
                  text: {
                    en: 'Severe',
                    it: 'Molto'
                  }
                },
                {
                  id: 'Q1A1Q1A5',
                  text: {
                    en: 'Very severe',
                    it: 'Moltissimo'
                  }
                }
              ]
            }
          ]
        },

        {
          id: 'Q1A2',
          text: {
            en: 'Difficulty swallowing',
            it: 'DIFFICOLTÀ A DEGLUTIRE'
          },
          nestedQuestions: [
            {
              id: 'Q1A2Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your DIFFICULTY SWALLOWING at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la DIFFICOLTÀ A DEGLUTIRE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q1A2Q1A1',
                  text: {
                    en: 'None',
                    it: 'Per nulla'
                  }
                },
                {
                  id: 'Q1A2Q1A2',
                  text: {
                    en: 'Mild',
                    it: 'Un po’'
                  }
                },
                {
                  id: 'Q1A2Q1A3',
                  text: {
                    en: 'Moderate',
                    it: 'Abbastanza'
                  }
                },
                {
                  id: 'Q1A2Q1A4',
                  text: {
                    en: 'Severe',
                    it: 'Molto'
                  }
                },
                {
                  id: 'Q1A2Q1A5',
                  text: {
                    en: 'Very severe',
                    it: 'Moltissimo'
                  }
                }
              ]
            }
          ]
        },

        {
          id: 'Q1A3',
          text: {
            en: 'Mouth/throat sores',
            it: 'PIAGHE IN BOCCA O IN GOLA'
          },
          nestedQuestions: [
            {
              id: 'Q1A3Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your MOUTH OR THROAT SORES at their WORST?',
                it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le PIAGHE IN BOCCA O IN GOLA nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q1A3Q1A1',
                  text: {
                    en: 'None',
                    it: 'Per nulla'
                  }
                },
                {
                  id: 'Q1A3Q1A2',
                  text: {
                    en: 'Mild',
                    it: 'Un po’'
                  }
                },
                {
                  id: 'Q1A3Q1A3',
                  text: {
                    en: 'Moderate',
                    it: 'Abbastanza'
                  }
                },
                {
                  id: 'Q1A3Q1A4',
                  text: {
                    en: 'Severe',
                    it: 'Molto'
                  }
                },
                {
                  id: 'Q1A3Q1A5',
                  text: {
                    en: 'Very severe',
                    it: 'Moltissimo'
                  }
                }
              ]
            },

            {
              id: 'Q1A3Q2',
              text: {
                en: 'In the last 7 days, how much did MOUTH OR THROAT SORES INTERFERE with your usual or daily activities?',
                it: 'Negli ultimi 7 giorni, in che misura le PIAGHE IN BOCCA O IN GOLA HANNO INTERFERITO con le Sue attività abituali o quotidiane?'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q1A3Q2A1',
                  text: {
                    en: 'None',
                    it: 'Per nulla'
                  }
                },
                {
                  id: 'Q1A3Q2A2',
                  text: {
                    en: 'Mild',
                    it: 'Un po’'
                  }
                },
                {
                  id: 'Q1A3Q2A3',
                  text: {
                    en: 'Moderate',
                    it: 'Abbastanza'
                  }
                },
                {
                  id: 'Q1A3Q2A4',
                  text: {
                    en: 'Severe',
                    it: 'Molto'
                  }
                },
                {
                  id: 'Q1A3Q2A5',
                  text: {
                    en: 'Very severe',
                    it: 'Moltissimo'
                  }
                }
              ]
            }
          ]
        },

        {
          id: 'Q1A4',
          text: {
            en: 'Cracking at the corners of the mouth (cheilosis/cheilitis)',
            it: 'SCREPOLATURE AGLI ANGOLI DELLA BOCCA'
          },
          nestedQuestions: [
            {
              id: 'Q1A4Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of SKIN CRACKING AT THE CORNERS OF YOUR MOUTH at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le SCREPOLATURE AGLI ANGOLI DELLA BOCCA, nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q1A4Q1A1',
                  text: {
                    en: 'None',
                    it: 'Per nulla'
                  }
                },
                {
                  id: 'Q1A4Q1A2',
                  text: {
                    en: 'Mild',
                    it: 'Un po’'
                  }
                },
                {
                  id: 'Q1A4Q1A3',
                  text: {
                    en: 'Moderate',
                    it: 'Abbastanza'
                  }
                },
                {
                  id: 'Q1A4Q1A4',
                  text: {
                    en: 'Severe',
                    it: 'Molto'
                  }
                },
                {
                  id: 'Q1A4Q1A5',
                  text: {
                    en: 'Very severe',
                    it: 'Moltissimo'
                  }
                }
              ]
            }
          ]
        },

        {
          id: 'Q1A5',
          text: {
            en: 'Voice quality changes',
            it: 'MODIFICAZIONI DELLA VOCE'
          },
          nestedQuestions: [
            {
              id: 'Q1A5Q1',
              text: {
                en: 'In the last 7 days, did you have any VOICE CHANGES?',
                it: 'Negli ultimi 7 giorni, ha notato MODIFICAZIONI DELLA VOCE?'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q1A5Q1A1',
                  text: {
                    en: 'Yes',
                    it: 'Sì'
                  }
                },
                {
                  id: 'Q1A5Q1A2',
                  text: {
                    en: 'No',
                    it: 'No'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
