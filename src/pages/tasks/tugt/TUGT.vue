<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.tugt.title') }}
    </div>
    <div
      ref="map"
      style="width: 100%; height: 50vh;"
      class="row justify-center items-center"
    >
      <WalkingMan></WalkingMan>
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
import WalkingMan from 'components/WalkingMan'

const TEST_DURATION = 180 // 3 minutes

let orientations = []
let motions = []

export default {
  name: 'TUGTPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {
    WalkingMan
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
      WalkingMan.methods.play()
    },
    stopTimer () {
      clearInterval(this.timer)
      WalkingMan.methods.stop()
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
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      phone.screen.allowSleep()

      this.isCompleted = true

      // package the tugt report
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
        orientation: orientations
      }

      this.$router.push({ name: 'tugtSummary', params: { report: report } })
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
