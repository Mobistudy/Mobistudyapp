<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('tasks.tug.title') }}
    </div>
    <div ref="map" style="width: 100%; height: 50vh;" class="row justify-center items-center">
      <WalkingMan></WalkingMan>
    </div>
    <div class="mobitxt2 text-center q-mb-lg">
      <span v-show="!isStarted">{{ $t('tasks.tug.prepartion') }}</span>
      <span v-show="isStarted">{{ $t('tasks.tug.go') }}</span>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn class="full-width mobibtn" @click="startTest" v-show="!isStarted" color="primary"
        :label="$t('common.start')" />
      <q-btn class="full-width mobibtn" @click="completeTest" v-show="isStarted" color="secondary"
        :label="$t('common.complete')" />
    </div>
    <audio src="sounds/dingbell.wav" ref="dingsound"></audio>
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
import i18nTUG from '@i18n/tasks/tug'
import { mergeDeep } from '@shared/tools'

import phone from '@shared/phone'
import { format as Qformat } from 'quasar'
import WalkingMan from '@components/tasks/smwt/WalkingMan'
import session from '@shared/session'

const TEST_TIMEOUT = 180 // 3 minutes

let orientations = []
let motions = []

export default {
  name: 'TUGPage',
  props: ['studyKey', 'taskId'],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nTUG)
  },
  components: {
    WalkingMan
  },
  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      timer: undefined,
      totalTime: TEST_TIMEOUT,
      startedTS: undefined,
      distance: 0
    }
  },

  methods: {

    async startTest () {
      if (this.isStarted) return

      WalkingMan.methods.play()

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
      const userSession = session.getUserSession()

      const report = {
        userKey: userSession.user.userKey,
        participantKey: userSession.user.participantKey,
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

      // save the report into the session
      session.setTaskReport(report)

      this.$router.replace({ name: 'tugSummary' })
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

  beforeUnmount: function () {
    // orientations = []
    // motions = []

    this.stopTimer()
    WalkingMan.methods.stop()
    phone.screen.allowSleep()
    phone.orientation.stopNotifications()
    phone.motion.stopNotifications()
  }
}
</script>
