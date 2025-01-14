<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.capTestComplete') }}</div>
      <img class="q-mt-md" alt="Finish flag" src="~assets/goalflags.svg" style="width: 50%; margin: 0px auto;">
      <div class="text-h6 q-mt-md">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>
      <table class="summaryTable">
        <tr>
          <td>{{ $t('tasks.smwt.time') }}</td>
          <td> {{ minutes }}:{{ seconds }}</td>
        </tr>
        <tr>
          <td>{{ $t('tasks.smwt.distance') }}</td>
          <td>{{ distance.toFixed(2) }} m</td>
        </tr>
        <tr v-if="steps">
          <td>{{ $t('tasks.smwt.steps') }}</td>
          <td>{{ steps }}</td>
        </tr>
      </table>

      <div class="q-pa-md">
        <p class="mobitxt2">{{ $t('tasks.smwt.borgScale.intro') }}</p>
        <q-list bordered>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="0" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">0 {{ $t('tasks.smwt.borgScale.l0') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="0.5" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">0.5 {{ $t('tasks.smwt.borgScale.l05') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="1" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">1 {{ $t('tasks.smwt.borgScale.l1') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="2" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">2 {{ $t('tasks.smwt.borgScale.l2') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="3" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">3 {{ $t('tasks.smwt.borgScale.l3') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="4" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">4 {{ $t('tasks.smwt.borgScale.l4') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="5" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">5 {{ $t('tasks.smwt.borgScale.l5') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="6" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">6</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="7" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">7 {{ $t('tasks.smwt.borgScale.l7') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="8" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">8</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="9" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">9 {{ $t('tasks.smwt.borgScale.l9') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="10" />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">10 {{ $t('tasks.smwt.borgScale.l10') }}</q-item>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-mt-sm">
          <p class="mobitxt2">{{ $t('tasks.smwt.borgScale.result') }} <strong>{{ borgValue }}</strong></p>
        </div>
      </div>

      <div class="row justify-around">
        <q-btn class="mobibtn" color="negative" :loading="sending" :label="$t('common.discard')" @click="discard()" />
        <q-btn class="mobibtn" color="primary" :loading="sending" :label="$t('common.send')" @click="send()"
          :disabled="!borgValue" />
      </div>
    </div>

  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'
import i18nSMWT from '@i18n/tasks/smwt'
import { mergeDeep } from '@shared/tools'

import API from '@shared/API'
import DB from '@shared/db'
// import fileSystem from 'modules/files/files'
import { format as Qformat } from 'quasar'
import session from '@shared/session'

export default {
  name: 'SMWTSummaryPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies, i18nSMWT)
  },
  data: function () {
    const report = session.getTaskReport()

    const totalTime = Math.floor((new Date(report.summary.completedTS) - new Date(report.summary.startedTS)) / 1000)
    const minutes = Qformat.pad(Math.floor(totalTime / 60), 2)
    const seconds = Qformat.pad(Math.floor(totalTime - (minutes * 60)), 2)
    const distance = report.summary.distance
    const steps = report.summary.steps

    return {
      totalTime,
      minutes,
      seconds,
      distance,
      steps,
      borgValue: undefined,
      sending: false
    }
  },
  methods: {
    async send () {
      this.sending = true

      const report = session.getTaskReport()

      report.summary.borgScale = Number(this.borgValue)
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
      //   let filename = 'smwt_' + new Date().getTime() + '.json'
      //   await fileSystem.save(filename, 'shared', report)
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
