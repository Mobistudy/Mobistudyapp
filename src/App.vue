<template>
  <div id="q-app">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API'

export default {
  name: 'MobistudyApp',
  async created () {
    console.info('Starting Mobistudy app version', process.env.APP_VERSION)
    DB.setCurrentAppVersion(process.env.APP_VERSION)

    await userinfo.init()
    if (userinfo.user.language) {
      console.log('Setting locale to', userinfo.user.language)
      this.$root.$i18n.locale = userinfo.user.language
    }
    // check if already logged in, otherwise go to login
    let resettingpwd =
      this.$route.path === '/resetpw' || this.$route.path === '/changepw'
    if ((!userinfo.user.loggedin || !userinfo.user.name) && !resettingpwd) {
      console.log('LOGGED OUT, GOING TO LOGIN')
      this.$router.push('/login')
      return
    } else {
      if (!resettingpwd) {
        API.setToken(userinfo.user.token)
        console.log('LOGGED IN, REDIRECTING TO HOME')
        this.$router.push({
          name: 'tasker',
          params: { rescheduleTasks: true, checkNewStudies: true }
        })
      }
    }
    // Add a 401 response interceptor
    this.$axios.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        if (
          error.response.status === 401 &&
          !error.config.url.includes('login')
        ) {
          console.log('Got disconnected !')
          userinfo.logout()
          window.location = '/#/login'
        }
        throw error
      }
    )
  }
}
</script>
