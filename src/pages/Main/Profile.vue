<template>
  <q-page padding>
    <!-- content -->
    <q-field
      icon="face"
    >
      <q-input float-label="First Name" disabled v-model="profile.firstname" />
      <q-input float-label="Surname" disabled v-model="profile.surname" />
    </q-field>
    <q-field
      icon="mail_outline"
    >
      <q-input float-label="Email" v-model="profile.email" />
    </q-field>
    <br />
    <q-btn color="secondary" to="changePW" label="Change Password" />
    <q-btn color="negative" class="float-right" label="Logout" @click="logout()" />
  </q-page>
</template>

<script>
let db = require('src/modules/db')

export default {
  data () {
    return {
      profile: null
    }
  },
  created () {
    this.getProfile()
  },
  computed: {

  },
  methods: {
    logout () {
      let _this = this
      db.rmUserSession(function (res) {
        if (res) {
          _this.$emit('recheck-login')
          _this.$router.push('/login')
        } else {
          alert('logout failed')
        }
      })
    },
    getProfile () {
      let _this = this
      db.getUserSession(function (res, err) {
        if (res !== -1) {
          _this.profile = res
        }
      })
    }
  }
  // name: 'PageName',
}
</script>

<style>
</style>
