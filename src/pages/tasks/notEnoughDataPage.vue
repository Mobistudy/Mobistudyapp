<template>
    <q-page class="q-pa-md">
        <div class="">There was too little data on your device. Do the task again later, there should be more data.</div>
        <q-btn @click="cancelTask" class="absolute-center">OK</q-btn>
    </q-page>
</template>

<script>
import miband3 from 'modules/miband3/miband3'
export default {

  methods: {
    async cancelTask () {
      // disconnects and go home
      try {
        await miband3.disconnect()
      } catch (err) {
        // doesn't matter if it fails here, but let's print out a message on console
        console.error('cannot disconnect', err)
      }
      this.$router.push({ name: 'tasker' })
    }
  }
}
</script>
