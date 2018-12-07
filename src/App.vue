<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
// import API from './modules/API'

export default {
  name: 'MobistudyApp',
  created () {
  //   // check if already logged in, otherwise go to login
  //   let resettingpwd = window.location.href.includes('resetPassword')
  //   if (!user.getUser().loggedin && !resettingpwd) {
  //     console.log('LOGGED OUT, GOING TO LOGIN')
  //     this.$router.push('/login')
  //     return
  //   } else {
  //     if (!resettingpwd) API.setToken(user.getUser().token)
  //   }
  //   // Add a 401 response interceptor
  //   this.$axios.interceptors.response.use(function (response) {
  //     return response
  //   }, function (error) {
  //     if (error.response.status === 401 && !error.config.url.includes('login')) {
  //       console.log('Got disconnected !')
  //       user.logout()
  //       window.location = '/#/login'
  //     }
  //     return Promise.reject(error)
  //   })
  }
}
</script>

<style>
</style>
