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

export default {
  // name: 'PageName',
  methods: {
    login () {
      let users = [
        {
          username: 'jameson',
          password: 'test',
          userID: 'b61dbaac193a724ef623',
          firstname: 'Jameson',
          surname: 'Lee',
          email: 'jameson.lee@worc.ox.ac.uk'
        }
      ]
      let idx = users.findIndex(x => x.username.toLowerCase() === this.$data.username)
      if (idx !== -1 && users[idx].password === this.password) {
        db.setUserSession(users[idx], function (res) {
          if (res) {
            this.$router.push('/tasker')
          } else {
            this.error = true
          }
        })
      } else {
        this.error = true
      }
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
