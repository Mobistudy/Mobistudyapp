<template>
  <q-page padding>
    <!-- content -->
    <q-btn label="get All Keys" @click="getDB()" />
    <q-btn label="get session info" @click="getSession()" />
    <q-btn label="force update" @click="forceUpdate()" />
    <q-btn label="get studies" @click="getStudies" />
    <q-btn label="add study 9999" @click="set9Study()" />
    <q-btn label="rm study 9999" @click="rm9Study()" />
    <q-btn label="add study 1234" @click="setStudy('1234')" />
    <q-btn label="rm study def" @click="rmStudy('def')" />
  </q-page>
</template>

<script>
let storage = window.NativeStorage
let db = require('src/modules/db')
let api = require('src/modules/mobistudyAPI')

export default {
  // name: 'PageName',
  methods: {
    getStudies () {
      db.getStudies().then(function (res) {
        console.log(res)
      })
    },
    setStudy (key) {
      api.getStudyConfig(key).then(function (res) {
        db.addStudy(key, res)
      })
      // db.addStudy(key).then(function (res) {
      //   console.log(res)
      // }).then(db.getStudies).then(function (res) {
      //   console.log(res)
      // })
    },
    rmStudy (key) {
      db.removeStudy(key).then(function (res) {
        console.log(res)
      }).then(db.getStudies).then(function (res) {
        console.log(res)
      })
    },
    set9Study () {
      api.getStudyConfig('9999').then(function (res) {
        db.addStudy('9999', res)
      })
    },
    rm9Study () {
      db.removeStudy('9999')
    },
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
    },
    forceUpdate () {
      // this.$forceupdate()
      this.$router.go(0)
    }
  }
}
</script>

<style>
</style>
