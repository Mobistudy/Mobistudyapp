<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="text-center">
          <img src="logos/logo.svg" style="width:30vw; max-width:150px;">
          <div class="q-title text-h5 text-center">Mobistudy v {{ appVersion }}</div>
        </div>
        <q-form ref="loginForm">
          <div style="width: 90vw">
            <q-input v-model="username" :label="$t('accountMgmt.email')" :rules="emailRules" />
            <q-input v-model="password" :label="$t('accountMgmt.password')" :type="showPassword ? 'text' : 'password'"
              :rules="[val => !!val || $t('accountMgmt.passwordRequiredError')]">
              <template #append>
                <q-icon name="visibility" v-if="!showPassword" @click="showPassword = true" />
                <q-icon name="visibility_off" v-else @click="showPassword = false" />
              </template>
            </q-input>
            <div class="row">
              <q-btn class="q-ma-sm full-width mobibtn" :label="$t('accountMgmt.login.login')" color="primary"
                @click="login" type="submit" />
              <q-btn class="q-ma-sm q-mb-lg full-width mobibtn" :label="$t('accountMgmt.login.lostpw')" color="grey"
                flat outline to="resetpw" />
              <q-list class="full-width">
                <q-separator />
                <q-item class="full-width">
                  <q-item-section class="full-width">
                    <q-item-label class="text-center q-mt-lg q-mb-md mobitxt1">{{ $t('accountMgmt.login.noAcc')
                      }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="full-width">
                  <q-item-section class="full-width">
                    <q-btn class="full-width mobibtn" :label="$t('accountMgmt.register')" color="secondary"
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
import commonMessages from '@i18n/common'
import accountMgmtMessages from '@i18n/accountMgmt'
import DB from '@shared/db'
import API from '@shared/API/API'
import userinfo from '@shared/userinfo'
import notifications from '@shared/notifications/notifications'

import { patterns } from 'quasar'
const { testPattern } = patterns

export default {
  name: 'LoginPage',
  i18n: {
    messages: mergeDeep(commonMessages, accountMgmtMessages)
  },
  data () {
    return {
      username: '',
      password: '',
      error: false,
      showPassword: false,
      emailRules: [
        val => !!val || this.$t('accountMgmt.emailRequiredError'),
        val => testPattern.email(val) || this.$t('accountMgmt.emailRequiredError')
      ]
    }
  },
  computed: {
    appVersion () {
      return process.env.APP_VERSION
    }
  },
  async created () {
    notifications.cancelAll()
    try {
      await userinfo.logout() // called twice, also once in Profile -> logout. The DB finds no session and fails because it already executed once before and removed the item from the db.
    } catch (error) {
      console.error(error)
    }
    API.unsetToken()
    await DB.emptyUserData()
  },
  methods: {
    async login () {
      const valid = await this.$refs.loginForm.validate(true)
      if (valid) {
        try {
          const user = await API.login(this.username.toLowerCase(), this.password)
          if (user.role !== 'participant') {
            this.$q.notify({
              color: 'negative',
              message: this.$t('accountMgmt.participantOnly'),
              icon: 'report_problem'
            })
            return
          }
          // user is authenticated, return user object
          await userinfo.login(user)
          API.setToken(user.token)
        } catch (error) {
          console.error(error)
          this.error = true
          if (error.response && error.response.status && error.response.status === 401) {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('accountMgmt.login.loginErrorCredentials'),
              icon: 'report_problem'
            })
          } else {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('accountMgmt.login.loginError') + ': ' + error.message,
              icon: 'report_problem'
            })
          }
          return
        }
        try {
          // retrieve the profile information
          const profile = await API.getProfile(userinfo.user._key)
          if (profile.language) {
            this.$root.$i18n.locale = profile.language
          }
          // profile exists
          await userinfo.setProfile(profile)
          if (profile.studies) await DB.setStudiesParticipation(profile.studies)
          this.$router.replace({ name: 'tasker' })
        } catch (error) {
          if (error.response.status === 404) {
            this.$router.replace('/register_profile')
          }
        }
      }
    }
  }
}
</script>

<style></style>
