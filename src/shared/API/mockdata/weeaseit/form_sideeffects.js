export default {
  _key: '0007',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Trend di effetti collaterali',
    en: 'Side Effects Trend'
  },
  description: {
    it: 'Quando un individuo è in terapia per un tumore, talvolta può sviluppare diversi sintomi ed effetti collaterali. Indica se hai avuto esperienza di sintomi ed effetti collaterali nella giornata di ieri.',
    en: 'When an individual is undergoing cancer treatment, they may experience various symptoms and side effects. Indicate if you experienced any symptoms or side effects yesterday.'
  },
  summaryFunction: 'return { symptoms: answers[0].answer.answerId == "Q1A1"? "yes" : "no" };',
  summaryFunctionDescription: {
    symptoms: {
      name: {
        it: 'Presenza di sintomi',
        en: 'Symptoms Presence'
      },
      type: 'category',
      description: {
        it: 'Presenza di sintomi auto dichiarata',
        en: 'Self declared symptoms presence'
      },
      categories: {
        yes: {
          name: {
            it: 'Si',
            en: 'Yes'
          },
          description: {
            it: 'Il paziente ha avuto sintomi o effetti collaterali.',
            en: 'The patient experienced symptoms or side effects.'
          }
        },
        no: {
          name: {
            it: 'No',
            en: 'No'
          },
          description: {
            it: 'Il paziente non ha avuto sintomi o effetti collaterali.',
            en: 'The patient did not experience any symptoms or side effects.'
          }
        }
      }
    }
  },
  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Hai da segnalare qualche sintomo avvertito ieri?',
        en: 'Do you have any symptoms to report from yesterday?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            it: 'Si',
            en: 'Yes'
          },
          nextQuestionId: 'Q2'
        },
        {
          id: 'Q1A2',
          text: {
            it: 'No',
            en: 'No'
          },
          nextQuestionId: 'ENDFORM'
        }
      ]
    },

    {
      id: 'Q2',
      text: {
        it: 'Descrivi che sintomo/i hai avuto ieri',
        en: 'Describe any symptoms you experienced yesterday'
      },
      type: 'freetext'
    }
  ]
}
