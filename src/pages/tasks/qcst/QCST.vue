<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.qcst.title') }}
    </div>

    <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-if="!isStarted"
        color="secondary"
        :label="$t('common.start')"
      />
      <q-btn
        @click="completeTest"
        v-if="isStarted"
        color="purple"
        :label="$t('common.complete')"
      />
    </div>

    <audio ref="sound_begin">
      <source
        src="statics/sounds/begin.wav"
        type="audio/wav"
      />
    </audio>
    <audio ref="sound_minute1">
      <source
        src="statics/sounds/1-minute.wav"
        type="audio/wav"
      />
    </audio>
    <audio ref="sound_minute2">
      <source
        src="statics/sounds/2-minutes.wav"
        type="audio/wav"
      />
    </audio>
    <audio ref="sound_complete">
      <source
        src="statics/sounds/time.wav"
        type="audio/wav"
      />
    </audio>
    <audio ref="sound_click">
      <source
        src="statics/sounds/click.wav"
        type="audio/wav"
      />
    </audio>
  </q-page>
</template>

<script>
import phone from 'modules/phone'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'

const TEST_DURATION = 180

export default {
  name: 'QCSTPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {},
  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      timer: null,
      countDown: TEST_DURATION,
      startedTS: undefined,
      completionTS: undefined,
      steps: [],
      gender: 'male', // userinfo.user.gender,
      heartRate: '',
      metronome: null,
      cadence: 625 // userinfo.user.gender === 'male'? 625 : 681
    }
  },
  methods: {
    async startTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startedTS = new Date()
        if (await phone.pedometer.isAvailable()) {
          phone.pedometer.startNotifications({}, async (step) => {
            console.log('Steps', step)
            this.steps.push(step)
          }, (error) => {
            console.error('Error getting steps', error)
          })
        } else {
          console.error('Pedometer not available')
        }
        this.$refs.sound_begin.play()

        this.timer = setInterval(() => {
          if (this.countDown === 120) {
            if (this.$refs && this.$refs.sound_minute1) this.$refs.sound_minute1.play()
          } else if (this.countDown === 60) {
            if (this.$refs && this.$refs.sound_minute2) this.$refs.sound_minute2.play()
          }
          if (this.countDown >= 1) {
            this.countDown--
          } else {
            // test is completed
            if (this.$refs && this.$refs.sound_complete) this.$refs.sound_complete.play()
            this.isStarted = false
            this.completeTest()
          }
        }, 1000)
        let playAndRepeat = () => {
          this.$refs.sound_click.play()
          if (this.isStarted) {
            setTimeout(playAndRepeat, this.cadence)
          }
        }
        playAndRepeat()
        this.$emit('updateTransition', 'slideInRight')
      }
    },
    completeTest () {
      phone.pedometer.stopNotifications()
      this.completionTS = new Date()
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
    this.isStarted = false
    clearInterval(this.timer)
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
