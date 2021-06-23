<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-center text-h6 q-mt-lg">
        {{ $t('studies.tasks.peakflow.summary') }}
      </div>
      <div class="text-center q-my-lg">
      <p
        v-for="(reading, index) in PEFs"
        :data="reading"
        :key="'pef' + index"
      >
        {{index+1}}) {{ reading }} L/min
      </p>
    </div>
      <div class="text-bold q-my-lg">
        {{ $t('studies.tasks.peakflow.todayBest') }} {{pefMax}} L/min
      </div>
    </div>
    <div class="row justify-around q-mt-lg">
        <q-btn
          color="secondary"
          :loading="sending"
          :label="$t('common.discard')"
          @click="discard()"
        />
        <q-btn
          color="primary"
          :loading="sending"
          :label="$t('common.send')"
          @click="send()"
        />
    </div>
  </q-page>
</template>

<script>
import API from 'modules/API/API'
import DB from 'modules/db'

export default {
  name: 'PeakFlowSummaryPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      PEFs: this.report.PEFs,
      pefMax: this.report.pefMax,
      sending: false
    }
  },
  methods: {
    async send () {
      this.sending = true
      // Save the data to server
      try {
        await API.sendPeakFlow(this.report)
        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        await DB.addPastPeakFlowMeas({
          pefMax: this.report.pefMax,
          createdTS: this.report.createdTS
        })
        this.$router.push({ name: 'peakFlowReview', params: { report: this.report } })
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async discard () {
      this.sending = true
      try {
        this.report.PEFs = 'discarded'
        this.report.pefMax = 'discarded'
        await API.sendPeakFlow(this.report)
        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
