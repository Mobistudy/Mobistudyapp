export default {
  _key: '0002',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'Trattamenti',
    en: 'Treatments'
  },
  description: {
    it: 'Breve promemoria per i farmaci.',
    en: 'Short reminder for medications.'
  },
  summaryFunction: 'return { medicationIntake: answers[0].answer.answerId == "Q1A1"? "yes" : (answers[0].answer.answerId == "Q1A2"? "no" : "unsure") };',
  summaryFunctionDescription: {
    medicationIntake: {
      name: {
        en: 'Medication Intake',
        it: 'Assunzione di farmaci'
      },
      type: 'category',
      description: {
        en: 'Self declared medication intake',
        it: 'Assunzione di farmaci auto dichiarata'
      },
      categories: {
        yes: {
          name: {
            en: 'Yes',
            it: 'Si'
          },
          description: {
            en: 'The patient has taken the medication as prescribed.',
            it: 'Il paziente ha assunto il farmaco come prescritto.'
          }
        },
        no: {
          name: {
            en: 'No',
            it: 'No'
          },
          description: {
            en: 'The patient has not taken the medication as prescribed.',
            it: 'Il paziente non ha assunto il farmaco come prescritto.'
          }
        },
        unsure: {
          name: {
            en: 'Unsure',
            it: 'Incerto'
          },
          description: {
            en: 'The patient is unsure about taking the medication as prescribed.',
            it: 'Il paziente non è sicuro di aver assunto il farmaco come prescritto.'
          }
        }
      }
    }
  },

  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Hai ricordato di prendere le medicine seguendo la prescrizione del medico?',
        en: 'Did you remember to take the medicines as prescribed by the doctor?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            it: 'Si',
            en: 'Yes'
          }
        },
        {
          id: 'Q1A2',
          text: {
            it: 'No',
            en: 'No'
          }
        },
        {
          id: 'Q1A3',
          text: {
            it: 'Non sono sicuro/sicura',
            en: 'I am not sure'
          }
        }
      ]
    }
  ]
}
