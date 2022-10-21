<template>
  <q-page padding>
    <div class="text-center text-h5 q-my-lg text-center">
      {{ $t('studies.tasks.drawing.completed') }}
    </div>
    <table class="summaryTable q-my-lg">
      <tr>
        <td>{{ $t('studies.tasks.drawing.results') + $t('studies.tasks.drawing.shapeSquare') }}</td>
        <td> {{this.report.summary.totalVariabilitySquare.toFixed(2)}} </td>
      </tr>
      <tr>
        <td>{{ $t('studies.tasks.drawing.results') + $t('studies.tasks.drawing.shapeSpiral') }}</td>
        <td> {{this.report.summary.totalVariabilitySpiral.toFixed(2)}} </td>
      </tr>
    </table>
    <div class="row justify-around q-mt-xl">
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
  name: 'DrawingSummaryPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      sending: false
    }
  },
  methods: {
    async saveAndLeave () {
      try {
        await API.sendTasksResults(this.report)
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
      console.log(this.report)
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
