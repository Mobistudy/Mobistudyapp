<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import userinfo from './modules/userinfo'
import API from './modules/API'
import session from './modules/session'

export default {
  name: 'MobistudyApp',
  async created () {
    session.appStarted = new Date()
    await userinfo.init()
    // check if already logged in, otherwise go to login
    let resettingpwd = (this.$route.path === '/resetpw') || (this.$route.path === '/changepw')
    if (!userinfo.user.loggedin && !resettingpwd) {
      console.log('LOGGED OUT, GOING TO LOGIN')
      this.$router.push('/login')
      return
    } else {
      if (!resettingpwd) API.setToken(userinfo.user.token)
    }
    // Add a 401 response interceptor
    this.$axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (error.response.status === 401 && !error.config.url.includes('login')) {
        console.log('Got disconnected !')
        userinfo.logout()
        window.location = '/#/login'
      }
      throw error
    })
  }
}
</script>

<style>
</style>
