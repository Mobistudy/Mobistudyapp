<template>
  <q-page
    padding
    class="text-center"
  >
    <div class="text-center text-h5 q-my-lg">
      {{ $t('studies.tasks.qcst.title') }}
    </div>

    <p id="timer"> {{ minutes }}:{{ seconds }} </p>
    <q-btn
      padding="xl"
      color="black"
      round
      flat
      icon="volume_up"
      class="q-mt-xl"
      ref="metronome_indicator"
      :disabled="!isStarted"
    />
    <div class="row justify-center q-mt-xl">
      <q-btn
        class="full-width mobibtn"
        @click="startTest"
        v-if="!isStarted"
        color="primary"
        :label="$t('common.start')"
      />
      <q-btn
        class="full-width mobibtn"
        @click="completeTest"
        v-if="isStarted"
        color="negative"
        :label="$t('common.complete')"
      />
    </div>

  </q-page>
</template>

<style scoped>
#timer {
  font-size: 3rem;
}
.q-mt-xl {
  margin-top: 150px;
}
</style>

<script>
import phone from 'modules/phone/phone'
import audio from 'modules/audio'
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
      steps: [],
      gender: userinfo.user.gender,
      heartRate: '',
      cadence: userinfo.user.gender === 'male' ? 625 : 681
    }
  },
  methods: {
    async startTest () {
      if (!this.isStarted) {
        this.isStarted = true
        this.startedTS = new Date()
        audio.textToSpeech.language = userinfo.user.language
        if (await phone.pedometer.isAvailable()) {
          phone.pedometer.startNotifications({}, (steps) => {
            console.log('Got steps', steps)
            this.steps.push(steps)
          }, (error) => {
            console.error('Error getting steps', error)
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
      let report = {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'qcst',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: this.startedTS,
          completedTS: new Date(),
          dataType: this.taskDescr.dataType,
          length: this.healthData.length,
          steps: this.steps[this.steps.length - 1],
          heartRate: undefined,
          borgScale: undefined
        },
        data: {
          steps: this.steps
        }
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
    audio.metronome.stop()
    phone.pedometer.stopNotifications()
  }
}
</script>
