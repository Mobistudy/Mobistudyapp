<template>
  <q-page
    padding
    class="text-center"
  >
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.vocalization.title') }}
    </div>

      <p
        class="text-center text-subtitle1 q-mt-lg"
        v-show="testPhase === 0 || testPhase === 1"
      >
        {{ $t('studies.tasks.vocalization.instructions.AAA') }}
      </p>
      <p
        class="text-center text-subtitle1 q-mt-lg"
        v-show="testPhase === 2 || testPhase === 3"
      >
        {{ $t('studies.tasks.vocalization.instructions.III') }}
      </p>
      <p
        class="text-center text-subtitle1 q-mt-lg"
        v-show="testPhase === 4 || testPhase === 5"
      >
        {{ $t('studies.tasks.vocalization.instructions.UUU') }}
      </p>

    <div class="row justify-around">

      <q-btn
        @click="startTest"
        v-show="!isStarted"
        color="primary"
        :label="$t('common.start')"
      />

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
        @click="completePhase"
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
  line-height: 2;
}
</style>

<script>
import phone from 'modules/phone/phone'
import userinfo from 'modules/userinfo'
import sweeper from 'modules/sweeper'
// import files from 'modules/files'

const TEST_DURATION = 10
const FOLDER = 'shared'

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
      testTS: Date.now(),
      filename: '',
      report: {
        userKey: this.userKey,
        studyKey: this.studyKey,
        taskId: this.taskId,
        summary: {
          phases: []
        },
        attachments: []
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

      phone.screen.forbidSleep()

      this.filename = ((this.testPhase - 1) / 2).toFixed(0) + '_' + this.testTS + '.wav'

      if (this.testPhase === 1) {
        const studyKey = this.studyKey
        const taskId = parseInt(this.taskId)
        const userKey = userinfo.user._key
        this.report.studyKey = studyKey
        this.report.taskId = taskId
        this.report.userKey = userKey

        this.report.createdTS = new Date()
        this.report.startedTS = new Date()
        this.report.summary.phases[0] = {
          vocal: 'a',
          startedTS: new Date(),
          filename: this.filename
        }
      } else if (this.testPhase === 3) {
        this.report.summary.phases[1] = {
          vocal: 'i',
          startedTS: new Date(),
          filename: this.filename
        }
      } else if (this.testPhase === 5) {
        this.report.summary.phases[2] = {
          vocal: 'u',
          startedTS: new Date(),
          filename: this.filename
        }
      }
      try {
        if (await phone.audioRecorder.isAvailable()) {
          await phone.audioRecorder.requestPermission()
          console.log('Audio recorder is available')
          phone.audioRecorder.startRecording({ folder: FOLDER, fileName: this.filename }, null, (err) => { console.error(err) })
          this.report.attachments.push(this.filename)
          this.startTimer()
          sweeper.sweep(10, 10000, 2, 'sine', 1)
        }
      } catch (err) {
        console.error('Issues getting audio', err)
      }

      // this.totalTime = TEST_DURATION
      // this.timer = setInterval(() => this.countDown(), 1000)
    },

    startTimer () {
      this.timer = setTimeout(() => this.completePhase(), TEST_DURATION * 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },

    async redoTest () {
      this.stopTimer()
      phone.audioRecorder.stopRecording()
      // TODO: uncomment when delete is ready
      // await files.delete(this.filename, FOLDER)
      this.report.attachments.pop()
      this.testPhase--
      this.startTest()
    },

    completePhase () {
      this.stopTimer()
      phone.screen.allowSleep()
      this.isCompleted = true
      this.isStarted = false

      console.log(this.report)

      if (this.testPhase === 1) {
        this.report.summary.phases[0].completionTS = new Date()
        phone.audioRecorder.stopRecording()
      } else if (this.testPhase === 3) {
        this.report.summary.phases[1].completionTS = new Date()
        phone.audioRecorder.stopRecording()
      } else if (this.testPhase === 5) {
        this.report.summary.phases[2].completionTS = new Date()
        phone.audioRecorder.stopRecording()
      }

      this.testPhase++

      if (this.testPhase === 6) {
        this.$router.push({ name: 'vocalizationSummary', params: { report: this.report } })
      }
    }
  },

  beforeDestroy: function () {
    this.stopTimer()
    phone.screen.allowSleep()
    phone.audioRecorder.stopRecording()
  }
}
</script>
