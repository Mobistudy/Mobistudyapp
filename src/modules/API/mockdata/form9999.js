export default {
  createdTS: '2019-10-25T10:09:53.222Z',
  name: {
    en: 'COVID-19 Symptoms tracking',
    sv: 'CARL'
  },
  description: {
    en: `This questionnaire is about identifying symptoms related to COVID19 and factors that are related
    to worse outcomes of the disease.`,
    sv: 'CARL'
  },
  questions: [
    {
      id: 'Q1',
      type: 'multiChoice',
      text: {
        en: `Do you suffer any of these diseases?`,
        sv: 'CARL'
      },
      helper: {
        en: 'You can choose more than one option.',
        sv: 'CARL'
      },
      nextDefaultId: 'Q2',
      answerChoices: [{
        id: 'Q1A1',
        text: {
          en: 'Diabetes',
          sv: 'CARL'
        }
      },
      {
        id: 'Q1A2',
        text: {
          en: 'Arterial hypertension',
          sv: 'CARL'
        }
      }, {
        id: 'Q1A3',
        text: {
          en: 'Chronic lung disease',
          sv: 'CARL'
        }
      }, {
        id: 'Q1A4',
        text: {
          en: 'Chronic heart disease',
          sv: 'CARL'
        }
      }]
    },
    {
      id: 'Q2',
      text: {
        en: 'Have you ever diagnosed with CODIV19?',
        sv: 'CARL'
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
        en: 'Please specify when you were diagnosed with COVID19',
        sv: 'CARL'
      },
      helper: {
        en: 'Indicate the date of when the test came positive',
        sv: 'CARL'
      }
    },
    {
      id: 'Q4',
      type: 'multiChoice',
      text: {
        en: 'Which symptoms do you have today?',
        sv: 'CARL'
      },
      helper: {
        en: 'You can select as many as needed',
        sv: 'CARL'
      },
      answerChoices: [
        {
          id: 'Q4A1',
          text: {
            en: 'Loss of smell',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A2',
          text: {
            en: 'Fatigue',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A3',
          text: {
            en: 'Shortness of breath',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A4',
          text: {
            en: 'Fever',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A5',
          text: {
            en: 'Persistent cough',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A6',
          text: {
            en: 'Diarrhea',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A7',
          text: {
            en: 'Chills',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A8',
          text: {
            en: 'Headache',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A9',
          text: {
            en: 'Sniffling and snorting',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A10',
          text: {
            en: 'Nausea and vomiting',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A11',
          text: {
            en: 'Body aches',
            sv: 'CARL'
          }
        }, {
          id: 'Q4A11',
          text: {
            en: 'Sore throat',
            sv: 'CARL'
          }
        }
      ],
      nextDefaultId: 'ENDFORM'
    }]
}
