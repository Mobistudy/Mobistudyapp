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
          <div class="text-center text-h6 q-mt-lg">
            <div v-html="currentQuestion.text[$i18n.locale]"></div>
          </div>
          <div class="text-center text-caption q-my-md">
            <div
              v-if="currentQuestion.helper"
              v-html="currentQuestion.helper[$i18n.locale]"
            ></div>
          </div>

          <!-- freetext -->
          <q-input
            v-show="currentQuestion.type === 'freetext'"
            v-model="freetextAnswer"
            type="textarea"
            :label="$t('studies.tasks.form.freeTextExplanation')"
            rows="3"
            outlined
          />

          <!-- number -->

          <q-input
            v-show="currentQuestion.type === 'number'"
            v-model.number="numberAnswer"
            type="number"
            :rules="[
              val => {
                if (!val || (val >= currentQuestion.min && val <= currentQuestion.max)) return true;
                if (val < currentQuestion.min) return $t('studies.tasks.form.numberTooSmall');
                if (val > currentQuestion.max) return $t('studies.tasks.form.numberTooBig')
              }
            ]"
            outlined
          />

          <!-- time -->

          <div
            v-if="currentQuestion.type === 'time'"
            class="row justify-center"
          >
            <q-input
              v-model="timeAnswer"
              type="time"
              outlined
              style="width: 150px;"
              :rules="timeRules"
            />
          </div>

          <!-- slider -->

          <div
            v-if="currentQuestion.type === 'slider'"
            class="text-center"
          >
            <div class="row justify-center">
              <q-slider
                class="q-ma-sm"
                v-model.number="numberAnswer"
                :min="currentQuestion.min"
                :max="currentQuestion.max"
                :vertical="currentQuestion.vertical"
                :reverse="currentQuestion.vertical"
              />
            </div>
          </div>

          <!-- singleChoice -->

          <div
            v-show="currentQuestion.type === 'singleChoice'"
            v-for="(answerChoice, index) in currentQuestion.answerChoices"
            :key="'sc' + index"
          >
            <q-radio
              size="lg"
              v-model="singleChoiceAnswer"
              :val="answerChoice.id"
              :label="answerChoice.text[$i18n.locale]"
              class="q-mt-md"
            />
            <q-input
              v-show="answerChoice.includeFreeText"
              :disable="singleChoiceAnswer !== answerChoice.id"
              v-model="singleChoiceAnswerFreeText"
              type="textarea"
              :label="$t('studies.tasks.form.freeTextExplanation')"
              rows="3"
              outlined
            />
          </div>

          <!-- multiChoice -->

          <div
            v-show="currentQuestion.type === 'multiChoice'"
            v-for="(answerChoice, index) in currentQuestion.answerChoices"
            :key="'mc' + index"
          >
            <q-checkbox
              size="lg"
              v-model="multiChoiceAnswer"
              :val="answerChoice.id"
              :label="answerChoice.text[$i18n.locale]"
              class="q-mt-md"
            />
            <q-input
              v-show="answerChoice.includeFreeText"
              :disable="!multiChoiceAnswer.includes(answerChoice.id)"
              v-model="multiChoiceAnswerFreeText[index]"
              type="textarea"
              :label="$t('studies.tasks.form.freeTextExplanation')"
              rows="3"
              outlined
            />
          </div>

          <!-- photo -->

          <div
            v-show="currentQuestion.type === 'photo'"
            class="text-center"
          >
            <div class="row justify-center">
              <img
                ref="photoViewer"
                class="photoViewer"
              />
              <q-btn
                color="primary"
                icon="photo_camera"
                class="photoBtn"
              >
                <label class="photoFileLabel">{{$t('studies.tasks.form.takePhoto')}}
                  <input
                    type="file"
                    ref="photoFile"
                    class="photoFileInput"
                    capture="user"
                    accept="image/*"
                    @change="photoTaken(this)"
                    multiple
                  />
                </label>
              </q-btn>

            </div>
          </div>

        </div>
      </transition>
      <div
        v-if="currentQuestion.type !== 'textOnly'"
        class="row justify-around"
      >
        <q-btn
          :disabled="!isAnswered"
          no-caps
          flat
          :label="$t('studies.tasks.form.removeAnswer')"
          color="negative"
          icon-right="cancel"
          @click="clearAnswer()"
        />
      </div>
      <div class="row justify-around q-mb-xl q-mt-lg">
        <q-btn
          class="mobibtn"
          v-show="!isFirstQuestion"
          icon="arrow_back"
          color="secondary"
          @click="back()"
          :label="$t('common.back')"
        />
        <q-btn
          class="mobibtn"
          v-show="isAnswered"
          :disable="!isValidAnswer"
          icon-right="arrow_forward"
          color="primary"
          @click="next()"
          :label="$t('common.next')"
        />
        <q-btn
          class="mobibtn"
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
      <div class="text-center text-h6 q-mt-md">
        {{$t('studies.tasks.form.formCompleted')}}
      </div>
      <table class="summaryTable q-my-lg">
        <tr>
          <td>{{ $t('studies.tasks.form.askedQuestions')}}</td>
          <td> {{asked}} </td>
        </tr>
        <tr>
          <td>{{ $t('studies.tasks.form.answeredQuestions') }}</td>
          <td> {{answered}} </td>
        </tr>
      </table>
      <div class="row justify-around q-mt-xl">
        <q-btn
          class="mobibtn"
          color="negative"
          :loading="sending"
          :label="$t('common.discard')"
          @click="discard()"
        />
        <q-btn
          class="mobibtn"
          color="primary"
          @click="send()"
          :loading="sending"
          :label="$t('common.send')"
        />
      </div>
    </div>

    <q-inner-loading :showing="isRetrieving">
      <div class="mobitxt2">{{ $t('studies.tasks.form.retrieving') }}</div>
      <q-spinner-oval
        size="50px"
        color="primary"
      />
    </q-inner-loading>

  </q-page>
