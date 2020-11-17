<template>
  <div class="q-pa-md">
    <q-list
      v-if="devices.length > 0"
      bordered
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
    <div
      id="buttonContainer"
      class="fixed-bottom text-center"
    >
    </div>
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
              Tap the device on your wrist
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="severalDevicesDialog"
      transition-show="scale"
      transition-hide="scale"
      no-esc-dismiss
      no-backdrop-dismiss
    >
     <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="info" color="yellow" text-color="white" />
          <span>More than one MiBand 3 device was found. The nearest in proximity is the first device in the list.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="errorSearchDialog"
      transition-show="scale"
      transition-hide="scale"
      no-esc-dismiss
      no-backdrop-dismiss
    >
     <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="search" color="primary" text-color="white" />
          <span>Could not search for any device. Please make sure your bluetooth is on. Would you like to search again?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="search" flat label="Yes" color="primary" v-close-popup />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="errorNoDeviceDialog"
      transition-show="scale"
      transition-hide="scale"
      no-esc-dismiss
      no-backdrop-dismiss
    >
     <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="search" color="primary" text-color="white" />
          <span>No devices were found. Would you like to search again?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="search" flat label="Yes" color="primary" v-close-popup />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
     <q-inner-loading :showing="showSearching">
      <div class="text-overline" color="dark-grey">Searching</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
    <q-inner-loading :showing="showConnecting">
      <div class="text-overline" color="dark-grey">Connecting</div>
      <q-spinner-dots
        size="40px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<style scoped>
#buttonContainer {
  height: 20vh;
}
.connected {
  color: green;
}
.disconnected {
  color: red;
}
</style>

