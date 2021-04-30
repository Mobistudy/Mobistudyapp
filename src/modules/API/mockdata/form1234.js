export default {
  name: {
    en: 'Example Questionnaire',
    sv: 'Exempel formulär'
  },
  description: {
    en: 'This is an example questionnaire that show-cases Mobsitudy forms.',
    sv: 'Detta är ett exempel på frågeformulär som visar fall Mobsitudy-former.'
  },
  questions: [
    {
      id: 'Q1',
      text: {
        en: 'Example single-choice questionnaire. Which choice do you prefer?',
        sv: 'Exempel på enkät frågeformulär. Vilket val föredrar du?'
      },
      helper: {
        en: 'Only one choice can be selected.',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            en: 'Choice 1',
            sv: 'Val 1'
          }
        },
        {
          id: 'Q1A2',
          text: {
            en: 'Choice 2',
            sv: 'Val 2'
          }
        },
        {
          id: 'Q1A3',
          text: {
            en: 'Choice 3',
            sv: 'Val 3'
          }
        },
        {
          id: 'Q1A4',
          text: {
            en: 'Other',
            sv: 'Övrig'
          },
          includeFreeText: true
        }
      ]
    },
    {
      id: 'Q2',
      text: {
        en: 'Example freetext question.',
        sv: 'Exempel på fritextfråga.'
      },
      footer: {
        en: `Example of footer text.`,
        it: `Exempel på sidfotstext.`
      },
      helper: {
        en: 'Any text is valid.',
        sv: 'Alla texter är giltiga.'
      },
      type: 'freetext'
    },
    {
      id: 'Q3',
      text: {
        en: 'Example multi-choice question.',
        sv: 'Exempel på flervalsfråga.'
      },
      helper: {
        en: 'Multiple choices can be selected.',
        sv: 'Flera val kan väljas.'
      },
      type: 'multiChoice',
      nextDefaultId: 'Q4',
      answerChoices: [
        {
          id: 'Q3A1',
          text: {
            en: 'Choice 1',
            sv: 'Val 1'
          }
        },
        {
          id: 'Q3A2',
          text: {
            en: 'Choice 2',
            sv: 'Val 2'
          }
        },
        {
          id: 'Q3A3',
          text: {
            en: 'Choice 3',
            sv: 'Val 3'
          }
        },
        {
          id: 'Q3A4',
          text: {
            en: 'Other',
            sv: 'Val 4'
          },
          includeFreeText: true
        }
      ]
    },
    {
      id: 'Q4',
      text: {
        en: 'Example of number question.',
        sv: 'Exempel på nummerfråga.'
      },
      helper: {
        en: 'A number between 1 and 10 must be inserted.',
        sv: 'Ett tal mellan 1 och 10 måste infogas.'
      },
      type: 'number',
      nextDefaultId: 'Q5'
    },
    {
      id: 'Q5',
      text: {
        en: 'Example of only text question without any answer.',
        sv: 'Exempel på endast textfråga utan något svar.'
      },
      helper: {
        en: 'No answer has to be given here.',
        sv: 'Inget svar behöver ges här.'
      },
      type: 'textOnly',
      nextDefaultId: 'ENDFORM'
    }
  ],
  createdTS: '2018-11-09T10:49:50.473Z'
}
