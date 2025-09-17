<template>
  <q-layout>
    <q-page padding>
      <div class="text-h5 q-mt-lg">
        Test Page. App version: {{ appVersion }}
      </div>
      <div class="q-mt-md">
        <q-btn color="white" text-color="black" label="Start GPS" @click="startGPS" />
        <q-btn color="white" text-color="black" label="Stop GPS" @click="stopGPS" />
      </div>
      <p>{{ coordsOutput }}</p>
      <audio ref="sound_click">
        <source src="sounds/click.wav" type="audio/wav" />
      </audio>
      <div class="q-mt-md">
        <q-btn color="white" text-color="black" label="Play sound" @touchstart="playSound" />
      </div>
      <div class="q-mt-md">
        <q-btn color="white" text-color="black" label="Save File" @click="saveFile" />
      </div>
      <p>{{ fileOutput }}</p>
      <div class="q-mt-md">
        <q-btn color="white" text-color="black" label="Login" @click="login" />
      </div>
      <div class="q-mt-md">
        <q-btn color="white" text-color="black" label="Send File" @click="sendFile" />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
const DEBUG = process.env.DEBUG

import phone from '@shared/phone'
import files from '@shared/files/files'
import API from '@shared/API'

export default {
  name: 'TestPage',
  data () {
    return {
      appVersion: process.env.APP_VERSION,
      coordsOutput: 'GPS stopped',
      fileOutput: 'No file read'
    }
  },
  async unmounted () {
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
            if (DEBUG) console.log('Got position', pos)
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
      if (DEBUG) console.log('saving file')
      await files.save('test.text', 'shared', { test: 'hello' })
      if (DEBUG) console.log('file saved')
      const txt = await files.load('test.text', 'shared', 'text')
      this.fileOutput = 'File content: ' + txt
      if (DEBUG) console.log(txt)
    },
    async login () {
      const user = await API.login('dariosalvi78@gmail.com', 'Buggym78Buggy')
      API.setToken(user.token)
      if (DEBUG) console.log('logged in', user)
    },
    async sendFile () {
      const enc = new TextEncoder()
      const blob = enc.encode('test raw data')
      const reply = await API.sendAttachment('1978', 9, 'test.txt', blob)
      if (DEBUG) console.log('file saved as', reply)
    }
  }
}
</script>

<style></style>
