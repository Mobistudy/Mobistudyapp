export default {
  _key: '0006-full',
  teamKey: '1608',
  createdTS: '2025-11-12',
  name: {
    it: 'NCI- PRO-CTCAE (Full)',
    en: 'NCI- PRO-CTCAE (Full)'
  },
  description: {
    it: 'Quando un individuo è in terapia per un tumore, talvolta può sviluppare diversi sintomi ed effetti collaterali. Per ciascuna domanda, selezionare la risposta (una sola) che meglio corrisponde all’esperienza vissuta negli ultimi sette giorni.',
    en: 'As individuals go through treatment for their cancer they sometimes experience different symptoms and side effects. For each question, please select the one response that best describes your experiences over the past 7 days.'
  },
  summaryFunction: `return {
    symptomsNumber: answers.reduce( (acc, ans) => {
      // count how many symptom choices were selected overall
      return acc + (Array.isArray(ans.answer) ? ans.answer.length : (ans.answer ? 1 : 0))
    }, 0 )
  };`,
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
        /* 1 */ {
          id: 'Q1A1',
          text: { en: 'Dry mouth', it: 'SENSAZIONE DI BOCCA SECCA' },
          nestedQuestions: [
            { id: 'Q1A1Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your DRY MOUTH at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la SENSAZIONE DI BOCCA SECCA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A1Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A1Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A1Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A1Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A1Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 2 */ {
          id: 'Q1A2',
          text: { en: 'Difficulty swallowing', it: 'DIFFICOLTÀ A DEGLUTIRE' },
          nestedQuestions: [
            { id: 'Q1A2Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your DIFFICULTY SWALLOWING at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la DIFFICOLTÀ A DEGLUTIRE nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A2Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A2Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A2Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A2Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A2Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 3 */ {
          id: 'Q1A3',
          text: { en: 'Mouth/throat sores', it: 'PIAGHE IN BOCCA O IN GOLA' },
          nestedQuestions: [
            { id: 'Q1A3Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your MOUTH OR THROAT SORES at their WORST?', it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le PIAGHE IN BOCCA O IN GOLA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A3Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A3Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A3Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A3Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A3Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]},
            { id: 'Q1A3Q2', text: { en: 'In the last 7 days, how much did MOUTH OR THROAT SORES INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura le PIAGHE IN BOCCA O IN GOLA HANNO INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A3Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A3Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A3Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A3Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A3Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 4 */ {
          id: 'Q1A4',
          text: { en: 'Cracking at the corners of the mouth (cheilosis/cheilitis)', it: 'SCREPOLATURE AGLI ANGOLI DELLA BOCCA' },
          nestedQuestions: [
            { id: 'Q1A4Q1', text: { en: 'In the last 7 days, what was the SEVERITY of SKIN CRACKING AT THE CORNERS OF YOUR MOUTH at its WORST?', it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le SCREPOLATURE AGLI ANGOLI DELLA BOCCA, nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A4Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A4Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A4Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A4Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A4Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 5 */ {
          id: 'Q1A5',
          text: { en: 'Voice quality changes', it: 'MODIFICAZIONI DELLA VOCE' },
          nestedQuestions: [
            { id: 'Q1A5Q1', text: { en: 'In the last 7 days, did you have any VOICE CHANGES?', it: 'Negli ultimi 7 giorni, ha notato MODIFICAZIONI DELLA VOCE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A5Q1A1', text: { en: 'Yes', it: 'Sì' } },
              { id: 'Q1A5Q1A2', text: { en: 'No', it: 'No' } }
            ]}
          ]
        },

        /* 6 */ {
          id: 'Q1A6',
          text: { en: 'Hoarseness', it: 'VOCE RAUCA' },
          nestedQuestions: [
            { id: 'Q1A6Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your HOARSE VOICE at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la VOCE RAUCA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A6Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A6Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A6Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A6Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A6Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 7 */ {
          id: 'Q1A7',
          text: { en: 'Taste changes', it: 'DIFFICOLTÀ A SENTIRE IL SAPORE DI CIBI O BEVANDE' },
          nestedQuestions: [
            { id: 'Q1A7Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your PROBLEMS WITH TASTING FOOD OR DRINK at their WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la DIFFICOLTÀ A SENTIRE IL SAPORE DI CIBI O BEVANDE nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A7Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A7Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A7Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A7Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A7Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 8 */ {
          id: 'Q1A8',
          text: { en: 'Decreased appetite', it: 'CALO DELL’APPETITO' },
          nestedQuestions: [
            { id: 'Q1A8Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your DECREASED APPETITE at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il CALO DELL’APPETITO nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A8Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A8Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A8Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A8Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A8Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]},
            { id: 'Q1A8Q2', text: { en: 'In the last 7 days, how much did DECREASED APPETITE INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura il CALO DELL’APPETITO HA INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A8Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A8Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A8Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A8Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A8Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 9 */ {
          id: 'Q1A9',
          text: { en: 'Nausea', it: 'NAUSEA (SENSO DI MALESSERE ALLO STOMACO)' },
          nestedQuestions: [
            { id: 'Q1A9Q1', text: { en: 'In the last 7 days, how OFTEN did you have NAUSEA?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto NAUSEA?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A9Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A9Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A9Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A9Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A9Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A9Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your NAUSEA at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la NAUSEA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A9Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A9Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A9Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A9Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A9Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 10 */ {
          id: 'Q1A10',
          text: { en: 'Vomiting', it: 'VOMITO' },
          nestedQuestions: [
            { id: 'Q1A10Q1', text: { en: 'In the last 7 days, how OFTEN did you have VOMITING?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto VOMITO?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A10Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A10Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A10Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A10Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A10Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A10Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your VOMITING at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il VOMITO nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A10Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A10Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A10Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A10Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A10Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 11 */ {
          id: 'Q1A11',
          text: { en: 'Heartburn', it: 'BRUCIORE DI STOMACO' },
          nestedQuestions: [
            { id: 'Q1A11Q1', text: { en: 'In the last 7 days, how OFTEN did you have HEARTBURN?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha accusato IL BRUCIORE DI STOMACO?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A11Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A11Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A11Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A11Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A11Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A11Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your HEARTBURN at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato grave IL BRUCIORE DI STOMACO nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A11Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A11Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A11Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A11Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A11Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 12 */ {
          id: 'Q1A12',
          text: { en: 'Gas', it: 'MAGGIOR PRODUZIONE DI ARIA INTESTINALE (FLATULENZA)' },
          nestedQuestions: [
            { id: 'Q1A12Q1', text: { en: 'In the last 7 days, did you have any INCREASED PASSING OF GAS (FLATULENCE)?', it: 'Negli ultimi 7 giorni, ha notato una MAGGIOR PRODUZIONE DI ARIA INTESTINALE (FLATULENZA)?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A12Q1A1', text: { en: 'Yes', it: 'Sì' } },
              { id: 'Q1A12Q1A2', text: { en: 'No', it: 'No' } }
            ]}
          ]
        },

        /* 13 */ {
          id: 'Q1A13',
          text: { en: 'Bloating', it: 'GONFIORE DELLA PANCIA' },
          nestedQuestions: [
            { id: 'Q1A13Q1', text: { en: 'In the last 7 days, how OFTEN did you have BLOATING OF THE ABDOMEN (BELLY)?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto GONFIORE DELLA PANCIA?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A13Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A13Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A13Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A13Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A13Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A13Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your BLOATING OF THE ABDOMEN (BELLY) at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il GONFIORE DELLA PANCIA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A13Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A13Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A13Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A13Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A13Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 14 */ {
          id: 'Q1A14',
          text: { en: 'Hiccups', it: 'SINGHIOZZO' },
          nestedQuestions: [
            { id: 'Q1A14Q1', text: { en: 'In the last 7 days, how OFTEN did you have HICCUPS?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto il SINGHIOZZO?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A14Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A14Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A14Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A14Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A14Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A14Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your HICCUPS at their WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il SINGHIOZZO nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A14Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A14Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A14Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A14Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A14Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 15 */ {
          id: 'Q1A15',
          text: { en: 'Constipation', it: 'STITICHEZZA' },
          nestedQuestions: [
            { id: 'Q1A15Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your CONSTIPATION at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la STITICHEZZA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A15Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A15Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A15Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A15Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A15Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 16 */ {
          id: 'Q1A16',
          text: { en: 'Diarrhea', it: 'FECI MOLLI O ACQUOSE (DIARREA)' },
          nestedQuestions: [
            { id: 'Q1A16Q1', text: { en: 'In the last 7 days, how OFTEN did you have LOOSE OR WATERY STOOLS (DIARRHEA/DIARRHOEA)?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha notato FECI MOLLI O ACQUOSE (DIARREA)?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A16Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A16Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A16Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A16Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A16Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]}
          ]
        },

        /* 17 */ {
          id: 'Q1A17',
          text: { en: 'Abdominal pain', it: 'MAL DI PANCIA' },
          nestedQuestions: [
            { id: 'Q1A17Q1', text: { en: 'In the last 7 days, how OFTEN did you have PAIN IN THE ABDOMEN (BELLY AREA)?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto MAL DI PANCIA?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A17Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A17Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A17Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A17Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A17Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A17Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your PAIN IN THE ABDOMEN (BELLY AREA) at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il MAL DI PANCIA nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A17Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A17Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A17Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A17Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A17Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]},
            { id: 'Q1A17Q3', text: { en: 'In the last 7 days, how much did PAIN IN THE ABDOMEN (BELLY AREA) INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura il MAL DI PANCIA HA INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A17Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A17Q3A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A17Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A17Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A17Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 18 */ {
          id: 'Q1A18',
          text: { en: 'Fecal incontinence', it: 'PERDITE DI FECI' },
          nestedQuestions: [
            { id: 'Q1A18Q1', text: { en: 'In the last 7 days, how OFTEN did you LOSE CONTROL OF BOWEL MOVEMENTS?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto PERDITE DI FECI?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A18Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A18Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A18Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A18Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A18Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A18Q2', text: { en: 'In the last 7 days, how much did LOSS OF CONTROL OF BOWEL MOVEMENTS INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura le PERDITE DI FECI HANNO INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A18Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A18Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A18Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A18Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A18Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 19 */ {
          id: 'Q1A19',
          text: { en: 'Shortness of breath', it: 'MANCANZA DI FIATO' },
          nestedQuestions: [
            { id: 'Q1A19Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your SHORTNESS OF BREATH at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la MANCANZA DI FIATO nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A19Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A19Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A19Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A19Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A19Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]},
            { id: 'Q1A19Q2', text: { en: 'In the last 7 days, how much did your SHORTNESS OF BREATH INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura la MANCANZA DI FIATO ha INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A19Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A19Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A19Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A19Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A19Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 20 */ {
          id: 'Q1A20',
          text: { en: 'Cough', it: 'TOSSE' },
          nestedQuestions: [
            { id: 'Q1A20Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your COUGH at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la TOSSE nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A20Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A20Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A20Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A20Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A20Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]},
            { id: 'Q1A20Q2', text: { en: 'In the last 7 days, how much did COUGH INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura la TOSSE HA INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A20Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A20Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A20Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A20Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A20Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 21 */ {
          id: 'Q1A21',
          text: { en: 'Wheezing', it: 'RESPIRO SIBILANTE' },
          nestedQuestions: [
            { id: 'Q1A21Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your WHEEZING(WHISTLING NOISE IN THE CHEST WITH BREATHING) at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il RESPIRO SIBILANTE (EMISSIONE DI UN FISCHIO QUANDO SI RESPIRA) nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A21Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A21Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A21Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A21Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A21Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 22 */ {
          id: 'Q1A22',
          text: { en: 'Swelling', it: 'GONFIORE ALLE BRACCIA O ALLE GAMBE' },
          nestedQuestions: [
            { id: 'Q1A22Q1', text: { en: 'In the last 7 days, how OFTEN did you have ARM OR LEG SWELLING?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto GONFIORE ALLE BRACCIA O ALLE GAMBE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A22Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A22Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A22Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A22Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A22Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A22Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your ARM OR LEG SWELLING at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il GONFIORE ALLE BRACCIA O ALLE GAMBE nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A22Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A22Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A22Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A22Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A22Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]},
            { id: 'Q1A22Q3', text: { en: 'In the last 7 days, how much did ARM OR LEG SWELLING INTERFERE with your usual or daily activities?', it: 'Negli ultimi 7 giorni, in che misura il GONFIORE ALLE BRACCIA O ALLE GAMBE HA INTERFERITO con le Sue attività abituali o quotidiane?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A22Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
              { id: 'Q1A22Q3A2', text: { en: 'A little bit', it: 'Un po’' } },
              { id: 'Q1A22Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
              { id: 'Q1A22Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
              { id: 'Q1A22Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 23 */ {
          id: 'Q1A23',
          text: { en: 'Heart palpitations', it: 'PALPITAZIONI' },
          nestedQuestions: [
            { id: 'Q1A23Q1', text: { en: 'In the last 7 days, how OFTEN did you feel a POUNDING OR RACING HEARTBEAT (PALPITATIONS)?', it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avvertito PALPITAZIONI?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A23Q1A1', text: { en: 'Never', it: 'Mai' } },
              { id: 'Q1A23Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
              { id: 'Q1A23Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
              { id: 'Q1A23Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
              { id: 'Q1A23Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
            ]},
            { id: 'Q1A23Q2', text: { en: 'In the last 7 days, what was the SEVERITY of your POUNDING OR RACING HEARTBEAT (PALPITATIONS) at its WORST?', it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le PALPITAZIONI nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A23Q2A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A23Q2A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A23Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A23Q2A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A23Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 24 */ {
          id: 'Q1A24',
          text: { en: 'Rash', it: 'IRRITAZIONE DELLA PELLE' },
          nestedQuestions: [
            { id: 'Q1A24Q1', text: { en: 'In the last 7 days, did you have any RASH?', it: 'Negli ultimi 7 giorni, ha avuto qualche IRRITAZIONE DELLA PELLE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A24Q1A1', text: { en: 'Yes', it: 'Sì' } },
              { id: 'Q1A24Q1A2', text: { en: 'No', it: 'No' } }
            ]}
          ]
        },

        /* 25 */ {
          id: 'Q1A25',
          text: { en: 'Skin dryness', it: 'SECCHEZZA DELLA PELLE' },
          nestedQuestions: [
            { id: 'Q1A25Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your DRY SKIN at its WORST?', it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la SECCHEZZA DELLA PELLE nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A25Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A25Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A25Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A25Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A25Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

        /* 26 */ {
          id: 'Q1A26',
          text: { en: 'Acne', it: 'BRUFOLI (ACNE) SUL VOLTO O SUL TORACE' },
          nestedQuestions: [
            { id: 'Q1A26Q1', text: { en: 'In the last 7 days, what was the SEVERITY of your ACNE OR PIMPLES ON THE FACE OR CHEST at its WORST?', it: 'Negli ultimi 7 giorni, quanto sono stati GRAVI i BRUFOLI (ACNE) SUL VOLTO O SUL TORACE nel momento PEGGIORE?' }, type: 'singleChoice', answerChoices: [
              { id: 'Q1A26Q1A1', text: { en: 'None', it: 'Per nulla' } },
              { id: 'Q1A26Q1A2', text: { en: 'Mild', it: 'Un po’' } },
              { id: 'Q1A26Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
              { id: 'Q1A26Q1A4', text: { en: 'Severe', it: 'Molto' } },
              { id: 'Q1A26Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
            ]}
          ]
        },

  

  // 27
  {
    id: 'Q1A27',
    text: {
      en: 'Hair loss',
      it: 'PERDITA DEI CAPELLI'
    },
    nestedQuestions: [
      {
        id: 'Q1A27Q1',
        text: {
          en: 'In the last 7 days, did you have any HAIR LOSS?',
          it: 'Negli ultimi 7 giorni, ha PERSO I CAPELLI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A27Q1A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A27Q1A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A27Q1A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A27Q1A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A27Q1A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 28
  {
    id: 'Q1A28',
    text: {
      en: 'Itching',
      it: 'PRURITO'
    },
    nestedQuestions: [
      {
        id: 'Q1A28Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your ITCHY SKIN at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il PRURITO nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A28Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A28Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A28Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A28Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A28Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 29
  {
    id: 'Q1A29',
    text: {
      en: 'Hives',
      it: 'ORTICARIA (BOLLE ROSSE CHE PROVOCANO PRURITO SULLA PELLE)'
    },
    nestedQuestions: [
      {
        id: 'Q1A29Q1',
        text: {
          en: 'In the last 7 days, did you have any HIVES (ITCHY RED BUMPS ON THE SKIN)?',
          it: 'Negli ultimi 7 giorni, ha sviluppato ORTICARIA (BOLLE ROSSE CHE PROVOCANO PRURITO SULLA PELLE)?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A29Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A29Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 30
  {
    id: 'Q1A30',
    text: {
      en: 'Hand-foot syndrome',
      it: 'SINDROME MANO-PIEDE (IRRITAZIONE DELLE MANI O DEI PIEDI CHE PUÒ CAUSARE SCREPOLATURE, SPELLATURE, ROSSORE O DOLORE)'
    },
    nestedQuestions: [
      {
        id: 'Q1A30Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your HAND-FOOT SYNDROME  (A RASH OF THE HANDS OR FEET THAT CAN CAUSE CRACKING, PEELING, REDNESS OR PAIN) at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la SINDROME MANO-PIEDE  (IRRITAZIONE DELLE MANI O DEI PIEDI CHE PUÒ CAUSARE SCREPOLATURE, SPELLATURE, ROSSORE O DOLORE) nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A30Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A30Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A30Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A30Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A30Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 31
  {
    id: 'Q1A31',
    text: {
      en: 'Nail loss',
      it: 'PERDITA DI UNGHIE DELLE MANI O DEI PIEDI'
    },
    nestedQuestions: [
      {
        id: 'Q1A31Q1',
        text: {
          en: 'In the last 7 days, did you LOSE ANY FINGERNAILS OR TOENAILS?',
          it: 'Negli ultimi 7 giorni, ha PERSO DELLE UNGHIE DELLE MANI O DEI PIEDI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A31Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A31Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 32
  {
    id: 'Q1A32',
    text: {
      en: 'Nail ridging',
      it: 'ISPESSIMENTI O SOLCHI SULLE UNGHIE DELLE MANI O DEI PIEDI'
    },
    nestedQuestions: [
      {
        id: 'Q1A32Q1',
        text: {
          en: 'In the last 7 days, did you have any RIDGES OR BUMPS ON YOUR FINGERNAILS OR TOENAILS?',
          it: 'Negli ultimi 7 giorni, ha notato la presenza di ISPESSIMENTI O SOLCHI SULLE UNGHIE DELLE MANI O DEI PIEDI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A32Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A32Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 33
  {
    id: 'Q1A33',
    text: {
      en: 'Nail discoloration',
      it: 'VARIAZIONE DI COLORE DELLE UNGHIE DELLE MANI O DEI PIEDI'
    },
    nestedQuestions: [
      {
        id: 'Q1A33Q1',
        text: {
          en: 'In the last 7 days, did you have any CHANGE IN THE COLOR OF YOUR FINGERNAILS OR TOENAILS?',
          it: 'Negli ultimi 7 giorni, ha notato una VARIAZIONE DI COLORE DELLE UNGHIE DELLE MANI O DEI PIEDI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A33Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A33Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 34
  {
    id: 'Q1A34',
    text: {
      en: 'Sensitivity to sunlight',
      it: 'MAGGIOR SENSIBILITÀ DELLA PELLE AI RAGGI SOLARI'
    },
    nestedQuestions: [
      {
        id: 'Q1A34Q1',
        text: {
          en: 'In the last 7 days, did you have any INCREASED SKIN SENSITIVITY TO SUNLIGHT?',
          it: 'Negli ultimi 7 giorni, ha notato una MAGGIOR SENSIBILITÀ DELLA PELLE AI RAGGI SOLARI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A34Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A34Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 35
  {
    id: 'Q1A35',
    text: {
      en: 'Bed/pressure sores',
      it: 'PIAGHE DA DECUBITO'
    },
    nestedQuestions: [
      {
        id: 'Q1A35Q1',
        text: {
          en: 'In the last 7 days, did you have any BED SORES?',
          it: 'Negli ultimi 7 giorni, ha avuto PIAGHE DA DECUBITO?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A35Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A35Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 36
  {
    id: 'Q1A36',
    text: {
      en: 'Radiation skin reaction',
      it: 'BRUCIATURE DELLA PELLE IN CONSEGUENZA DELLA RADIOTERAPIA'
    },
    nestedQuestions: [
      {
        id: 'Q1A36Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your SKIN BURNS FROM RADIATION at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le BRUCIATURE DELLA PELLE IN CONSEGUENZA DELLA RADIOTERAPIA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A36Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A36Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A36Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A36Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A36Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } },
          { id: 'Q1A36Q1A6', text: { en: 'Not applicable', it: 'Non pertinente' } }
        ]
      }
    ]
  },

  // 37
  {
    id: 'Q1A37',
    text: {
      en: 'Skin darkening',
      it: 'INSOLITO INSCURIMENTO DELLA PELLE'
    },
    nestedQuestions: [
      {
        id: 'Q1A37Q1',
        text: {
          en: 'In the last 7 days, did you have any UNUSUAL DARKENING OF THE SKIN?',
          it: 'Negli ultimi 7 giorni, ha notato un INSOLITO INSCURIMENTO DELLA PELLE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A37Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A37Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 38
  {
    id: 'Q1A38',
    text: {
      en: 'Stretch marks',
      it: 'SMAGLIATURE'
    },
    nestedQuestions: [
      {
        id: 'Q1A38Q1',
        text: {
          en: 'In the last 7 days, did you have any STRETCH MARKS?',
          it: 'Negli ultimi 7 giorni, ha notato la presenza di SMAGLIATURE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A38Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A38Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 39
  {
    id: 'Q1A39',
    text: {
      en: 'Numbness & tingling',
      it: 'INTORPIDIMENTO O FORMICOLIO ALLE MANI O AI PIEDI'
    },
    nestedQuestions: [
      {
        id: 'Q1A39Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your NUMBNESS OR TINGLING IN YOUR HANDS OR FEET at its WORST?',
          it: 'Negli ultimi 7 giorni, nel momento PEGGIORE, quanto è stato GRAVE l\'INTORPIDIMENTO O FORMICOLIO ALLE MANI O AI PIEDI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A39Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A39Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A39Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A39Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A39Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A39Q2',
        text: {
          en: 'In the last 7 days, how much did NUMBNESS OR TINGLING IN YOUR HANDS OR FEET INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura l\'INTORPIDIMENTO O FORMICOLIO ALLE MANI O AI PIEDI HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A39Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A39Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A39Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A39Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A39Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 40
  {
    id: 'Q1A40',
    text: {
      en: 'Dizziness',
      it: 'GIRAMENTI DI TESTA'
    },
    nestedQuestions: [
      {
        id: 'Q1A40Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your DIZZINESS at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto sono stati GRAVI i GIRAMENTI DI TESTA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A40Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A40Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A40Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A40Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A40Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A40Q2',
        text: {
          en: 'In the last 7 days, how much did DIZZINESS INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura i GIRAMENTI DI TESTA HANNO INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A40Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A40Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A40Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A40Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A40Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 41
  {
    id: 'Q1A41',
    text: {
      en: 'Blurred vision',
      it: 'APPANNAMENTO DELLA VISTA'
    },
    nestedQuestions: [
      {
        id: 'Q1A41Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your BLURRY VISION at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE l\'APPANNAMENTO DELLA VISTA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A41Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A41Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A41Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A41Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A41Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A41Q2',
        text: {
          en: 'In the last 7 days, how much did BLURRY VISION INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura l\'APPANNAMENTO DELLA VISTA HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A41Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A41Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A41Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A41Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A41Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 42
  {
    id: 'Q1A42',
    text: {
      en: 'Flashing lights',
      it: 'LAMPI DAVANTI AGLI OCCHI'
    },
    nestedQuestions: [
      {
        id: 'Q1A42Q1',
        text: {
          en: 'In the last 7 days, did you have any FLASHING LIGHTS IN FRONT OF YOUR EYES?',
          it: 'Negli ultimi 7 giorni, ha notato la comparsa di LAMPI DAVANTI AGLI OCCHI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A42Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A42Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 43
  {
    id: 'Q1A43',
    text: {
      en: 'Visual floaters',
      it: 'MOSCHE VOLANTI DAVANTI AGLI OCCHI'
    },
    nestedQuestions: [
      {
        id: 'Q1A43Q1',
        text: {
          en: 'In the last 7 days, did you have any SPOTS OR LINES (FLOATERS) THAT DRIFT IN FRONT OF YOUR EYES?',
          it: 'Negli ultimi 7 giorni, ha avvertito la presenza di MOSCHE VOLANTI DAVANTI AGLI OCCHI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A43Q1A1', text: { en: 'Yes', it: 'Sì' } },
          { id: 'Q1A43Q1A2', text: { en: 'No', it: 'No' } }
        ]
      }
    ]
  },

  // 44
  {
    id: 'Q1A44',
    text: {
      en: 'Watery eyes',
      it: 'ECCESSIVA LACRIMAZIONE'
    },
    nestedQuestions: [
      {
        id: 'Q1A44Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your WATERY EYES (TEARING) at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stata GRAVE l\'ECCESSIVA LACRIMAZIONE nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A44Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A44Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A44Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A44Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A44Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A44Q2',
        text: {
          en: 'In the last 7 days, how much did WATERY EYES (TEARING) INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura l\'ECCESSIVA LACRIMAZIONE HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A44Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A44Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A44Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A44Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A44Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 45
  {
    id: 'Q1A45',
    text: {
      en: 'Ringing in ears',
      it: 'RONZIO NELLE ORECCHIE'
    },
    nestedQuestions: [
      {
        id: 'Q1A45Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of RINGING IN YOUR EARS at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il RONZIO NELLE ORECCHIE nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A45Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A45Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A45Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A45Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A45Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 46
  {
    id: 'Q1A46',
    text: {
      en: 'Concentration',
      it: 'PROBLEMI DI CONCENTRAZIONE'
    },
    nestedQuestions: [
      {
        id: 'Q1A46Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your PROBLEMS WITH CONCENTRATION at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto sono stati GRAVI i PROBLEMI DI CONCENTRAZIONE nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A46Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A46Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A46Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A46Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A46Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A46Q2',
        text: {
          en: 'In the last 7 days, how much did PROBLEMS WITH CONCENTRATION INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura i PROBLEMI DI CONCENTRAZIONE HANNO INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A46Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A46Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A46Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A46Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A46Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 47
  {
    id: 'Q1A47',
    text: {
      en: 'Memory',
      it: 'PROBLEMI DI MEMORIA'
    },
    nestedQuestions: [
      {
        id: 'Q1A47Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your PROBLEMS WITH MEMORY at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto sono stati GRAVI i PROBLEMI DI MEMORIA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A47Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A47Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A47Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A47Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A47Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A47Q2',
        text: {
          en: 'In the last 7 days, how much did PROBLEMS WITH MEMORY INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura i PROBLEMI DI MEMORIA HANNO INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A47Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A47Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A47Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A47Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A47Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 48
  {
    id: 'Q1A48',
    text: {
      en: 'General pain',
      it: 'DOLORE FISICO'
    },
    nestedQuestions: [
      {
        id: 'Q1A48Q1',
        text: {
          en: 'In the last 7 days, how OFTEN did you have PAIN?',
          it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto DOLORE FISICO?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A48Q1A1', text: { en: 'Never', it: 'Mai' } },
          { id: 'Q1A48Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
          { id: 'Q1A48Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
          { id: 'Q1A48Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
          { id: 'Q1A48Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
        ]
      },
      {
        id: 'Q1A48Q2',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your PAIN at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il DOLORE FISICO nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A48Q2A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A48Q2A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A48Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A48Q2A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A48Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A48Q3',
        text: {
          en: 'In the last 7 days, how much did PAIN INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura il DOLORE FISICO HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A48Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A48Q3A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A48Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A48Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A48Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 49
  {
    id: 'Q1A49',
    text: {
      en: 'Headache',
      it: 'MAL DI TESTA'
    },
    nestedQuestions: [
      {
        id: 'Q1A49Q1',
        text: {
          en: 'In the last 7 days, how OFTEN did you have a HEADACHE?',
          it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto MAL DI TESTA?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A49Q1A1', text: { en: 'Never', it: 'Mai' } },
          { id: 'Q1A49Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
          { id: 'Q1A49Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
          { id: 'Q1A49Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
          { id: 'Q1A49Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
        ]
      },
      {
        id: 'Q1A49Q2',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your HEADACHE at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il MAL DI TESTA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A49Q2A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A49Q2A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A49Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A49Q2A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A49Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A49Q3',
        text: {
          en: 'In the last 7 days, how much did your HEADACHE INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura il MAL DI TESTA HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A49Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A49Q3A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A49Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A49Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A49Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 50
  {
    id: 'Q1A50',
    text: {
      en: 'Muscle pain',
      it: 'DOLORE AI MUSCOLI'
    },
    nestedQuestions: [
      {
        id: 'Q1A50Q1',
        text: {
          en: 'In the last 7 days, how OFTEN did you have ACHING MUSCLES?',
          it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto DOLORE AI MUSCOLI?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A50Q1A1', text: { en: 'Never', it: 'Mai' } },
          { id: 'Q1A50Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
          { id: 'Q1A50Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
          { id: 'Q1A50Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
          { id: 'Q1A50Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
        ]
      },
      {
        id: 'Q1A50Q2',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your ACHING MUSCLES at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il DOLORE AI MUSCOLI nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A50Q2A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A50Q2A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A50Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A50Q2A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A50Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A50Q3',
        text: {
          en: 'In the last 7 days, how much did ACHING MUSCLES INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura il DOLORE AI MUSCOLI HA INTEREFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A50Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A50Q3A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A50Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A50Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A50Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 51
  {
    id: 'Q1A51',
    text: {
      en: 'Joint pain',
      it: 'DOLORE ALLE ARTICOLAZIONI (ES. GOMITI, GINOCCHIA, SPALLE)'
    },
    nestedQuestions: [
      {
        id: 'Q1A51Q1',
        text: {
          en: 'In the last 7 days, how OFTEN did you have ACHING JOINTS (SUCH AS ELBOWS, KNEES, SHOULDERS)?',
          it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto DOLORE ALLE ARTICOLAZIONI (ES. GOMITI, GINOCCHIA, SPALLE)?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A51Q1A1', text: { en: 'Never', it: 'Mai' } },
          { id: 'Q1A51Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
          { id: 'Q1A51Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
          { id: 'Q1A51Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
          { id: 'Q1A51Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
        ]
      },
      {
        id: 'Q1A51Q2',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your ACHING JOINTS (SUCH AS ELBOWS, KNEES, SHOULDERS) at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il DOLORE ALLE ARTICOLAZIONI (ES. GOMITI, GINOCCHIA, SPALLE) nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A51Q2A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A51Q2A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A51Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A51Q2A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A51Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A51Q3',
        text: {
          en: 'In the last 7 days, how much did ACHING JOINTS (SUCH AS ELBOWS, KNEES, SHOULDERS) INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura il DOLORE ALLE ARTICOLAZIONI (ES. GOMITI, GINOCCHIA, SPALLE) HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A51Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A51Q3A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A51Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A51Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A51Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 52
  {
    id: 'Q1A52',
    text: {
      en: 'Insomnia',
      it: 'INSONNIA (DIFFICOLTÀ DI ADDORMENTARSI O A MANTENERE IL SONNO, O TENDENZA A SVEGLIARSI PRESTO)'
    },
    nestedQuestions: [
      {
        id: 'Q1A52Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your INSOMNIA (INCLUDING DIFFICULTY FALLING ASLEEP, STAYING ASLEEP, OR WAKING UP EARLY) at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stata GRAVE l\'INSONNIA (DIFFICOLTÀ DI ADDORMENTARSI O A MANTENERE IL SONNO, O TENDENZA A SVEGLIARSI PRESTO) nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A52Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A52Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A52Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A52Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A52Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A52Q2',
        text: {
          en: 'In the last 7 days, how much did INSOMNIA (INCLUDING DIFFICULTY FALLING ASLEEP, STAYING ASLEEP, OR WAKING UP EARLY) INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura l\'INSONNIA (DIFFICOLTÀ DI ADDORMENTARSI O A MANTENERE IL SONNO, O TENDENZA A SVEGLIARSI PRESTO) HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A52Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A52Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A52Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A52Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A52Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 53
  {
    id: 'Q1A53',
    text: {
      en: 'Fatigue',
      it: 'SENSO DI FATICA, STANCHEZZA O MANCANZA DI ENERGIA'
    },
    nestedQuestions: [
      {
        id: 'Q1A53Q1',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your FATIGUE, TIREDNESS, OR LACK OF ENERGY at its WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il SENSO DI FATICA, STANCHEZZA O MANCANZA DI ENERGIA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A53Q1A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A53Q1A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A53Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A53Q1A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A53Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A53Q2',
        text: {
          en: 'In the last 7 days, how much did FATIGUE, TIREDNESS, OR LACK OF ENERGY INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura il SENSO DI FATICA, STANCHEZZA O MANCANZA DI ENERGIA HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A53Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A53Q2A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A53Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A53Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A53Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 54
  {
    id: 'Q1A54',
    text: {
      en: 'Anxious',
      it: 'ANSIA'
    },
    nestedQuestions: [
      {
        id: 'Q1A54Q1',
        text: {
          en: 'In the last 7 days, how OFTEN did you feel ANXIETY?',
          it: "Negli ultimi 7 giorni, con quale FREQUENZA ha avuto L'ANSIA?"
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A54Q1A1', text: { en: 'Never', it: 'Mai' } },
          { id: 'Q1A54Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
          { id: 'Q1A54Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
          { id: 'Q1A54Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
          { id: 'Q1A54Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
        ]
      },
      {
        id: 'Q1A54Q2',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your ANXIETY at its WORST?',
          it: "Negli ultimi 7 giorni, quanto è stata GRAVE l'ANSIA nel momento PEGGIORE?"
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A54Q2A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A54Q2A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A54Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A54Q2A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A54Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A54Q3',
        text: {
          en: 'In the last 7 days, how much did ANXIETY INTERFERE with your usual or daily activities?',
          it: "Negli ultimi 7 giorni, in che misura l'ANSIA HA INTERFERITO con le Sue attività abituali o quotidiane?"
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A54Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A54Q3A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A54Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A54Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A54Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  // 55
  {
    id: 'Q1A55',
    text: {
      en: 'Discouraged',
      it: "STATO D'ANIMO" 
    },
    nestedQuestions: [
      {
        id: 'Q1A55Q1',
        text: {
          en: 'In the last 7 days, how OFTEN did you FEEL THAT NOTHING COULD CHEER YOU UP?',
          it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha provato la sensazione che NULLA POTESSE RALLEGRARLA?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A55Q1A1', text: { en: 'Never', it: 'Mai' } },
          { id: 'Q1A55Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
          { id: 'Q1A55Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
          { id: 'Q1A55Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
          { id: 'Q1A55Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
        ]
      },
      {
        id: 'Q1A55Q2',
        text: {
          en: 'In the last 7 days, what was the SEVERITY of your FEELINGS THAT NOTHING COULD CHEER YOU UP at their WORST?',
          it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la sensazione che NULLA POTESSE RALLEGRARLA nel momento PEGGIORE?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A55Q2A1', text: { en: 'None', it: 'Per nulla' } },
          { id: 'Q1A55Q2A2', text: { en: 'Mild', it: 'Un po\’' } },
          { id: 'Q1A55Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
          { id: 'Q1A55Q2A4', text: { en: 'Severe', it: 'Molto' } },
          { id: 'Q1A55Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
        ]
      },
      {
        id: 'Q1A55Q3',
        text: {
          en: 'In the last 7 days, how much did FEELINGS THAT NOTHING COULD CHEER YOU UP INTERFERE with your usual or daily activities?',
          it: 'Negli ultimi 7 giorni, in che misura questa sensazione HA INTERFERITO con le Sue attività abituali o quotidiane?'
        },
        type: 'singleChoice',
        answerChoices: [
          { id: 'Q1A55Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
          { id: 'Q1A55Q3A2', text: { en: 'A little bit', it: 'Un po\’' } },
          { id: 'Q1A55Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
          { id: 'Q1A55Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
          { id: 'Q1A55Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
        ]
      }
    ]
  },

  
        /* 56 */ 
        {
          id: 'Q1A56',
          text: { en: 'Sad', it: 'TRISTEZZA' },
          nestedQuestions: [
            {
              id: 'Q1A56Q1',
              text: {
                en: 'In the last 7 days, how often did you have SAD OR UNHAPPY FEELINGS?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha provato TRISTEZZA o INFELICITÀ?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A56Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A56Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A56Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A56Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A56Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A56Q2',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your SAD OR UNHAPPY FEELINGS at their WORST?',
                it: 'Negli ultimi 7 giorni, quanto sono state GRAVI la TRISTEZZA o l’INFELICITÀ nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A56Q2A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A56Q2A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A56Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A56Q2A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A56Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            },
            {
              id: 'Q1A56Q3',
              text: {
                en: 'In the last 7 days, how much did SAD OR UNHAPPY FEELINGS INTERFERE with your usual or daily activities?',
                it: 'Negli ultimi 7 giorni, in che misura TRISTEZZA o INFELICITÀ HANNO INTERFERITO con le Sue attività abituali o quotidiane?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A56Q3A1', text: { en: 'Not at all', it: 'Per nulla' } },
                { id: 'Q1A56Q3A2', text: { en: 'A little bit', it: 'Un po’' } },
                { id: 'Q1A56Q3A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
                { id: 'Q1A56Q3A4', text: { en: 'Quite a bit', it: 'Molto' } },
                { id: 'Q1A56Q3A5', text: { en: 'Very much', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 57 */ {
          id: 'Q1A57',
          text: { en: 'Irregular periods / vaginal bleeding', it: 'MESTRUAZIONI IRREGOLARI' },
          nestedQuestions: [
            {
              id: 'Q1A57Q1',
              text: {
                en: 'In the last 7 days, did you have any IRREGULAR MENSTRUAL PERIODS?',
                it: 'Negli ultimi 7 giorni, ha avuto MESTRUAZIONI IRREGOLARI?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A57Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A57Q1A2', text: { en: 'No', it: 'No' } },
                { id: 'Q1A57Q1A3', text: { en: 'Not applicable', it: 'Non pertinente' } }
              ]
            }
          ]
        },

        /* 58 */ {
          id: 'Q1A58',
          text: { en: 'Missed expected menstrual period', it: 'REGOLARITÀ DELLE MESTRUAZIONI' },
          nestedQuestions: [
            {
              id: 'Q1A58Q1',
              text: {
                en: 'In the last 7 days, did you MISS AN EXPECTED MENSTRUAL PERIOD?',
                it: 'Negli ultimi 7 giorni, ha saltato un CICLO MESTRUALE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A58Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A58Q1A2', text: { en: 'No', it: 'No' } },
                { id: 'Q1A58Q1A3', text: { en: 'Not applicable', it: 'Non pertinente' } }
              ]
            }
          ]
        },

        /* 59 */ {
          id: 'Q1A59',
          text: { en: 'Vaginal discharge', it: 'INSOLITE PERDITE VAGINALI' },
          nestedQuestions: [
            {
              id: 'Q1A59Q1',
              text: {
                en: 'In the last 7 days, did you have any UNUSUAL VAGINAL DISCHARGE?',
                it: 'Negli ultimi 7 giorni, ha notato la presenza di INSOLITE PERDITE VAGINALI?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A59Q1A1', text: { en: 'Not at all', it: 'Per nulla' } },
                { id: 'Q1A59Q1A2', text: { en: 'A little bit', it: 'Un po’' } },
                { id: 'Q1A59Q1A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
                { id: 'Q1A59Q1A4', text: { en: 'Quite a bit', it: 'Molto' } },
                { id: 'Q1A59Q1A5', text: { en: 'Very much', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 60 */ {
          id: 'Q1A60',
          text: { en: 'Vaginal dryness', it: 'SECCHEZZA VAGINALE' },
          nestedQuestions: [
            {
              id: 'Q1A60Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your VAGINAL DRYNESS at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la SECCHEZZA VAGINALE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A60Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A60Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A60Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A60Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A60Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 61 */ {
          id: 'Q1A61',
          text: { en: 'Painful urination', it: 'DOLORE O BRUCIORE NELL\'URINARE' },
          nestedQuestions: [
            {
              id: 'Q1A61Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your PAIN OR BURNING WITH URINATION at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto sono stati GRAVI il DOLORE O BRUCIORE NELL\'URINARE, nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A61Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A61Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A61Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A61Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A61Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 62 */ {
          id: 'Q1A62',
          text: { en: 'Urinary urgency', it: 'BISOGNO URGENTE DI URINARE' },
          nestedQuestions: [
            {
              id: 'Q1A62Q1',
              text: {
                en: 'In the last 7 days, how often did you feel an URGE TO URINATE ALL OF A SUDDEN?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avvertito un BISOGNO URGENTE DI URINARE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A62Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A62Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A62Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A62Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A62Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A62Q2',
              text: {
                en: 'In the last 7 days, how much did SUDDEN URGES TO URINATE INTERFERE with your usual or daily activities?',
                it: 'Negli ultimi 7 giorni, in che misura il BISOGNO URGENTE DI URINARE HA INTERFERITO con le Sue attività abituali o quotidiane?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A62Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
                { id: 'Q1A62Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
                { id: 'Q1A62Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
                { id: 'Q1A62Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
                { id: 'Q1A62Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 63 */ {
          id: 'Q1A63',
          text: { en: 'Urinary frequency', it: 'BISOGNO FREQUENTE DI URINARE' },
          nestedQuestions: [
            {
              id: 'Q1A63Q1',
              text: {
                en: 'In the last 7 days, were there times when you had to URINATE FREQUENTLY?',
                it: 'Negli ultimi 7 giorni, ci sono state volte in cui ha avvertito un BISOGNO FREQUENTE DI URINARE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A63Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A63Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A63Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A63Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A63Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A63Q2',
              text: {
                en: 'In the last 7 days, how much did FREQUENT URINATION INTERFERE with your usual or daily activities?',
                it: 'Negli ultimi 7 giorni, in che misura il BISOGNO FREQUENTE DI URINARE HA INTERFERITO con le Sue attività abituali o quotidiane?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A63Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
                { id: 'Q1A63Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
                { id: 'Q1A63Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
                { id: 'Q1A63Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
                { id: 'Q1A63Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 64 */ {
          id: 'Q1A64',
          text: { en: 'Change in usual urine color', it: 'VARIAZIONE DEL COLORE DELLE URINE' },
          nestedQuestions: [
            {
              id: 'Q1A64Q1',
              text: {
                en: 'In the last 7 days, did you have any URINE COLOR CHANGE?',
                it: 'Negli ultimi 7 giorni, ha notato una VARIAZIONE DEL COLORE DELLE URINE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A64Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A64Q1A2', text: { en: 'No', it: 'No' } }
              ]
            }
          ]
        },

        /* 65 */ {
          id: 'Q1A65',
          text: { en: 'Urinary incontinence', it: 'PERDITE DI URINA' },
          nestedQuestions: [
            {
              id: 'Q1A65Q1',
              text: {
                en: 'In the last 7 days, how often did you have LOSS OF CONTROL OF URINE (LEAKAGE)?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha notato PERDITE DI URINA?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A65Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A65Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A65Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A65Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A65Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A65Q2',
              text: {
                en: 'In the last 7 days, how much did LOSS OF CONTROL OF URINE (LEAKAGE) INTERFERE with your usual or daily activities?',
                it: 'Negli ultimi 7 giorni, in che misura le PERDITE DI URINA HANNO INTERFERITO con le Sue attività abituali o quotidiane?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A65Q2A1', text: { en: 'Not at all', it: 'Per nulla' } },
                { id: 'Q1A65Q2A2', text: { en: 'A little bit', it: 'Un po’' } },
                { id: 'Q1A65Q2A3', text: { en: 'Somewhat', it: 'Abbastanza' } },
                { id: 'Q1A65Q2A4', text: { en: 'Quite a bit', it: 'Molto' } },
                { id: 'Q1A65Q2A5', text: { en: 'Very much', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 66 */ {
          id: 'Q1A66',
          text: { en: 'Achieve and mantein erection', it: "DIFFICOLTÀ A RAGGIUNGERE O MANTENERE L'EREZIONE" },
          nestedQuestions: [
            {
              id: 'Q1A66Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your DIFFICULTY GETTING OR KEEPING AN ERECTION at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la DIFFICOLTÀ A RAGGIUNGERE O MANTENERE L\'EREZIONE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A66Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A66Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A66Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A66Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A66Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } },
                { id: 'Q1A66Q1A6', text: { en: 'Not sexually active', it: 'Non sessualmente attivo' } },
                { id: 'Q1A66Q1A7', text: { en: 'Prefer not to answer', it: 'Preferisco non rispondere' } }
              ]
            }
          ]
        },

        /* 67 */ {
          id: 'Q1A67',
          text: { en: 'Ejaculation', it: 'PROBLEMI DI EIACULAZIONE' },
          nestedQuestions: [
            {
              id: 'Q1A67Q1',
              text: {
                en: 'In the last 7 days, how often did you have EJACULATION PROBLEMS?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha PROBLEMI DI EIACULAZIONE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A67Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A67Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A67Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A67Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A67Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } },
                { id: 'Q1A67Q1A6', text: { en: 'Not sexually active', it: 'Non sessualmente attivo' } },
                { id: 'Q1A67Q1A7', text: { en: 'Prefer not to answer', it: 'Preferisco non rispondere' } }
              ]
            }
          ]
        },

        /* 68 */ {
          id: 'Q1A68',
          text: { en: 'Decreased libido', it: 'CALO DEL DESIDERIO SESSUALE' },
          nestedQuestions: [
            {
              id: 'Q1A68Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your DECREASED SEXUAL INTEREST at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il CALO DEL DESIDERIO SESSUALE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A68Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A68Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A68Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A68Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A68Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } },
                { id: 'Q1A68Q1A6', text: { en: 'Not sexually active', it: 'Non sessualmente attivo' } },
                { id: 'Q1A68Q1A7', text: { en: 'Prefer not to answer', it: 'Preferisco non rispondere' } }
              ]
            }
          ]
        },

        /* 69 */ {
          id: 'Q1A69',
          text: { en: 'Delayed orgasm', it: 'TROPPO TEMPO PER RAGGIUNGERE L\'ORGASMO' },
          nestedQuestions: [
            {
              id: 'Q1A69Q1',
              text: {
                en: 'In the last 7 days, did you feel that it TOOK TOO LONG TO HAVE AN ORGASM OR CLIMAX?',
                it: 'Negli ultimi 7 giorni, Le è sembrato che ci volesse TROPPO TEMPO PER RAGGIUNGERE L’ORGASMO?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A69Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A69Q1A2', text: { en: 'No', it: 'No' } },
                { id: 'Q1A69Q1A3', text: { en: 'Not sexually active', it: 'Non sessualmente attivo' } },
                { id: 'Q1A69Q1A4', text: { en: 'Prefer not to answer', it: 'Preferisco non rispondere' } }
              ]
            }
          ]
        },

        /* 70 */ {
          id: 'Q1A70',
          text: { en: 'Unable to have orgasm', it: 'INCAPACITÀ A RAGGIUNGERE L\'ORGASMO' },
          nestedQuestions: [
            {
              id: 'Q1A70Q1',
              text: {
                en: 'In the last 7 days, were you UNABLE TO HAVE AN ORGASM OR CLIMAX?',
                it: 'Negli ultimi 7 giorni, ha avvertito INCAPACITÀ DI RAGGIUNGERE l’ORGASMO?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A70Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A70Q1A2', text: { en: 'No', it: 'No' } },
                { id: 'Q1A70Q1A3', text: { en: 'Not sexually active', it: 'Non sessualmente attivo' } },
                { id: 'Q1A70Q1A4', text: { en: 'Prefer not to answer', it: 'Preferisco non rispondere' } }
              ]
            }
          ]
        },

        /* 71 */ {
          id: 'Q1A71',
          text: { en: 'Pain with sexual intercourse', it: 'DOLORE DURANTE IL RAPPORTO VAGINALE' },
          nestedQuestions: [
            {
              id: 'Q1A71Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your PAIN DURING VAGINAL SEX at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il DOLORE DURANTE IL RAPPORTO VAGINALE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A71Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A71Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A71Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A71Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A71Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } },
                { id: 'Q1A71Q1A6', text: { en: 'Not sexually active', it: 'Non sessualmente attivo' } },
                { id: 'Q1A71Q1A7', text: { en: 'Prefer not to answer', it: 'Preferisco non rispondere' } }
              ]
            }
          ]
        },

        /* 72 */ {
          id: 'Q1A72',
          text: { en: 'Breast swelling and tenderness', it: 'AUMENTO DI VOLUME O TENSIONE DELLE MAMMELLE' },
          nestedQuestions: [
            {
              id: 'Q1A72Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your BREAST AREA ENLARGEMENT OR TENDERNESS at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stato GRAVE l’AUMENTO DI VOLUME O TENSIONE DELLE MAMMELLE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A72Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A72Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A72Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A72Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A72Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 73 */ {
          id: 'Q1A73',
          text: { en: 'Bruising', it: 'LIVIDI' },
          nestedQuestions: [
            {
              id: 'Q1A73Q1',
              text: {
                en: 'In the last 7 days, did you BRUISE EASILY (BLACK AND BLUE MARKS)?',
                it: 'Negli ultimi 7 giorni, si è PROCURATO LIVIDI FACILMENTE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A73Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A73Q1A2', text: { en: 'No', it: 'No' } }
              ]
            }
          ]
        },

        /* 74 */ {
          id: 'Q1A74',
          text: { en: 'Chills', it: 'TREMORI O BRIVIDI' },
          nestedQuestions: [
            {
              id: 'Q1A74Q1',
              text: {
                en: 'In the last 7 days, how often did you have SHIVERING OR SHAKING CHILLS?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avvertito TREMORI O BRIVIDI?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A74Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A74Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A74Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A74Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A74Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A74Q2',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your SHIVERING OR SHAKING CHILLS at their WORST?',
                it: 'Negli ultimi 7 giorni, quanto sono stati GRAVI i TREMORI O BRIVIDI nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A74Q2A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A74Q2A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A74Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A74Q2A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A74Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 75 */ {
          id: 'Q1A75',
          text: { en: 'Increased sweating', it: 'INSOLITA O ECCESSIVA SUDORAZIONE' },
          nestedQuestions: [
            {
              id: 'Q1A75Q1',
              text: {
                en: 'In the last 7 days, how often did you have UNEXPECTED OR EXCESSIVE SWEATING DURING THE DAY OR NIGHTTIME (NOT RELATED TO HOT FLASHES/FLUSHES)?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha sviluppato INSOLITA O ECCESSIVA SUDORAZIONE DURANTE IL GIORNO O LA NOTTE (NON CORRELATA ALLE VAMPATE DI CALORE)?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A75Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A75Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A75Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A75Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A75Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A75Q2',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your UNEXPECTED OR EXCESSIVE SWEATING at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stata GRAVE l’INSOLITA O ECCESSIVA SUDORAZIONE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A75Q2A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A75Q2A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A75Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A75Q2A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A75Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 76 */ {
          id: 'Q1A76',
          text: { en: 'Decreased sweating', it: 'CALO DELLA SUDORAZIONE' },
          nestedQuestions: [
            {
              id: 'Q1A76Q1',
              text: {
                en: 'In the last 7 days, did you have an UNEXPECTED DECREASE IN SWEATING?',
                it: 'Negli ultimi 7 giorni, ha notato un CALO DELLA SUDORAZIONE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A76Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A76Q1A2', text: { en: 'No', it: 'No' } }
              ]
            }
          ]
        },

        /* 77 */ {
          id: 'Q1A77',
          text: { en: 'Hot flashes', it: 'VAMPATE DI CALORE' },
          nestedQuestions: [
            {
              id: 'Q1A77Q1',
              text: {
                en: 'In the last 7 days, how often did you have HOT FLASHES / FLUSHES?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto VAMPATE DI CALORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A77Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A77Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A77Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A77Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A77Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A77Q2',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your HOT FLASHES / FLUSHES at their WORST?',
                it: 'Negli ultimi 7 giorni, quanto sono state GRAVI le VAMPATE DI CALORE nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A77Q2A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A77Q2A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A77Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A77Q2A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A77Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 78 */ {
          id: 'Q1A78',
          text: { en: 'Nosebleed', it: 'SANGUE DAL NASO' },
          nestedQuestions: [
            {
              id: 'Q1A78Q1',
              text: {
                en: 'In the last 7 days, how often did you have NOSEBLEEDS?',
                it: 'Negli ultimi 7 giorni, con quale FREQUENZA ha avuto perdita di SANGUE DAL NASO?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A78Q1A1', text: { en: 'Never', it: 'Mai' } },
                { id: 'Q1A78Q1A2', text: { en: 'Rarely', it: 'Raramente' } },
                { id: 'Q1A78Q1A3', text: { en: 'Occasionally', it: 'Qualche volta' } },
                { id: 'Q1A78Q1A4', text: { en: 'Frequently', it: 'Spesso' } },
                { id: 'Q1A78Q1A5', text: { en: 'Almost constantly', it: 'Quasi sempre' } }
              ]
            },
            {
              id: 'Q1A78Q2',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your NOSEBLEEDS at their WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stata GRAVE la perdita di SANGUE DAL NASO nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A78Q2A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A78Q2A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A78Q2A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A78Q2A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A78Q2A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        },

        /* 79 */ {
          id: 'Q1A79',
          text: { en: 'Pain and swelling at injection site', it: 'DOLORE, GONFIORE, ROSSORE NEL PUNTO DI INIEZIONE' },
          nestedQuestions: [
            {
              id: 'Q1A79Q1',
              text: {
                en: 'In the last 7 days, did you HAVE ANY PAIN, SWELLING, OR REDNESS AT A SITE OF DRUG INJECTION OR IV?',
                it: 'Negli ultimi 7 giorni, ha sviluppato DOLORE, GONFIORE, ROSSORE NEL PUNTO IN CUI È STATA SOMMINISTRATA LA TERAPIA?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A79Q1A1', text: { en: 'Yes', it: 'Sì' } },
                { id: 'Q1A79Q1A2', text: { en: 'No', it: 'No' } },
                { id: 'Q1A79Q1A3', text: { en: 'Not applicable', it: 'Non pertinente' } }
              ]
            }
          ]
        },

        /* 80 */ {
          id: 'Q1A80',
          text: { en: 'Body odor', it: 'ODORE CORPOREO' },
          nestedQuestions: [
            {
              id: 'Q1A80Q1',
              text: {
                en: 'In the last 7 days, what was the SEVERITY of your BODY ODOR at its WORST?',
                it: 'Negli ultimi 7 giorni, quanto è stato GRAVE il problema dell’ODORE CORPOREO nel momento PEGGIORE?'
              },
              type: 'singleChoice',
              answerChoices: [
                { id: 'Q1A80Q1A1', text: { en: 'None', it: 'Per nulla' } },
                { id: 'Q1A80Q1A2', text: { en: 'Mild', it: 'Un po’' } },
                { id: 'Q1A80Q1A3', text: { en: 'Moderate', it: 'Abbastanza' } },
                { id: 'Q1A80Q1A4', text: { en: 'Severe', it: 'Molto' } },
                { id: 'Q1A80Q1A5', text: { en: 'Very severe', it: 'Moltissimo' } }
              ]
            }
          ]
        }

      ] 
    } 
  ] 
};