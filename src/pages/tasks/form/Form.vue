<template>
  <q-page padding>
    <div v-if="!finished && currentQuestion">
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
          <div class="text-center text-subtitle2 q-mb-md">
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
          <q-input
            v-show="currentQuestion.type === 'number'"
            v-model.number="numberAnswer"
            type="number"
            :min="currentQuestion.min"
            :max="currentQuestion.max"
            :rules="[
              val => val !== null && val !== '' || $t('studies.tasks.form.freeTextExplanation'),
              val => val >= currentQuestion.min || $t('studies.tasks.form.numberTooSmall'),
              val => val <= currentQuestion.max || $t('studies.tasks.form.numberTooBig')
            ]"
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
            <q-input
              v-show="singleChoiceAnswer == answerChoice.id && answerChoice.includeFreeText"
              v-model="singleChoiceAnswerFreeText"
              type="textarea"
              :label="$t('studies.tasks.form.freeTextExplanation')"
              rows="3"
              outlined
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
            <q-input
              v-show="multiChoiceAnswer.includes(answerChoice.id) && answerChoice.includeFreeText"
              v-model="multiChoiceAnswerFreeText[index]"
              type="textarea"
              :label="$t('studies.tasks.form.freeTextExplanation')"
              rows="3"
              outlined
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
      <div
        v-if="currentQuestion.type !== 'textOnly'"
        class="row justify-around"
      >
        <q-btn
          no-caps
          flat
          :label="$t('studies.tasks.form.removeAnswer')"
          color="negative"
          icon-right="cancel"
          @click="clearAnswer()"
        />
      </div>
      <div class="row justify-around q-mb-xl q-mt-md">
        <q-btn
          v-show="!isFirstQuestion"
          icon="arrow_back"
          color="secondary"
          @click="back()"
          :label="$t('common.back')"
        />
        <q-btn
          v-show="isAnswered"
          icon-right="arrow_forward"
          color="primary"
          @click="next()"
          :label="$t('common.next')"
        />
        <q-btn
          v-model="singleChoiceAnswer"
          v-show="!isAnswered"
          icon-right="arrow_forward"
          color="warning"
          @click="next()"
          :label="$t('common.skip')"
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

    <q-inner-loading :showing="isRetrieving">
      <div class="text-overline">{{ $t('studies.tasks.miband3.dataSending') }}</div>
      <q-spinner-oval
        size="50px"
        color="primary"
      />
    </q-inner-loading>

  </q-page>
</template>