</template>

<style scoped>
.photoViewer {
  max-width: 80%;
}
.photoBtn {
  margin: 30px;
}
.photoFileInput {
  display: none;
}

.photoFileLabel {
  border: 0px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>

<script>
import phone from 'modules/phone/phone'
import API from 'modules/API/API'
import DB from 'modules/db'
import userinfo from 'modules/userinfo'
import { testPattern } from 'quasar/src/utils/patterns'

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
      timeAnswer: undefined,
      singleChoiceAnswer: undefined,
      singleChoiceAnswerFreeText: undefined,
      multiChoiceAnswer: [],
      multiChoiceAnswerFreeText: [],
      photoAnswer: undefined,

      finished: false,
      currentQuestion: undefined,
      sending: false,
      slideName: '',
      timeRules: [
        val => !val || testPattern.time(val) || this.$t('studies.tasks.form.timeNotValid')
      ],
      report: {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'form',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: new Date(),
          completedTS: undefined,
          asked: undefined,
          answered: undefined
        },
        data: undefined
      }
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
    this.$q.loading.hide()
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
        (this.currentQuestion.type === 'slider' && (this.numberAnswer || this.numberAnswer === 0)) ||
        (this.currentQuestion.type === 'time' && this.timeAnswer) ||
        (this.currentQuestion.type === 'multiChoice' && this.multiChoiceAnswer.length) ||
        (this.currentQuestion.type === 'photo' && this.photoAnswer) ||
        (this.currentQuestion.type === 'textOnly')
    },
    isValidAnswer () {
      return (this.currentQuestion.type === 'singleChoice' && this.singleChoiceAnswer) ||
        (this.currentQuestion.type === 'freetext' && this.freetextAnswer) ||
        (this.currentQuestion.type === 'number' && (!this.numberAnswer || (
          this.numberAnswer >= this.currentQuestion.min && this.numberAnswer <= this.currentQuestion.max))) ||
        (this.currentQuestion.type === 'time' && this.timeAnswer) ||
        (this.currentQuestion.type === 'slider' && (this.numberAnswer || this.numberAnswer === 0)) ||
        (this.currentQuestion.type === 'multiChoice' && this.multiChoiceAnswer.length) ||
        (this.currentQuestion.type === 'photo') ||
        (this.currentQuestion.type === 'textOnly')
    },
    asked () {
      return this.responses.length
    },
    answered () {
      return this.responses.reduce(
        (prev, current) => prev + (current.answer !== undefined),
        0
      )
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
      } else if (this.currentQuestion.type === 'time') {
        answer.answer = this.timeAnswer
      } else if (this.currentQuestion.type === 'slider') {
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
      } else if (this.currentQuestion.type === 'photo') {
        answer.answer = this.photoAnswer
      }

      this.responses.push(answer)

      // reset fields
      this.freetextAnswer = undefined
      this.numberAnswer = undefined
      this.timeAnswer = undefined
      this.multiChoiceAnswer = []
      this.singleChoiceAnswer = undefined
      this.singleChoiceAnswerFreeText = undefined
      this.multiChoiceAnswerFreeText = []
      this.photoAnswer = undefined
      this.$refs.photoViewer.style.display = 'none'

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
      // check for old responses and prefill the answer
      if (this.oldResponses[1] && this.oldResponses[1].questionId === nextQuestionId) {
        if (this.oldResponses[1].answer) {
          // copy the old answer into the current one
          const nextQuestion = this.formDescr.questions.find(x => x.id === nextQuestionId)
          if (nextQuestion.type === 'freetext') {
            this.freetextAnswer = this.oldResponses[1].answer
          } if (nextQuestion.type === 'time') {
            this.timeAnswer = this.oldResponses[1].answer
          } else if (nextQuestion.type === 'number' || nextQuestion.type === 'slider') {
            this.numberAnswer = this.oldResponses[1].answer
          } else if (nextQuestion.type === 'singleChoice') {
            this.singleChoiceAnswer = this.oldResponses[1].answer.answerId
            if (this.oldResponses[1].answer.includeFreeText) {
              this.singleChoiceAnswerFreeText = this.oldResponses[1].answer.freetextAnswer
            }
          } else if (nextQuestion.type === 'multiChoice' && Array.isArray(this.oldResponses[1].answer)) {
            // identify multichoice as array
            this.multiChoiceAnswer = this.oldResponses[1].answer.map(x => x.answerId)
            if (this.oldResponses[1].answer.some(x => x.includeFreeText)) {
              for (let answerID of this.multiChoiceAnswer) {
                let chosenAnswerIndex = nextQuestion.answerChoices.findIndex(x => x.id === answerID)
                let oldResponseIndex = this.oldResponses[1].answer.findIndex(x => x.answerId === answerID)
                this.multiChoiceAnswerFreeText[chosenAnswerIndex] = this.oldResponses[1].answer[oldResponseIndex].freetextAnswer
              }
            }
          } else if (nextQuestion.type === 'photo') {
            this.photoAnswer = this.oldResponses[1].answer
            this.$refs.photoViewer.style.display = 'block'
            this.$refs.photoViewer.src = this.photoAnswer
          }
        }
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
      this.timeAnswer = undefined
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
        } else if (this.currentQuestion.type === 'time') {
          this.timeAnswer = lastResponse.answer
        } else if (this.currentQuestion.type === 'slider') {
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
        } else if (this.currentQuestion.type === 'photo') {
          this.photoAnswer = lastResponse.answer
          this.$refs.photoViewer.style.display = 'block'
          this.$refs.photoViewer.src = lastResponse.answer
        }
      }

      this.oldResponses.unshift(this.responses.pop())

      setTimeout(() => { this.slideName = 'slideInLeft' }, 10)
    },

    photoTaken () {
      var files = this.$refs.photoFile.files

      if (files && files[0]) {
        var reader = new FileReader()

        reader.onload = (e) => {
          // let picture = document.createElement('img')
          // picture.style.maxWidth = '200px'
          // picture.setAttribute('src', e.target.result)
          this.photoAnswer = e.target.result
          this.$refs.photoViewer.style.display = 'block'
          this.$refs.photoViewer.src = e.target.result
        }

        reader.readAsDataURL(files[0])
      }
    },

    clearAnswer () {
      if (this.currentQuestion.type === 'singleChoice') {
        this.singleChoiceAnswer = undefined
        this.singleChoiceAnswerFreeText = undefined
      }
      if (this.currentQuestion.type === 'freetext') this.freetextAnswer = undefined
      if (this.currentQuestion.type === 'number') this.numberAnswer = undefined
      if (this.currentQuestion.type === 'time') this.timeAnswer = undefined
      if (this.currentQuestion.type === 'slider') this.numberAnswer = undefined
      if (this.currentQuestion.type === 'multiChoice') {
        this.multiChoiceAnswer = []
        this.multiChoiceAnswerFreeText = []
      }
      if (this.currentQuestion.type === 'photo') {
        this.photoAnswer = undefined
        this.$refs.photoViewer.style.display = 'none'
      }
    },

    async saveAndLeave () {
      this.report.summary.completedTS = new Date()
      this.report.summary.asked = this.asked
      this.report.summary.answered = this.answered
      this.report.data = this.responses

      try {
        await API.sendTasksResults(this.report)
        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async send () {
      this.sending = true

      this.report.discarded = false

      return this.saveAndLeave()
    },
    async discard () {
      this.sending = true

      // delete data and set flag
      this.report.discarded = true
      delete this.report.summary
      delete this.report.data

      return this.saveAndLeave()
    }
  }
}
</script>
