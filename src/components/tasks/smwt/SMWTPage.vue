<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('tasks.smwt.title') }}
    </div>
    <div ref="map" style="width: 100%; height: 50vh;" class="row justify-center items-center">
      <WalkingMan></WalkingMan>
    </div>
    <div v-show="isSignalCheck" class="text-subtitle1 text-center ">{{ $t('tasks.smwt.signalCheck') }}</div>
    <p v-show="!isSignalCheck" id="timer"> {{ minutes }}:{{ seconds }} </p>
    <div class="row justify-center q-mt-lg">
      <q-btn class="full-width mobibtn" @click="startTest" v-show="!isStarted" color="primary"
        :label="$t('common.start')" :disabled="isSignalCheck" />
      <q-btn class="full-width mobibtn" @click="completeTest" v-show="isStarted" color="negative"
        :label="$t('common.complete')" />
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
import i18nCommon from '@i18n/common'
import i18nSMWT from '@i18n/tasks/smwt'
import { mergeDeep } from '@shared/tools'

import phone from '@shared/phone'
import distanceAlgo from '@shared/outdoorDistance'
import session from '@shared/session'
import { format as Qformat } from 'quasar'
import WalkingMan from '@components/tasks/smwt/WalkingMan'

const TEST_DURATION = 360
const SIGNAL_CHECK_TIMEOUT = 60000

let orientations = []
let motions = []

export default {
  name: 'SMWTPage',
  props: ['studyKey', 'taskId'],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nSMWT)
  },
  components: {
    WalkingMan
  },
  data: function () {
    return {
      isSignalCheck: true,
      isStarted: false,
      timer: undefined,
      totalTime: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      positions: [],
      steps: [],
      distance: 0
    }
  },
  mounted: async function () {
    distanceAlgo.reset()

    // start signal check
    this.isSignalCheck = true
    const signalCheckStartedTS = new Date()
    try {
      if (await phone.geolocation.isAvailable()) {
        console.log('GPS is available')
        phone.geolocation.startNotifications({
          maximumAge: 5000,
          timeout: 1000,
          enableHighAccuracy: true
        }, async (position) => {
          console.log('Got position: ', position)
          if (this.positions.length === 0) {
            // we are receiving the first position

            // timeout of the signal check
            setTimeout(() => {
              this.isSignalCheck = false
            }, SIGNAL_CHECK_TIMEOUT)
          }

          this.positions.push(position)
          if (this.steps.length !== 0) {
            position.steps = this.steps[this.steps.length - 1].steps
          }
          distanceAlgo.addPosition(position)

          if (this.isSignalCheck) {
            // start if the signal is OK or after timeout
            if (distanceAlgo.isSignalOK() || ((new Date() - signalCheckStartedTS) >= SIGNAL_CHECK_TIMEOUT)) {
              // start the next phase
              this.isSignalCheck = false
            }
          }
        }, (err) => {
          console.error('Cannot retrieve GPS position', err)
        })
      } else {
        // NO GPS AVAILABLE
        // TODO: show error and go back
        console.error('No GPS available')
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.noGpsError'),
          icon: 'report_problem'
        })
      }
    } catch (error) {
      // TODO: show error and go back
      console.error('Issues while starting the GPS', error)
      this.$q.notify({
        color: 'negative',
        message: this.$t('errors.gpsError') + ' ' + error.message,
        icon: 'report_problem'
      })
    }
  },
  methods: {
    async startTest () {
      this.isStarted = true
      this.startedTS = new Date()
      this.startTimer()
      phone.screen.forbidSleep()
      distanceAlgo.startTest()

      // start the inertial sensors
      orientations = []
      motions = []

      try {
        if (await phone.orientation.isAvailable()) {
          await phone.orientation.requestPermission()
          phone.orientation.startNotifications({}, (event) => {
            orientations.push(event)
          }, (error) => {
            console.error('Error getting orientation event', error)
          })
        }
      } catch (err) {
        console.error('Error getting orientation event', err)
      }

      try {
        if (await phone.motion.isAvailable()) {
          await phone.motion.requestPermission()
          phone.motion.startNotifications({}, (event) => {
            motions.push(event)
          }, (error) => {
            console.error('Error getting MotionEvent', error)
          })
        }
      } catch (err) {
        console.error('Error getting motion event', err)
      }

      try {
        if (await phone.pedometer.isAvailable()) {
          phone.pedometer.startNotifications({}, (steps) => {
            this.steps.push(steps)
          }, (error) => {
            console.error('Error getting steps', error)
          })
        }
      } catch (err) {
        console.error('Cannot instantiate pedometer', err)
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
      phone.pedometer.stopNotifications()
      phone.geolocation.stopNotifications()
      phone.screen.allowSleep()

      distanceAlgo.stopTest()

      this.distance = distanceAlgo.getDistance()

      const userSession = session.getUserSession()

      const totSteps = this.steps.length > 0 ? this.steps[this.steps.length - 1].numberOfSteps : undefined

      // package the 6mwt report
      const report = {
        userKey: userSession.user.userKey,
        participantKey: userSession.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'smwt',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: this.startedTS,
          completedTS: this.completionTS,
          distance: this.distance,
          steps: totSteps,
          borgScale: undefined
        },
        data: {
          positions: this.positions,
          steps: this.steps,
          inertial: {
            motion: motions,
            orientation: orientations
          }
        }
      }

      // save the report into the session
      session.setTaskReport(report)

      this.$router.replace({ name: 'smwtSummary' })
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

  beforeUnmount: function () {
    this.stopTimer()
    phone.orientation.stopNotifications()
    phone.motion.stopNotifications()
    phone.pedometer.stopNotifications()
    phone.screen.allowSleep()
    phone.geolocation.stopNotifications()
  }
}
</script>