<script>
import API from 'modules/API/API'
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
      oldResponses: [],
      freetextAnswer: undefined,
      numberAnswer: undefined,
      singleChoiceAnswer: undefined,
      singleChoiceAnswerFreeText: undefined,
      multiChoiceAnswer: [],
      multiChoiceAnswerFreeText: [],
      finished: false,
      currentQuestion: undefined,
      loading: false,
      slideName: ''
    }
  },
  async created () {
    this.isRetrieving = true
    const formKey = this.formKey

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
      this.currentQuestion = this.formDescr.questions[0]
      setTimeout(() => { this.slideName = 'fadeInDown' }, 10)
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
    this.isRetrieving = false
  },
  computed: {
    isFirstQuestion () {
      if (this.currentQuestion.id === this.formDescr.questions[0].id) return true
      return false
    },
    isAnswered () {
      return (this.currentQuestion.type === 'singleChoice' && this.singleChoiceAnswer) ||
        (this.currentQuestion.type === 'freetext' && this.freetextAnswer) ||
        (this.currentQuestion.type === 'number' && (this.numberAnswer || this.numberAnswer === 0)) ||
        (this.currentQuestion.type === 'multiChoice' && this.multiChoiceAnswer.length) ||
        (this.currentQuestion.type === 'textOnly')
    }
  },
  methods: {
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
      } else if (this.currentQuestion.type === 'number') {
        answer.answer = this.numberAnswer
      } else if (this.currentQuestion.type === 'singleChoice') {
        let chosenAnswerChoice = this.currentQuestion.answerChoices.find(x => x.id === this.singleChoiceAnswer)
        if (chosenAnswerChoice) {
          if (chosenAnswerChoice.includeFreeText) {
            answer.answer = {
              answerText: chosenAnswerChoice.text,
              answerId: chosenAnswerChoice.id,
              freetextAnswer: this.singleChoiceAnswerFreeText,
              includeFreeText: true
            }
          } else {
            answer.answer = {
              answerText: chosenAnswerChoice.text,
              answerId: chosenAnswerChoice.id
            }
          }
          if (chosenAnswerChoice.nextQuestionId) nextQuestionId = chosenAnswerChoice.nextQuestionId
        }
      } else if (this.currentQuestion.type === 'multiChoice') {
        answer.answer = []
        for (let answerID of this.multiChoiceAnswer) {
          let chosenAnswerChoice = this.currentQuestion.answerChoices.find(x => x.id === answerID)
          let chosenAnswerIndex = this.currentQuestion.answerChoices.findIndex(x => x.id === answerID)
          if (chosenAnswerChoice.includeFreeText) {
            answer.answer.push({
              answerText: chosenAnswerChoice.text,
              answerId: chosenAnswerChoice.id,
              freetextAnswer: this.multiChoiceAnswerFreeText[chosenAnswerIndex],
              includeFreeText: true
            })
          } else {
            answer.answer.push({
              answerText: chosenAnswerChoice.text,
              answerId: chosenAnswerChoice.id
            })
          }
        }
      }

      this.responses.push(answer)

      // reset fields
      this.freetextAnswer = undefined
      this.numberAnswer = undefined
      this.multiChoiceAnswer = []
      this.singleChoiceAnswer = undefined
      this.singleChoiceAnswerFreeText = undefined
      this.multiChoiceAnswerFreeText = []

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
      // check for old responses
      if (this.oldResponses[1] && this.oldResponses[1].questionId === nextQuestionId) {
        if (this.oldResponses[1].answer) this.singleChoiceAnswer = this.oldResponses[1].answer.answerId
        else this.singleChoiceAnswer = undefined
        this.oldResponses.shift()
      } else this.oldResponses = []

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
      this.numberAnswer = undefined
      this.multiChoiceAnswer = []
      this.singleChoiceAnswer = undefined
      this.singleChoiceAnswerFreeText = undefined
      this.multiChoiceAnswerFreeText = []

      const lastResponse = this.responses[this.responses.length - 1]
      this.currentQuestion = this.formDescr.questions.find(x => x.id === lastResponse.questionId)

      // populate the answer
      if (lastResponse.answer) {
        if (this.currentQuestion.type === 'freetext') {
          this.freetextAnswer = lastResponse.answer
        } else if (this.currentQuestion.type === 'number') {
          this.numberAnswer = lastResponse.answer
        } else if (this.currentQuestion.type === 'singleChoice') {
          this.singleChoiceAnswer = lastResponse.answer.answerId
          if (lastResponse.answer.includeFreeText) {
            this.singleChoiceAnswerFreeText = lastResponse.answer.freetextAnswer
          }
        } else if (this.currentQuestion.type === 'multiChoice') {
          this.multiChoiceAnswer = lastResponse.answer.map(x => x.answerId)
          // populate multiChoiceAnswerFreeText
          if (lastResponse.answer.some(x => x.includeFreeText)) {
            for (let answerID of this.multiChoiceAnswer) {
              let chosenAnswerIndex = this.currentQuestion.answerChoices.findIndex(x => x.id === answerID)
              let lastResponseIndex = lastResponse.answer.findIndex(x => x.answerId === answerID)
              this.multiChoiceAnswerFreeText[chosenAnswerIndex] = lastResponse.answer[lastResponseIndex].freetextAnswer
            }
          }
        }
      }

      this.oldResponses.unshift(this.responses.pop())

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
        this.$router.push('/home')
      } catch (error) {
        console.error(error)
        this.loading = false
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    },
    clearAnswer () {
      if (this.currentQuestion.type === 'singleChoice') {
        this.singleChoiceAnswer = undefined
        this.singleChoiceAnswerFreeText = undefined
      }
      if (this.currentQuestion.type === 'freetext') this.freetextAnswer = undefined
      if (this.currentQuestion.type === 'number') this.numberAnswer = undefined
      if (this.currentQuestion.type === 'multiChoice') {
        this.multiChoiceAnswer = []
        this.multiChoiceAnswerFreeText = []
      }
    }
  }
}
</script>
