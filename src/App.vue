<template>
  <div id="q-app">
    <div v-if="showPINPage">
      <q-layout>
        <q-page-container>
          <q-page class="flex flex-center q-pa-md">
            <div style="text-align: center">
              <img
                class="q-mb-sm"
                style="width:40vw; max-width:150px"
                src="/statics/screen_lock_landscape-black-18dp.svg"
              />
              <div class="text-body1 q-mt-xl">
                <h6 class="text-overline">{{ $t('pin.title') }}</h6>
                <p class="q-mb-lg"> {{ $t('pin.message') }}</p>
                <q-btn @click="retry">{{ $t('pin.buttonTitle') }}</q-btn>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>

    <div v-if="enableRouting">
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
import phone from 'modules/phone'
export default {
  name: 'MobistudyApp',
  data () {
    return {
      enableRouting: false,
      showPINPage: false
    }
  },
  methods: {
    async onResume () {
      console.log('onResume called...')
      try {
        await this.testDBAccess()
        await phone.pin.isPINSet()
      } catch (error) {
        if (error) {
          console.log('onResume error', error)
          if (error.message === 'Failed to obtain information about private key') { // DB is corrupted. User needs to uninstall.
            this.showPINPage = false
            this.enableRouting = true
            this.$router.replace({ name: 'pinErrorPage' })
          } else if (error.message === 'NO_PIN_SETUP') {
            console.log('Showing PIN page')
            this.enableRouting = false
            this.showPINPage = true
          }
        }
      }
    },
    async testDBAccess () { // If DB is corrupted this will return a rejected error message.
      return DB.getCurrentAppVersion() // Attempts to get the current app version
    },
    async retry () {
      try {
        await phone.pin.isPINSet()
        console.log('Route on retry:', this.$route.name)
        if (this.$route.name !== '/' && this.$route.name !== undefined) {
          this.showPINPage = false
          this.enableRouting = true
        } else {
          await DB.init()
          this.bootstrap()
        }
      } catch (error) {
        console.log('Error retry:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('pin.notifyPINNotFoundMessage')
        })
      }
    },
    async bootstrap () {
      this.showPINPage = false // Bootstrap is only called if PIN is already set, hide PIN page.

      try {
        console.info('Starting Mobistudy app version', process.env.APP_VERSION)
        await DB.setCurrentAppVersion(process.env.APP_VERSION)
        await userinfo.init()
        if (userinfo.user.language) {
          console.log('Setting locale to', userinfo.user.language)
          this.$root.$i18n.locale = userinfo.user.language
        }
      } catch (error) {
        console.log('Error bootstraping user info:', error)
      }
      // check if already logged in, otherwise go to login
      let resettingpwd =
        this.$route.path === '/resetpw' || this.$route.path === '/changepw'
      if ((!userinfo.user.loggedin || !userinfo.user.name) && !resettingpwd) {
        console.log('LOGGED OUT, GOING TO LOGIN')
        this.enableRouting = true
        this.$router.replace({
          name: 'login'
        })
      } else {
        this.enableRouting = true
        if (!resettingpwd) {
          API.setToken(userinfo.user.token)
          console.log('LOGGED IN, REDIRECTING TO HOME')
          this.$router.replace({
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
    document.addEventListener('resume', this.onResume, false)
    try {
      await phone.pin.isPINSet()
      await DB.init()
      await this.testDBAccess()
      this.bootstrap()
    } catch (error) {
      if (error.message === 'Failed to obtain information about private key') { // DB is corrupted. User needs to uninstall.
        this.enableRouting = true
        this.$router.replace('pinErrorPage')
      } else {
        this.showPINPage = true
      }
    }
  }
}
</script>
