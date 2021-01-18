<template>
  <div class="q-pa-md">
    <div v-if="devices.length > 1">{{ $t('studies.tasks.po60.moreDevices') }}</div>
    <q-list
      v-if="devices.length > 1"
      bordered
      class="q-mt-md"
    >
      <q-item
        v-for="device in devices"
        :key="device.id"
        clickable
        v-ripple
        :id="device.id"
        @click="connect(device)"
      >
        <q-item-section>{{device.id}}</q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="tapToAuthDialog"
      transition-show="scale"
      transition-hide="scale"
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card>
        <div class="q-pa-sm">
          <q-img src="https://svgshare.com/i/RBV.svg" />
        </div>
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ $t('studies.tasks.po60.tap')}}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-inner-loading :showing="showScanning">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.po60.scanning')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
    <q-inner-loading :showing="showConnecting">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.po60.connecting')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<script>
import po60 from 'modules/po60/IPulseOxDevice'
import db from 'modules/db.js'
import userinfo from 'modules/userinfo'

export default {
  name: 'PO60ConnectPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      devices: [],
      tapToAuthDialog: false,
      showScanning: false,
      showConnecting: false,
      connectionAttempts: 0,
      maxConnectionAttempts: 5
    }
  },
  methods: {
    async scan () {
      this.devices = []
      this.showScanning = true
      try {
        this.devices = await po60.scan(12000)
        console.log('All devices found:', this.devices)
        if (this.devices.length === 0) {
          this.$q.dialog({
            title: this.$t('studies.tasks.po60.noDeviceTitle'),
            message: this.$t('studies.tasks.po60.noDevice'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            persistent: true
          }).onOk(data => {
            this.scan()
          }).onCancel(() => {
            this.abandon()
          })
        } else if (this.devices.length === 1) {
          console.log('Found device:', this.devices[0])
          this.connect(this.devices[0])
        } else {
          // sort devices by RSSI, desc
          this.devices.sort((d1, d2) => { return d2.rssi - d1.rssi })
        }
      } catch (err) {
        console.error('Scan error', err)
        this.$q.dialog({
          title: this.$t('errors.error'),
          message: this.$t('studies.tasks.po60.scanFailed'),
          cancel: this.$t('common.cancel'),
          ok: this.$t('common.retry'),
          persistent: true
        }).onOk(data => {
          this.scan()
        }).onCancel(() => {
          this.abandon()
        })
      }
      this.showScanning = false
    },
    // connect to the selected device
    async connect (device) {
      this.showConnecting = true
      try {
        this.connectionAttempts++
        await po60.connect(device)
        // Authenticate after connect.
        if (!device.authenticated) this.tapToAuthDialog = true
        await po60.authenticate(device.authenticated)

        // configure the watch
        let user = userinfo.user
        const taskDescr = await db.getTaskDescription(this.studyKey, this.taskId)
        await po60.configure(user, taskDescr.hrInterval)

        this.tapToAuthDialog = false
        this.showConnecting = false

        // save the device!
        device.authenticated = true
        await db.setDeviceMiBand3(device)

        this.moveToDownloadPage()
      } catch (error) {
        console.error(error)
        this.showConnecting = false
        // TODO: there should be a third button in case the user has a new miband
        // this cannot be done using the dialog plugin, so a complete dialog should be designed
        // Rarely connects on the first attempt, should need at least 3.
        if (this.connectionAttempts < this.maxConnectionAttempts) {
          console.log('Attempting connect again...', this.connectionAttempts)
          this.connect(device)
        } else {
          this.$q.dialog({
            title: this.$t('studies.errors.error'),
            message: this.$t('studies.tasks.miband3.connectionFail'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            persistent: true
          }).onOk(async () => {
            await po60.disconnect()
            if (device.authenticated) {
              // if already authenticated once, retry connection
              this.connect(device)
            } else {
              // probably the wrong device was chosen, start from scan
              this.scan()
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
        po60.disconnect()
      } catch (err) {
        console.error('cannot disconnect pulse oximeter', err)
      }
      this.$router.push({ name: 'tasker', params: { rescheduleTasks: true } })
    },
    moveToDownloadPage () {
      this.$router.push({ name: 'po60DataDownload', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  },
  async mounted () {
    let device = await db.getDevicePO60()
    if (device) {
      // a device has been paired in the past!
      this.connect(device)
    } else {
      this.scan()
    }
  }

}
</script>
