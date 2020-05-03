<template>
  <q-layout>
    <q-page padding>
      <div class="text-h5 q-mt-lg">
        Test Page.
      </div>
      <div>
        <q-btn color="white" text-color="black" label="TestGPS" @click="startGPS"/>
      </div>
      <p>{{coordsOutput}}</p>
      <div>
        <q-btn color="white" text-color="black" label="Play toc" @click="playSound"/>
      </div>
      <p></p>
      <div>
        <q-btn color="white" text-color="black" label="Save File" @click="saveFile"/>
      </div>
      <p>{{fileOutput}}</p>
    </q-page>
  </q-layout>
</template>

<script>
import phone from '../../modules/phone'
import files from '../../modules/files'

export default {
  name: 'TestPage',
  data () {
    return {
      coordsOutput: '',
      fileOutput: ' '
    }
  },
  async destroyed () {
    // stop notifications when leaving
    phone.geolocation.stopNotifications()
  },
  methods: {
    async startGPS () {
      this.coordsOutput = 'starting GPS'
      let positions = 0
      if (await phone.geolocation.isAvailable()) {
        // geolocation is available
        if (await phone.geolocation.requestPermission()) {
          // got permission
          phone.geolocation.startNotifications({}, async (pos) => {
            console.log(pos)
            this.coordsOutput = pos
            positions++
            if (positions === 10) {
              // stop after 10 positions retrieved
              await phone.geolocation.stopNotifications()
              this.coordsOutput = 'stopped'
            }
          }, (err) => {
            this.coordsOutput = err
          })
        }
      }
    },
    playSound () {
      phone.media.playSound('statics/sounds/toc.ogg')
    },
    async saveFile () {
      console.log('saving file')
      await files.save('test.text', { test: 'hello' })
      console.log('file saved')
      let obj = await files.load('test.text')
      this.fileOutput = obj
      console.log(obj)
    }
  }
}
</script>

<style>
</style>
