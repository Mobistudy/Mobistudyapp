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

      <table class="summaryTable q-my-lg">
        <tr>
          <td>{{ $t('studies.tasks.holdPhone.time') }}</td>
          <td> {{ minutes }}:{{ seconds }}</td>
        </tr>
        <tr v-if="report.summary.resting.left">
          <td>{{ $t('studies.tasks.holdPhone.summaryRestingLeft') }}</td>
          <td>{{ report.summary.resting.left.accelerationVariance.toFixed(2) }}</td>
        </tr>
        <tr v-if="report.summary.resting.right">
          <td>{{ $t('studies.tasks.holdPhone.summaryRestingRight') }}</td>
          <td>{{ report.summary.resting.right.accelerationVariance.toFixed(2) }}</td>
        </tr>
        <tr v-if="report.summary.postural.left">
          <td>{{ $t('studies.tasks.holdPhone.summaryPosturalLeft') }}</td>
          <td>{{ report.summary.postural.left.accelerationVariance.toFixed(2) }}</td>
        </tr>
        <tr v-if="report.summary.postural.right">
          <td>{{ $t('studies.tasks.holdPhone.summaryPosturalRight') }}</td>
          <td>{{ report.summary.postural.right.accelerationVariance.toFixed(2) }}</td>
        </tr>
        <tr v-if="report.summary.kinetic.left">
          <td>{{ $t('studies.tasks.holdPhone.summaryKineticLeft') }}</td>
          <td>{{ report.summary.kinetic.left.accelerationVariance.toFixed(2) }}</td>
        </tr>
        <tr v-if="report.summary.kinetic.right">
          <td>{{ $t('studies.tasks.holdPhone.summaryKineticRight') }}</td>
          <td>{{ report.summary.kinetic.right.accelerationVariance.toFixed(2) }}</td>
        </tr>
      </table>

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
    </div>

  </q-page>
</template>

<script>
import { variance } from 'modules/stats'
import API from 'modules/API/API'
import DB from 'modules/db'
// import fileSystem from 'modules/files/files'
import { format as Qformat } from 'quasar'

// TODO: compute the energy of the signal (or similar) only in the band 4 to 10 Hz.
// see https://www.aafp.org/afp/1999/0315/p1565.html

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
  created () {
    let vals = this.report.data.resting.left.motion.map((ev) => {
      return Math.sqrt((ev.acc.x * ev.acc.x) + (ev.acc.y * ev.acc.y) + (ev.acc.z * ev.acc.z))
    })
    this.report.summary.resting.left.accelerationVariance = variance(vals)

    vals = this.report.data.resting.right.motion.map((ev) => {
      return Math.sqrt((ev.acc.x * ev.acc.x) + (ev.acc.y * ev.acc.y) + (ev.acc.z * ev.acc.z))
    })
    this.report.summary.resting.right.accelerationVariance = variance(vals)

    vals = this.report.data.postural.left.motion.map((ev) => {
      return Math.sqrt((ev.acc.x * ev.acc.x) + (ev.acc.y * ev.acc.y) + (ev.acc.z * ev.acc.z))
    })
    this.report.summary.postural.left.accelerationVariance = variance(vals)

    vals = this.report.data.postural.right.motion.map((ev) => {
      return Math.sqrt((ev.acc.x * ev.acc.x) + (ev.acc.y * ev.acc.y) + (ev.acc.z * ev.acc.z))
    })
    this.report.summary.postural.right.accelerationVariance = variance(vals)

    vals = this.report.data.kinetic.left.motion.map((ev) => {
      return Math.sqrt((ev.acc.x * ev.acc.x) + (ev.acc.y * ev.acc.y) + (ev.acc.z * ev.acc.z))
    })
    this.report.summary.kinetic.left.accelerationVariance = variance(vals)

    vals = this.report.data.kinetic.right.motion.map((ev) => {
      return Math.sqrt((ev.acc.x * ev.acc.x) + (ev.acc.y * ev.acc.y) + (ev.acc.z * ev.acc.z))
    })
    this.report.summary.kinetic.right.accelerationVariance = variance(vals)
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
