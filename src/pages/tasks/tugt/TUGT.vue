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
import phone from 'modules/phone'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'
import WalkingMan from 'components/WalkingMan'

const TEST_DURATION = 180

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
    // Events that are running always
    if (window.DeviceMotionEvent) {
      console.log('devicemotion was defined')
    }

    if (window.DeviceOrientationEvent) {
      console.log('GyroScope was defined')
    }
  },

  methods: {

    // motionHandler (event) {
    //   console.log(event.acceleration.x + event.acceleration.y + event.acceleration.z + ' m/s2')
    //   // this.x = event.acceleration.x | 0
    //   // this.y = event.acceleration.y | 0
    //   // this.z = event.acceleration.z | 0
    //
    //   // Acceleration has three axes
    //   this.motion.push(this.x = event.acceleration.x | 0)
    //   this.motion.push(this.y = event.acceleration.y | 0)
    //   this.motion.push(this.z = event.acceleration.z | 0)
    //   // this.countDown();
    // },
    //
    // orientationHandler (event) {
    //   console.log('Orientation: ' + event.alpha + event.gamma + event.beta)
    //   // this.alpha = event.alpha
    //   // this.gamma = event.gamma
    //   // this.beta = event.beta
    //
    //   // Acceleration has three axes
    //   this.orientation.push(this.alpha = event.alpha)
    //   this.orientation.push(this.gamma = event.gamma)
    //   this.orientation.push(this.beta = event.beta)
    //
    //   console.log('orientation data: ' + this.orientation)
    // },

    async startTest () {
      this.isStarted = true
      this.startedTS = new Date()
      this.startTimer()
      phone.screen.forbidSleep()

      // window.addEventListener('devicemotion', this.motionHandler, false)
      // window.addEventListener('deviceorientation', this.orientationHandler, false)

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
      // window.removeEventListener('devicemotion', this.motionHandler)
      // window.removeEventListener('deviceorientation', this.orientationHandler)
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
        orientation: orientations,
        borgScale: undefined
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
