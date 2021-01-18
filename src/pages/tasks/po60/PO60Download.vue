<template>
  <q-page id="main">
        <q-circular-progress
        :indeterminate="isDownloading"
        size="90px"
        :thickness="0.2"
        color="lime"
        center-color="grey-8"
        track-color="transparent"
        >
        <div v-if="!isDownloading && storedData">{{ storedData.avgHR }}</div>
        </q-circular-progress>
      <div class=" text-center text-g6">
      <q-separator></q-separator>
      <div class="q-my-md row justify-around">
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
import API from 'modules/API'

export default {
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      isDownloading: false,
      isSending: false,
      storedData: undefined
    }
  },
  methods: {
    async downloadData () {
      this.isDownloading = true

      let startDate = new Date()
      try {
        this.storedData = await po60.getLatestData()
        if (this.storedData.length < 0) { // If less than 30 minutes of data exists, show page which describes to little data is found, wait and come back next time.
          await this.storeDownloadDate(startDate)
          this.$router.push({ name: 'notEnoughDataPage' })
          return
        }
        await this.storeDownloadDate(this.storedData.timestampEnd)
        try {
          await po60.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect miband3', err)
        }
      } catch (err) {
        console.error('cannot download data', err)
        this.showErrorDialog() // TODO: Retry if the device is disconnected? The retry won't accomplish anything in this case and is confusing from a user perspective.
      }
      this.isDownloading = false
    },
    async storeDownloadDate (date) {
      let device = await db.getDevicePO60()
      device.lastStoredDataDate = date
      return db.setDevicePO60(device)
    },

    showErrorDialog () {
      this.$q.dialog({
        title: this.$t('errors.error'),
        message: this.$t('studies.tasks.miband3.dataDownloadError'),
        cancel: this.$t('common.cancel'),
        ok: this.$t('common.retry'),
        persistent: true
      }).onOk(() => {
        // retry
        this.downloadData()
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
        console.error('cannot disconnect miband3', err)
      }
      this.$router.push({ name: 'tasker' })
    },

    async skipSend () {
      // TODO: show a popup for confirmation
      await this.storeDownloadTimestamp()
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
        await this.storeDownloadDate(this.startDate)
        await db.setTaskCompletion(studyKey, taskId, new Date())
        this.isSending = false
        // go back to home page
        this.$router.push('/home')
      } catch (error) {
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
      console.log('delaying')
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
