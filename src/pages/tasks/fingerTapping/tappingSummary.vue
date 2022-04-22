<template>
  <q-page padding>
    <div class="text-center text-h5 q-mt-lg text-center">
      {{ $t('studies.tasks.fingerTapping.completed') }}
    </div>
    <p class="text-center q-mt-lg text-center">
      {{ $t('studies.tasks.fingerTapping.summary', { count: report.summary.tappingCount, sec: 20} ) }}
    </p>
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
  name: 'FingerTappingSummaryPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      sending: false
    }
  },
  methods: {
    async send () {
      this.sending = true

      this.report.discarded = false

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
    },
    async discard () {
      this.sending = true

      // delete data and set flag
      this.report.discarded = true
      delete this.report.summary
      delete this.report.data

      try {
        await API.sendFingerTappingData(this.report)
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
