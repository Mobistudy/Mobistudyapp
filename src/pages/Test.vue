<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="row justify-center">
          <div class="text-h5 q-mt-lg">
            Test !
          </div>

          <q-btn color="white" text-color="black" label="Play toc" @click="playSound"/>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import phone from '../modules/phone'

export default {
  name: 'TestPage',
  async created () {
    console.log('starting GPS')
    let positions = 0
    if (await phone.geolocation.isAvailable()) {
      // geolocation is available
      if (await phone.geolocation.requestPermission()) {
        // got permission
        phone.geolocation.startNotifications({}, async (pos) => {
          console.log(pos)
          positions++
          if (positions === 10) {
            // stop after 10 positions retrieved
            await phone.geolocation.stopNotifications()
            console.log('stopped')
          }
        }, (err) => {
          console.error(err)
        })
      }
    }
  },
  async destroyed () {
    // stop notifications when leaving
    phone.geolocation.stopNotifications()
  },
  methods: {
    playSound () {
      phone.media.playSound('statics/sounds/toc.ogg')
    }
  }
}
</script>

<style>
</style>
