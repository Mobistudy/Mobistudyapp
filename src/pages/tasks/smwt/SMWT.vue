<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.smwt.title') }}
    </div>
    <div
      ref="map"
      style="width: 100%; height: 50vh;"
      class="row justify-center items-center"
    >
      <WalkingMan></WalkingMan>
    </div>
    <div
      v-show="isSignalCheck"
      class="text-subtitle1 text-center "
    >{{ $t('studies.tasks.smwt.signalCheck') }}</div>
    <p
      v-show="!isSignalCheck"
      id="timer"
    > {{ minutes }}:{{ seconds }} </p>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-show="!isStarted"
        color="secondary"
        :label="$t('common.start')"
        :disabled="isSignalCheck"
      />
      <q-btn
        @click="completeTest"
        v-show="isStarted"
        color="purple"
        :label="$t('common.complete')"
      />
    </div>
  </q-page>
</template>

<style scoped>
#timer {
  font-size: 3rem;
  text-align: center;
  padding: 0px;
  margin: 0px;
}

.text-subtitle1 {
  line-height: 4.25;
}
</style>

<script>
import phone from 'modules/phone'
import distanceAlgo from 'modules/outdoorDistance'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'
import WalkingMan from 'components/WalkingMan'

const TEST_DURATION = 360
const SIGNAL_CHECK_TIMEOUT = 60000

export default {
  name: 'SMWTPage',
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
      positions: [],
      steps: [],
      distance: 0
    }
  },
  mounted: async function () {
    distanceAlgo.reset()

    // start signal check
    this.isSignalCheck = true
    let signalCheckStartedTS = new Date()
    try {
      if (await phone.geolocation.isAvailable()) {
        console.log('GPS is available')
        phone.geolocation.startNotifications({
          maximumAge: 5000,
          timeout: 5000,
          enableHighAccuracy: true
        }, async (position) => {
          console.log('Got position: ', position)
          if (this.positions.length === 0) {
            // we are receiving the first position

            // timeout of the signal check
            setTimeout(function () {
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
        console.error('No GPS available')
      }
    } catch (error) {
      console.error('Issues while starting the GPS', error)
    }
  },
  methods: {
    async startTest () {
      this.isStarted = true
      this.startedTS = new Date()
      this.startTimer()
      phone.screen.forbidSleep()
      distanceAlgo.startTest()

      // start the pedometer
      try {
        if (await phone.pedometer.isAvailable()) {
          phone.pedometer.startNotifications({}, (steps) => {
            console.log('Got steps', steps)
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
      phone.pedometer.stopNotifications()
      phone.geolocation.stopNotifications()
      phone.screen.allowSleep()

      this.isCompleted = true
      distanceAlgo.stopTest()

      this.distance = distanceAlgo.getDistance()

      // package the 6mwt report
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
        positions: this.positions,
        steps: this.steps,
        distance: this.distance,
        borgScale: undefined
      }

      this.$router.push({ name: 'smwtSummary', params: { report: report } })
      this.$emit('updateTransition', 'slideInRight')
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
    phone.geolocation.stopNotifications()
    phone.pedometer.stopNotifications()
  }
}
</script>
