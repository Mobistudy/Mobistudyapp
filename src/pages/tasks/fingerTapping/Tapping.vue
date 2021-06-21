<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.tapping.title') }}
    </div>

    <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startTest"
        v-if="!isStarted"
        color="primary"
        :label="$t('common.start')"
        padding="lg"
      />
    </div>

    <p class="text-center text-h5 q-mt-lg">Tap the buttons as quickly as you can</p>
<!--    <p class="text-center text-h5 q-mt-lg">Total count</p>-->

    <div>

      <q-btn v-on:click="buttonLeft += 1;counter+=1;">Tap</q-btn>
      <q-btn v-on:click="buttonRight += 1;counter+=1;">Tap</q-btn>
      <div class="text-center text-h5 q-mt-lg">The button has been clicked {{counter}} times </div>
    </div>

    <q-btn
      padding="xl"
      color="black"
      round
      flat
      icon="volume_up"
      class="q-mt-xl"
      ref="metronome_indicator"
      v-if="isStarted"
    />

  </q-page>
</template>

<script>
import phone from 'modules/phone'
import audio from 'modules/audio'
import userinfo from 'modules/userinfo'
import { format as Qformat } from 'quasar'

const TEST_DURATION = 20

export default {
  name: 'TappingPage',
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
      tappingData: [],
      counter: 0,
      buttonLeft: 0,
      buttonRight: 0
    }
  },
  methods: {
    async startTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startedTS = new Date()
        audio.textToSpeech.language = userinfo.user.language
        if (await phone.pedometer.isAvailable()) {
          phone.pedometer.startNotifications({}, (tappingData) => {
            console.log('Got data', tappingData)
            this.tappingData.push(tappingData)
          }, (error) => {
            console.error('Error getting tappingData', error)
          })
        } else {
          console.error('Pedometer not available')
        }
        audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.qcst.begin'))
        this.timer = setInterval(() => {
          if (this.countDown === 120) {
            audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.qcst.twoMin'))
          } else if (this.countDown === 60) {
            audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.qcst.oneMin'))
          }
          if (this.countDown >= 1) {
            this.countDown--
          } else {
            // Test is completed
            this.isStarted = false
            this.completeTest()
          }
        }, 1000)
        audio.metronome.start(this.cadence, this.$refs.metronome_indicator.$el)
      }
    },
    completeTest () {
      audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.qcst.time'))
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
        tappingData: this.tappingData,
        counter: this.counter,
        button1: this.button1,
        button2: this.button2
      }

      this.$router.push({ name: 'tappingfinnish', params: { report: report } })
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
    audio.metronome.stop()
    phone.pedometer.stopNotifications()
  }
}
</script>

<style scoped>
.q-page {
  text-align: center;
}
#timer {
  font-size: 5rem;
  padding: 20px;
}
.q-mt-xl {
  margin-top: 150px;
}
</style>
