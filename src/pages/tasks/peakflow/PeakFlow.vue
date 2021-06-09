<template>
  <q-page padding>
    <div class="text-center text-h6 q-mt-lg">
      {{ $t('studies.tasks.peakflow.measurement') }}
    </div>
    <div class="text-center q-mt-lg">
      <span v-show="!isMeasuring && testAttempts==0">
        {{ $t('studies.tasks.peakflow.measurementStart') }}
      </span>
      <span v-show="isMeasuring">
        {{ $t('studies.tasks.peakflow.measurementInstructions') }}
      </span>
      <span v-show="!isMeasuring && testAttempts==1">
        {{ $t('studies.tasks.peakflow.measurementCompleted1') }}
      </span>
      <span v-show="!isMeasuring && testAttempts==2">
        {{ $t('studies.tasks.peakflow.measurementCompleted2') }}
      </span>
      <span v-show="!isMeasuring && testAttempts==3">
        {{ $t('studies.tasks.peakflow.measurementCompleted3') }}
      </span>
    </div>
    <div class="text-center text-h6 q-mt-lg" v-if="testAttempts>0">
      <p
        v-for="(reading, index) in PEFs"
        :data="reading"
        :key="'pef' + index"
      >
        {{index+1}}) {{ reading }} L/min
      </p>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startMeasurement"
        v-show="isMeasuring || (testAttempts <= maxTestAttempts)"
        color="primary"
        :disable="isMeasuring"
        :label="$t('common.start')"
      />
      <q-btn
        @click="completeTest"
        v-show="testAttempts > maxTestAttempts && !isMeasuring"
        color="primary"
        :label="$t('common.next')"
      />
    </div>

  </q-page>
</template>

<script>
import peakflow from 'modules/peakflow'
import userinfo from 'modules/userinfo'

export default {
  name: 'PeakFlowPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  components: {},
  data: function () {
    return {
      isCompleted: false,
      isMeasuring: false,
      testAttempts: 0,
      maxTestAttempts: 2,
      measurement: undefined,
      PEFs: []
    }
  },
  methods: {
    async startMeasurement () {
      if (this.testAttempts <= this.maxTestAttempts) {
        this.isMeasuring = true
        this.testAttempts++
        this.measurement = await peakflow.startMeasurement()
        this.PEFs.push(this.measurement.pef)
        this.isMeasuring = false
      }
      await peakflow.stopMeasurement()
    },
    completeTest () {
      const studyKey = this.studyKey
      const taskId = parseInt(this.taskId)
      const userKey = userinfo.user._key
      let report = {
        userKey: userKey,
        studyKey: studyKey,
        taskId: taskId,
        createdTS: new Date(),
        PEFs: this.PEFs,
        pefMax: Math.max(...this.PEFs)
      }

      this.$router.push({ name: 'peakFlowSummary', params: { report: report } })
    }
  },

  beforeDestroy: function () {
    peakflow.stopMeasurement()
  }
}
</script>
