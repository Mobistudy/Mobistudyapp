export default {
  name: {
    en: 'COPD form',
    sv: 'KOL formulär'
  },
  description: {
    en: 'The Clinical COPD Questionnaire (CCQ) is a simple 10-item, health-related quality of life questionnaire (HRQoL) with good psychometric properties.',
    sv: 'Det kliniska COPD-frågeformuläret (CCQ) är en enkel frågeformulär för hälsorelaterad livskvalitet (HRQoL) med goda psykometriska egenskaper.'
  },
  questions: [
    {
      id: 'Q1',
      text: {
        en: 'On average, during the past week, how often did you feel short of breath at rest?',
        sv: 'I genomsnitt under den senaste veckan, hur ofta kände du andnöd i vila?'
      },
      helper: {
        en: 'Choose one option,',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            en: 'never',
            sv: 'aldrig'
          }
        },
        {
          id: 'Q1A2',
          text: {
            en: 'hardly ever',
            sv: 'nästan aldrig'
          }
        },
        {
          id: 'Q1A3',
          text: {
            en: 'a few times',
            sv: 'några gånger'
          }
        },
        {
          id: 'Q1A4',
          text: {
            en: 'several times',
            sv: 'flera gånger'
          }
        },
        {
          id: 'Q1A5',
          text: {
            en: 'many times',
            sv: 'många gånger'
          }
        },
        {
          id: 'Q1A6',
          text: {
            en: 'almost all the time',
            sv: 'nästan hela tiden'
          }
        }
      ]
    },
    {
      id: 'Q2',
      text: {
        en: 'On average, during the past week, how often did you feel short of breath doing physical activities?',
        sv: 'I genomsnitt under den senaste veckan, hur ofta kände du kort andedräkt som gör fysiska aktiviteter'
      },
      helper: {
        en: 'Choose one option,',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q2A1',
          text: {
            en: 'never',
            sv: 'aldrig'
          }
        },
        {
          id: 'Q2A2',
          text: {
            en: 'hardly ever',
            sv: 'nästan aldrig'
          }
        },
        {
          id: 'Q2A3',
          text: {
            en: 'a few times',
            sv: 'några gånger'
          }
        },
        {
          id: 'Q2A4',
          text: {
            en: 'several times',
            sv: 'flera gånger'
          }
        },
        {
          id: 'Q2A5',
          text: {
            en: 'many times',
            sv: 'många gånger'
          }
        },
        {
          id: 'Q2A6',
          text: {
            en: 'almost all the time',
            sv: 'nästan hela tiden'
          }
        }
      ]
    },
    {
      id: 'Q3',
      text: {
        en: 'On average, during the past week, how often did you feel concerned about getting a cold or your breathing getting worse?',
        sv: 'I genomsnitt under den senaste veckan, hur ofta kände du dig bekymrad över att bli förkylt eller att andningen blev värre?'
      },
      helper: {
        en: 'Choose one option,',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q3A1',
          text: {
            en: 'never',
            sv: 'aldrig'
          }
        },
        {
          id: 'Q3A2',
          text: {
            en: 'hardly ever',
            sv: 'nästan aldrig'
          }
        },
        {
          id: 'Q3A3',
          text: {
            en: 'a few times',
            sv: 'några gånger'
          }
        },
        {
          id: 'Q3A4',
          text: {
            en: 'several times',
            sv: 'flera gånger'
          }
        },
        {
          id: 'Q3A5',
          text: {
            en: 'many times',
            sv: 'många gånger'
          }
        },
        {
          id: 'Q3A6',
          text: {
            en: 'almost all the time',
            sv: 'nästan hela tiden'
          }
        }
      ]
    },
    {
      id: 'Q4',
      text: {
        en: 'On average, during the past week, how often did you feel depressed because of your breathing problems?',
        sv: 'I genomsnitt under den senaste veckan, hur ofta kände du deprimerad på grund av dina andningsproblem?'
      },
      helper: {
        en: 'Choose one option,',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q4A1',
          text: {
            en: 'never',
            sv: 'aldrig'
          }
        },
        {
          id: 'Q4A2',
          text: {
            en: 'hardly ever',
            sv: 'nästan aldrig'
          }
        },
        {
          id: 'Q4A3',
          text: {
            en: 'a few times',
            sv: 'några gånger'
          }
        },
        {
          id: 'Q4A4',
          text: {
            en: 'several times',
            sv: 'flera gånger'
          }
        },
        {
          id: 'Q4A5',
          text: {
            en: 'many times',
            sv: 'många gånger'
          }
        },
        {
          id: 'Q4A6',
          text: {
            en: 'almost all the time',
            sv: 'nästan hela tiden'
          }
        }
      ]
    },
    {
      id: 'Q5',
      text: {
        en: 'Describe how you feel.',
        sv: 'Beskriv hur du mår.'
      },
      helper: {
        en: 'Use your own words.',
        sv: 'Använd dina egna ord.'
      },
      type: 'freetext'
    },
    {
      id: 'Q6',
      text: {
        en: 'Describe your symptoms.',
        sv: 'Beskriv dina symtom.'
      },
      helper: {
        en: 'Choose as many as you want.',
        sv: 'Välj så många du vill.'
      },
      type: 'multiChoice',
      nextDefaultId: 'ENDFORM',
      answerChoices: [
        {
          id: 'Q6A1',
          text: {
            en: 'Cough',
            sv: 'Hosta'
          }
        },
        {
          id: 'Q6A2',
          text: {
            en: 'Sputum',
            sv: 'Sputum'
          }
        },
        {
          id: 'Q6A3',
          text: {
            en: 'Short of breath',
            sv: 'Andfådd'
          }
        }
      ]
    }
  ],
  createdTS: '2018-11-09T10:49:50.473Z'
}
