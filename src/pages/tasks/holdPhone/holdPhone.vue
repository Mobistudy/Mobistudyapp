<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.holdPhone.title') }}
    </div>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.holdPhone.instructions') }}
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
import phone from 'modules/phone'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'
const TEST_DURATION = 60 // 1 minute
let orientations = []
let motions = []
export default {
  name: 'HoldPhonePage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {
  },
  data: function () {
    return {
      isSignalCheck: true,
      isStarted: false,
      isCompleted: false,
      timer: undefined,
      totalTime: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      distance: 0
    }
  },
  mounted: async function () {
  },
  methods: {
    async startTest () {
      this.isStarted = true
      this.startedTS = new Date()
      this.startTimer()
      // add sound when starting
      phone.screen.forbidSleep()
      try {
        if (await phone.orientation.isAvailable()) {
          await phone.orientation.requestPermission()
          console.log('OrientationEvent is available')
          phone.orientation.startNotifications({}, (event) => {
            console.log('Got orientation events', event)
            orientations.push(event)
          }, (error) => {
            console.error('Error getting orientation event', error)
          })
        }
      } catch (err) {
        console.error('Issues getting OrientationEvent', err)
      }
      try {
        if (await phone.motion.isAvailable()) {
          await phone.motion.requestPermission()
          console.log('MotionEvent is available')
          phone.motion.startNotifications({}, (event) => {
            console.log('Got motion events', event)
            motions.push(event)
          }, (error) => {
            console.error('Error getting MotionEvent', error)
          })
        }
      } catch (err) {
        console.error('Issues getting MotionEvent', err)
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
      // add sound when test is complete
      // and add vibration from cordova-plugin-vibration
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      phone.screen.allowSleep()
      this.isCompleted = true
      // package the holdPhone report
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        startedTS: this.startedTS,
        completionTS: this.completionTS,
        motion: motions,
        orientation: orientations,
        borgScale: undefined
      }
      this.$router.push({ name: 'holdPhoneSummary', params: { report: report } })
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
