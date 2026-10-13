<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="text-center">
          <img src="logos/logo.svg" style="width:30vw; max-width:150px;">
          <div class="q-title text-h5 text-center">Mobistudy v {{ appVersion }}</div>
        </div>
        <q-form ref="loginForm" @submit.prevent="">
          <div style="width: 90vw;">

            <p style="margin-top: 30px;" class="text-center mobitxt1">Choose an institution</p>

            <q-select v-model="server" :options="serverOptions" emit-value map-options :label="$t('userMgmt.server')"
              :error="missingInstitution" :rules="[val => !!val || $t('userMgmt.serverRequiredError')]" />

            <p style="margin-top: 30px;" class="text-center mobitxt1">Do you have an account?</p>

            <q-input v-model="username" :label="$t('userMgmt.email')" :rules="emailRules" />

            <q-input v-model="password" :label="$t('userMgmt.password')" :type="showPassword ? 'text' : 'password'"
              :rules="[val => !!val || $t('userMgmt.passwordRequiredError')]">
              <template #append>
                <q-icon name="visibility" v-if="!showPassword" @click="showPassword = true" />
                <q-icon name="visibility_off" v-else @click="showPassword = false" />
              </template>
            </q-input>

            <q-btn class="q-ma-sm full-width mobibtn" :label="$t('userMgmt.login.login')" color="primary" @click="login"
              type="submit" />

            <q-btn class="q-ma-sm q-mb-lg full-width mobibtn" :label="$t('userMgmt.login.lostpw')" color="grey" flat
              outline to="resetpw" />

            <p style="margin-top: 30px;" class="text-center mobitxt1">{{ $t('userMgmt.login.noAcc')
              }}</p>

            <q-btn class="q-ma-sm q-mb-lg full-width mobibtn" :label="$t('userMgmt.register')" color="secondary"
              @click="register" />

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
import translateMixin from '@shared/mixins/translate'

import { patterns } from 'quasar'
const { testPattern } = patterns

export default {
  name: 'LoginPage',
  mixins: [translateMixin],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nUserMgmt)
  },
  data () {
    return {
      username: '',
      password: '',
      server: '',
      serverOptions: [],
      missingInstitution: false,
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
    const serversList = API.getServersList()
    for (const server of serversList) {
      this.serverOptions.push({
        label: this.translate(server.names),
        value: server
      })
    }
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
    register () {
      if (!this.server) {
        this.missingInstitution = true
        return
      }
      this.missingInstitution = false
      console.log(this.server)
      this.$router.replace({ name: 'register_pp', params: { serverId: this.server.id } })
    },
    async login () {
      const valid = await this.$refs.loginForm.validate(true)
      if (valid) {
        let userSession
        try {
          API.setBaseUrl(this.server.url)

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
              serverUrl: this.server.url,
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
