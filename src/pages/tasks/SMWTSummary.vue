<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.capTestComplete') }}</div>
      <img
        class="q-mt-md"
        alt="Finish flag"
        src="~assets/goalflags.svg"
      >
      <div class="text-h6 q-mt-md">{{ $t('studies.tasks.capTestCompleteSubtext') }}</div>
      <table id="stats">
        <tr>
          <td>{{ $t('studies.tasks.smwt.time') }}</td>
          <td> {{ minutes }}:{{ seconds }}</td>
        </tr>
        <tr>
          <td>{{ $t('studies.tasks.smwt.distance') }}</td>
          <td>{{ report.distance.toFixed(2) }} m</td>
        </tr>
        <tr v-if="report.steps.length">
          <td>{{ $t('studies.tasks.smwt.steps') }}</td>
          <td>{{ report.steps[report.steps.length - 1].numberOfSteps }}</td>
        </tr>
      </table>

      <div class="q-pa-md">
        <p class="sub-heading">Please rate your level of exertion:</p>
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
              <q-item>0 {{ $t('studies.tasks.smwt.borgScale.l0') }}</q-item>
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
              <q-item>0.5 {{ $t('studies.tasks.smwt.borgScale.l05') }}</q-item>
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
              <q-item>1 {{ $t('studies.tasks.smwt.borgScale.l1') }}</q-item>
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
              <q-item>2 {{ $t('studies.tasks.smwt.borgScale.l2') }}</q-item>
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
              <q-item>3 {{ $t('studies.tasks.smwt.borgScale.l3') }}</q-item>
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
              <q-item>4 {{ $t('studies.tasks.smwt.borgScale.l4') }}</q-item>
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
              <q-item>5 {{ $t('studies.tasks.smwt.borgScale.l5') }}</q-item>
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
              <q-item>6</q-item>
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
              <q-item>7 {{ $t('studies.tasks.smwt.borgScale.l7') }}</q-item>
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
              <q-item>8</q-item>
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
              <q-item>9 {{ $t('studies.tasks.smwt.borgScale.l9') }}</q-item>
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
              <q-item>10 {{ $t('studies.tasks.smwt.borgScale.l10') }}</q-item>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-px-sm q-mt-sm">
          <p class="sub-heading">Your selection is: <strong>{{ borgValue }}</strong></p>
        </div>
      </div>

      <q-btn
        color="primary"
        @click="send()"
        :label="$t('common.send')"
        :disabled="!borgValue"
      />
    </div>

  </q-page>
</template>

<script>
import API from 'modules/API'
import DB from 'modules/db'
import fileSystem from 'modules/files'
import { format as Qformat } from 'quasar'

export default {
  name: 'SMWTSummaryPage',
  props: {
    title: String,
    icon: String,
    report: Object
  },
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
        let filename = 'smwt_' + new Date().getTime() + '.json'
        await fileSystem.save(filename, this.report)
      } catch (err) {
        console.error('Cannot save to file', err)
      }

      // Save the data to server
      try {
        await API.sendSMWTData(this.report)
        await DB.setTaskCompletion(this.report.studyKey, this.report.taskId, new Date())
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

<style>
img {
  width: 40%;
  margin: 0px auto;
}

table {
  background: #f8f8f8;
  padding: 4px;
  width: 70%;
  margin: 0px auto;
  font-size: 0.75rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

table td:nth-child(2) {
  text-align: right;
}
tr {
  text-align: left;
}

#submit {
  text-align: center;
}
</style>
