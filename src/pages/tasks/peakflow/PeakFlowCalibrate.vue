<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg">
      {{ $t('studies.tasks.peakflow.calibrate') }}
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="text-h6" v-if="isCalibrated">
        {{ $t('studies.tasks.peakflow.calibrateSuccess') }}
      </div>
      <div class="text-h6" v-if="calibrateAttempts>0 & !isCalibrated & !calibrating">
        {{ $t('studies.tasks.peakflow.calibrateError') }}
      </div>
    </div>
      <!-- <div class=" text-h6" v-if="isStarted">
        {{ $t('studies.tasks.peakflow.calibrating') }}
      </div> -->
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startCalibration"
        v-if="!isCalibrated & !calibrating"
        color="secondary"
        :label="$t('studies.tasks.peakflow.calibrate')"
        padding="lg"
      />
      <q-btn
        @click="completeTest"
        v-if="isCalibrated"
        color="purple"
        :label="$t('common.complete')"
        padding="lg"
      />
    </div>
    <q-inner-loading :showing="calibrating">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.peakflow.calibrating')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
// import phone from 'modules/phone'
import peakflow from 'modules/peakflow'
import audio from 'modules/audio'
// import userinfo from 'modules/userinfo'
// import { format as Qformat } from 'quasar'

export default {
  name: 'PeakFlowCalibratePage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {},
  data: function () {
    return {
      isStarted: false,
      isCompleted: false,
      isCalibrated: false,
      calibrating: false,
      calibrateAttempts: 0,
      maxCalibrateAttempts: 1,
      maxTime: 10000
    }
  },
  methods: {
    async startCalibration () {
      this.isStarted = true
      if (!this.isCalibrated) {
        this.calibrateAttempts++
        this.calibrating = true
        try {
          this.isCalibrated = await peakflow.startCalibration(this.maxTime)
          console.log('Calibrating Peak Flow')
          audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.peakflow.calibrateSuccess'))
          this.calibrating = false
        } catch (err) {
          console.error('Error in calibration', err)
          audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.peakflow.calibrateError'))
          this.isCalibrated = false
          this.calibrating = false
        }
      }
    },
    completeTest () {
      // audio.textToSpeech.playVoice(this.$i18n.t('studies.tasks.peakflow.calibrateSuccess'))
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)

      this.$router.push({ name: 'peakflow', params: { studyKey: studyKey, taskId: taskId } })
    }
  }
}
</script>
