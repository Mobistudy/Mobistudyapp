<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.capTestComplete') }}</div>
      <img
        class="q-mx-a q-mt-lg"
        alt="Finish flag"
        src="~assets/goalflags.svg"
        style="width: 50%;"
      >
      <div class="text-h6 q-mt-md">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>

      <table class="decoratedTable q-mt-md">
        <tr>
          <td>{{ $t('studies.tasks.tugt.time') }}</td>
          <td> {{ minutes }}:{{ seconds }}</td>
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
    </div>
  </q-page>
</template>

<style>
.decoratedTable {
  background: #f8f8f8;
  padding: 4px;
  width: 70%;
  margin: auto;
  font-size: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
import API from 'modules/API/API'
import DB from 'modules/db'
// import fileSystem from 'modules/files/files'
import { format as Qformat } from 'quasar'

export default {
  name: 'SMWTSummaryPage',
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
    },
    async send () {
      this.sending = true

      // Only for testing purposes! Please remove before deploying app.
      // try {
      //   let filename = 'tugt_' + new Date().getTime() + '.json'
      //   await fileSystem.save(filename, 'shared', this.report)
      // } catch (err) {
      //   console.error('Cannot save to file', err)
      // }

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
  },
  computed: {
    totalTime () {
      return Math.floor((this.report.summary.completedTS - this.report.summary.startedTS) / 1000)
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
