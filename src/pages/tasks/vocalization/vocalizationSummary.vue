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
      <div class="text-h6 q-mt-lg">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>

      <table class="decoratedTable q-mt-md">
        <tr>
          <td>{{ $t('studies.tasks.vocalization.time') }}</td>
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
  margin: 0px auto;
  font-size: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
import API from 'modules/API/API'
import DB from 'modules/db'
import files from 'modules/files/files'
import { format as Qformat } from 'quasar'

const FOLDER = 'shared'

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
    async saveAndLeave (sendFiles) {
      try {
        if (sendFiles) {
          for (let i = 0; i < this.report.attachments.length; i++) {
            let filename = this.report.attachments[i]
            let wavefile = await files.load(filename, FOLDER, 'blob')
            await API.sendAttachment(this.report.studyKey, this.report.taskId, filename, wavefile)
          }
        }

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

      this.report.discarded = false

      return this.saveAndLeave(true)
    },
    async discard () {
      this.sending = true

      // delete data and set flag
      this.report.discarded = true
      delete this.report.summary
      delete this.report.attachments

      return this.saveAndLeave(false)
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
