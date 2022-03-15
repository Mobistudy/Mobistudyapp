<template>
  <div id="q-app">
    <div v-if="showPINPage">
      <q-layout>
        <q-page-container>
          <q-page class="flex flex-center q-pa-md">
            <div class="text-center">
              <q-icon
                v-if="dbCorrupted"
                name="warning"
                class="text-negative"
                style="font-size: 6rem;"
              />
              <q-icon
                v-if="!dbCorrupted"
                name="screen_lock_landscape"
                class="text-negative"
                style="font-size: 6rem;"
              />
              <div class="text-body1 q-mt-xl">
                <div v-if="!dbCorrupted">
                  <h6>{{ $t('pin.pinNotSetTitle') }}</h6>
                  <p class="q-mb-lg"> {{ $t('pin.pinNotSet') }}</p>
                </div>
                <div v-if="dbCorrupted">
                  <h6>{{ $t('pin.dbCorruptedTitle') }}</h6>
                  <p class="q-mb-lg"> {{ $t('pin.dbCorrupted') }}</p>
                </div>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>

    <div v-if="enableRouting">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
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
import API from 'modules/API/API'
import phone from 'modules/phone/phone'
export default {
  name: 'MobistudyApp',
  data () {
    return {
      enableRouting: false,
      showPINPage: false,
      dbCorrupted: false,
      bootstrapped: false
    }
  },
  methods: {
    async onResume () {
      try {
        await phone.pin.isPINSet()
        this.showPINPage = false
        this.enableRouting = true
      } catch (error) {
        this.enableRouting = false
        this.showPINPage = true
      }
    },
    onDBCorrupted () {
      this.enableRouting = false
      this.dbCorrupted = true
      this.showPINPage = true
    },
    async bootstrap () {
      try {
        console.info('Starting Mobistudy app version', process.env.APP_VERSION)
        await DB.init()
        await DB.getCurrentAppVersion()
        await DB.setCurrentAppVersion(process.env.APP_VERSION)
        await userinfo.init()
        if (userinfo.user.language) {
          console.log('Setting locale to', userinfo.user.language)
          this.$root.$i18n.locale = userinfo.user.language
        }

        // here we are sure that the database works fine
        this.showPINPage = false
      } catch (error) {
        console.error('Error bootstraping', error)
        this.showPINPage = true
        this.enableRouting = false
        return
      }
      // check if already logged in, otherwise go to intro
      let resettingpwd =
        this.$route.path === '/resetpw' || this.$route.path === '/changepw'
      if ((!userinfo.user.loggedin || !userinfo.user.name) && !resettingpwd) {
        this.$router.replace({
          name: 'intro'
        })
        this.enableRouting = true
      } else {
        if (!resettingpwd) {
          API.setToken(userinfo.user.token)
          console.log('LOGGED IN, REDIRECTING TO HOME')
          this.$router.replace({ name: 'tasker' })
          this.enableRouting = true
        }
      }

      // Add a 401 response interceptor
      this.$axios.interceptors.response.use(
        function (response) {
          return response
        },
        async function (error) {
          if (
            error.response &&
            error.response.status &&
            error.response.status === 401 &&
            !error.config.url.includes('login')
          ) {
            console.log('Got disconnected !')
            await userinfo.logout()
            window.location = '#/login'
          }
          throw error
        }
      )

      this.bootstrapped = true
    }
  },
  async created () {
    document.addEventListener('resume', this.onResume, false)
    document.addEventListener('dbcorrupted', this.onDBCorrupted, false)

    try {
      phone.device.load()
      await phone.pin.isPINSet()
      await this.bootstrap()
    } catch (error) {
      this.showPINPage = true
    }
  }
}
</script>
