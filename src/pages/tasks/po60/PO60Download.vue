<template>
  <q-page id="main">
    <div class="flex col text-center justify-center">
      <div class="q-pa-md">
        <h6>{{ $t('studies.tasks.po60.dataHRTitle') }}</h6>
        <q-circular-progress
          show-value
          :indeterminate="isDownloading"
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
          :indeterminate="isDownloading"
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
    <div class="q-my-md row justify-around fixed-bottom">
      <q-btn
        :label="$t('common.skip')"
        flat
        color="negative"
        @click="skipSend()"
      ></q-btn>
      <q-btn
        :label="$t('common.send')"
        color="primary"
        @click="sendData()"
      ></q-btn>
    </div>
    <q-inner-loading :showing="isSending">
      <div class="text-overline">{{ $t('studies.tasks.po60.dataSending') }}</div>
      <q-spinner-oval
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
/* eslint-disable no-new */
import po60 from 'modules/po60/IPulseOxDevice'
import db from 'modules/db'
import userinfo from 'modules/userinfo'
import API from 'modules/API/API'

export default {
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      isDownloading: false,
      isSending: false,
      storedData: undefined,
      avgHR: '',
      avgSPO2: ''
    }
  },
  watch: {
    storedData: function (val) {
      this.avgHR = val.hrAvg + ''
      this.avgSPO2 = val.SPO2Avg + '%'
    }
  },
  methods: {
    async downloadData () {
      this.isDownloading = true
      await this.delay(1)
      try {
        this.storedData = await po60.getLatestData()
        try {
          await po60.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect PO60', err)
        }
      } catch (err) {
        console.error('cannot download data', err)
        this.showErrorDialog()
      }
      this.isDownloading = false
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

    async skipSend () {
      // TODO: show a popup for confirmation
      let studyKey = this.studyKey
      let taskId = Number(this.taskId)
      await db.setTaskCompletion(studyKey, taskId, new Date())
      this.$router.push('/home')
    },

    async sendData () {
      this.isSending = true
      await this.delay(2) // If the data is small the sending is instant and the user doesn't see that something is in the process of being sent.
      try {
        let studyKey = this.studyKey
        let taskId = Number(this.taskId)
        await API.sendPO60Data({
          userKey: userinfo.user._key,
          studyKey: studyKey,
          taskId: taskId,
          createdTS: new Date(),
          device: this.deviceInfo,
          po60Data: this.storedData
        })
        await db.setTaskCompletion(studyKey, taskId, new Date())
        this.isSending = false
        // go back to home page
        this.$router.push('/home')
      } catch (error) { // TODO: onDismiss doesn't work when there is no server connection!
        this.isSending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    },
    async delay (seconds) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, seconds * 1000)
      })
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
