<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.taskCompleted') }}</div>
      <q-btn
        color="primary"
        @click="send()"
        :label="$t('common.send')"
      />
    </div>

  </q-page>
</template>

<style>
.decoratedTable {
  background: #f8f8f8;
  padding: 4px;
  width: 70%;
  margin: 0px auto;
  font-size: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
import API from 'modules/API/API'
import DB from 'modules/db'
// import fileSystem from 'modules/files'
import { format as Qformat } from 'quasar'

export default {
  name: 'GPSSummaryPage',
  props: {
    report: Object
  },
  methods: {
    async send () {
      this.$q.loading.show()

      // Save the data to server
      try {
        await API.sendGPSData(this.report)
        await DB.setTaskCompletion(this.report.studyKey, this.report.taskId, new Date())
        this.$q.loading.hide()
        this.$router.push('/home')
      } catch (error) {
        this.$q.loading.hide()
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    }
  },
  computed: {
    totalTime () {
      return Math.floor((this.report.completionTS - this.report.startedTS) / 1000)
    },
    minutes () {
      return Qformat.pad(Math.floor(this.totalTime / 60), 2)
    },
    seconds () {
      return Qformat.pad(Math.floor(this.totalTime - (this.minutes * 60)), 2)
    }
  }
}
</script>
