<template>
  <q-page padding>
    <div
      class="text-center text-h5 q-mt-lg"
      v-show="!calibrating"
    >
      {{ $t('studies.tasks.peakflow.calibration') }}
    </div>

    <div class="text-center mobitxt2 q-mt-lg">
      <div v-show="!calibrating">
        <img
          src="instructions/peakflow_3.svg"
          style="max-width: 50%"
        >
      </div>
      <p v-show="!calibrationError && !calibrating">
        {{ $t('studies.tasks.peakflow.calibrationStart') }}
      </p>
      <p v-if="calibrationError">
        {{ $t('studies.tasks.peakflow.calibrationError') }}
      </p>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        class="full-width mobibtn"
        @click="startCalibration"
        v-show="!calibrating"
        color="primary"
        :label="$t('common.start')"
      />
    </div>
    <q-inner-loading :showing="calibrating">
      <div
        class="mobitxt2"
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
import peakflow from 'modules/peakflow/peakflow'

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
      calibrationError: false,
      calibrating: false,
      calibrateAttempts: 0,
      maxTime: 30000
    }
  },
  methods: {
    async startCalibration () {
      this.calibrateAttempts++
      this.calibrating = true
      this.calibrationError = false
      try {
        await peakflow.startCalibration(this.maxTime)
        this.calibrating = false
        this.$router.push({ name: 'peakFlow', params: { studyKey: this.studyKey, taskId: parseInt(this.taskId) } })
      } catch (err) {
        console.error('Error in calibration', err)
        this.calibrationError = true
        this.calibrating = false
      }
    }
  },

  beforeDestroy: function () {
    peakflow.stopCalibration()
  }
}
</script>
