export default {
  _key: '3507',
  teamKey: '1608',
  created: '2021-02-08T15:05:35.156Z',
  name: {
    en: 'Example Questionnaire',
    sv: 'Exempel formulär',
    es: 'Formulario de ejemplo',
    it: 'Esempio di questionario'
  },
  description: {
    en: 'This is an example questionnaire that show-cases Mobsitudy forms.',
    sv: 'Detta är ett exempel på frågeformulär som visar fall Mobsitudy-former.',
    es: 'Este es un ejemplo de formulario que muestra como funcionan los formularios en Mobsitudy.',
    it: 'Questo è un esempio di questionario che mostra come funzionano i moduli in Mobsitudy.'
  },
  summaryFunction: 'return { value: answers[1].answer };',
  summaryFunctionDescription: {
    value: {
      name: {
        en: 'Summary value',
        sv: 'Sammanfattningsvärde',
        es: 'Valor resumen',
        it: 'Valore di riepilogo'
      },
      type: 'number',
      description: {
        en: 'Returns the answer to the second question.',
        sv: 'Returnerar svaret på den andra frågan.',
        es: 'Devuelve la respuesta a la segunda pregunta.',
        it: 'Restituisce la risposta alla seconda domanda.'
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        en: 'Example single-choice questionnaire. Which choice do you prefer?',
        sv: 'Exempel på enkät frågeformulär. Vilket val föredrar du?',
        es: 'Ejemplo de pregunta con eleccion singula. Cual prefieres?',
        it: 'Esempio di domanda a scelta singola. Quale opzione preferisci?'
      },
      helper: {
        en: 'Only one choice can be selected.',
        sv: 'Välj ett alternativ.',
        es: 'Solo una opcion puede ser elegida.',
        it: 'Può essere selezionata solo un\'opzione.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            en: 'Choice 1',
            sv: 'Val 1',
            es: 'Opcion 1',
            it: 'Opzione 1'
          }
        },
        {
          id: 'Q1A2',
          text: {
            en: 'Choice 2',
            sv: 'Val 2',
            es: 'Opcion 2',
            it: 'Opzione 2'
          }
        },
        {
          id: 'Q1A3',
          text: {
            en: 'Choice 3',
            sv: 'Val 3',
            es: 'Opcion 3',
            it: 'Opzione 3'
          }
        },
        {
          id: 'Q1A4',
          text: {
            en: 'Other',
            sv: 'Övrig',
            es: 'Otro',
            it: 'Altro'
          },
          includeFreeText: true
        }
      ]
    },

    {
      id: 'Q2',
      text: {
        en: 'Example of slider question.',
        sv: 'Exempel på skjutreglage svar.',
        es: 'Ejemplo de pregunta con escala (deslizador).',
        it: 'Esempio di domanda con slider.'
      },
      helper: {
        en: 'Choose the value by moving the dot up or down.',
        sv: 'Välj värdet genom att flytta punkten uppåt eller nedåt.',
        es: 'Elige el valor moviendo el punto arriba o abajo.',
        it: 'Scegli il valore spostando il punto su o giù.'
      },
      type: 'slider',
      min: 1,
      max: 100,
      vertical: true
    },

    {
      id: 'Q3',
      text: {
        en: 'Example freetext question.',
        sv: 'Exempel på fritextfråga.',
        es: 'Ejemplo de pregunta con texto libre.',
        it: 'Esempio di domanda con testo libero.'
      },
      footer: {
        en: 'Example of footer text.',
        sv: 'Exempel på sidfotstext.',
        es: 'Ejemplo de nota a pie de pagina.',
        it: 'Esempio di testo a piè di pagina.'
      },
      helper: {
        en: 'Any text is valid.',
        sv: 'Alla texter är giltiga.',
        es: 'Cualquier texto es valido.',
        it: 'Qualsiasi testo è valido.'
      },
      type: 'freetext'
    },

    {
      id: 'Q4',
      text: {
        en: 'Example multi-choice question.',
        sv: 'Exempel på flervalsfråga.',
        es: 'Ejemplo de pregunta de eleccion multiple.',
        it: 'Esempio di domanda a scelta multipla.'
      },
      helper: {
        en: 'Multiple choices can be selected.',
        sv: 'Flera val kan väljas.',
        es: 'Se pueden elegir mulitples.',
        it: 'Possono essere selezionate più opzioni.'
      },
      type: 'multiChoice',
      answerChoices: [
        {
          id: 'Q4A1',
          text: {
            en: 'Choice 1',
            sv: 'Val 1',
            es: 'Opcion 1',
            it: 'Opzione 1'
          }
        },
        {
          id: 'Q4A2',
          text: {
            en: 'Choice 2',
            sv: 'Val 2',
            es: 'Opcion 2',
            it: 'Opzione 2'
          }
        },
        {
          id: 'Q4A3',
          text: {
            en: 'Choice 3',
            sv: 'Val 3',
            es: 'Opcion 3',
            it: 'Opzione 3'
          },
          nestedQuestions: [
            {
              id: 'Q4A3Q1',
              text: {
                en: 'Example of nested question 1.',
                sv: 'Exempel på inbäddad fråga 1.',
                es: 'Ejemplo de pregunta anidada 1.',
                it: 'Esempio di domanda nidificata 1.'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q4A3Q1A1',
                  text: {
                    en: 'Nested choice 1',
                    sv: 'Inbäddat val 1',
                    es: 'Opcion anidada 1',
                    it: 'Opzione nidificata 1'
                  }
                },
                {
                  id: 'Q4A3Q1A2',
                  text: {
                    en: 'Nested choice 2',
                    sv: 'Inbäddat val 2',
                    es: 'Opcion anidada 2',
                    it: 'Opzione nidificata 2'
                  }
                }
              ]
            },
            {
              id: 'Q4A3Q2',
              text: {
                en: 'Example of nested question 2.',
                sv: 'Exempel på inbäddad fråga 2.',
                es: 'Ejemplo de pregunta anidada 2.',
                it: 'Esempio di domanda nidificata 2.'
              },
              type: 'singleChoice',
              answerChoices: [
                {
                  id: 'Q4A3Q2A1',
                  text: {
                    en: 'Nested choice 1',
                    sv: 'Inbäddat val 1',
                    es: 'Opcion anidada 1',
                    it: 'Opzione nidificata 1'
                  }
                },
                {
                  id: 'Q4A3Q2A2',
                  text: {
                    en: 'Nested choice 2',
                    sv: 'Inbäddat val 2',
                    es: 'Opcion anidada 2',
                    it: 'Opzione nidificata 2'
                  }
                },
                {
                  id: 'Q4A3Q2A3',
                  text: {
                    en: 'Nested choice 3',
                    sv: 'Inbäddat val 3',
                    es: 'Opcion anidada 3',
                    it: 'Opzione nidificata 3'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'Q4A4',
          text: {
            en: 'Other',
            sv: 'Övrig',
            es: 'Otro',
            it: 'Altro'
          },
          includeFreeText: true
        }
      ]
    },

    {
      id: 'Q5',
      text: {
        en: 'Example of number question.',
        sv: 'Exempel på nummerfråga.',
        es: 'Ejemplo de pregunta numerica.',
        it: 'Esempio di domanda numerica.'
      },
      min: 1,
      max: 10,
      helper: {
        en: 'A number between 1 and 10 must be inserted.',
        sv: 'Ett tal mellan 1 och 10 måste infogas.',
        es: 'Se puede insertar un numero entre 1 y 10.',
        it: 'Deve essere inserito un numero tra 1 e 10.'
      },
      type: 'number'
    },

    {
      id: 'Q6',
      text: {
        en: 'Example of photo question.',
        sv: 'Exempel på fotofråga.',
        es: 'Ejemplo de pregunta foto.',
        it: 'Esempio di domanda foto.'
      },
      helper: {
        en: 'Tap on "Take a picture" to take a picture.',
        sv: 'Tryck på "Ta en bild" för att ta en bild.',
        es: 'Toca "Tomar una foto" para tomar una foto.',
        it: 'Premi "Scatta una foto" per scattare una foto.'
      },
      type: 'photo'
    },

    {
      id: 'Q7',
      text: {
        en: 'Do you want to take another photo?',
        sv: 'Vill du ta ett foto till?',
        es: '¿Quieres tomar otra foto?',
        it: 'Vuoi scattare un\'altra foto?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q7A1',
          text: {
            en: 'Yes',
            sv: 'Ja',
            es: 'Si',
            it: 'Si'
          },
          nextQuestionId: 'Q6'
        },
        {
          id: 'Q7A2',
          text: {
            en: 'No',
            sv: 'Nej',
            es: 'No',
            it: 'No'
          },
          nextQuestionId: 'Q8'
        }
      ]
    },

    {
      id: 'Q8',
      text: {
        en: 'Example of only text question without any answer.',
        sv: 'Exempel på endast textfråga utan något svar.',
        es: 'Ejemplo de pregunta con solo texto y ninguna respuesta.',
        it: 'Esempio di domanda con solo testo e nessuna risposta.'
      },
      helper: {
        en: 'No answer has to be given here.',
        sv: 'Inget svar behöver ges här.',
        es: 'No hay que dar ninguna respuesta.',
        it: 'Non è necessario fornire alcuna risposta.'
      },
      type: 'textOnly'
    },

    {
      id: 'Q9',
      text: {
        en: 'Example of time question.',
        sv: 'Exempel på timmefråga.',
        es: 'Ejemplo de pregunta de horario.',
        it: 'Esempio di domanda sull\'ora.'
      },
      helper: {
        en: 'Hour and minutes.',
        sv: 'Timme och minuter.',
        es: 'Hora y minutos.',
        it: 'Ore e minuti.'
      },
      type: 'time',
      nextDefaultId: 'ENDFORM'
    }

  ],
  createdTS: '2018-11-09T10:49:50.473Z'
}
