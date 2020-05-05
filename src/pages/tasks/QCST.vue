<template>
  <q-page padding>
      <div class="text-center text-h6 q-mt-lg">
        {{ $t('studies.tasks.qcst.title') }}
      </div>

      <p id="timer"> {{ minutes }}:{{ seconds }} </p>
      <div class="row justify-center q-mt-lg">
        <q-btn  @click="toggleTest" v-if="!isStarted" color="secondary" label="Start" :disabled="isCompleted" />
        <q-btn  @click="stopTest" v-if="isStarted" color="purple" label="Complete" />
      </div>
  </q-page>
</template>

<script>
import phone from '../../modules/phone'
import userinfo from '../../modules/userinfo'

const TEST_DURATION = 180

export default {
  name: 'QCSTPage',
  components: {},
  data: function () {
    return {
      loading: false,
      isStarted: false,
      isCompleted: false,
      instruction: true,
      enterHR: false,
      timer: null,
      totalTime: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      steps: 0,
      gender: 'male', // userinfo.user.gender,
      heartRate: '',
      value: '',
      metronome: null,
      cadence: 0
    }
  },
  methods: {
    toggleTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startTest()
      }
    },
    preMatureCompleteTest () {
      this.completeTest()
      this.countDown = null
    },
    completeTest () {
      this.enterHR = false
      this.isStarted = false
      this.isCompleted = true
    },
    startTimer () {
      this.isStarted ? this.timer = setInterval(() => this.countDown(), 1000) : clearInterval(this.timer)
    },
    countDown () {
      if (this.totalTime === 120) {
        phone.media.playSound('/statics/sounds/1-minute.wav')
      } else if (this.totalTime === 60) {
        phone.media.playSound('statics/sounds/2-minutes.wav')
      }
      if (this.totalTime >= 1) {
        this.totalTime--
      } else {
        phone.media.playSound('statics/sounds/time.wav')
        this.measureHR()
      }
    },
    padTime (time) {
      return (time < 10 ? '0' : '') + time
    },
    startTest () {
      this.startedTS = new Date()
      if (phone.pedometer.isAvailable()) {
        if (phone.pedometer.requestPermission()) {
          phone.pedometer.startNotifications({}, async (step) => {
            this.steps++
          })
        }
      }
    },
    stopTest () {
      phone.pedometer.stopNotifications()
      this.completionTS = new Date()
      this.createReport()
    },
    measureHR () {
      this.enterHR = true
      this.isStarted = false
    },
    createReport () {
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
        totalTime: this.totalTime,
        heartRate: undefined,
        borgScale: undefined
      }
      this.$router.push({ name: 'qcsthr', params: { report: report } })
    }
  },

  watch: {
    isStarted () {
      if (this.totalTime === 180) {
        phone.media.playSound('/statics/sounds/begin.wav')
      }
      this.startTimer()
      this.isStarted ? phone.media.playMetro('/statics/sounds/click.wav', this.cadence) : phone.media.stopMetro()
    }
  },
  computed: {
    minutes () {
      return this.padTime(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return this.padTime(this.totalTime - (this.minutes * 60))
    }
  },
  beforeDestroy: function () {
    phone.media.stopMetro()
    clearInterval(this.timer)
    this.stopTest()
  },
  async mounted () {
    if (this.gender === 'female') {
      this.cadence = 681
    } else if (this.gender === 'male') {
      this.cadence = 625
    } else {
      console.log('No gender specified')
    }
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
