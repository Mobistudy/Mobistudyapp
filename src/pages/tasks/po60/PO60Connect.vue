<template>
  <q-page padding>
    <div
      v-if="devices.length > 1"
      class="mobitxt2"
    >{{ $t('studies.tasks.po60.moreDevices') }}</div>
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
        @click="connect(device, true)"
      >
        <q-item-section class="mobitxt1">{{device.id}}</q-item-section>
      </q-item>
    </q-list>

    <q-dialog
      v-model="instructionDialog"
      transition-show="scale"
      transition-hide="scale"
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card>
        <div class="q-pa-sm">
          <!-- <q-img src="" /> TODO add image -->
        </div>
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-body1">
              <p>{{ $t('studies.tasks.po60.takeMeasurement')}}</p>
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
  </q-page>
</template>

<script>
import po60 from 'modules/po60/IPulseOxDevice'
import db from 'modules/db.js'

export default {
  name: 'PO60ConnectPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      devices: [],
      instructionDialog: false,
      showScanning: false,
      showConnecting: false,
      connectionAttempts: 0,
      maxConnectionAttempts: 5
    }
  },
  methods: {
    async scan () {
      this.instructionDialog = true

      try {
        this.devices = await po60.scan(25000)
        this.instructionDialog = false
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
          this.connect(this.devices[0])
        } else {
          // sort devices by RSSI, desc
          this.devices.sort((d1, d2) => { return d2.rssi - d1.rssi })
          // this.connect(this.devices[0]) // connect to the device with the greatest signal strength, which probably is the one in nearest proximity.
        }
      } catch (err) {
        this.instructionDialog = false
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
    },
    // connect to the selected device
    async connect (device, skipSearch) {
      try {
        if (!skipSearch) {
          this.instructionDialog = true
          if (this.$q.platform.is.ios) {
            await po60.scanForId(device.id, 5000)
          }
        } else {
          this.showConnecting = true
        }
        this.connectionAttempts++
        await po60.connect(device)
        // connected!
        this.instructionDialog = false
        this.showConnecting = false

        // save the device!
        device.authenticated = true
        await db.setDevicePO60(device)

        this.moveToDownloadPage()
      } catch (error) {
        console.error(error)
        // TODO: there should be a third button in case the user has a new pulseoximeters
        // this cannot be done using the dialog plugin, so a complete dialog should be designed
        if (this.connectionAttempts < this.maxConnectionAttempts) {
          console.log('Attempting connect again...', this.connectionAttempts)
          this.connect(device)
        } else {
          this.connectionAttempts = 0 // reset attempt
          this.instructionDialog = false
          this.$q.dialog({
            title: this.$t('errors.error'),
            message: this.$t('studies.tasks.po60.connectionFail'),
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
      this.$router.push({ name: 'tasker' })
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
