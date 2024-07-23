<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="text-center">
          <img src="logos/logo.svg" style="width:30vw; max-width:150px;">
          <div class="q-title text-h5 text-center">Mobistudy v {{ appVersion }}</div>
        </div>
        <q-form ref="loginForm" @submit.prevent="">
          <div style="width: 90vw">
            <q-input v-model="username" :label="$t('userMgmt.email')" :rules="emailRules" />

            <q-input v-model="password" :label="$t('userMgmt.password')" :type="showPassword ? 'text' : 'password'"
              :rules="[val => !!val || $t('userMgmt.passwordRequiredError')]">
              <template #append>
                <q-icon name="visibility" v-if="!showPassword" @click="showPassword = true" />
                <q-icon name="visibility_off" v-else @click="showPassword = false" />
              </template>
            </q-input>

            <q-select v-model="server" :options="serverOptions" emit-value map-options :label="$t('userMgmt.server')"
              :rules="[val => !!val || $t('userMgmt.serverRequiredError')]" />

            <div class="row">
              <q-btn class="q-ma-sm full-width mobibtn" :label="$t('userMgmt.login.login')" color="primary"
                @click="login" type="submit" />
              <q-btn class="q-ma-sm q-mb-lg full-width mobibtn" :label="$t('userMgmt.login.lostpw')" color="grey" flat
                outline to="resetpw" />
              <q-list class="full-width">
                <q-separator />
                <q-item class="full-width">
                  <q-item-section class="full-width">
                    <q-item-label class="text-center q-mt-lg q-mb-md mobitxt1">{{ $t('userMgmt.login.noAcc')
                      }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="full-width">
                  <q-item-section class="full-width">
                    <q-btn class="full-width mobibtn" :label="$t('userMgmt.register')" color="secondary"
                      to="register_pp" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nUserMgmt from '@i18n/userMgmt'
import DB from '@shared/db'
import API from '@shared/API'
import session from '@shared/session'
import notifications from '@shared/notifications'

import { patterns } from 'quasar'
const { testPattern } = patterns

export default {
  name: 'LoginPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nUserMgmt)
  },
  data () {
    return {
      username: '',
      password: '',
      server: '',
      serverOptions: [],
      error: false,
      showPassword: false,
      emailRules: [
        val => !!val || this.$t('userMgmt.emailRequiredError'),
        val => testPattern.email(val) || this.$t('userMgmt.emailRequiredError')
      ]
    }
  },
  computed: {
    appVersion () {
      return process.env.APP_VERSION
    }
  },
  async created () {
    this.serverOptions = API.getServersList().map((opt) => {
      return {
        label: opt.names[this.$root.$i18n.locale],
        value: opt.url
      }
    })
    notifications.cancelAll()
    try {
      // make sure we are logged out
      API.setBaseUrl(null)
      API.unsetToken()
      session.removeUserSession()
      await DB.removeUserSession()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async login () {
      const valid = await this.$refs.loginForm.validate(true)
      if (valid) {
        let userSession
        try {
          API.setBaseUrl(this.server)

          const user = await API.login(this.username.toLowerCase(), this.password)
          if (user.role !== 'participant') {
            this.$q.notify({
              color: 'negative',
              message: this.$t('userMgmt.participantOnly'),
              icon: 'report_problem'
            })
            return
          }
          // user is authenticated, save status of session
          userSession = {
            user: {
              email: user.email,
              userKey: user._key,
              participantKey: null
            },
            server: {
              serverUrl: this.server,
              token: user.token
            }
          }
          session.setUserSession(userSession)
          await DB.setUserSession(userSession)

          // keep token for later
          API.setToken(user.token)
        } catch (error) {
          console.error(error)
          this.error = true
          if (error.response && error.response.status && error.response.status === 401) {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('userMgmt.login.loginErrorCredentials'),
              icon: 'report_problem'
            })
          } else {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('userMgmt.login.loginError') + ': ' + error.message,
              icon: 'report_problem'
            })
          }
          return
        }
        try {
          // retrieve the profile information
          const profile = await API.getProfile(userSession.user.userKey)
          await DB.setParticipantProfile(profile)

          if (profile.language) {
            this.$root.$i18n.locale = profile.language
            // set language and participant Key also in session
            userSession.user.language = profile.language
            userSession.user.participantKey = profile._key
            session.setUserSession(userSession)
            await DB.setUserSession(userSession)
          }

          console.log('--- >logged in, studies set, going to tasker')

          this.$router.replace({ name: 'tasker' })
        } catch (error) {
          console.error(error)
          if (error.response && error.response.status === 404) {
            this.$router.replace('/register_profile')
          }
        }
      }
    }
  }
}
</script>

<style></style>
