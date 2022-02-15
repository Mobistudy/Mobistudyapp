<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.capTestComplete') }}</div>
      <img
        class="q-mt-md"
        alt="Finish flag"
        src="~assets/goalflags.svg"
        style="width: 50%; margin: 0px auto;"
      >
      <div class="text-h6 q-mt-md">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>
      <table class="decoratedTable">
        <tr>
          <td>{{ $t('studies.tasks.holdPhone.time') }}</td>
<!--          <td> {{ minutes }}:{{ seconds }}</td>-->
        </tr>
      </table>

      <div class="row justify-around">
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
import fileSystem from 'modules/files'
import { format as Qformat } from 'quasar'
export default {
  name: 'SMWTSummaryPage',
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
    async send () {
      this.sending = true
      // Only for testing purposes! Please remove before deploying app.
      try {
        let filename = 'holdPhone_' + new Date().getTime() + '.json'
        await fileSystem.save(filename, this.report)
      } catch (err) {
        console.error('Cannot save to file', err)
      }
      // Save the data to server
      try {
        await API.sendHoldPhoneData(this.report)
        await DB.setTaskCompletion(this.report.studyKey, this.report.taskId, new Date())
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
    async discard () {
      this.sending = true
      this.report.rightHand = 'discarded'
      this.report.leftHand = 'discarded'
      // this.report.borgScale = 'discarded'
      try {
        await API.sendHoldPhoneData(this.report)
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
