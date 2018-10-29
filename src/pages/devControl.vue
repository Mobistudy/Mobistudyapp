<template>
  <q-page padding>
    <!-- content -->
    <q-btn label="get All Keys" @click="getDB()" />
    <q-btn label="get session info" @click="getSession()" />
    <q-btn label="force update" @click="this.$forceUpdate()" />
  </q-page>
</template>

<script>
let storage = window.NativeStorage

export default {
  // name: 'PageName',
  methods: {
    getDB () {
      storage.keys(function (res) {
        alert(res)
      }, function (err) {
        alert(err)
      })
    },
    getSession () {
      storage.getItem('session', function (res) {
        alert(JSON.stringify(res))
      })
    }
  }
}
</script>

<style>
</style>
