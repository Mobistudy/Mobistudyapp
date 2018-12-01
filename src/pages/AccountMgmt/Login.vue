<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
    <div style="width: 90vw">
      <q-input v-model="username" :error="error" lower-case float-label="Username" />
      <q-input v-model="password" :error="error" float-label="Password" type="password" />
      <br />
      <p v-if="error" class="text-negative q-caption">Incorrect username or password.</p>
      <q-btn label="Register" to="register" color="secondary" />&nbsp;
      <q-btn label="Reset Password" to="resetPW" color="secondary" />
      <q-btn class="float-right" label="Login" color="positive" @click="login" type="submit" />
    </div>
  </q-page>
</template>

<script>
/* eslint-disable no-return-assign */
let db = require('src/modules/db')
let api = require('src/modules/mobistudyAPI')

export default {
  // name: 'PageName',
  methods: {
    login () {
      let _this = this
      api.authUser(this.username, this.password).then(function (res) {
        if (res === false) {
          // user is unauthenticated
          _this.error = true
        } else {
          // user is authenticated, return user object
          db.setUserSession(res).then(function () {
            _this.$emit('recheck-login')
            _this.$router.push('/tasker')
          })
        }
      }).catch(function (err) {
        console.log(err)
        _this.error = true
      })
    }
  },
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  }
}
</script>

<style>
</style>
