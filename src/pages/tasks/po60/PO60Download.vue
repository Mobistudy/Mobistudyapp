<template>
  <q-page id="main">
    <div class="flex col text-center justify-center">
      <div class="q-pa-md">
        <h6>{{ $t('studies.tasks.po60.dataHRTitle') }}</h6>
        <q-circular-progress
          show-value
          :indeterminate="downloading"
          :value="storedData !== undefined ? 100 : 0"
          size="80px"
          :thickness="0.2"
          color="blue"
          center-color="blue-1"
          track-color="transparent"
        >
          {{avgHR}}
        </q-circular-progress>
      </div>
      <div class="q-pa-md">
        <h6>{{ $t('studies.tasks.po60.dataSPO2Title') }}</h6>
        <q-circular-progress
          show-value
          :indeterminate="downloading"
          :value="storedData !== undefined ? 100 : 0"
          size="80px"
          :thickness="0.2"
          color="blue"
          center-color="blue-1"
          track-color="transparent"
        >
          {{avgSPO2}}
        </q-circular-progress>
      </div>
    </div>
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
  </q-page>
</template>

<script>
/* eslint-disable no-new */
import po60 from 'modules/po60/IPulseOxDevice'
import DB from 'modules/db'
import userinfo from 'modules/userinfo'
import API from 'modules/API/API'
import phone from 'modules/phone/phone'

export default {
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      downloading: false,
      sending: false,
      storedData: undefined,
      avgHR: '',
      avgSPO2: '',
      report: {
        userKey: userinfo.user._key,
        participantKey: userinfo.user.participantKey,
        studyKey: this.studyKey,
        taskId: parseInt(this.taskId),
        taskType: 'po60',
        createdTS: new Date(),
        phone: phone.device,
        summary: {
          startedTS: new Date(),
          completedTS: undefined,
          spo2: undefined,
          hr: undefined
        },
        data: undefined
      }
    }
  },
  watch: {
    storedData: function (val) {
      let latest = val[val.length - 1]
      this.avgHR = latest.hrAvg + ''
      this.avgSPO2 = latest.SPO2Avg + '%'
    }
  },
  methods: {
    async downloadData () {
      this.downloading = true
      try {
        this.storedData = await po60.getAllData()

        try {
          await po60.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect PO60', err)
        }

        let lastValue = this.storedData[this.storedData.length - 1]

        this.report.summary.completedTS = new Date()
        this.report.summary.spo2 = lastValue.SPO2Avg
        this.report.summary.hr = lastValue.hrAvg
        this.report.data = {
          device: undefined,
          pulseoximetry: this.storedData
        }
      } catch (err) {
        console.error('cannot download data', err)
        this.showErrorDialog()
      }
      this.downloading = false
    },

    showErrorDialog () {
      this.$q.dialog({
        title: this.$t('errors.error'),
        message: this.$t('studies.tasks.po60.dataDownloadError'),
        cancel: this.$t('common.cancel'),
        ok: this.$t('common.retry'),
        persistent: true
      }).onOk(() => {
        // retry
        this.$router.push({ name: 'po60Intro', params: { studyKey: this.studyKey, taskId: this.taskId } })
      }).onCancel(() => {
        // cancel and go home
        this.cancelTask()
      })
    },

    async cancelTask () {
      // disconnects and go home
      try {
        await po60.disconnect()
      } catch (err) {
        // doesn't matter if it fails here, but let's print out a message on console
        console.error('cannot disconnect po60', err)
      }
      this.$router.push({ name: 'tasker' })
    },

    async saveAndLeave () {
      try {
        console.log(this.report)
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

  async mounted () {
    await this.downloadData()
  },

  async beforeDestroy () {
    try {
      await po60.disconnect()
    } catch (err) {
      // doesn't matter if it fails here, but let's print out a message on console
      console.error('cannot disconnect miband3', err)
    }
  }
}
</script>
