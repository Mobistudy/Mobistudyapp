<template>
  <q-page padding>
    <q-card v-for="question in questionnaire.questions" v-if="currentQuestion === question.id" :question="question" :key="question.id">
      <q-card-title>
        {{ question.text }}
        <span slot="subtitle">{{ question.helper }}</span>
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-list v-if="question.type === 'singleChoice'">
          <q-item link tag="label" v-for="choice in question.answerChoices" :key="choice.id">
            <q-item-side>
              <q-radio v-model="responses[responseDict[question.id]].answer" :val="JSON.stringify(choice)" />
            </q-item-side>
            <q-item-main :label="choice.text" />
          </q-item>
        </q-list>
        <q-select float-label="Click here to select options." v-if="question.type === 'multipleChoice'" multiple chips v-model="responses[responseDict[question.id]].answer"
                    :options="question.answerChoicesQuasar"/>
        <q-input v-if="question.type === 'freetext'" v-model="responses[responseDict[question.id]].answer" type="textarea" />
      </q-card-main>
      <q-card-separator />
      <q-card-actions :align="actionAlign">
        <q-btn icon="arrow_back" v-if="currentQuestion !== 'Q1'" label="Back" @click="back" />
        <q-btn icon-right="arrow_forward" color="primary" label="Next" @click="next" />
      </q-card-actions>
    </q-card>
    <q-jumbotron v-if="currentQuestion === 'ENDFORM'">
      <div class="q-display-3">Thank you!</div>
      <div class="q-subheading">
        Thanks very much for completing the questionnaire!
      </div>
      <hr class="q-hr q-my-lg">
      <q-btn color="primary" class="q-py-sm q-px-xl float-center" size="lg" label="Click here to submit and continue" @click="submit" />
    </q-jumbotron>
    <!-- content -->
  </q-page>
</template>

<script>
// let mobistudyAPI = require('src/modules/mobistudyAPI')
import * as mobistudyAPI from 'src/modules/mobistudyAPI'
let db = require('src/modules/db')
let moment = require('moment')

export default {
  // name: 'PageName',
  data: function () {
    return {
      questionnaire: {},
      responses: [],
      responseDict: {},
      currentQuestion: -1,
      prevQuestions: []
    }
  },
  computed: {
    actionAlign: function () {
      if (this.currentQuestion === 'Q1') {
        return 'end'
      } else {
        return 'between'
      }
    }
  },
  created () {
    this.$q.loading.show()
    let _this = this
    mobistudyAPI.getQuestionnaire(this.$route.params.key).then(function (questionnaireObject) {
      _this.questionnaire = questionnaireObject
      _this.generateResponseSkeleton()
      _this.$q.loading.hide()
      _this.currentQuestion = 'Q1'
    }).catch(function (error) {
      alert(error)
      _this.$q.loading.hide()
      _this.$router.go(-1)
    })
  },
  methods: {
    generateResponseSkeleton: function () {
      for (let i = 0; i < this.questionnaire.questions.length; i++) {
        let response = {
          questionId: this.questionnaire.questions[i].id,
          questionType: this.questionnaire.questions[i].type,
          questionText: this.questionnaire.questions[i].text,
          timestamp: ''
        }
        if (this.questionnaire.questions[i].type === 'multipleChoice') {
          response.answer = []
          this.questionnaire.questions[i].answerChoicesQuasar = []
          for (let j = 0; j < this.questionnaire.questions[i].answerChoices.length; j++) {
            this.questionnaire.questions[i].answerChoicesQuasar.push({
              label: this.questionnaire.questions[i].answerChoices[j].text,
              value: JSON.stringify(this.questionnaire.questions[i].answerChoices[j])
            })
          }
        } else if (this.questionnaire.questions[i].type === 'singleChoice') {
          response.answer = {}
        } else {
          response.answer = ''
        }
        this.responseDict[response.questionId] = this.responses.length // I hate this bodge and everything it stands for
        this.responses.push(response)
      }
    },
    next: function () {
      let currQ = this.questionnaire.questions.find(x => x.id === this.currentQuestion)
      let type = currQ.type
      let nextQId = currQ.nextDefaultId

      this.responses[this.responseDict[this.currentQuestion]].timestamp = moment().format()

      if (type === 'singleChoice') {
        if (typeof this.responses[this.responseDict[this.currentQuestion]].answer === 'object') { // Blank Choice
          // Do nothing - default ID
        } else { // Choice Given
          let ansChoice = JSON.parse(this.responses[this.responseDict[this.currentQuestion]].answer)
          if (typeof ansChoice.nextQuestionId !== 'undefined') {
            nextQId = ansChoice.nextQuestionId
          } else {
            nextQId = currQ.nextDefaultId
          }
        }
      } else if (type === 'multipleChoice') {
      }
      this.prevQuestions.push(this.currentQuestion)
      this.currentQuestion = nextQId
    },
    back: function () {
      this.currentQuestion = this.prevQuestions.pop()
    },
    submit: function () {
      for (let i = 0; i < this.responses.length; i++) {
        let type = this.responses[i].questionType
        if (type === 'singleChoice') {
          if (typeof this.responses[i].answer === 'object') { // Black choice
            this.responses[i].answer = ''
          } else {
            this.responses[i].answer = JSON.parse(this.responses[i].answer)
          }
        } else if (type === 'multipleChoice') {
          for (let j = 0; j < this.responses[i].answer.length; j++) {
            this.responses[i].answer[j] = JSON.parse(this.responses[i].answer[j])
          }
        }
      }
      db.retrieveServerQueue().then(function (res) {
        console.log(res)
      }).then(
        db.pushToServerQueue(this.responses)
      ).then(
        db.retrieveServerQueue
      ).then(function (res) {
        console.log(res)
      }).then(
        db.clearServerQueue
      )
      this.$router.push('/tasker')
    }
  }
}
</script>

<style>
</style>
