<template>
  <q-page padding>
      <div class="text-center text-h6 q-mt-lg">
        {{ $t('studies.tasks.qcst.title') }}
      </div>

      <p id="timer"> {{ minutes }}:{{ seconds }} </p>
      <div class="row justify-center q-mt-lg">
        <q-btn  @click="startTest" v-if="!isStarted" color="secondary" :label="$t('common.start')" />
        <q-btn  @click="completeTest" v-if="isStarted" color="purple" :label="$t('common.complete')" />
      </div>
  </q-page>
</template>

<script>
import phone from '../../modules/phone'
import userinfo from '../../modules/userinfo'
import { format as Qformat } from 'quasar'

const TEST_DURATION = 180

export default {
  name: 'QCSTPage',
  components: {},
  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      timer: null,
      countDown: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      steps: 0,
      gender: 'male', // userinfo.user.gender,
      heartRate: '',
      metronome: null,
      cadence: 625 // userinfo.user.gender === 'male'? 625 : 681
    }
  },
  methods: {
    startTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startedTS = new Date()
        if (phone.pedometer.isAvailable()) {
          phone.pedometer.startNotifications({}, async (step) => {
            this.steps++
          }, (error) => {
            console.error('Error getting steps', error)
          })
          phone.media.playSound('/statics/sounds/begin.wav')

          this.timer = setInterval(() => {
            if (this.countDown === 120) {
              phone.media.playSound('/statics/sounds/1-minute.wav')
            } else if (this.countDown === 60) {
              phone.media.playSound('statics/sounds/2-minutes.wav')
            }
            if (this.countDown >= 1) {
              this.countDown--
            } else {
              // test is completed
              phone.media.playSound('statics/sounds/time.wav')
              this.isStarted = false
              this.completeTest()
            }
          }, 1000)
          phone.media.playMetro('/statics/sounds/click.wav', this.cadence)
        } else {
          // TODO: show a message to the user
          console.error('Pedometer not available')
        }
      }
    },
    completeTest () {
      phone.pedometer.stopNotifications()
      this.completionTS = new Date()
      const studyKey = this.$route.params.studyKey
      const taskID = parseInt(this.$route.params.taskID)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskID,
        createdTS: new Date(),
        startedTS: this.startedTS,
        completionTS: this.completionTS,
        steps: this.steps,
        heartRate: undefined,
        borgScale: undefined
      }
      this.$router.push({ name: 'qcsthr', params: { report: report } })
    }
  },
  computed: {
    minutes () {
      return Qformat.pad(Math.floor(this.countDown / 60), 2)
    },
    seconds () {
      return Qformat.pad(this.countDown - (this.minutes * 60), 2)
    }
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
    phone.media.stopMetro()
    phone.pedometer.stopNotifications()
  }
}
</script>

<style>
#timer {
  font-size: 5rem;
  text-align: center;
  padding: 20px;
}
</style>
