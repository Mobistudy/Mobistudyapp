<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('userMgmt.registration.signUp') }}
      </div>
    </div>
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

    <div class="row fit justify-around q-mt-lg">
      <q-btn class="mobibtn" color="negative" to="/login" :label="$t('common.cancel')" />
      <q-btn class="mobibtn" color="primary" :loading="creating" :disable="$v.account.$error" @click="register()"
        :label="$t('userMgmt.registration.createAccount')" />
    </div>
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
import API from '@shared/API/API'
import userinfo from '@shared/userinfo'

export default {
  name: 'SignUp',
  i18n: {
    messages: mergeDeep(commonMessages, userMgmtMessages, pwdCheckMessages)
  },
  data () {
    return {
      creating: false,
      account: {
        email: '',
        pw1: '',
        pw2: '',
        serverUrl: '',
        serverOptions: []
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
        val => val === this.password || this.$t('userMgmt.confirmPasswordError')
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
  // validations () {
  //   return {
  //     account: {
  //       email: { required, email },
  //       pw1: { required, pwdStrength: checkPwdStrength(this.account.email) },
  //       pw2: { sameAsPassword: sameAs('pw1') }
  //     }
  //   }
  // },
  methods: {
    validatePasswordStrength (pwd) {
      const msg = checkPwdStrength(this.email, pwd)
      if (msg) return this.$t(msg, owaspConfig)
      else return false
    },
    async register () {
      this.$v.account.$touch()
      if (this.$v.account.$error) {
        this.$q.notify(this.$i18n.t('errors.correctFields'))
      } else {
        this.creating = true
        try {
          await API.registerUser(this.account.email.toLowerCase(), this.account.pw1)
          const user = await API.login(this.account.email.toLowerCase(), this.account.pw1)
          await userinfo.login(user)
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
