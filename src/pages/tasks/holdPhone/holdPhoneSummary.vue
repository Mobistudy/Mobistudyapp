<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5 q-mt-md">{{ $t('studies.tasks.capTestComplete') }}</div>

      <div class="q-mt-md">
        <img
          alt="Finish flag"
          src="~assets/goalflags.svg"
          style="width: 50%; margin: 0px auto;"
        >
      </div>

      <div class="text-h6 q-mt-md">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>

      <table class="decoratedTable">
        <tr>
          <td>{{ $t('studies.tasks.holdPhone.time') }}</td>
          <td> {{ minutes }}:{{ seconds }}</td>
        </tr>
        <tr v-if="report.summary.resting.left">
          <td>{{ $t('studies.tasks.holdPhone.summaryRestingLeft') }}</td>
          <td>{{ report.summary.resting.left.accelerationVariance }}</td>
        </tr>
        <tr v-if="report.summary.resting.right">
          <td>{{ $t('studies.tasks.holdPhone.summaryRestingRight') }}</td>
          <td>{{ report.summary.resting.right.accelerationVariance }}</td>
        </tr>
        <tr v-if="report.summary.postural.left">
          <td>{{ $t('studies.tasks.holdPhone.summaryPosturalLeft') }}</td>
          <td>{{ report.summary.postural.left.accelerationVariance }}</td>
        </tr>
        <tr v-if="report.summary.postural.right">
          <td>{{ $t('studies.tasks.holdPhone.summaryPosturalRight') }}</td>
          <td>{{ report.summary.postural.right.accelerationVariance }}</td>
        </tr>
        <tr v-if="report.summary.kinetic.left">
          <td>{{ $t('studies.tasks.holdPhone.summaryKineticLeft') }}</td>
          <td>{{ report.summary.kinetic.left.accelerationVariance }}</td>
        </tr>
        <tr v-if="report.summary.kinetic.right">
          <td>{{ $t('studies.tasks.holdPhone.summaryKineticRight') }}</td>
          <td>{{ report.summary.kinetic.right.accelerationVariance }}</td>
        </tr>
      </table>

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
// import fileSystem from 'modules/files/files'
import { format as Qformat } from 'quasar'
export default {
  name: 'HoldThePhoneSummaryPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      borgValue: undefined,
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

      // Only for testing purposes! Please remove before deploying app.
      // try {
      //   let filename = 'holdPhone_' + new Date().getTime() + '.json'
      //   await fileSystem.save(filename, 'shared', this.report)
      // } catch (err) {
      //   console.error('Cannot save to file', err)
      // }

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
