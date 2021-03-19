<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('accountMgmt.registration.signUp') }}
      </div>
    </div>
    <q-input
      :label="$t('accountMgmt.email')"
      type="email"
      @blur.native="$v.account.email.$touch"
      v-model="account.email"
      :error="$v.account.email.$error"
      :error-message="$t('accountMgmt.emailRequiredError')"
    >
      <template v-slot:prepend>
        <q-icon name="mail_outline" />
      </template>
    </q-input>

    <q-input
      :label="$t('accountMgmt.password')"
      type="password"
      @blur.native="$v.account.pw1.$touch"
      v-model="account.pw1"
      :error="$v.account.pw1.$error"
      :error-message="pwdCheckErrorMsg()"
    >
      <template v-slot:prepend>
        <q-icon name="vpn_key" />
      </template>
    </q-input>

    <q-input
      :label="$t('accountMgmt.confirmPassword')"
      type="password"
      @blur.native="$v.account.pw2.$touch"
      v-model="account.pw2"
      :error="$v.account.pw2.$error"
      :error-message="$t('accountMgmt.confirmPasswordError')"
    >
      <template v-slot:prepend>
        <q-icon name="vpn_key" />
      </template>
    </q-input>

    <div class="row fit justify-around q-mt-lg">
      <q-btn
        color="negative"
        to="/login"
        :label="$t('common.cancel')"
      />
      <q-btn
        color="primary"
        :disable="$v.account.$error"
        @click="register()"
        :label="$t('accountMgmt.registration.createAccount')"
      />
    </div>
  </q-page>
</template>

<script>
import i18nStrings from 'i18n/accountMgmt/accountMgmt'
import i18nPwdCheck from 'i18n/passwordCheck/passwordCheck'
import { mergeDeep } from 'modules/tools.mjs'

import { checkPwdStrength, pwdCheckError, owaspConfig } from 'modules/passwordChecker'
import API from 'modules/API/API'
import userinfo from 'modules/userinfo'
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',
  i18n: {
    messages: mergeDeep(i18nStrings, i18nPwdCheck)
  },
  data () {
    return {
      account: {
        email: '',
        pw1: '',
        pw2: ''
      }
    }
  },
  validations () {
    return {
      account: {
        email: { required, email },
        pw1: { required, pwdStrength: checkPwdStrength(this.account.email) },
        pw2: { sameAsPassword: sameAs('pw1') }
      }
    }
  },
  methods: {
    pwdCheckErrorMsg () {
      let pwdError = pwdCheckError(this.email, this.account.pw1)
      let msg = this.$i18n.t(pwdError, owaspConfig)
      return msg
    },
    async register () {
      this.$v.account.$touch()
      if (this.$v.account.$error) {
        this.$q.notify(this.$i18n.t('errors.correctFields'))
      } else {
        try {
          await API.registerUser(this.account.email.toLowerCase(), this.account.pw1)
          let user = await API.login(this.account.email.toLowerCase(), this.account.pw1)
          await userinfo.login(user)
          API.setToken(user.token)

          this.$router.push('/register_profile')
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('accountMgmt.registration.registrationErrorUserExists'),
              icon: 'report_problem'
            })
          } else {
            this.$q.notify({
              color: 'negative',
              message: this.$i18n.t('accountMgmt.registration.registrationError') + ': ' + error.message,
              icon: 'report_problem'
            })
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
