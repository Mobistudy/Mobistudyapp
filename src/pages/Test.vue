<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="row justify-center">
          <div class="text-h5 q-mt-lg">
            Test
          </div>

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
    console.log('starting')
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
  }
}
</script>

<style>
</style>
