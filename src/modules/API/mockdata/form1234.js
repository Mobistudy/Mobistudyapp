export default {
  name: {
    en: 'Example Questionnaire',
    sv: 'Exempel formulär',
    es: 'Formulario de ejemplo'
  },
  description: {
    en: 'This is an example questionnaire that show-cases Mobsitudy forms.',
    sv: 'Detta är ett exempel på frågeformulär som visar fall Mobsitudy-former.',
    es: 'Este es un ejemplo de formulario que muestra como funcionan los formularios en Mobsitudy.'
  },
  questions: [

    {
      id: 'Q1',
      text: {
        en: 'Example of only text question without any answer.',
        sv: 'Exempel på endast textfråga utan något svar.',
        es: 'Ejemplo de pregunta con solo texto y ninguna respuesta.'
      },
      helper: {
        en: 'No answer has to be given here.',
        sv: 'Inget svar behöver ges här.',
        es: 'No hay que dar ninguna respuesta.'
      },
      type: 'textOnly'
    },

    {
      id: 'Q2',
      text: {
        en: 'Example of slider question.',
        sv: 'Exempel på skjutreglage svar.',
        es: 'Ejemplo de pregunta con escala (deslizador).'
      },
      helper: {
        en: 'Choose the value by moving the dot up or down.',
        sv: 'Välj värdet genom att flytta punkten uppåt eller nedåt.',
        es: 'Elige el valor moviendo el punto arriba o abajo.'
      },
      type: 'slider',
      min: 1,
      max: 100,
      vertical: true
    },

    {
      id: 'Q3',
      text: {
        en: 'Example single-choice questionnaire. Which choice do you prefer?',
        sv: 'Exempel på enkät frågeformulär. Vilket val föredrar du?',
        es: 'Ejemplo de pregunta con eleccion singula. Cual prefieres?'
      },
      helper: {
        en: 'Only one choice can be selected.',
        sv: 'Välj ett alternativ.',
        es: 'Solo una opcion puede ser elegida.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q3A1',
          text: {
            en: 'Choice 1',
            sv: 'Val 1',
            es: 'Opcion 1'
          }
        },
        {
          id: 'Q3A2',
          text: {
            en: 'Choice 2',
            sv: 'Val 2',
            es: 'Opcion 2'
          }
        },
        {
          id: 'Q3A3',
          text: {
            en: 'Choice 3',
            sv: 'Val 3',
            es: 'Opcion 3'
          }
        },
        {
          id: 'Q3A4',
          text: {
            en: 'Other',
            sv: 'Övrig',
            es: 'Otro'
          },
          includeFreeText: true
        }
      ]
    },
    {
      id: 'Q4',
      text: {
        en: 'Example freetext question.',
        sv: 'Exempel på fritextfråga.',
        es: 'Ejemplo de pregunta con texto libre.'
      },
      footer: {
        en: `Example of footer text.`,
        sv: `Exempel på sidfotstext.`,
        es: 'Ejemplo de nota a pie de pagina.'
      },
      helper: {
        en: 'Any text is valid.',
        sv: 'Alla texter är giltiga.',
        es: 'Cualquier texto es valido.'
      },
      type: 'freetext'
    },

    {
      id: 'Q5',
      text: {
        en: 'Example multi-choice question.',
        sv: 'Exempel på flervalsfråga.',
        es: 'Ejemplo de pregunta de eleccion multiple.'
      },
      helper: {
        en: 'Multiple choices can be selected.',
        sv: 'Flera val kan väljas.',
        es: 'Se pueden elegir mulitples.'
      },
      type: 'multiChoice',
      answerChoices: [
        {
          id: 'Q5A1',
          text: {
            en: 'Choice 1',
            sv: 'Val 1',
            es: 'Opcion 1'
          }
        },
        {
          id: 'Q5A2',
          text: {
            en: 'Choice 2',
            sv: 'Val 2',
            es: 'Opcion 2'
          }
        },
        {
          id: 'Q5A3',
          text: {
            en: 'Choice 3',
            sv: 'Val 3',
            es: 'Opcion 3'
          }
        },
        {
          id: 'Q5A4',
          text: {
            en: 'Other',
            sv: 'Övrig',
            es: 'Otro'
          },
          includeFreeText: true
        }
      ]
    },

    {
      id: 'Q6',
      text: {
        en: 'Example of number question.',
        sv: 'Exempel på nummerfråga.',
        es: 'Ejemplo de pregunta numerica.'
      },
      min: 1,
      max: 10,
      helper: {
        en: 'A number between 1 and 10 must be inserted.',
        sv: 'Ett tal mellan 1 och 10 måste infogas.',
        es: 'Se puede insertar un numero entre 1 y 10.'
      },
      type: 'number',
      nextDefaultId: 'ENDFORM'
    }
  ],
  createdTS: '2018-11-09T10:49:50.473Z'
}
