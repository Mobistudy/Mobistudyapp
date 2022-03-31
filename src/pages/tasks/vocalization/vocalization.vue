<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.vocalization.title') }}
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-show="!isStarted"
        color="primary"
        :label="$t('common.start')"
      />
      <div
        class="text-center text-h5 q-mt-lg"
        v-show="testPhase === 0 || testPhase === 1"
      >
        {{ $t('studies.tasks.vocalization.instructions.AAA') }}
      </div>
      <div
        class="text-center text-h5 q-mt-lg"
        v-show="testPhase === 2 || testPhase === 3"
      >
        {{ $t('studies.tasks.vocalization.instructions.III') }}
      </div>
      <div
        class="text-center text-h5 q-mt-lg"
        v-show="testPhase === 4 || testPhase === 5"
      >
        {{ $t('studies.tasks.vocalization.instructions.UUU') }}
      </div>

      <q-btn
        @click="completePhase"
        v-show="isStarted && testPhase != 5"
        color="secondary"
        :label="$t('common.next')"
      />

      <q-btn
        @click="redoTest"
        v-show="isStarted"
        color="secondary"
        :label="$t('common.redo')"
      />

      <q-btn
        @click="completeTest"
        v-show="testPhase == 5"
        color="secondary"
        :label="$t('common.complete')"
      />
    </div>
  </q-page>
</template>

<style scoped>
#timer {
  font-size: 3rem;
  text-align: center;
}

.text-subtitle1 {
  line-height: 4.25;
}
</style>

<script>
import phone from 'modules/phone/phone'
import userinfo from 'modules/userinfo'
import sweeper from '../../../modules/sweeper'
import { format as Qformat } from 'quasar'

const TEST_DURATION = 10

export default {
  name: 'VocalizationPage',
  props: {
    studyKey: String,
    taskId: Number
  },

  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      timer: undefined,
      totalTime: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      report: {
        userKey: this.userKey,
        studyKey: this.studyKey,
        taskId: this.taskId
      },
      testPhase: 0
    }
  },

  mounted: async function () {
    sweeper.init()
  },

  methods: {

    async startTest () {
      this.testPhase++
      this.isStarted = true
      this.startedTS = new Date()
      phone.screen.forbidSleep()
      sweeper.sweep(10, 10000, 2, 'sine', 1)

      if (this.testPhase === 1) {
        const studyKey = this.studyKey
        const taskId = parseInt(this.taskId)
        const userKey = userinfo.user._key
        this.report.studyKey = studyKey
        this.report.taskId = taskId
        this.report.userKey = userKey

        this.report.createdTS = new Date()
        this.report.startedTS = new Date()
        this.report.aaa = {
          startedTS: new Date()
        }
      } else if (this.testPhase === 3) {
        this.report.iii = {
          startedTS: new Date()
        }
      } else if (this.testPhase === 5) {
        this.report.uuu = {
          startedTS: new Date()
        }
      }
      try {
        if (await phone.audioRecorder.isAvailable()) {
          await phone.audioRecorder.requestPermission()
          console.log('Audio recorder is available')
          phone.audioRecorder.startRecording({ folder: 'shared', fileName: 'iii_test.wav' }, null, (err) => { console.error(err) })
        }
      } catch (err) {
        console.error('Issues getting audio', err)
      }

      this.totalTime = TEST_DURATION
      this.timer = setInterval(() => this.countDown(), 1000)
    },

    stopTimer () {
      clearInterval(this.timer)
    },

    countDown () {
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        this.completePhase()
      }
    },

    redoTest () {
      phone.audioRecorder.stopRecording()
      this.testPhase--
      this.startTest()
    },

    completePhase () {
      this.stopTimer()
      this.completionTS = new Date()
      phone.audioRecorder.stopRecording()
      phone.screen.allowSleep()
      this.isCompleted = true
      this.isStarted = false

      console.log(this.report)

      if (this.testPhase === 1) {
        this.report.aaa.completionTS = new Date()
      } else if (this.testPhase === 3) {
        this.report.iii.completionTS = new Date()
      } else if (this.testPhase === 5) {
        this.report.uuu.completionTS = new Date()
      }

      this.testPhase++

      if (this.testPhase === 7) {
        this.completeTest()
      }
    },

    completeTest () {
      this.$router.push({ name: 'vocalizationSummary', params: { report: this.report } })
    }
  },

  computed: {
    minutes () {
      return Qformat.pad(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return Qformat.pad(this.totalTime - (this.minutes * 60))
    }
  },

  beforeDestroy: function () {
    this.stopTimer()
    phone.screen.allowSleep()
    phone.audioRecorder.stopRecording()
  }
}
</script>
