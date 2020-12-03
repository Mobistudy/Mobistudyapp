export default {
  createdTS: '2019-10-25T10:09:53.222Z',
  name: {
    en: 'Global Physical Activity Questionnaire'
  },
  description: {
    en: `The Global Physical Activity Questionnaire was developed by WHO for
    physical activity surveillance in countries. It collects information on physical
    activity participation in three settings (or domains) as well as sedentary
    behaviour, comprising 16 questions.`
  },
  questions: [
    {
      id: 'Q1',
      type: 'singleChoice',
      text: {
        en: `Does your work involve vigorous-intensity activity that causes
        large increases in breathing or heart rate like (carrying or lifting
        heavy loads, digging or construction work) for at least 10 minutes continuously?`
      },
      helper: {
        en: 'Choose one option.'
      },
      nextDefaultId: 'Q2',
      answerChoices: [{
        id: 'Q1A1',
        text: {
          en: 'Yes'
        },
        nextQuestionId: 'Q2'
      },
      {
        id: 'Q1A2',
        text: {
          en: 'No'
        },
        nextQuestionId: 'Q4'
      }]
    },
    {
      id: 'Q2',
      type: 'freetext',
      text: {
        en: 'In a typical week, on how many days do you do vigorousintensity activities as part of your work? '
      },
      helper: {
        en: 'Number of days'
      },
      nextDefaultId: 'Q3'
    },
    {
      id: 'Q3',
      type: 'freetext',
      text: {
        en: 'How much time do you spend doing vigorous-intensity activities at work on a typical day?'
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'Q4'
    },
    {
      id: 'Q4',
      type: 'singleChoice',
      text: {
        en: `Does your work involve moderate-intensity activity, that causes
      small increases in breathing or heart rate such as brisk walking
      [or carrying light loads] for at least 10 minutes continuously?`
      },
      helper: {
        en: 'Choose one option.'
      },
      nextDefaultId: 'Q5',
      answerChoices: [{
        id: 'Q4A1',
        text: {
          en: 'Yes'
        },
        nextQuestionId: 'Q5'
      },
      {
        id: 'Q4A2',
        text: {
          en: 'No'
        },
        nextQuestionId: 'Q7'
      }]
    },
    {
      id: 'Q5',
      type: 'freetext',
      text: {
        en: 'In a typical week, on how many days do you do moderateintensity activities as part of your work?'
      },
      helper: {
        en: 'Number of days'
      },
      nextDefaultId: 'Q5'
    },
    {
      id: 'Q6',
      type: 'freetext',
      text: {
        en: 'How much time do you spend doing moderate-intensity activities at work on a typical day? '
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'Q7'
    },
    {
      id: 'Q7',
      type: 'singleChoice',
      text: {
        en: 'Do you walk or use a bicycle (pedal cycle) for at least 10 minutes continuously to get to and from places?'
      },
      helper: {
        en: 'Choose one option.'
      },
      nextDefaultId: 'Q8',
      answerChoices: [{
        id: 'Q7A1',
        text: {
          en: 'Yes'
        },
        nextQuestionId: 'Q8'
      },
      {
        id: 'Q7A2',
        text: {
          en: 'No'
        },
        nextQuestionId: 'Q10'
      }]
    },
    {
      id: 'Q8',
      type: 'freetext',
      text: {
        en: 'In a typical week, on how many days do you walk or bicycle for at least 10 minutes continuously to get to and from places? '
      },
      helper: {
        en: 'Number of days '
      },
      nextDefaultId: 'Q9'
    },
    {
      id: 'Q9',
      type: 'freetext',
      text: {
        en: 'How much time do you spend walking or bicycling for travel on a typical day?'
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'Q10'
    },
    {
      id: 'Q10',
      type: 'singleChoice',
      text: {
        en: `Do you do any vigorous-intensity sports, fitness or recreational (leisure) activities
        that cause large increases in breathing or heart rate like [running or football] for at least 10 minutes continuously?`
      },
      helper: {
        en: 'Choose one option.'
      },
      nextDefaultId: 'Q11',
      answerChoices: [{
        id: 'Q10A1',
        text: {
          en: 'Yes'
        },
        nextQuestionId: 'Q11'
      },
      {
        id: 'Q10A2',
        text: {
          en: 'No'
        },
        nextQuestionId: 'Q13'
      }]
    },
    {
      id: 'Q11',
      type: 'freetext',
      text: {
        en: 'In a typical week, on how many days do you do vigorousintensity sports, fitness or recreational (leisure) activities?'
      },
      helper: {
        en: 'Number of days'
      },
      nextDefaultId: 'Q12'
    },
    {
      id: 'Q12',
      type: 'freetext',
      text: {
        en: 'How much time do you spend doing vigorous-intensity sports, fitness or recreational activities on a typical day? '
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'Q13'
    },
    {
      id: 'Q13',
      type: 'singleChoice',
      text: {
        en: 'Do you do any moderate-intensity sports, fitness or recreational (leisure) activities that cause a small increase in breathing or heart rate such as brisk walking, [cycling, swimming, volleyball] for at least 10 minutes continuously? '
      },
      helper: {
        en: 'Choose one option.'
      },
      nextDefaultId: 'Q14',
      answerChoices: [{
        id: 'Q13A1',
        text: {
          en: 'Yes'
        },
        nextQuestionId: 'Q14'
      },
      {
        id: 'Q13A2',
        text: {
          en: 'No'
        },
        nextQuestionId: 'Q16'
      }]
    },
    {
      id: 'Q14',
      type: 'freetext',
      text: {
        en: 'In a typical week, on how many days do you do moderateintensity sports, fitness or recreational (leisure) activities?'
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'Q15'
    },
    {
      id: 'Q15',
      type: 'freetext',
      text: {
        en: 'How much time do you spend doing moderate-intensity sports, fitness or recreational (leisure) activities on a typical day? '
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'Q16'
    },
    {
      id: 'Q16',
      type: 'freetext',
      text: {
        en: 'How much time do you usually spend sitting or reclining on a typical day? '
      },
      helper: {
        en: 'Hours : minutes'
      },
      nextDefaultId: 'ENDFORM'
    }]
}
