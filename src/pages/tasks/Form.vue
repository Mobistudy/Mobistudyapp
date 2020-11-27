<template>
  <q-page padding>
    <div v-if="introduction">
      <div class="text-center text-h5">
        {{introduction.title[$i18n.locale]}}
      </div>
      <div class="text-center text-body1 q-mt-lg">
        <div v-html="introduction.description[$i18n.locale]"></div>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          color="primary"
          @click="start()"
          :label="$t('common.start')"
        />
      </div>
    </div>

    <div v-if="!introduction && !finished">
      <transition
        :enter-active-class="'animated ' + this.slideName"
        leave-active-class="fadeOut"
        mode="out-in"
      >
        <div
          v-show="slideName != ''"
          key=""
        >
          <div class="text-center text-subtitle1">
            <div v-html="currentQuestion.text[$i18n.locale]"></div>
          </div>
          <div
            v-if="currentQuestion.helper"
            class="text-center text-subtitle2 q-mb-md"
          >
            <div v-html="currentQuestion.helper[$i18n.locale]"></div>
          </div>

          <q-input
            v-show="currentQuestion.type === 'freetext'"
            v-model="freetextAnswer"
            type="textarea"
            :label="$t('studies.tasks.form.freeTextExplanation')"
            rows="3"
            outlined
          />

          <div
            v-show="currentQuestion.type === 'singleChoice'"
            v-for="(answerChoice, index) in currentQuestion.answerChoices"
            :key="'sc' + index"
          >
            <q-radio
              v-model="singleChoiceAnswer"
              :val="answerChoice.id"
              :label="answerChoice.text[$i18n.locale]"
            />
          </div>
          <div
            v-show="currentQuestion.type === 'multiChoice'"
            v-for="(answerChoice, index) in currentQuestion.answerChoices"
            :key="'mc' + index"
          >
            <q-checkbox
              v-model="multiChoiceAnswer"
              :val="answerChoice.id"
              :label="answerChoice.text[$i18n.locale]"
            />
          </div>
          <div
            v-show="currentQuestion.type === 'textOnly'"
            class="text-subtitle1 q-mb-md"
          >
            <div v-if="currentQuestion.type === 'textOnly'">
              <div v-html="currentQuestion.html[$i18n.locale]"></div>
            </div>
          </div>
        </div>
      </transition>
      <div class="row justify-around q-ma-lg">
        <q-btn
          v-show="!isFirstQuestion"
          icon="arrow_back"
          color="secondary"
          @click="back()"
          :label="$t('common.back')"
        />
        <q-btn
          icon-right="arrow_forward"
          color="primary"
          @click="next()"
          :label="$t('common.next')"
        />
      </div>
      <div
        v-if="currentQuestion.footer"
        class="text-left text-caption absolute-bottom q-pa-sm"
      >
        {{currentQuestion.footer[$i18n.locale]}}
      </div>
    </div>

    <div v-if="finished">
      <div class="text-center text-h6">
        {{$t('studies.tasks.form.formCompleted')}}
      </div>
      <div class="row justify-around q-ma-lg">
        <q-btn
          color="primary"
          @click="send()"
          :loading="loading"
          :label="$t('common.send')"
        />
      </div>
    </div>

  </q-page>
</template>

<script>
import API from 'modules/API'
import DB from 'modules/db'
import userinfo from 'modules/userinfo'

export default {
  name: 'FormPage',
  props: {
    studyKey: String,
    taskId: Number,
    formKey: String
  },
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
      currentQuestion: undefined,
      loading: false,
      slideName: ''
    }
  },
  async created () {
    const formKey = this.formKey
    console.log('Form Key:', formKey)

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
      setTimeout(() => { this.slideName = 'fadeInDown' }, 10)
    },
    next () {
      this.slideName = ''
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
        if (chosenAnswerChoice) {
          answer.answer = {
            answerText: chosenAnswerChoice.text,
            answerId: chosenAnswerChoice.id
          }
          if (chosenAnswerChoice.nextQuestionId) nextQuestionId = chosenAnswerChoice.nextQuestionId
        }
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

      if (!nextQuestionId) {
        if (this.currentQuestion.id === this.formDescr.questions[(this.formDescr.questions.length - 1)].id) {
          // last question
          nextQuestionId = 'ENDFORM'
        } else {
          // next one in the list
          let index = this.formDescr.questions.findIndex(x => x.id === this.currentQuestion.id)
          nextQuestionId = 'Q' + (index + 2)
        }
      }

      if (nextQuestionId === 'ENDFORM') {
        // completed !
        this.finished = true
      } else {
        this.currentQuestion = this.formDescr.questions.find(x => x.id === nextQuestionId)
      }
      setTimeout(() => { this.slideName = 'slideInRight' }, 10)
    },
    back () {
      this.slideName = ''
      this.freetextAnswer = undefined
      this.multiChoice = undefined
      this.singleChoiceAnswer = undefined

      const lastResponse = this.responses[this.responses.length - 1]
      this.currentQuestion = this.formDescr.questions.find(x => x.id === lastResponse.questionId)

      // populate the answer
      if (lastResponse.answer) {
        if (this.currentQuestion.type === 'freetext') {
          this.freetextAnswer = lastResponse.answer
        } else if (this.currentQuestion.type === 'singleChoice') {
          this.singleChoiceAnswer = lastResponse.answer.answerId
        } else if (this.currentQuestion.type === 'multiChoice') {
          this.multiChoice = lastResponse.map(x => x.answer.answerId)
        }
      }

      this.responses.pop()
      setTimeout(() => { this.slideName = 'slideInLeft' }, 10)
    },
    async send () {
      this.loading = true
      const studyKey = this.studyKey
      const taskId = Number(this.taskId)
      let answers = {
        userKey: userinfo.user._key,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        responses: this.responses
      }
      try {
        await API.sendAnswers(answers)
        await DB.setTaskCompletion(studyKey, taskId, new Date())
        // this.$q.notify({
        //   color: 'positive',
        //   message: 'Form sent successfully!',
        //   icon: 'check'
        // })
        // let _this = this
        this.$router.push('/home')
      } catch (error) {
        console.error(error)
        this.loading = false
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

<style scoped>
.slideInLeft,
.slideInRight,
.fadeInDown {
  animation-duration: 600ms;
}
</style>
