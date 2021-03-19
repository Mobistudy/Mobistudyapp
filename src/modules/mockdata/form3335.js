export default {
  createdTS: '2020-09-17T16:09:53.222Z',
  name: {
    en: 'Daily Questionnaire'
  },
  description: {
    en: `Daily Questionnaire about your asthma symptoms
    `
  },
  questions: [{
    id: 'Q1',
    type: 'textOnly',
    text: {
      en: ``
    },
    html: {
      en: `Please answer questions 1-6.
      <br/>
      <strong> Select </strong> the response that best describes how you have been during the past week.`
    },
    helper: {
      en: ''
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q2'
  },
  {
    id: 'Q2',
    type: 'singleChoice',
    text: {
      en: `1. On average, during the past week, how often were you
      <strong> woken by your asthma </strong> during the night?`
    },
    helper: {
      en: ''
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q3',
    answerChoices: [{
      id: 'Q2A1',
      text: {
        en: '0 - Never'
      }
    },
    {
      id: 'Q2A2',
      text: {
        en: '1 - Hardly ever'
      }
    },
    {
      id: 'Q2A3',
      text: {
        en: '2 - A few times'
      }
    },
    {
      id: 'Q2A4',
      text: {
        en: '3 - Several times'
      }
    },
    {
      id: 'Q2A5',
      text: {
        en: '4 - Many times'
      }
    },
    {
      id: 'Q2A6',
      text: {
        en: '5 - A great many times'
      }
    },
    {
      id: 'Q2A7',
      text: {
        en: '6 - Unable to sleep because of asthma'
      }
    }]
  },
  {
    id: 'Q3',
    type: 'singleChoice',
    text: {
      en: `2. On average, during the past week, how <strong> bad
      were your asthma symptoms when you woke up </strong> in the morning?`
    },
    helper: {
      en: ''
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q4',
    answerChoices: [{
      id: 'Q3A1',
      text: {
        en: '0 - No symptoms'
      }
    },
    {
      id: 'Q3A2',
      text: {
        en: '1 - Very mild symptoms'
      }
    },
    {
      id: 'Q3A3',
      text: {
        en: '2 - Mild symptoms'
      }
    },
    {
      id: 'Q3A4',
      text: {
        en: '3 - Moderate symptoms'
      }
    },
    {
      id: 'Q3A5',
      text: {
        en: '4 - Quite severe symptoms'
      }
    },
    {
      id: 'Q3A6',
      text: {
        en: '5 - Severe symptoms'
      }
    },
    {
      id: 'Q3A7',
      text: {
        en: '6 - Very severe symptoms'
      }
    }]
  },
  {
    id: 'Q4',
    type: 'singleChoice',
    text: {
      en: `3. In general, during the past week, how <strong> limited
      were you in your activities </strong> because of your asthma?`
    },
    helper: {
      en: ''
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q5',
    answerChoices: [{
      id: 'Q4A1',
      text: {
        en: '0 - Not limited at all'
      }
    },
    {
      id: 'Q4A2',
      text: {
        en: '1 - Very slightly limited'
      }
    },
    {
      id: 'Q4A3',
      text: {
        en: '2 - Slightly limited'
      }
    },
    {
      id: 'Q4A4',
      text: {
        en: '3 - Moderately limited'
      }
    },
    {
      id: 'Q4A5',
      text: {
        en: '4 - Very limited'
      }
    },
    {
      id: 'Q4A6',
      text: {
        en: '5 - Extremly limited'
      }
    },
    {
      id: 'Q4A7',
      text: {
        en: '6 - Totally limited'
      }
    }]
  },
  {
    id: 'Q5',
    type: 'singleChoice',
    text: {
      en: `4. In general, during the past week, how much <strong> shortness
      of breath </strong> did you experience because of your asthma?`
    },
    helper: {
      en: ''
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q6',
    answerChoices: [{
      id: 'Q5A1',
      text: {
        en: '0 - None'
      }
    },
    {
      id: 'Q5A2',
      text: {
        en: '1 - A very little'
      }
    },
    {
      id: 'Q5A3',
      text: {
        en: '2 - A little'
      }
    },
    {
      id: 'Q5A4',
      text: {
        en: '3 - A moderate amount'
      }
    },
    {
      id: 'Q5A5',
      text: {
        en: '4 - Quite a lot'
      }
    },
    {
      id: 'Q5A6',
      text: {
        en: '5 - A great deal'
      }
    },
    {
      id: 'Q5A7',
      text: {
        en: '6 - A very great deal'
      }
    }]
  },
  {
    id: 'Q6',
    type: 'singleChoice',
    text: {
      en: `5. In general, during the past week, how much of the
      time did you <strong> wheeze </strong>?`
    },
    helper: {
      en: ''
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q7',
    answerChoices: [{
      id: 'Q6A1',
      text: {
        en: '0 - Not at all'
      }
    },
    {
      id: 'Q6A2',
      text: {
        en: '1 - Hardly any of the time'
      }
    },
    {
      id: 'Q6A3',
      text: {
        en: '2 - A little of the time'
      }
    },
    {
      id: 'Q6A4',
      text: {
        en: '3 - A moderate amount of time'
      }
    },
    {
      id: 'Q6A5',
      text: {
        en: '4 - A lot of the time'
      }
    },
    {
      id: 'Q6A6',
      text: {
        en: '5 - Most of the time'
      }
    },
    {
      id: 'Q6A7',
      text: {
        en: '6 - All the time'
      }
    }]
  },
  {
    id: 'Q7',
    type: 'singleChoice',
    text: {
      en: `6. On average, during the past week, how many <strong> puffs/inhalation
      of short-acting bronchodilator </strong> (eg. Ventolin/ Bricanyl) have you used each day?`
    },
    helper: {
      en: '<i>(If you are not sure how to answer this question, please ask for help)</i>'
    },
    footer: {
      en: 'ACQ© 2002 QOL TECHNOLOGIES LTD.'
    },
    nextDefaultId: 'Q8',
    answerChoices: [{
      id: 'Q7A1',
      text: {
        en: '0 = None'
      }
    },
    {
      id: 'Q7A2',
      text: {
        en: '1 = 1 - 2 puffs/inhalations most days'
      }
    },
    {
      id: 'Q7A3',
      text: {
        en: '2 = 3 - 4 puffs/inhalations most days'
      }
    },
    {
      id: 'Q7A4',
      text: {
        en: '3 = 5 - 8 puffs/inhalations most days'
      }
    },
    {
      id: 'Q7A5',
      text: {
        en: '4 = 9 - 12 puffs/inhalations most days'
      }
    },
    {
      id: 'Q7A6',
      text: {
        en: '5 = 13 - 16 puffs/inhalations most days'
      }
    },
    {
      id: 'Q7A7',
      text: {
        en: '6 = More than 16 puffs/inhalations most days'
      }
    }]
  },
  {
    id: 'Q8',
    type: 'textOnly',
    text: {
      en: ``
    },
    html: {
      en: `<p>For any information on the use of the ACQ, please contact Mapi Research Trust, Lyon, France.
      <br/>
      <br/>
      Internet: https://eprovide.mapitrust.org </p>`
    },
    nextDefaultId: 'ENDFORM'
  }]
}
