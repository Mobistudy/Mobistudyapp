<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <!-- content -->
        <div style="width: 90vw">
          <q-input v-model="username" lower-case float-label="Username" />
          <q-input v-model="password" float-label="Password" type="password" />
          <br />
          <q-btn class="float-right" label="Login" color="positive" @click="login" type="submit" />
          <br />
          <q-btn label="Register" to="register" color="secondary" />&nbsp;
          <q-btn label="Reset Password" to="resetPW" color="secondary" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import DB from '../../modules/db'
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'

export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  async created () {
    if (userinfo.user.loggedin) {
      userinfo.logout()
      API.unsetToken()
      DB.emptyDB()
    }
  },
  methods: {
    async login () {
      try {
        let user = await API.login(this.username, this.password)
        console.info('Logged in! ', user)
        // user is authenticated, return user object
        await userinfo.login(user)
        API.setToken(userinfo.token)

        let studies = await API.getUserStudies(user._key)
        await DB.setStudies(studies)

        this.$router.push('/tasker')
      } catch (error) {
        console.error(error)
        this.error = true
        if (error.response && error.response.status === 401) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot login, wrong credentials',
            icon: 'report_problem'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: 'Login failed: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>

<style>
</style>
