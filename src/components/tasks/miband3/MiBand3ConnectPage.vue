<template>
  <q-page padding>
    <div class="q-pa-md">
      <div v-if="devices.length > 1" class="mobitxt2">{{ $t('tasks.miband3.moreDevices') }}</div>
      <q-list v-if="devices.length > 1" bordered class="q-mt-lg">
        <q-item v-for="device in devices" :key="device.id" clickable v-ripple :id="device.id" @click="connect(device)">
          <q-item-section class="mobitxt1">{{ device.id }}</q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="tapToAuthDialog" transition-show="scale" transition-hide="scale" no-esc-dismiss
        no-backdrop-dismiss>
        <q-card>
          <div class="q-pa-sm">
            <q-img src="tasks/miband3/miband3_tap.svg" />
          </div>
          <q-card-section>
            <div class="
            row
            no-wrap
            items-center">
              <div class="col text-h6 ellipsis">
                {{ $t('tasks.miband3.tap') }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-inner-loading :showing="showSearching">
        <div class="mobitxt2" color="dark-grey">{{ $t('tasks.miband3.searching') }}</div>
        <q-spinner-dots size="40px" color="primary" />
      </q-inner-loading>
      <q-inner-loading :showing="showConnecting">
        <div class="mobitxt2" color="dark-grey">{{ $t('tasks.miband3.connecting') }}</div>
        <q-spinner-dots size="40px" color="primary" />
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
const DEBUG = process.env.DEBUG

import i18nCommon from '@i18n/common'
import i18nMiband3 from '@i18n/tasks/miband3'
import { mergeDeep } from '@shared/tools'

import miband3 from '@shared/devices/miband3'
import DB from '@shared/db'

export default {
  name: 'Miband3ConnectPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nMiband3)
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      devices: [],
      tapToAuthDialog: false,
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
        this.devices = await miband3.search(12000)
        if (this.devices.length === 0) {
          this.$q.dialog({
            title: this.$t('tasks.miband3.noDeviceTitle'),
            message: this.$t('tasks.miband3.noDevice'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            persistent: true
          }).onOk(data => {
            this.search()
          }).onCancel(() => {
            this.abandon()
          })
        } else if (this.devices.length === 1) {
          this.connect(this.devices[0])
        } else {
          // sort devices by RSSI, desc
          this.devices.sort((d1, d2) => { return d2.rssi - d1.rssi })
        }
      } catch (err) {
        console.error('Search error', err)
        this.$q.dialog({
          title: this.$t('errors.error'),
          message: this.$t('tasks.miband3.searchFailed'),
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
    async connect (device) {
      this.showConnecting = true

      try {
        this.connectionAttempts++

        if (DEBUG) console.log('Connecting to Miband3', device.id)
        if (this.$q.platform.is.ios) {
          await miband3.searchForId(device.id, 12000)
        }

        await miband3.connect(device)
        if (DEBUG) console.log('Miband3 connected')

        // Authenticate after connect.
        if (!device.authenticated) this.tapToAuthDialog = true
        await miband3.authenticate(device.authenticated)
        if (DEBUG) console.log('Miband3 authenticated')

        // configure the watch
        const profile = await DB.getParticipantProfile()

        const height = parseInt(profile.height)
        const weight = parseInt(profile.weight)
        const dob = profile.dateOfBirth
        const sex = profile.sex
        const language = profile.language
        const studyKey = this.studyKey
        const taskId = parseInt(this.taskId)
        // user a user configuration like { height: 180, weight: 80, dob: '1974-11-21', sex: 'male', language: 'en' }
        const user = {
          height,
          weight,
          dob,
          sex,
          language
        }
        const taskDescr = await DB.getTaskDescription(studyKey, taskId)
        await miband3.configure(user, taskDescr.hrInterval) // Maybe do not always configure upon connect?
        if (DEBUG) console.log('Miband3 configured')

        this.tapToAuthDialog = false
        this.showConnecting = false

        // save the device!
        device.authenticated = true
        await DB.setDeviceMiBand3(device)

        this.moveToDownloadPage()
      } catch (error) {
        console.error('Connection issue when pairing', error)
        this.tapToAuthDialog = false

        this.showConnecting = false
        // TODO: there should be a third button in case the user has a new miband
        // this cannot be done using the dialog plugin, so a complete dialog should be designed

        // Rarely connects on the first attempt, should need at least 3.
        if (this.connectionAttempts < this.maxConnectionAttempts) {
          if (DEBUG) console.log('Attempting connect again...', this.connectionAttempts)
          this.connect(device)
        } else {
          const dialogOpts = {
            title: this.$t('errors.error'),
            message: this.$t('tasks.miband3.connectionFail'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            persistent: true
          }
          if (device.authenticated) {
            dialogOpts.options = {
              type: 'toggle',
              model: [],
              // inline: true,
              items: [
                { label: this.$t('tasks.miband3.connectionRepair'), value: 'forget', color: 'secondary' }
              ]
            }
          }
          this.$q.dialog(dialogOpts).onOk(async (options) => {
            try {
              await miband3.disconnect()
            } catch (error) {
              console.error('Problem disconnecting, but OK', error)
            }
            if (options && options.includes('forget')) {
              device.authenticated = false
              await DB.removeDeviceMiBand3()
            }
            if (device.authenticated) {
              // if already authenticated once, retry connection
              this.connect(device)
            } else {
              // device cannot be connected, start from search
              this.search()
            }
          }).onCancel(() => {
            this.abandon()
          })
        }
      }
    },
    // abandons the task
    abandon () {
      try {
        miband3.disconnect()
      } catch (err) {
        console.error('cannot disconnect miband3', err)
      }
      this.$router.go(-1)
    },
    moveToDownloadPage () {
      this.$router.replace({ name: 'miband3DataDownload', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  },
  async mounted () {
    const device = await DB.getDeviceMiBand3()
    if (device) {
      // a device has been paired in the past!
      this.connect(device)
    } else { // IOS always needs to search for devices before connecting
      this.search()
    }
  }

}
</script>
