<template>
  <div id="q-app">
    <div v-if="showPINPage">
      <q-layout>
        <q-page-container>
          <q-page class="flex flex-center q-pa-md">
            <div class="text-body1" style="text-align: center">
              <p>Please, set a screen lock, more text here that i am not so sure about.</p>
              <q-btn @click="setScreenLock">Set screen lock</q-btn>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <div v-if="showLogin">
      <transition
        appear
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API'
// import phone from 'modules/phone'
let storage
export default {
  name: 'MobistudyApp',
  data () {
    return {
      showPINPage: false,
      showLogin: false
    }
  },
  methods: {
    async setScreenLock () {
      console.log('Storage:', storage)
      storage.secureDevice(
        () => {
          this.bootstrap()
        },
        () => {
          this.bootstrap()
        })
    },

    async bootstrap () {
      // Setting up storage
      console.log('Before init DB.')

      let storageResponse = await DB.init()
      console.log('Storage init DB response:', storageResponse)
      let storageInitialized = storageResponse[0]
      if (!storageInitialized) { // Encrypted storage must be initialized before the rest of the bootstrap code runs.
        storage = storageResponse[1]
        this.showPINPage = true
        return
      }
      this.showPINPage = false
      console.info('Starting Mobistudy app version', process.env.APP_VERSION)
      await DB.setCurrentAppVersion(process.env.APP_VERSION)

      try {
        await userinfo.init()
      } catch (error) {

      }
      if (userinfo.user.language) {
        console.log('Setting locale to', userinfo.user.language)
        this.$root.$i18n.locale = userinfo.user.language
      }

      // check if already logged in, otherwise go to login
      let resettingpwd =
      this.$route.path === '/resetpw' || this.$route.path === '/changepw'
      if ((!userinfo.user.loggedin || !userinfo.user.name) && !resettingpwd) {
        console.log('LOGGED OUT, GOING TO LOGIN')
        this.showLogin = true
      } else {
        if (!resettingpwd) {
          API.setToken(userinfo.user.token)
          console.log('LOGGED IN, REDIRECTING TO HOME')
          this.showLogin = true
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
  },
  async created () {
    this.bootstrap()
  }
}
</script>
