<template>
  <q-layout>
    <q-page padding>
      <div class="text-h5 q-mt-lg">
        Test Page. App version: {{ appVersion }}
      </div>
      <div class="q-mt-md">
        <q-btn
          color="white"
          text-color="black"
          label="Start GPS"
          @click="startGPS"
        />
        <q-btn
          color="white"
          text-color="black"
          label="Stop GPS"
          @click="stopGPS"
        />
      </div>
      <p>{{coordsOutput}}</p>
      <audio ref="sound_click">
        <source
          src="sounds/click.wav"
          type="audio/wav"
        />
      </audio>
      <div class="q-mt-md">
        <q-btn
          color="white"
          text-color="black"
          label="Play sound"
          @touchstart="playSound"
        />
      </div>
      <div class="q-mt-md">
        <q-btn
          color="white"
          text-color="black"
          label="Save File"
          @click="saveFile"
        />
      </div>
      <p>{{fileOutput}}</p>
      <div class="q-mt-md">
        <q-btn
          color="white"
          text-color="black"
          label="Login"
          @click="login"
        />
      </div>
      <div class="q-mt-md">
        <q-btn
          color="white"
          text-color="black"
          label="Send File"
          @click="sendFile"
        />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import phone from 'modules/phone/phone'
import files from 'modules/files'
import API from 'modules/API/API'

export default {
  name: 'TestPage',
  data () {
    return {
      appVersion: process.env.APP_VERSION,
      coordsOutput: 'GPS stopped',
      fileOutput: 'No file read'
    }
  },
  async destroyed () {
    // stop notifications when leaving
    phone.geolocation.stopNotifications()
  },
  methods: {
    async startGPS () {
      this.coordsOutput = 'starting GPS'
      if (await phone.geolocation.isAvailable()) {
        // geolocation is available
        if (await phone.geolocation.requestPermission()) {
          // got permission
          phone.geolocation.startNotifications({
            maximumAge: 5000,
            timeout: 5000,
            enableHighAccuracy: true
          }, async (pos) => {
            console.log(pos)
            this.coordsOutput = pos
          }, (err) => {
            this.coordsOutput = err
          })
        }
      }
    },
    async stopGPS () {
      await phone.geolocation.stopNotifications()
      this.coordsOutput = 'GPS stopped'
    },
    playSound () {
      this.$refs.sound_click.play()
    },
    async saveFile () {
      console.log('saving file')
      await files.save('test.text', 'shared', { test: 'hello' })
      console.log('file saved')
      let txt = await files.load('test.text', 'shared', 'text')
      this.fileOutput = 'File content: ' + txt
      console.log(txt)
    },
    async login () {
      let user = await API.login('dariosalvi78@gmail.com', 'Buggym78Buggy')
      API.setToken(user.token)
      console.log('logged in', user)
    },
    async sendFile () {
      var enc = new TextEncoder()
      let blob = enc.encode('test raw data')
      let reply = await API.sendAttachment('1978', 9, 'test.txt', blob)
      console.log('file saved as', reply)
    }
  }
}
</script>

<style>
</style>
