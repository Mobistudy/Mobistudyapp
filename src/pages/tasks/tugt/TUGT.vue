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
    <div class="mobitxt2 text-center q-mb-lg">
      <span v-show="!isAfterSound">{{ $t('studies.tasks.tugt.prepartion') }}</span>
      <span v-show="isAfterSound">{{ $t('studies.tasks.tugt.go') }}</span>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        class="full-width mobibtn"
        @click="startTest"
        v-show="!isStarted"
        color="primary"
        :label="$t('common.start')"
      />
      <q-btn
        class="full-width mobibtn"
        @click="completeTest"
        v-show="isStarted"
        color="secondary"
        :label="$t('common.complete')"
      />
    </div>
    <audio
      src="sounds/dingbell.wav"
      ref="dingsound"
    ></audio>
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
import audio from 'modules/audio'

const TEST_TIMEOUT = 180 // 3 minutes

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
      isStarted: false,
      isAfterSound: false,
      isCompleted: false,
      timer: undefined,
      totalTime: TEST_TIMEOUT,
      startedTS: undefined,
      distance: 0
    }
  },

  methods: {

    async startTest () {
      setTimeout(() => {
        audio.media.playSound(this.$refs.dingsound)
        WalkingMan.methods.play()
        this.isAfterSound = true
      }, 5000)

      this.isStarted = true
      this.startedTS = new Date()
      phone.screen.forbidSleep()
      this.startTimer()

      // clean the buffers
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
        console.error('Issues getting OrientationEvent', err)
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
        console.error('Issues getting MotionEvent', err)
      }
    },

    startTimer () {
      this.timerCountDown = TEST_TIMEOUT
      this.timer = setInterval(() => this.countDown(), 1000)
    },
    stopTimer () {
      clearInterval(this.timer)
    },

    countDown () {
      if (this.timerCountDown >= 1) {
        this.timerCountDown--
      } else {
        this.completeTest()
      }
    },

    completeTest () {
      this.isStarted = false
      this.stopTimer()
      phone.orientation.stopNotifications()
      phone.motion.stopNotifications()
      phone.screen.allowSleep()
      WalkingMan.methods.stop()

      this.isCompleted = true

      // package the tugt report
      let report = {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'tugt',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: this.startedTS,
          completedTS: new Date(),
          durationMs: new Date().getTime() - this.startedTS.getTime() // TODO: compute the duration of the test using a better algorithm
        },
        data: {
          motion: motions,
          orientation: orientations
        }
      }

      this.$router.push({ name: 'tugtSummary', params: { report: report } })
    }
  },

  computed: {
    minutes () {
      return Qformat.pad(Math.floor(this.timerCountDown / 60))
    },
    seconds () {
      return Qformat.pad(this.timerCountDown - (this.minutes * 60))
    }
  },

  beforeDestroy: function () {
    orientations = []
    motions = []

    this.stopTimer()
    WalkingMan.methods.stop()
    phone.screen.allowSleep()
    phone.orientation.stopNotifications()
    phone.motion.stopNotifications()
  }
}
</script>