<script>
// import miband3 from 'modules/miband3/miband3.mock.js'
import miband3Module from 'modules/miband3/Miband3Module.js'
import db from 'modules/db.js'
export default {
  name: 'Miband3ConnectPage',
  props: {
    icon: String,
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      devices: [],
      tapToAuthDialog: false,
      severalDevicesDialog: false,
      errorSearchDialog: false,
      errorNoDeviceDialog: false,
      showSearching: false,
      showConnecting: false
    }
  },
  methods: {
    async search () {
      this.showSearching = true
      console.log('Searching')
      try {
        // await miband3.search(1000, 1, this.deviceCallback, this.cbkFailureSearch)
        await miband3Module.scan(10000, this.deviceCallback, this.cbkFailureSearch)
        console.log('All devices found:', this.devices.length)
        if (this.moreThanOneDevice()) {
          this.severalDevicesDialog = true
        } else if (this.noDevice()) {
          this.errorNoDeviceDialog = true
        } else if (this.oneDevice()) {
          this.showSearching = false
          console.log('Found device:', this.devices[0])
          let deviceToUse = await this.getDeviceToUse(this.devices[0])
          console.log('Matching found device with local device', 'Found:', this.devices[0], 'Local:', deviceToUse)
          this.connect(deviceToUse)
        }
      } catch (err) {
        console.log('Catching search error')
      }
      this.showSearching = false
    },
    async getDeviceToUse (device) {
      // Get associated local storage device, which may contain a key but also info about authentication.
      let deviceToUse = await db.getDeviceMiBand3(device.id)
      console.log('Device exists locally:', deviceToUse)
      if (!deviceToUse) {
        // If there is no stored device, use the device object received from the connect callback.
        deviceToUse = device
      }
      console.log('Device chosen to be used:', deviceToUse)
      return deviceToUse
    },
    cbkFailureSearch () {
      this.errorSearchDialog = true
    },
    oneDevice () {
      return this.devices.length === 1
    },
    moreThanOneDevice () {
      if (this.devices.length > 1) {
        return true
      } else { return false }
    },
    noDevice () {
      if (this.devices.length === 0) {
        return true
      } else {
        return false
      }
    },
    deviceCallback (device) {
      if (device) {
        if (!this.deviceInUI(device)) { // Checks UI list of devices to see if the device is already added
          console.log('Found device callback:', device)
          this.addDevice(device)
        }
      }
    },
    deviceInUI (device) {
      let deviceIds = this.devices.map((device) => device.id)
      return deviceIds.includes(device.id)
    },
    addDevice (device) {
      if (this.devices.length === 0) {
        this.devices.push(device)
        return
      }
      let currentHighestRSSI = this.devices[0].rssi
      if (currentHighestRSSI > device.rssi) {
        this.devices.push(device)
      } else {
        this.devices.unshift(device)
      }
    },
    async connect (device) {
      this.showConnecting = true
      // Checks if the device found is the same as what was stored locally
      let deviceToUse = await this.getDeviceToUse(device)
      await this.initModuleWithDevice(deviceToUse)

      let isConnected = await miband3Module.isConnected()
      // let isConnected = await miband3.isConnected()
      console.log('Is currently connected:', isConnected)
      if (!isConnected) {
        try {
          // await miband3.connect(device, this.disconnectCallback, this.authRequiredCallback)
          console.log('Connecting')
          await miband3Module.connect(deviceToUse, this.connectFailedCallback, this.authRequiredCallback)
        } catch (error) {
          // Connection fails... What to do?, call disconnect callback?
          this.showConnecting = false
        }
      } else {
        console.log('Disconnecting')
        await miband3Module.disconnect()
        // await miband3.disconnect()
        deviceToUse.connected = false
        this.showConnecting = false
      }
      this.updateUI()
    },
    async connectFailedCallback (device) {
      // await this.connect(device)
    },
    async initModuleWithDevice (device) {
      // Check the device already has an associated key.
      // Initialize module with the device that is to be connected.
      let key = device.key
      if (key) {
        miband3Module.init(device.id, device.key)
      } else {
        key = miband3Module.generateKey()
        device.key = key
        await db.setDeviceMiBand3(device)
        miband3Module.init(device.id, device.key)
      }
    },
    disconnectCallback () {
      // TODO
    },
    async authRequiredCallback (device) {
      this.showFirstDialog()
      await this.authenticate(device)
      this.hideFirstDialog()
      await this.animateSecondDialog()
      this.updateUI()
      this.showConnecting = false
      // this.moveToDownloadPage()
    },
    async disconnectAllDevices () {
      for (const device of this.devices) {
        // await miband3.disconnect(device)
        miband3Module.init(device.id, device.key)
        await miband3Module.disconnect()
        device.connected = false
      }
    },
    async authenticate (device) {
      try {
        let authenticated = device.authenticated
        if (!authenticated) authenticated = false
        await miband3Module.authenticate(authenticated)
        device.authenticated = true
        await db.setDeviceMiBand3(device)
      } catch (error) {
      }
      // let authenticated = await miband3.authenticate(required)
    },
    updateUI () {
      for (const device of this.devices) {
        let element = document.getElementById(device.id)
        if (device.connected) {
          element.classList.remove('disconnected')
          element.classList.add('connected')
        } else { element.classList.remove('connected'); element.classList.add('disconnected') }
      }
    },
    showFirstDialog () {
      this.tapToAuthDialog = true
    },
    hideFirstDialog () {
      this.tapToAuthDialog = false
    },
    animateSecondDialog () {
      return new Promise((resolve, reject) => {
        this.showSecondDialog()
        setTimeout(() => {
          this.hideSecondDialog()
          resolve()
        }, 1000)
      })
    },
    showSecondDialog () {
      this.successAuthDialog = true
    },
    hideSecondDialog () {
      this.successAuthDialog = false
    },
    moveToDownloadPage () {
      this.$router.push({ name: 'miband3DataDownload', params: { icon: this.icon, studyKey: this.studyKey, taskId: this.taskId } })
    },
    isAnyConnected () { // May be removed in the future.
      for (const device of this.devices) {
        if (device.connected) {
          return true
        }
      }
      return false
    }
  },
  async mounted () {
    this.search()
  }

}
</script>
