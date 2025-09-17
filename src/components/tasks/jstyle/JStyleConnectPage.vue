<template>
  <q-page padding>
    <div class="q-pa-md">
      <div v-if="devices.length > 1" class="mobitxt2">{{ $t('tasks.jstyle.moreDevices') }}</div>
      <q-list v-if="devices.length > 1" bordered class="q-mt-lg">
        <q-item v-for="device in devices" :key="device.id" clickable v-ripple :id="device.id"
          @click="connect(null, device)">
          <q-item-section class="mobitxt1">{{ device.id }}</q-item-section>
        </q-item>
      </q-list>

      <q-inner-loading :showing="showSearching">
        <div class="mobitxt2" color="dark-grey">{{ $t('tasks.jstyle.searching') }}</div>
        <q-spinner-dots size="40px" color="primary" />
      </q-inner-loading>
      <q-inner-loading :showing="showConnecting">
        <div class="mobitxt2" color="dark-grey">{{ $t('tasks.jstyle.connecting') }}</div>
        <q-spinner-dots size="40px" color="primary" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
const DEBUG = process.env.DEBUG

import i18nCommon from '@i18n/common'
import i18nJStyle from '@i18n/tasks/jstyle'
import { mergeDeep } from '@shared/tools'

import JStyle2025 from '@shared/devices/jstyle2025'
import DB from '@shared/db'
import session from '@shared/session'

export default {
  name: 'JStyleConnectPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nJStyle)
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      devices: [],
      showSearching: false,
      showConnecting: false,
      connectionAttempts: 0,
      maxConnectionAttempts: 5
    }
  },
  methods: {
    async search () {
      this.devices = []
      this.showSearching = true
      try {
        this.devices = await JStyle2025.findAllJStylesByNamePrefix('J2113', 10000)

        if (this.devices.length === 0) {
          this.$q.dialog({
            title: this.$t('tasks.jstyle.noDeviceTitle'),
            message: this.$t('tasks.jstyle.noDevice'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            persistent: true
          }).onOk(data => {
            this.search()
          }).onCancel(() => {
            this.abandon()
          })
        } else if (this.devices.length === 1) {
          this.connect(null, this.devices[0])
        } else {
          // sort devices by RSSI, desc
          this.devices.sort((d1, d2) => { return d2.rssi - d1.rssi })
        }
      } catch (err) {
        console.error('Search error', err)
        this.$q.dialog({
          title: this.$t('errors.error'),
          message: this.$t('tasks.jstyle.searchFailed'),
          cancel: this.$t('common.cancel'),
          ok: this.$t('common.retry'),
          persistent: true
        }).onOk(data => {
          this.search()
        }).onCancel(() => {
          this.abandon()
        })
      }
      this.showSearching = false
    },
    // connect to the selected device
    async connect (deviceId, jstyle) {
      this.showConnecting = true

      try {
        this.connectionAttempts++

        if (DEBUG) console.log('Connecting to JStyle', deviceId, jstyle)

        if (deviceId && !jstyle) {
          jstyle = await JStyle2025.findJStyleById(deviceId, 10000) // first search for the device by id
        }

        await jstyle.connect()
        if (DEBUG) console.log('JStyle connected')

        // set time
        const now = new Date()
        await jstyle.setTime(now)

        // configure the watch
        const profile = await DB.getParticipantProfile()
        const age = new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()
        // multiply height in centimeters by 0.413 for women and 0.415 for men
        const strideLength = profile.sex === 'female' ? profile.height * 0.413 : profile.height * 0.415

        /**
        * @type {Object}
        * @property {number} gender - 1 for male, 2 for female
        * @property {number} age - in years
        * @property {number} height - in cm
        * @property {number} weight - in kg
        * @property {number} strideLength - in cm
        * @property {string} userDeviceId - ?
        */
        const up = {
          gender: profile.sex === 'male' ? 1 : 2,
          age,
          height: parseInt(profile.height),
          weight: parseInt(profile.weight),
          strideLength: Math.round(strideLength)
        }
        await jstyle.setUserProfile(up)

        const studyKey = this.studyKey
        const taskId = parseInt(this.taskId)
        const taskDescr = await DB.getTaskDescription(studyKey, taskId)
        const hrInterval = taskDescr.hrInterval || 0 // default to none
        const spo2Interval = taskDescr.spo2Interval || 0 // default to none
        const tempInterval = taskDescr.tempInterval || 0 // default to none
        const hrvInterval = taskDescr.hrvInterval || 0 // default to none

        // set auto modes
        await jstyle.setAutoMode(0, 0, 23, 59, hrInterval, 1) // Enable auto HR every 5 minutes
        await jstyle.setAutoMode(0, 0, 23, 59, spo2Interval, 2) // Enable auto SPO2 every 5 minutes
        await jstyle.setAutoMode(0, 0, 23, 59, tempInterval, 3) // Enable auto temperature every 5 minutes
        await jstyle.setAutoMode(0, 0, 23, 59, hrvInterval, 4) // Enable auto HRV every 5 minutes

        if (DEBUG) console.log('JStyle configured', { hrInterval, spo2Interval, tempInterval, hrvInterval })

        this.showConnecting = false

        // save the device ID in the database
        await DB.setJStyle2025ID(jstyle.id)

        this.moveToDownloadPage(jstyle)
      } catch (error) {
        console.error('Connection issue when connecting', error)

        this.showConnecting = false

        if (this.connectionAttempts < this.maxConnectionAttempts) {
          console.log('Attempting connect again...', this.connectionAttempts)
          this.connect(deviceId, jstyle)
        } else {
          const dialogOpts = {
            title: this.$t('errors.error'),
            message: this.$t('tasks.jstyle.connectionFail'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            options: {
              type: 'toggle',
              model: [],
              // inline: true,
              items: [
                { label: this.$t('tasks.jstyle.connectionRepair'), value: 'forget', color: 'secondary' }
              ]
            },
            persistent: true
          }

          this.$q.dialog(dialogOpts).onOk(async (options) => {
            try {
              await jstyle.disconnect()
            } catch (error) {
              console.error('Problem disconnecting, but OK', error)
            }
            if (options && options.includes('forget')) {
              await DB.removeJStyle2025ID()
            }
            this.connect(deviceId, jstyle)
          }).onCancel(() => {
            this.abandon()
          })
        }
      }
    },
    // abandons the task
    abandon () {
      this.$router.go(-1)
    },
    moveToDownloadPage (connectedDevice) {
      session.setConnectedDevice(connectedDevice)
      this.$router.replace({ name: 'jstyleDataDownload', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  },
  async mounted () {
    const previouslyPairedId = await DB.getJStyle2025ID()
    if (previouslyPairedId) {
      // a device has been paired in the past, try connecting to it
      this.connect(previouslyPairedId)
    } else {
      // no device has been paired, start searching
      this.search()
    }
  }

}
</script>
