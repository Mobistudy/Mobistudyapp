<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.holdPhone.title') }}
    </div>
    <div class="text-center text-h5 q-mt-lg" v-show="completedHand === 0">
      {{ $t('studies.tasks.holdPhone.instructions') }}
    </div>
    <div class="text-center text-h5 q-mt-lg" v-show="isStartedRight">
      {{ $t('studies.tasks.holdPhone.afterStartRightH') }}
    </div>
    <div class="text-center text-h5 q-mt-lg" v-show="isCompletedRight && !isStartedLeft">
      {{ $t('studies.tasks.holdPhone.leftHand') }}
    </div>
    <div class="text-center text-h5 q-mt-lg" v-show="isStartedLeft">
      {{ $t('studies.tasks.holdPhone.afterStartLeftH') }}
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-show="!isStartedRight || completedHand <= 2"
        color="primary"
        :disable="isStartedRight || isStartedLeft"
        :label="$t('common.start')"
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
const TEST_DURATION = 5 // 10 sec

// let orientations = []
// let motions = []

let leftHand = {
  orientations: [],
  motions: []
}
let rightHand = {
  orientations: [],
  motions: []
}

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
      isStartedRight: false,
      isStartedLeft: false,
      isCompletedRight: false,
      isCompletedLeft: false,
      isCompleted: false,
      timer: undefined,
      rightHandTime: TEST_DURATION,
      leftHandTime: TEST_DURATION,
      totalTime: this.rightHandTime + this.leftHandTime,
      startedTS: undefined,
      completionTS: undefined,
      completedHand: 0
    }
  },
  mounted: async function () {
  },
  methods: {

    async startTest () {
      this.completedHand++
      if (this.completedHand <= 1) {
        this.isStartedRight = true
        this.startTimerRight()
        this.startedTS = new Date()
        // add sound when starting
        phone.screen.forbidSleep()
        try {
          if (await phone.orientation.isAvailable()) {
            await phone.orientation.requestPermission()
            console.log('OrientationEvent is available')
            phone.orientation.startNotifications({}, (event) => {
              console.log('Got orientation events', event)
              rightHand.orientations.push(event)
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
              rightHand.motions.push(event)
            }, (error) => {
              console.error('Error getting MotionEvent', error)
            })
          }
        } catch (err) {
          console.error('Issues getting MotionEvent', err)
        }
      }

      if (this.completedHand === 2) {
        console.log('lefthandStart')
        this.isStartedLeft = true
        // this.startedTS = new Date()
        this.startTimerLeft()
        // add sound when starting
        phone.screen.forbidSleep()
        try {
          if (await phone.orientation.isAvailable()) {
            await phone.orientation.requestPermission()
            console.log('OrientationEvent is available')
            phone.orientation.startNotifications({}, (event) => {
              console.log('Got orientation events', event)
              leftHand.orientations.push(event)
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
              leftHand.motions.push(event)
            }, (error) => {
              console.error('Error getting MotionEvent', error)
            })
          }
        } catch (err) {
          console.error('Issues getting MotionEvent', err)
        }
        console.log('leftHandFinish')
      }
    },

    startTimerRight () {
      this.rightHandTime = TEST_DURATION
      this.timerRight = setInterval(() => this.countDownRight(), 1000)
    },
    startTimerLeft () {
      this.leftHandTime = TEST_DURATION
      // this.totalTime = TEST_DURATION
      this.timerLeft = setInterval(() => this.countDownLeft(), 1000)
    },
    stopTimer () {
      clearInterval(this.timerRight)
      clearInterval(this.timerLeft)
    },
    countDownRight () {
      if (this.rightHandTime) {
        this.rightHandTime--
      } else {
        this.completeRightHand()
      }
    },
    countDownLeft () {
      if (this.leftHandTime) {
        this.leftHandTime--
      } else {
        this.completeTest()
      }
    },
    completeRightHand () {
      this.isStartedRight = false
      // this.completionTS = new Date()
      this.stopTimer()
      phone.vibrate(3)
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      this.isCompletedRight = true
    },
    completeTest () {
      this.isStartedRight = false
      this.isStartedLeft = false
      this.completionTS = new Date()
      this.stopTimer()
      phone.vibrate(3)
      // add sound when test is complete
      // and add vibration from cordova-plugin-vibration
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      phone.screen.allowSleep()
      this.isCompletedLeft = true
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
        leftHand: leftHand,
        rightHand: rightHand,
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
