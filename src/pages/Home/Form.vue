<template>
  <q-page padding>
    <div v-if="introduction">
      <div class="q-headline q-ma-lg">
        {{introduction.title}}
      </div>
      <div class="q-subheading q-ma-lg">
        {{introduction.description}}
      </div>
      <div class="row  justify-center q-ma-lg">
        <q-btn color="primary" @click="start()" label="Start" />
      </div>
    </div>
    <div v-if="!introduction && !finished">
      <div class="q-headline q-ma-lg">
        {{currentQuestion.text}}
      </div>
      <div class="q-subheading q-ma-lg">
        {{currentQuestion.helper}}
      </div>
      <div v-show="currentQuestion.type === 'freetext'">
        <q-input  v-model="freetextAnswer" type="textarea" float-label="Type your answer" :max-height="100" rows="5"/>
      </div>
      <div v-show="currentQuestion.type === 'singleChoice'">
        <div v-for="(answerChoice, index) in currentQuestion.answerChoices" :key="index">
          <q-radio class="q-ml-md q-mb-md" v-model="singleChoiceAnswer" :val="answerChoice.id" :label="answerChoice.text"/>
        </div>
      </div>
      <div v-show="currentQuestion.type === 'multiChoice'">
        <q-checkbox v-for="(answerChoice, index) in currentQuestion.answerChoices" :key="index" class="q-ml-md q-mb-md"
        v-model="multiChoiceAnswer" :val="answerChoice.id" :label="answerChoice.text"/>
      </div>
      <div class="row justify-between q-ma-lg">
        <q-btn v-show="!isFirstQuestion" icon="arrow_back" color="secondary" @click="back()" label="Back" />
        <q-btn icon-right="arrow_forward" color="primary" @click="next()" label="Next" />
      </div>
    </div>

    <div v-if="finished">
      <p class="q-title">
        Form completed. Thank you.
      </p>
      <q-btn color="secondary" @click="send()" label="Send" />
    </div>

  </q-page>
</template>

<script>
import API from '../../modules/API'
import DB from '../../modules/db'
import userinfo from '../../modules/userinfo'

export default {
  name: 'FormPage',
  data: function () {
    return {
      formDescr: {},
      responses: [],
      freetextAnswer: undefined,
      singleChoiceAnswer: undefined,
      multiChoiceAnswer: [],
      introduction: {
        title: '',
        description: ''
      },
      finished: false,
      currentQuestion: undefined
    }
  },
  async created () {
    const formKey = this.$route.params.formKey

    try {
      let formDescr = await DB.getFormDescription(formKey)
      if (!formDescr) {
        // we need to retrieve it from the API
        this.$q.loading.show()
        formDescr = await API.getForm(formKey)
        await DB.setFormDescription(formKey, formDescr)
        this.$q.loading.hide()
      }
      this.formDescr = formDescr

      this.introduction = {
        title: this.formDescr.name,
        description: this.formDescr.description
      }
    } catch (error) {
      console.error(error)
      this.$q.notify({
        color: 'negative',
        message: 'Cannot retrieve information about the form: ' + error.message,
        icon: 'report_problem',
        onDismiss () {
          this.$router.go(-1)
        }
      })
    }
  },
  computed: {
    isFirstQuestion () {
      if (this.introduction) return false
      if (this.currentQuestion.id === this.formDescr.questions[0].id) return true
      return false
    }
  },
  methods: {
    start () {
      this.introduction = false
      this.currentQuestion = this.formDescr.questions[0]
    },
    next () {
      let nextQuestionId = this.currentQuestion.nextDefaultId

      let answer = {
        questionId: this.currentQuestion.id,
        questionType: this.currentQuestion.type,
        questionText: this.currentQuestion.text,
        answer: undefined,
        timeStamp: new Date()
      }
      if (this.currentQuestion.type === 'freetext') {
        answer.answer = this.freetextAnswer
      } else if (this.currentQuestion.type === 'singleChoice') {
        let chosenAnswerChoice = this.currentQuestion.answerChoices.find(x => x.id === this.singleChoiceAnswer)
        answer.answer = {
          answerText: chosenAnswerChoice.text,
          answerId: chosenAnswerChoice.id
        }
        if (chosenAnswerChoice.nextQuestionId) nextQuestionId = chosenAnswerChoice.nextQuestionId
      } else if (this.currentQuestion.type === 'multiChoice') {
        answer.answer = []
        for (let answerID of this.multiChoiceAnswer) {
          let chosenAnswerChoice = this.currentQuestion.answerChoices.find(x => x.id === answerID)
          answer.answer.push({
            answerText: chosenAnswerChoice.text,
            answerId: chosenAnswerChoice.id
          })
        }
      }

      this.responses.push(answer)

      // reset fields
      this.freetextAnswer = undefined
      this.multiChoice = undefined
      this.singleChoiceAnswer = undefined

      if (nextQuestionId === 'ENDFORM' || !nextQuestionId) {
        // completed !
        this.finished = true
      } else {
        this.currentQuestion = this.formDescr.questions.find(x => x.id === nextQuestionId)
      }
    },
    back () {
      this.freetextAnswer = undefined
      this.multiChoice = undefined
      this.singleChoiceAnswer = undefined

      const lastResponse = this.responses[this.responses.length - 1]
      this.currentQuestion = this.formDescr.questions.find(x => x.id === lastResponse.questionId)

      // populate the answer
      if (this.currentQuestion.type === 'freetext') {
        this.freetextAnswer = lastResponse.answer
      } else if (this.currentQuestion.type === 'singleChoice') {
        this.singleChoiceAnswer = lastResponse.answer.answerId
      } else if (this.currentQuestion.type === 'multiChoice') {
        this.multiChoice = lastResponse.map(x => x.answer.answerId)
      }

      this.responses.pop()
    },
    async send () {
      console.log(userinfo)
      const studyKey = this.$route.params.studyKey
      const taskId = Number(this.$route.params.taskId)
      let answers = {
        userKey: userinfo.user._key,
        studyKey: studyKey,
        taskId: taskId,
        responses: this.responses
      }
      try {
        await API.sendAnswers(answers)
        await DB.setTaskCompletion(studyKey, taskId, new Date())
        this.$router.push('/home')
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send data: ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
