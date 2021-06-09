<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-center q-mt-lg">
      <p
        v-for="(reading, index) in PEFs"
        :data="reading"
        :key="'pef' + index"
      >
        {{index+1}}) {{ reading }} L/min
      </p>
    </div>
      <div class="text-bold">
        {{ $t('studies.tasks.peakflow.todayBest') }} {{pefMax}} L/min
      </div>
      <q-btn
        color="primary"
        @click="send()"
        :label="$t('common.send')"
        :disabled="!pefMax"
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
      pefMax: this.report.pefMax
    }
  },
  methods: {
    async send () {
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
        this.$q.loading.hide()
        this.$router.push({ name: 'peakFlowReview', params: { report: this.report } })
      } catch (error) {
        this.$q.loading.hide()
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
