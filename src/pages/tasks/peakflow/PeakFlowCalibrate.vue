<template>
  <q-page padding>
    <div class="text-center text-h6 q-mt-lg" v-show="!calibrating">
      {{ $t('studies.tasks.peakflow.calibration') }}
    </div>

    <div class="text-center q-mt-lg">
      <span v-show="!isCalibrated && !calibrating">
        {{ $t('studies.tasks.peakflow.calibrationStart') }}
      </span>
      <span v-if="isCalibrated">
        {{ $t('studies.tasks.peakflow.calibrationSuccess') }}
      </span>
      <span v-if="calibrateAttempts>0 & !isCalibrated & !calibrating">
        {{ $t('studies.tasks.peakflow.calibrationError') }}
      </span>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startCalibration"
        v-show="!isCalibrated & !calibrating"
        color="primary"
        :label="$t('common.start')"
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
import peakflow from 'modules/peakflow'

export default {
  name: 'PeakFlowCalibratePage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {},
  data: function () {
    return {
      isCompleted: false,
      isCalibrated: false,
      calibrating: false,
      calibrateAttempts: 0,
      maxTime: 30000
    }
  },
  methods: {
    async startCalibration () {
      if (!this.isCalibrated) {
        this.calibrateAttempts++
        this.calibrating = true
        try {
          this.isCalibrated = await peakflow.startCalibration(this.maxTime)
          this.calibrating = false
          if (this.isCalibrated) this.$router.push({ name: 'peakFlow', params: { studyKey: this.studyKey, taskId: parseInt(this.taskId) } })
        } catch (err) {
          console.error('Error in calibration', err)
          this.calibrating = false
        }
      }
    }
  },

  beforeDestroy: function () {
    peakflow.stopCalibration()
  }
}
</script>
