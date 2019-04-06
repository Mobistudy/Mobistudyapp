<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div style="width: 90vw">
          <p class="q-headline">Login</p>
          <!--<q-input v-model="username" float-label="Username" />-->
          <q-input v-model="username" float-label="Email" />
          <q-input v-model="password" float-label="Password" type="password" />
          <div class="row">
            <q-btn class="q-ma-sm" label="Login" color="positive" @click="login" type="submit" />
            <q-btn class="q-ma-sm" label="Register" color="secondary" to="register" />
            <q-btn class="q-ma-sm" label="Lost password" to="resetpw" color="tertiary" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import DB from '../../modules/db'
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import notifications from '../../modules/notifications'

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
      notifications.cancelAll()
      userinfo.logout()
      API.unsetToken()
      DB.emptyDB()
    }
  },
  methods: {
    async login () {
      try {
        let user = await API.login(this.username.toLowerCase(), this.password)
        console.info('Logged in! ', user)
        // user is authenticated, return user object
        await userinfo.login(user)
        API.setToken(user.token)

        // retrieve the profile information
        // TODO: if the profile information is not available, it should go to a dedicated page where to fill it in
        let profile = await API.getProfile(userinfo.user._key)
        await userinfo.setProfile(profile)
        if (profile.studies) await DB.setStudiesParticipation(profile.studies)

        this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
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
