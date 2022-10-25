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
      <table class="summaryTable">
        <tr>
          <td>{{ $t('studies.tasks.qcst.time') }}</td>
          <td> {{ minutes }}:{{ seconds }}</td>
        </tr>
        <tr v-if="report.steps.length">
          <td>{{ $t('studies.tasks.qcst.steps') }}</td>
          <td>{{ report.steps[report.steps.length - 1].numberOfSteps }}</td>
        </tr>
      </table>

      <div class="q-pa-md">
        <p class="mobitxt2">{{ $t('studies.tasks.smwt.borgScale.intro')}}</p>
        <q-list bordered>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="0"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">0 {{ $t('studies.tasks.smwt.borgScale.l0') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="0.5"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">0.5 {{ $t('studies.tasks.smwt.borgScale.l05') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section
              avatar
              top
            >
              <q-radio
                v-model="borgValue"
                val="1"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">1 {{ $t('studies.tasks.smwt.borgScale.l1') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="2"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">2 {{ $t('studies.tasks.smwt.borgScale.l2') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="3"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">3 {{ $t('studies.tasks.smwt.borgScale.l3') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section
              avatar
              top
            >
              <q-radio
                v-model="borgValue"
                val="4"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">4 {{ $t('studies.tasks.smwt.borgScale.l4') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="5"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">5 {{ $t('studies.tasks.smwt.borgScale.l5') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="6"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">6</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section
              avatar
              top
            >
              <q-radio
                v-model="borgValue"
                val="7"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">7 {{ $t('studies.tasks.smwt.borgScale.l7') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="8"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">8</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio
                v-model="borgValue"
                val="9"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">9 {{ $t('studies.tasks.smwt.borgScale.l9') }}</q-item>
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
            v-ripple
          >
            <q-item-section
              avatar
              top
            >
              <q-radio
                v-model="borgValue"
                val="10"
              />
            </q-item-section>
            <q-item-section>
              <q-item class="mobitxt1">10 {{ $t('studies.tasks.smwt.borgScale.l10') }}</q-item>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-px-sm q-mt-sm">
          <p class="mobitxt2">{{ $t('studies.tasks.smwt.borgScale.result') }} <strong>{{ borgValue }}</strong></p>
        </div>
      </div>

      <div class="row justify-around">
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
import API from 'modules/API/API'
import DB from 'modules/db'
// import fileSystem from 'modules/files/files'
import { format as Qformat } from 'quasar'

export default {
  name: 'QCSTSummaryPage',
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
      this.report.summary.borgScale = this.borgValue

      // Only for testing purposes! Please remove before deploying app.
      // try {
      //   let filename = 'qcst_' + new Date().getTime() + '.json'
      //   await fileSystem.save(filename, 'shared', this.report)
      // } catch (err) {
      //   console.error('Cannot save to file', err)
      // }
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
      console.log(this.report)
    },
    async send () {
      this.sending = true
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
      return Math.floor((this.report.completionTS - this.report.startedTS) / 1000)
    },
    minutes () {
      return Qformat.pad(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return Math.floor(this.totalTime - (this.minutes * 60))
    }
  }
}
</script>
