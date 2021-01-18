<template>
    <q-page class="q-pa-md">
        <div class="">There was too little data on your device. Do the task again later, there should be more data.</div>
        <q-btn @click="cancelTask" class="absolute-center">OK</q-btn>
    </q-page>
</template>

<script>
export default {
  props: {
    device: Object
  },
  methods: {
    async cancelTask () {
      // disconnects and go home
      try {
        await this.device.disconnect()
      } catch (err) {
        // doesn't matter if it fails here, but let's print out a message on console
        console.error('cannot disconnect', err)
      }
      this.$router.push({ name: 'tasker' })
    }
  }
}
</script>
