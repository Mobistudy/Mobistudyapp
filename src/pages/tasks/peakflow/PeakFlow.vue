<template>
  <q-page padding>
    <div class="text-center text-h6 q-mt-lg">
      {{ $t('studies.tasks.peakflow.measurement') }}
    </div>
    <div class="text-center q-mt-lg">
      <div v-show="!isMeasuring && !(testErrors > maxErrors) && completedTests==0">
        <div>
          <img src="instructions/peakflow_3.svg" style="max-width: 50%">
        </div>
        <p>
          {{ $t('studies.tasks.peakflow.measurementStart') }}
        </p>
      </div>
      <div v-show="isMeasuring">
        <div>
          <img src="instructions/peakflow_4.svg" style="max-width: 50%">
        </div>
        <p>
          {{ $t('studies.tasks.peakflow.measurementInstructions') }}
        </p>
      </div>
      <div class="text-center text-h6 q-mt-lg"
        v-show="!isMeasuring && (completedTests>0) && !(testErrors > maxErrors)"
        style="min-height: 236px"
      >
        <p
          v-for="(reading, index) in PEFs"
          :data="reading"
          :key="'pef' + index"
        >
          {{index+1}}) {{ reading }} L/min
        </p>
      </div>
      <p v-show="!isMeasuring && !(testErrors > maxErrors) && completedTests==1">
        {{ $t('studies.tasks.peakflow.measurementCompleted1') }}
      </p>
      <p v-show="!isMeasuring && !(testErrors > maxErrors) && completedTests==2">
        {{ $t('studies.tasks.peakflow.measurementCompleted2') }}
      </p>
      <p v-show="!isMeasuring && !(testErrors > maxErrors) && completedTests==3">
        {{ $t('studies.tasks.peakflow.measurementCompleted3') }}
      </p>
      <p v-show="testErrors > maxErrors" class="text-weight-bold text-negative q-pa-md">
        {{ $t('studies.tasks.peakflow.measurementErrorMaxRetries') }}
      </p>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="startMeasurement"
        v-show="!(testErrors > maxErrors) && (isMeasuring || (completedTests <= totalTestsNumber))"
        color="primary"
        :disable="isMeasuring"
        :label="$t('common.start')"
      />
      <q-btn
        @click="completeTest"
        v-show="completedTests > totalTestsNumber && !isMeasuring"
        color="primary"
        :label="$t('common.next')"
      />
      <q-btn
        @click="abandonTest"
        v-show="testErrors > maxErrors"
        color="primary"
        :label="$t('common.next')"
      />
    </div>

  </q-page>
</template>

<script>
import peakflow from 'modules/peakflow/peakflow'
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
      completedTests: 0,
      totalTestsNumber: 2,
      testErrors: 0,
      maxErrors: 4,
      measurement: undefined,
      PEFs: []
    }
  },
  methods: {
    async startMeasurement () {
      if (this.completedTests <= this.totalTestsNumber) {
        this.isMeasuring = true
        try {
          this.measurement = await peakflow.startMeasurement()
          if (this.measurement.pef > 1000) throw new Error('PEF is too high')
          this.completedTests++
          this.PEFs.push(this.measurement.pef)
        } catch (err) {
          this.testErrors++
          console.error(err)
          this.$q.notify({
            color: 'negative',
            message: this.$t('studies.tasks.peakflow.measurementError'),
            icon: 'report_problem'
          })
        }
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
    },
    abandonTest () {
      this.$router.push({ name: 'tasker' })
    }
  },

  beforeDestroy: function () {
    peakflow.stopMeasurement()
  }
}
</script>
