<template>
  <div id="q-app">
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
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
import phone from 'modules/phone'

export default {
  name: 'MobistudyApp',
  async created () {
    console.info('Starting Mobistudy app version', process.env.APP_VERSION)
    await DB.setCurrentAppVersion(process.env.APP_VERSION)

    await userinfo.init()
    if (userinfo.user.language) {
      console.log('Setting locale to', userinfo.user.language)
      this.$root.$i18n.locale = userinfo.user.language
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

    let hasPINCode = await phone.isPinSet()

    if (!hasPINCode && !userinfo.user.skipPinWarning) {
      await new Promise((resolve, reject) => {
        this.$q.dialog({
          title: this.$t('pin.dialogTitle'),
          message: this.$t('pin.dialogMessage'),
          options: {
            type: 'checkbox',
            model: [],
            items: [
              { label: this.$t('pin.dialogCheckboxTitle'), value: 'SKIP_WARNING', color: 'secondary' }
            ]
          },
          ok: this.$t('pin.dialogButtonTitle'),
          persistent: true,
          maximized: true
        }).onOk(data => {
          if (data[0] === 'SKIP_WARNING') {
            userinfo.user.skipPinWarning = true
            userinfo.storeUserInfo()
          }
          resolve()
        }).onCancel(() => {
          resolve()
        })
      })
    }

    // check if already logged in, otherwise go to login
    let resettingpwd =
      this.$route.path === '/resetpw' || this.$route.path === '/changepw'
    if ((!userinfo.user.loggedin || !userinfo.user.name) && !resettingpwd) {
      console.log('LOGGED OUT, GOING TO LOGIN')
      this.$router.push('/login')
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
  }
}
</script>
