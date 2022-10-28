<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-center text-h5 q-mt-lg">
        {{ $t('studies.tasks.peakflow.summary') }}
      </div>
      <div class="text-center mobitxt2 q-my-lg">
        <p
          v-for="(reading, index) in PEFs"
          :data="reading"
          :key="'pef' + index"
        >
          {{index+1}}) {{ reading }} L/min
        </p>
      </div>
      <div class="text-bold mobitxt1 q-my-lg">
        {{ $t('studies.tasks.peakflow.todayBest') }} {{pefMax}} L/min
      </div>
    </div>
    <div class="row justify-around q-mt-lg">
      <q-btn
        class="mobibtn"
        color="negative"
        :loading="sending"
        :label="$t('common.discard')"
        @click="discard()"
      />
      <q-btn
        class="mobibtn"
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
    console.log(this.report)
    return {
      PEFs: this.report.data.PEFs,
      pefMax: this.report.summary.pefMax,
      sending: false
    }
  },
  methods: {
    async saveAndLeave () {
      // Save the data to server
      try {
        await API.sendTasksResults(this.report)
        await DB.setTaskCompletion(this.report.studyKey, this.report.taskId, new Date())
        this.sending = false
        this.$router.push('/home')
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
    async send () {
      this.sending = true

      this.report.discarded = false

      return this.saveAndLeave()
    },
    async discard () {
      this.sending = true

      // delete data and set flag
      this.report.discarded = true
      delete this.report.summary
      delete this.report.data

      return this.saveAndLeave()
    }
  }
}
</script>
