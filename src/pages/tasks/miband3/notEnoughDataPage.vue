<template>
    <q-page class="q-pa-md row justify-center align-items">
        <div>There was too little data on your miband device. Do the task again later, there should be more data.</div>
        <q-btn @click="cancelTask" round dense>OK</q-btn>
    </q-page>
</template>

<script>
import miband3 from 'modules/miband3/miband3'
export default {
  methods: {
    cancelTask () {
        // disconnects and go home
      try {
        await miband3.disconnect()
      } catch (err) {
        // doesn't matter if it fails here, but let's print out a message on console
        console.error('cannot disconnect miband3', err)
      }
      this.$router.push({ name: 'tasker' })
    }
  }
}
</script>
