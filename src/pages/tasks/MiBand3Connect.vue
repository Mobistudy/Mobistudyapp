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
          <q-inner-loading id="loading" :showing="connecting">
            <q-spinner-dots size="50px" color="primary" />
          </q-inner-loading>
        </q-item-section>
        </q-item>
      </q-list>
      <div id="buttonContainer" class="fixed-bottom text-center">
        <q-btn @click="search" round icon="bluetooth"></q-btn>
      </div>
      <q-dialog v-model="dialog">
        <q-card>
            <div class="fixed-bottom text-center">
              <q-btn icon="close" flat round dense v-close-popup />
            </div>
        </q-card>
        <q-inner-loading :showing="true">
          <q-spinner-oval size="20px" color="primary" />
        </q-inner-loading>
      </q-dialog>
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
export default {
  name: 'Miband3ConnectPage',
  data () {
    return {
      devices: [],
      connecting: false,
      dialog: false,
      nextPageLoad: false,
      loadingCounter: 10
    }
  },
  methods: {
    search () {
      miband3.search(1000).then((devices) => {
        if (devices) {
          for (const device of devices) {
            if (!this.deviceExists(device)) {
              device.connected = false
              this.devices = [...this.devices, device]
            }
          }
        }
      }).catch(console.log('Error searching for devices'))
    },
    deviceExists (device) {
      let deviceIds = this.devices.map((device) => device.id)
      return deviceIds.includes(device.id)
    },
    async connect (device) {
      this.disconnectAllDevices()
      let isConnected = await miband3.isConnected()
      if (!isConnected) {
        await miband3.connect(device, this.disconnectCallback, this.authRequiredCallback)
      } else { await miband3.disconnect(); device.connected = false }
      this.updateUI()
    },
    disconnectCallback () {

    },
    async authRequiredCallback (device, required) {
      let authenticated = await miband3.authenticate(required)
      if (authenticated) {
        device.connected = true
      }
      this.updateUI()
    },
    async disconnectAllDevices () {
      for (const device of this.devices) {
        await miband3.disconnect(device)
        device.connected = false
      }
    },
    updateUI () {
      for (const device of this.devices) {
        console.log('Device:', device.id, device.connected)
        let element = document.getElementById(device.id)
        if (device.connected) {
          element.classList.remove('disconnected')
          element.classList.add('connected')
        } else { element.classList.remove('connected'); element.classList.add('disconnected') }
      }
      this.showDialog()
    },
    showDialog () {
      if (this.isAnyConnected()) {
        this.dialog = true
        this.animateLoading()
      } else {
        this.dialog = false
      }
    },
    isAnyConnected () {
      for (const device of this.devices) {
        if (device.connected) {
          return true
        }
      }
      return false
    },
    animateLoading () {
      var loadingTimer = setInterval(() => {
        if (this.loadingCounter > 0) {
          this.loadingCounter--
        } else {
          clearInterval(loadingTimer)
        }
      }, 1000)
    }
  },
  mounted () {

  }
}
</script>
