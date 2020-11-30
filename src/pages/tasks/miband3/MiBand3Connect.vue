<template>
  <div class="q-pa-md">
    <div v-if="devices.length > 1">{{ $t('studies.tasks.miband3.moreDevices') }}</div>
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
              {{ $t('studies.tasks.miband3.tap')}}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-inner-loading :showing="showSearching">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.miband3.searching')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
    <q-inner-loading :showing="showConnecting">
      <div
        class="text-overline"
        color="dark-grey"
      >{{$t('studies.tasks.miband3.connecting')}}</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<script>
import miband3 from 'modules/miband3/miband3'
import db from 'modules/db.js'
import userinfo from 'modules/userinfo'

export default {
  name: 'Miband3ConnectPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      devices: [],
      tapToAuthDialog: false,
      showSearching: false,
      showConnecting: false
    }
  },
  methods: {
    async search () {
      this.devices = []
      this.showSearching = true
      try {
        this.devices = await miband3.search(5000)
        console.log('All devices found:', this.devices)
        if (this.devices.length === 0) {
          this.$q.dialog({
            title: this.$t('studies.tasks.miband3.noDeviceTitle'),
            message: this.$t('studies.tasks.miband3.noDevice'),
            cancel: this.$t('common.cancel'),
            ok: this.$t('common.retry'),
            persistent: true
          }).onOk(data => {
            this.search()
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
        console.error('Search error', err)
        this.$q.dialog({
          title: this.$t('errors.error'),
          message: this.$t('studies.tasks.miband3.searchFailed'),
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
        await miband3.connect(device)
        // Authenticate after connect.
        if (!device.authenticated) this.tapToAuthDialog = true // TODO: Add flag to indicate if its the first authentication.
        await miband3.authenticate(device.authenticated)

        // configure the watch
        let user = userinfo.user
        const taskDescr = await db.getTaskDescription(this.studyKey, this.taskId)
        await miband3.configure(user, taskDescr.hrInterval)

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
        this.$q.dialog({
          title: this.$t('errors.error'),
          message: this.$t('studies.tasks.miband3.connectionFail'),
          cancel: this.$t('common.cancel'),
          ok: this.$t('common.retry'),
          persistent: true
        }).onOk(async () => {
          await miband3.disconnect()
          if (device.authenticated) {
            // if already authenticated once, retry connection
            this.connect(device)
          } else {
            // probably the wrong device was chosen, start from search
            this.search()
          }
        }).onCancel(() => {
          this.abandon()
        })
      }
    },
    // abandons the task
    abandon () {
      try {
        miband3.disconnect()
      } catch (err) {
        console.error('cannot disconnect miband3', err)
      }
      this.$router.push({ name: 'tasker', params: { rescheduleTasks: true } })
    },
    moveToDownloadPage () {
      this.$router.push({ name: 'miband3DataDownload', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  },
  async mounted () {
    let device = await db.getDeviceMiBand3()
    if (device) {
      // a device has been paired in the past!
      this.connect(device)
    } else {
      this.search()
    }
  }

}
</script>
