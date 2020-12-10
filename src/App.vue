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
                <q-btn
                  v-if="$q.platform.is.android"
                  @click="openScreenLockSettingsAndroid"
                >{{ $t('pin.buttonAndroidTitle') }}</q-btn>
                <q-btn
                  v-if="$q.platform.is.ios"
                  @click="retry"
                >{{ $t('pin.buttonIOSTitle') }}</q-btn>
              </div>
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
export default {
  name: 'MobistudyApp',
  data () {
    return {
      showPINPage: false,
      showLogin: false,
      storage: undefined,
      retryClicked: false
    }
  },
  methods: {
    async openScreenLockSettingsAndroid () {
      try {
        await DB.openScreenLockSettingsAndroid() // User has successfully set a screen lock if await is resolved
        this.bootstrap() // Attempt to bootstrap the app again now that the user has set a lock
      } catch (error) {
        console.log('Screen lock was not set by the user.')
      }
    },
    retry () {
      this.retryClicked = true
      this.bootstrap()
    },
    async bootstrap () {
      // Setting up storage
      try {
        await DB.init()
        await DB.setCurrentAppVersion(process.env.APP_VERSION)
      } catch (storage) {
        if (this.retryClicked) { // User clicked retry and encrypted storage was NOT successfully initialized.
          this.retryClicked = false
          this.$q.notify({
            type: 'negative',
            message: this.$t('pin.notifyPINNotFoundMessage')
          })
        }
        this.storage = storage
        this.showPINPage = true
        return
      }
      this.showPINPage = false

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
