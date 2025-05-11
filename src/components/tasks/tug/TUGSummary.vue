<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.capTestComplete') }}</div>
      <img class="q-mx-a q-mt-lg" alt="Finish flag" src="~assets/goalflags.svg" style="width: 50%;">
      <div class="text-h6 q-mt-md">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>

      <table class="summaryTable q-my-lg">
        <tbody>
          <tr>
            <td>{{ $t('tasks.tug.time') }}</td>
            <td> {{ minutes }}:{{ seconds }}</td>
          </tr>
        </tbody>
      </table>

      <div class="row justify-around q-mt-xl">
        <q-btn class="mobibtn" color="negative" :loading="sending" :label="$t('common.discard')" @click="discard()" />
        <q-btn class="mobibtn" color="primary" :loading="sending" :label="$t('common.send')" @click="send()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'
import i18nTUG from '@i18n/tasks/tug'
import { mergeDeep } from '@shared/tools'

import API from '@shared/API'
import DB from '@shared/db'
// import fileSystem from 'modules/files/files'
import { format as Qformat } from 'quasar'

import session from '@shared/session'

export default {
  name: 'TUGSummaryPage',
  data: function () {
    const report = session.getTaskReport()

    const totalTime = Math.floor((new Date(report.summary.completedTS) - new Date(report.summary.startedTS)) / 1000)
    const minutes = Qformat.pad(Math.floor(totalTime / 60), 2)
    const seconds = Qformat.pad(Math.floor(totalTime - (minutes * 60)), 2)

    return {
      sending: false,
      minutes,
      seconds
    }
  },
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies, i18nTUG)
  },
  methods: {
    async send () {
      this.sending = true

      const report = session.getTaskReport()
      report.discarded = false

      try {
        console.log(report)
        await API.sendTasksResults(report)
        await DB.setTaskCompletion(
          report.studyKey,
          report.taskId,
          new Date()
        )
        this.$router.go(-1)
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }

      // Only for testing purposes! Please remove before deploying app.
      // try {
      //   let filename = 'tug_' + new Date().getTime() + '.json'
      //   await fileSystem.save(filename, 'shared', this.report)
      // } catch (err) {
      //   console.error('Cannot save to file', err)
      // }
    },
    async discard () {
      this.$router.go(-1)
    }
  }
}
</script>
