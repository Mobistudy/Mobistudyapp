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
      <q-btn
        @click="completeTest"
        v-show="isStarted"
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
import { format as Qformat } from 'quasar'

const TEST_DURATION = 10 // 3 minutes

// let audiofilename = ''

export default {
  name: 'VocalizationPage',
  props: {
    studyKey: String,
    taskId: Number
  },

  data: function () {
    return {
      isSignalCheck: true,
      isStarted: false,
      isCompleted: false,
      timer: undefined,
      totalTime: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined
      // audiofilename: 'filename.wav'
    }
  },

  mounted: async function () {

  },

  methods: {

    async startTest () {
      this.isStarted = true
      this.startedTS = new Date()
      this.startTimer()
      phone.screen.forbidSleep()

      try {
        if (await phone.audioRecorder.isAvailable()) {
          await phone.audioRecorder.requestPermission()
          console.log('Audio recorder is available')
          phone.audioRecorder.startRecording({ folder: 'shared', fileName: 'iii_test.wav' }, null, (err) => { console.error(err) })
        }
      } catch (err) {
        console.error('Issues getting audio', err)
      }
    },

    startTimer () {
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
        this.completeTest()
      }
    },

    completeTest () {
      this.isStarted = false
      this.completionTS = new Date()
      this.stopTimer()
      phone.audioRecorder.stopRecording()
      phone.screen.allowSleep()

      this.isCompleted = true

      // package the vocalization report
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        startedTS: this.startedTS,
        completionTS: this.completionTS
        // audiofilename: this.audiofilename
      }

      this.$router.push({ name: 'vocalizationSummary', params: { report: report } })
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
    phone.orientation.stopNotifications()
    phone.motion.stopNotifications()
  }
}
</script>
