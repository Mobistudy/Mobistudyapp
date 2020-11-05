<template>
    <div class="q-pa-md">
      <q-list v-if="devices.length > 0" bordered>
        <q-item
        v-for="device in devices"
        :key="device.id"
        clickable
        v-ripple
        :id="device.id"
        @click="connect(device)"
        >
        <q-item-section >{{device.id}}</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
        </q-item>
      </q-list>
      <div id="buttonContainer" class="fixed-bottom text-center">
        <q-btn @click="search" round icon="bluetooth"></q-btn>
      </div>
      <q-dialog v-model="tapToAuthDialog">
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
      <q-dialog v-model="successAuthDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-center">Authentication successful</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-btn @click="debug" icon="bug">Debug</q-btn>
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
import miband3 from 'modules/miband3/miband3.mock.js'
import db from 'modules/db.js'
export default {
  name: 'Miband3ConnectPage',
  data () {
    return {
      devices: [],
      tapToAuthDialog: false,
      successAuthDialog: false
    }
  },
  methods: {
    debug () {
      db.setKeysMiBand3(null)
    },
    async search () {
      let devices = await miband3.search(1000)
      this.addDevices(devices)
    },
    addDevices (devices) {
      if (devices) {
        for (const device of devices) {
          if (!this.deviceInUI(device)) { // Checks UI list of devices to see if the device is already added
            this.addDevice(device)
          }
        }
      }
    },
    deviceInUI (device) {
      let deviceIds = this.devices.map((device) => device.id)
      return deviceIds.includes(device.id)
    },
    addDevice (device) {
      this.devices = [...this.devices, device]
    },
    async connect (device) {
      await this.disconnectAllDevices()
      let isConnected = await miband3.isConnected()
      if (!isConnected) {
        await miband3.connect(device, this.disconnectCallback, this.authRequiredCallback)
      } else { await miband3.disconnect(); device.connected = false }
      this.updateUI()
    },
    disconnectCallback () {
      // To be done.
    },
    async authRequiredCallback (device, required) {
      this.showFirstDialog()
      await this.authenticate(device, required)
      this.hideFirstDialog()
      await this.animateSecondDialog()
      this.updateUI()
      this.moveToDownloadPage()
    },
    async disconnectAllDevices () {
      for (const device of this.devices) {
        await miband3.disconnect(device)
        device.connected = false
      }
    },
    async authenticate (device, required) {
      let authenticated = await miband3.authenticate(required)
      device.authenticated = authenticated
      await db.setDeviceMiBand3(device.id, device)
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
      this.$router.push({ name: 'miband3DataDownload' })
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
    // Retrieving already authenticated devices to display in the UI list.
    let deviceKeys = await db.getKeysMiBand3()
    if (deviceKeys) {
      for (const key of deviceKeys) {
        let device = await db.getDeviceMiBand3(key)
        if (device.authenticated) {
          this.addDevice(device)
        }
      }
    }
  }

}
</script>
