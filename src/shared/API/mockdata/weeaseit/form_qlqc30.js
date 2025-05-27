export default {
  _key: '0005',
  teamKey: '1608',
  createdTS: '2025-04-18',
  name: {
    it: 'EORTC QLQ-C30',
    en: 'EORTC QLQ-C30'
  },
  description: {
    it: 'Con questo questionario vorremmo sapere alcune cose su di Lei e sulla Sua salute. La preghiamo di rispondere a tutte le domande selezionando il numero che meglio corrisponde alla Sua risposta. Non esiste una risposta “giusta” o “sbagliata”.Le Sue informazioni verranno tenute strettamente riservate.',
    en: 'We are interested in some things about you and your health. Please answer all of the questions yourself by circling the number that best applies to you.There are no "right" or "wrong" answers.The information that you provide will remain strictly confidential.'
  },
  // summary from page 8 of https://www.eortc.org/app/uploads/sites/2/2018/02/SCmanual.pdf
  summaryFunction: 'const ansId2Num = (ans) => { if (!ans.answer) return undefined; return parseInt(ans.answer.answerId.slice(-1)); }; const filterAndAverage = (anss, qIds) => { const filtered = anss.filter((an) => qIds.includes(an.questionId)); if (filtered.length === 0) return undefined; return filtered.reduce((avg, an, _, { length }) => avg + (ansId2Num(an) / length), 0); }; const QL2 = filterAndAverage(answers, [\'Q29\', \'Q30\']); const PF2 = filterAndAverage(answers, [\'Q1\', \'Q2\', \'Q3\', \'Q4\', \'Q5\']); const RF2 = filterAndAverage(answers, [\'Q6\', \'Q7\']); const EF = filterAndAverage(answers, [\'Q21\', \'Q22\', \'Q23\', \'Q24\']); const CF = filterAndAverage(answers, [\'Q20\', \'Q25\']); const SF = filterAndAverage(answers, [\'Q26\', \'Q27\']); const FA = filterAndAverage(answers, [\'Q10\', \'Q12\', \'Q18\']); const NV = filterAndAverage(answers, [\'Q14\', \'Q15\']); const PA = filterAndAverage(answers, [\'Q9\', \'Q19\']); const DY = filterAndAverage(answers, [\'Q8\']); const SL = filterAndAverage(answers, [\'Q11\']); const AP = filterAndAverage(answers, [\'Q13\']); const CO = filterAndAverage(answers, [\'Q16\']); const DI = filterAndAverage(answers, [\'Q17\']); const FI = filterAndAverage(answers, [\'Q28\']); const doFS = (F, range=3) => { return F ? (1 - ((F - 1) / range)) * 100 : undefined } ; const doSS = (F, range=3) => { return F ? ((F - 1) / range) * 100 : undefined }; return { globalHealth: doSS(QL2,6), physicalFunctioning: doFS(PF2), roleFunctioning: doFS(RF2), emotionalFunctioning: doFS(EF), cognitiveFunctioning: doFS(CF), socialFunctioning: doFS(SF), fatigue: doSS(FA), nauseaAndVomiting: doSS(NV), pain: doSS(PA), dyspnea: doSS(DY), insomnia: doSS(SL), appetiteLoss: doSS(AP), constipation: doSS(CO), diarrhea: doSS(DI), financialDifficulties: doSS(FI) }',
  summaryFunctionDescription: {
    globalHealth: {
      name: {
        en: 'Global health status',
        it: 'Stato di salute globale'
      },
      type: 'number',
      description: {
        en: 'Global health status score',
        it: 'Punteggio di stato di salute globale'
      }
    },
    physicalFunctioning: {
      name: {
        en: 'Physical functioning',
        it: 'Funzionamento fisico'
      },
      type: 'number',
      description: {
        en: 'Physical functioning score',
        it: 'Punteggio di funzionamento fisico'
      }
    },
    roleFunctioning: {
      name: {
        en: 'Role functioning',
        it: 'Funzionamento di ruolo'
      },
      type: 'number',
      description: {
        en: 'Role functioning score',
        it: 'Punteggio di funzionamento di ruolo'
      }
    },
    emotionalFunctioning: {
      name: {
        en: 'Emotional functioning',
        it: 'Funzionamento emotivo'
      },
      type: 'number',
      description: {
        en: 'Emotional functioning score',
        it: 'Punteggio di funzionamento emotivo'
      }
    },
    cognitiveFunctioning: {
      name: {
        en: 'Cognitive functioning',
        it: 'Funzionamento cognitivo'
      },
      type: 'number',
      description: {
        en: 'Cognitive functioning score',
        it: 'Punteggio di funzionamento cognitivo'
      }
    },
    socialFunctioning: {
      name: {
        en: 'Social functioning',
        it: 'Funzionamento sociale'
      },
      type: 'number',
      description: {
        en: 'Social functioning score',
        it: 'Punteggio di funzionamento sociale'
      }
    },
    fatigue: {
      name: {
        en: 'Fatigue',
        it: 'Affaticamento'
      },
      type: 'number',
      description: {
        en: 'Fatigue score',
        it: 'Punteggio di affaticamento'
      }
    },
    nauseaAndVomiting: {
      name: {
        en: 'Nausea and vomiting',
        it: 'Nausea e vomito'
      },
      type: 'number',
      description: {
        en: 'Nausea and vomiting score',
        it: 'Punteggio di nausea e vomito'
      }
    },
    pain: {
      name: {
        en: 'Pain',
        it: 'Dolore'
      },
      type: 'number',
      description: {
        en: 'Pain score',
        it: 'Punteggio di dolore'
      }
    },
    dyspnea: {
      name: {
        en: 'Dyspnea',
        it: 'Dispnea'
      },
      type: 'number',
      description: {
        en: 'Dyspnea score',
        it: 'Punteggio di dispnea'
      }
    },
    insomnia: {
      name: {
        en: 'Insomnia',
        it: 'Insonnia'
      },
      type: 'number',
      description: {
        en: 'Insomnia score',
        it: 'Punteggio di insonnia'
      }
    },
    appetiteLoss: {
      name: {
        en: 'Appetite loss',
        it: 'Perdita di appetito'
      },
      type: 'number',
      description: {
        en: 'Appetite loss score',
        it: 'Punteggio di perdita di appetito'
      }
    },
    constipation: {
      name: {
        en: 'Constipation',
        it: 'Stitichezza'
      },
      type: 'number',
      description: {
        en: 'Constipation score',
        it: 'Punteggio di stitichezza'
      }
    },
    diarrhea: {
      name: {
        en: 'Diarrhea',
        it: 'Diarrea'
      },
      type: 'number',
      description: {
        en: 'Diarrhea score',
        it: 'Punteggio di diarrea'
      }
    },
    financialDifficulties: {
      name: {
        en: 'Financial difficulties',
        it: 'Difficoltà finanziarie'
      },
      type: 'number',
      description: {
        en: 'Financial difficulties score',
        it: 'Punteggio di difficoltà finanziarie'
      }
    }
  },

  questions: [

    {
      id: 'Q1',
      text: {
        it: 'Ha difficoltà nello svolgere attività faticose, come portare una borsa della spesa pesante o una valigia?',
        en: 'Do you have any trouble doing strenuous activities, like carrying a heavy shopping bag or a suitcase?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q1A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q1A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q1A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q1A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },

    {
      id: 'Q2',
      text: {
        it: 'Ha difficoltà nel fare una lunga passeggiata?',
        en: 'Do you have any trouble taking a long walk?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q2A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q2A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q2A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q2A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q3',
      text: {
        it: 'Ha difficoltà nel fare una breve passeggiata fuori casa?',
        en: 'Do you have any trouble taking a short walk outside of the house?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q3A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q3A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q3A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q3A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q4',
      text: {
        it: 'Ha bisogno di stare a letto o su una sedia durante il giorno?',
        en: 'Do you need to stay in bed or a chair during the day? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q4A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q4A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q4A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q4A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q5',
      text: {
        it: 'Ha bisogno di aiuto per mangiare, vestirsi, lavarsi o andare in bagno?',
        en: 'Do you need help with eating, dressing, washing yourself or using the toilet?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q5A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q5A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q5A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q5A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q6',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto limitazioni nel fare il Suo lavoro o altre attività quotidiane?',
        en: 'During the past week, were you limited in doing either your work or other daily activities?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q6A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q6A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q6A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q6A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q7',
      text: {
        it: 'Durante gli ultimi sette giorni, Ha avuto limitazioni nel praticare i Suoi passatempi-hobby o altre attività di divertimento o svago?',
        en: 'During the past week, were you limited in pursuing your hobbies or other leisure time activities?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q7A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q7A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q7A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q7A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q8',
      text: {
        it: 'Durante gli ultimi sette giorni, le è mancato il fiato? ',
        en: 'During the past week, were you short of breath? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q8A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q8A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q8A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q8A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q9',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto dolore? ',
        en: 'During the past week, have you had pain? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q9A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q9A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q9A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q9A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q10',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto bisogno di riposo? ',
        en: 'During the past week, did you need to rest? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q10A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q10A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q10A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q10A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q11',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto difficoltà a dormire?',
        en: 'During the past week, have you had trouble sleeping? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q11A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q11A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q11A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q11A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q12',
      text: {
        it: 'Durante gli ultimi sette giorni, ha sentito debolezza? ',
        en: 'During the past week, have you felt weak? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q12A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q12A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q12A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q12A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q13',
      text: {
        it: 'Durante gli ultimi sette giorni, le è mancato l\'appetito?',
        en: 'During the past week, have you lacked appetite?  '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q13A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q13A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q13A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q13A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q14',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto un senso di nausea?',
        en: 'During the past week, have you felt nauseated?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q14A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q14A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q14A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q14A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q15',
      text: {
        it: 'Durante gli ultimi sette giorni, ha vomitato? ',
        en: 'During the past week, have you vomited? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q15A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q15A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q15A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q15A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q16',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto problemi di stitichezza?',
        en: 'During the past week, have you been constipated? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q16A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q16A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q16A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q16A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q17',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto problemi di diarrea?',
        en: 'During the past week, have you had diarrhea? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q17A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q17A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q17A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q17A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q18',
      text: {
        it: 'Durante gli ultimi sette giorni, ha sentito stanchezza? ',
        en: 'During the past week, were you tired? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q18A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q18A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q18A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q18A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q19',
      text: {
        it: 'Durante gli ultimi sette giorni, il dolore ha interferito con le Sue attività quotidiane?',
        en: 'During the past week, did pain interfere with your daily activities?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q19A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q19A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q19A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q19A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q20',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto difficoltà a concentrarsi su cose come leggere un giornale o guardare la televisione?',
        en: 'During the past week, have you had difficulty in concentrating on things, like reading a newspaper or watching television?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q20A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q20A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q20A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q20A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q21',
      text: {
        it: 'Durante gli ultimi sette giorni, si è sentito/a teso/a? ',
        en: 'During the past week, did you feel tense? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q21A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q21A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q21A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q21A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q22',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto preoccupazioni? ',
        en: 'During the past week, did you worry? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q22A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q22A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q22A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q22A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q23',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto manifestazioni di irritabilità?',
        en: 'During the past week, did you feel irritable? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q23A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q23A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q23A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q23A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q24',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avvertito uno stato di depressione?',
        en: 'During the past week, did you feel depressed? '
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q24A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q24A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q24A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q24A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q25',
      text: {
        it: 'Durante gli ultimi sette giorni, ha avuto difficoltà a ricordare le cose?',
        en: 'During the past week, have you had difficulty remembering things?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q25A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q25A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q25A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q25A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q26',
      text: {
        it: 'Durante gli ultimi sette giorni, le Sue condizioni fisiche o il Suo trattamento medico hanno interferito con la Sua vita familiare?',
        en: 'During the past week, has your physical condition or medical treatment interfered with your family life?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q26A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q26A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q26A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q26A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q27',
      text: {
        it: 'Durante gli ultimi sette giorni, le Sue condizioni fisiche o il Suo trattamento medico hanno interferito con la Sua vita sociale?',
        en: 'During the past week, Has your physical condition or medical treatment interfered with your social life?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q27A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q27A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q27A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q27A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q28',
      text: {
        it: 'Durante gli ultimi sette giorni, le Sue condizioni fisiche o il Suo trattamento medico Le hanno causato difficoltà finanziarie?',
        en: 'Has your physical condition or medical treatment caused you financial difficulties?'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q28A1',
          text: {
            it: 'No',
            en: 'Not at all'
          }
        },
        {
          id: 'Q28A2',
          text: {
            it: 'Un po’',
            en: 'A little'
          }
        },
        {
          id: 'Q28A3',
          text: {
            it: 'Parecchio',
            en: 'Quite a bit'
          }
        },
        {
          id: 'Q28A4',
          text: {
            it: 'Moltissimo',
            en: 'Very much'
          }
        }
      ]
    },
    {
      id: 'Q29',
      text: {
        it: 'Come valuterebbe in generale la Sua salute durante gli ultimi sette giorni?',
        en: 'How would you rate your overall health during the past week?'
      },
      helper: {
        it: 'Selezioni il numero da 1 a 7 che meglio corrisponde alla Sua risposta',
        en: 'Select the number between 1 and 7 that best applies to you'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q29A1',
          text: {
            it: '1 = Pessima',
            en: '1 = Very poor'
          }
        },
        {
          id: 'Q29A2',
          text: {
            it: '2',
            en: '2'
          }
        },
        {
          id: 'Q29A3',
          text: {
            it: '3',
            en: '3'
          }
        },
        {
          id: 'Q29A4',
          text: {
            it: '4',
            en: '4'
          }
        },
        {
          id: 'Q29A5',
          text: {
            it: '5',
            en: '5'
          }
        },
        {
          id: 'Q29A6',
          text: {
            it: '6',
            en: '6'
          }
        },
        {
          id: 'Q29A7',
          text: {
            it: '7 = Ottima',
            en: '7 = Excellent'
          }
        }
      ]
    },
    {
      id: 'Q30',
      text: {
        it: 'Come valuterebbe in generale la Sua qualità di vita durante gli ultimi sette giorni?',
        en: 'How would you rate your overall quality of life during the past week?'
      },
      helper: {
        it: 'Selezioni il numero da 1 a 7 che meglio corrisponde alla Sua risposta',
        en: 'Select the number between 1 and 7 that best applies to you'
      },
      type: 'singleChoice',
      answerChoices: [
        {
          id: 'Q30A1',
          text: {
            it: '1 = Pessima',
            en: '1 = Very poor'
          }
        },
        {
          id: 'Q30A2',
          text: {
            it: '2',
            en: '2'
          }
        },
        {
          id: 'Q30A3',
          text: {
            it: '3',
            en: '3'
          }
        },
        {
          id: 'Q30A4',
          text: {
            it: '4',
            en: '4'
          }
        },
        {
          id: 'Q30A5',
          text: {
            it: '5',
            en: '5'
          }
        },
        {
          id: 'Q30A6',
          text: {
            it: '6',
            en: '6'
          }
        },
        {
          id: 'Q30A7',
          text: {
            it: '7 = Ottima',
            en: '7 = Excellent'
          }
        }
      ]
    }
  ]
}
