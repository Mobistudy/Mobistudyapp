export default {
  _key: 'lindangenCovid',
  createdTS: '2019-10-25T10:09:53.222Z',
  name: {
    en: 'COVID-19 Symptoms tracking',
    sv: 'Spårning av symptom på COVID-19'
  },
  description: {
    en: `This questionnaire is about identifying symptoms related to COVID-19 and factors that are related to more difficult problems with the disease.`,
    sv: 'Denna enkät handlar om att identifiera symptom relaterade till COVID-19 och andra faktorer som är relaterade till svårare problem med sjukdomen'
  },
  questions: [
    {
      id: 'Q1',
      type: 'multiChoice',
      text: {
        en: `Do you suffer any of these diseases?`,
        sv: 'Har du några av följande sjukdomar?'
      },
      helper: {
        en: 'You can choose more than one option.',
        sv: 'Du kan välja mer än ett alternativ.'
      },
      nextDefaultId: 'Q2',
      answerChoices: [{
        id: 'Q1A1',
        text: {
          en: 'Diabetes',
          sv: 'Diabetes'
        }
      },
      {
        id: 'Q1A2',
        text: {
          en: 'Arterial hypertension',
          sv: 'Arteriell hypertension'
        }
      }, {
        id: 'Q1A3',
        text: {
          en: 'Chronic lung disease',
          sv: 'Kronisk lungsjukdom'
        }
      }, {
        id: 'Q1A4',
        text: {
          en: 'Chronic heart disease',
          sv: 'Kronisk hjärtsjukdom'
        }
      }]
    },
    {
      id: 'Q2',
      text: {
        en: 'Have you ever diagnosed with COVID-19?',
        sv: 'Har du någonsin diagnostiserats med COVID-19?'
      },
      helper: {
        en: 'Choose one option.',
        sv: 'Välj ett alternativ.'
      },
      type: 'singleChoice',
      answerChoices: [{
        id: 'Q2A1',
        text: {
          en: 'Yes',
          sv: 'Ja'
        },
        nextQuestionId: 'Q3'
      },
      {
        id: 'Q2A2',
        text: {
          en: 'No',
          sv: 'Nej'
        },
        nextQuestionId: 'Q4'
      }]
    },
    {
      id: 'Q3',
      type: 'freetext',
      text: {
        en: 'Please specify when you were diagnosed with COVID-19',
        sv: 'Vänligen beskriv när du först diagnostiserades med COVID-19'
      },
      helper: {
        en: 'What date did you receive the positive test result?',
        sv: 'Vilket datum fick du det positiva testresultatet?'
      }
    },
    {
      id: 'Q4',
      type: 'multiChoice',
      text: {
        en: 'Which symptoms do you have today?',
        sv: 'Vilka symptom har du idag?'
      },
      helper: {
        en: 'You can select as many as needed',
        sv: 'Du kan välja så många alternativ du behöver'
      },
      answerChoices: [
        {
          id: 'Q4A1',
          text: {
            en: 'Loss of smell',
            sv: 'Försämrat luktsinne'
          }
        }, {
          id: 'Q4A2',
          text: {
            en: 'Fatigue',
            sv: 'Trötthet'
          }
        }, {
          id: 'Q4A3',
          text: {
            en: 'Shortness of breath',
            sv: 'Svårigheter att andas'
          }
        }, {
          id: 'Q4A4',
          text: {
            en: 'Fever',
            sv: 'Feber'
          }
        }, {
          id: 'Q4A5',
          text: {
            en: 'Persistent cough',
            sv: 'Rethosta'
          }
        }, {
          id: 'Q4A6',
          text: {
            en: 'Diarrhea',
            sv: 'Diarré'
          }
        }, {
          id: 'Q4A7',
          text: {
            en: 'Chills',
            sv: 'Frossa'
          }
        }, {
          id: 'Q4A8',
          text: {
            en: 'Headache',
            sv: 'Huvudvärk'
          }
        }, {
          id: 'Q4A9',
          text: {
            en: 'Runny nose',
            sv: 'Rinnsnuva'
          }
        }, {
          id: 'Q4A10',
          text: {
            en: 'Nausea and vomiting',
            sv: 'Illamående och kräkningar'
          }
        }, {
          id: 'Q4A11',
          text: {
            en: 'Body aches',
            sv: 'Muskelvärk'
          }
        }, {
          id: 'Q4A12',
          text: {
            en: 'Sore throat',
            sv: 'Halsont'
          }
        }
      ],
      nextDefaultId: 'ENDFORM'
    }]
}
