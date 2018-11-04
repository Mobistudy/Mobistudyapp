// const axios = require('axios')

// const db = require('src/modules/db')

export function getQuestionnaire (key) {
  return new Promise(function (resolve, reject) {
    if (key === '123456') {
      setTimeout(function () {
        resolve({
          'created': '2018-10-25T10:09:53.222Z',
          'name': 'My cool form',
          'description': 'a short form',
          'questions': [{
            'id': 'Q1',
            'type': 'singleChoice',
            'text': 'What do you prefer?',
            'helper': 'Some details here',
            'nextDefaultId': 'Q2',
            'answerChoices': [{
              'id': '1',
              'text': 'Red',
              'nextQuestionId': 'Q2'
            }, {
              'id': '2',
              'text': 'Green',
              'nextQuestionId': 'Q2'
            }]
          }, {
            'id': 'Q2',
            'type': 'multipleChoice',
            'text': 'Best options',
            'helper': 'Some details here',
            'nextDefaultId': 'Q3',
            'answerChoices': [{
              'id': 'Q2A1',
              'text': 'Money'
            }, {
              'id': 'Q2A2',
              'text': 'Sex'
            }]
          }, {
            'id': 'Q3',
            'type': 'freetext',
            'text': 'Type some freetext here',
            'helper': 'freetext',
            'nextDefaultId': 'ENDFORM'
          }]
        })
      }, 1500)
    } else {
      reject(new Error('Questionnaire not found'))
    }
  })
}

export function sendData () {

}
