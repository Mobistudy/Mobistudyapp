<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('userMgmt.registration.signUp') }}
      </div>
    </div>
    <q-form ref="signupForm">
      <q-input :label="$t('userMgmt.email')" type="email" v-model="account.email" :rules="emailRules">
        <template v-slot:prepend>
          <q-icon name="mail_outline" />
        </template>
      </q-input>

      <q-input padding="md lg" :label="$t('userMgmt.password')" :type="showPassword ? 'text' : 'password'"
        v-model="account.pw1" :rules="passwordRules">
        <template v-slot:prepend>
          <q-icon name="vpn_key" />
        </template>
        <template v-slot:append>
          <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
            class="cursor-pointer" />
        </template>
      </q-input>

      <q-input padding="md lg" :label="$t('userMgmt.confirmPassword')" :type="showPassword ? 'text' : 'password'"
        v-model="account.pw2" :rules="password2Rules">
        <template v-slot:prepend>
          <q-icon name="vpn_key" />
        </template>
        <template v-slot:append>
          <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="showPassword = !showPassword"
            class="cursor-pointer" />
        </template>
      </q-input>

      <q-select padding="md lg" v-model="serverUrl" :options="serverOptions" emit-value map-options
        :label="$t('userMgmt.server')" :rules="[val => !!val || $t('userMgmt.serverRequiredError')]">
        <template v-slot:prepend>
          <q-icon name="domain" />
        </template>
      </q-select>

      <div class="row fit justify-around q-mt-lg">
        <q-btn class="mobibtn" color="negative" to="/login" :label="$t('common.cancel')" />
        <q-btn class="mobibtn" color="primary" :loading="creating" @click="register()"
          :label="$t('userMgmt.registration.createAccount')" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import commonMessages from '@i18n/common'
import userMgmtMessages from '@i18n/userMgmt'
import pwdCheckMessages from '@i18n/passwordcheck'
import { mergeDeep } from '@shared/tools.js'

import { patterns } from 'quasar'
const { testPattern } = patterns

import { checkPwdStrength, owaspConfig } from '@shared/passwordChecker'
import API from '@shared/API'
import userinfo from '@shared/userinfo'

export default {
  name: 'SignUp',
  i18n: {
    messages: mergeDeep(commonMessages, userMgmtMessages, pwdCheckMessages)
  },
  data () {
    return {
      creating: false,
      serverUrl: '',
      serverOptions: [],
      account: {
        email: '',
        pw1: '',
        pw2: ''
      },
      showPassword: false,
      emailRules: [
        val => !!val || this.$t('userMgmt.emailRequiredError'),
        val => testPattern.email(val) || this.$t('userMgmt.emailRequiredError')
      ],
      passwordRules: [
        this.validatePasswordStrength
      ],
      password2Rules: [
        val => val === this.account.pw1 || this.$t('userMgmt.confirmPasswordError')
      ]
    }
  },
  async created () {
    this.serverOptions = API.getServersList().map((opt) => {
      return {
        label: opt.names[this.$root.$i18n.locale],
        value: opt.url
      }
    })
  },
  methods: {
    validatePasswordStrength (pwd) {
      const msg = checkPwdStrength(this.email, pwd)
      if (msg) return this.$t(msg, owaspConfig)
      else return true // return true if succeed, string if error
    },
    async register () {
      const valid = await this.$refs.signupForm.validate(true)
      if (!valid) {
        this.$q.notify(this.$i18n.t('errors.correctFields'))
      } else {
        this.creating = true
        try {
          // set the server URL
          API.setBaseUrl(this.serverUrl)
          // register the user
          await API.registerUser(this.account.email.toLowerCase(), this.account.pw1)
          // if registered, also do login
          const user = await API.login(this.account.email.toLowerCase(), this.account.pw1)
          // user is authenticated, save status of session
          user.serverUrl = this.server
          // save session
          await userinfo.login(user)
          // keep token for later
          API.setToken(user.token)

          this.$router.push('/register_profile')
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('userMgmt.registration.registrationErrorUserExists'),
              icon: 'report_problem'
            })
          } if (error.response && error.response.status === 400) {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('userMgmt.registration.registrationErrorWrongEmail'),
              icon: 'report_problem'
            })
          } else {
            const errmsg = error.response && error.response.data ? error.response.data : error.message
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('userMgmt.registration.registrationError') + ': ' + errmsg,
              icon: 'report_problem'
            })
          }
        }
        this.creating = false
      }
    }
  }
}
</script>

<style></style>
