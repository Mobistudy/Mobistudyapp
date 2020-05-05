<template>
  <q-page padding>
    <q-item-section id="completedText">
      <h5>{{ $t("studies.tasks.capTestComplete") }}</h5>
      <img alt="Finish flag" src="~assets/flag.svg" />
      <h6>{{ $t('studies.tasks.capTestCompleteSubtext') }}</h6>
      <q-item-section id="stats">
        <table>
          <tr>
            <td>{{ $t("studies.tasks.qcst.time") }}:</td>
            <td>{{ minutes }}:{{ seconds }}</td>
          </tr>
          <tr>
            <td>{{ $t("studies.tasks.qcst.steps") }}:</td>
            <td>{{ this.report.steps / 4 }}</td>
          </tr>
        </table>
      </q-item-section>
      <div class="q-pa-md">
        <p class="sub-heading">Please rate your level of exertion:</p>
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="0" />
            </q-item-section>
            <q-item-section>
              <q-item>0 {{ $t("studies.tasks.smwt.borgScale.l0") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="0.5" />
            </q-item-section>
            <q-item-section>
              <q-item>0.5 {{ $t("studies.tasks.smwt.borgScale.l05") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="1" />
            </q-item-section>
            <q-item-section>
              <q-item>1 {{ $t("studies.tasks.smwt.borgScale.l1") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="2" />
            </q-item-section>
            <q-item-section>
              <q-item>2 {{ $t("studies.tasks.smwt.borgScale.l2") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="3" />
            </q-item-section>
            <q-item-section>
              <q-item>3 {{ $t("studies.tasks.smwt.borgScale.l3") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="4" />
            </q-item-section>
            <q-item-section>
              <q-item>4 {{ $t("studies.tasks.smwt.borgScale.l4") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="5" />
            </q-item-section>
            <q-item-section>
              <q-item>5 {{ $t("studies.tasks.smwt.borgScale.l5") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="6" />
            </q-item-section>
            <q-item-section>
              <q-item>6</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="7" />
            </q-item-section>
            <q-item-section>
              <q-item>7 {{ $t("studies.tasks.smwt.borgScale.l7") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="8" />
            </q-item-section>
            <q-item-section>
              <q-item>8</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="borgValue" val="9" />
            </q-item-section>
            <q-item-section>
              <q-item>9 {{ $t("studies.tasks.smwt.borgScale.l9") }}</q-item>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="borgValue" val="10" />
            </q-item-section>
            <q-item-section>
              <q-item>10 {{ $t("studies.tasks.smwt.borgScale.l10") }}</q-item>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-px-sm q-mt-sm">
          <p class="sub-heading">
            Your selection is: <strong>{{ borgValue }}</strong>
          </p>
        </div>
        <q-btn color="primary" @click="send()" :label="$t('common.send')" :disabled="!borgValue"/>

      </div>
    </q-item-section>
  </q-page>
</template>

<script>
import API from '../../modules/API.js'
import DB from '../../modules/db.js'
import fileSystem from '../../modules/files.js'

export default {
  name: 'QCSTSummaryPage',
  props: [ 'report' ],
  data: function () {
    return {
      borgValue: undefined
    }
  },
  methods: {
    async send () {
      this.$q.loading.show()
      this.report.borgScale = this.borgValue

      // Only for testing purposes! Please remove before deploying app.
      try {
        let filename = 'qcst_' + new Date().getTime() + '.json'
        await fileSystem.save(filename, this.report)
      } catch (err) {
        console.error('Cannot save to file', err)
      }

      // Save the data to server
      try {
        await API.sendQCSTData(this.report)
        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.$q.loading.hide()
        this.$router.push('/home')
      } catch (error) {
        this.$q.loading.hide()
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send data: ' + error.message,
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
      console.log(this.report)
      return Math.floor((this.report.completionTS - this.report.startedTS) / 1000)
    },
    minutes () {
      return Math.floor(this.totalTime / 60)
    },
    seconds () {
      return Math.floor(this.totalTime - (this.minutes * 60))
    }
  }
}
</script>
