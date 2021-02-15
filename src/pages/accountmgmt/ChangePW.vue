<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="fit row justify-center">
          <div class="text-h4">{{ $t('accountMgmt.resetPassword.newPassword') }}</div>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <p class="col">{{ $t('accountMgmt.resetPassword.newPasswordExplanation') }}</p>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <q-input class= "col-grow" v-model="token" type="text" @blur.native="$v.token.$touch" clearable
          :label="$t('accountMgmt.resetPassword.token')"
          :hint="$t('accountMgmt.resetPassword.tokenHint')"
          :error="$v.token.$error" :error-message="$t('accountMgmt.resetPassword.tokenError')" />
        </div>
        <div class="fit row justify-center q-mt-lg">
          <q-input class= "col-grow" :label="$t('accountMgmt.resetPassword.newPassword')"
          v-model="newpw" type="password" @blur.native="$v.newpw.$touch"
          :error="$v.newpw.$error" :error-message="pwdCheckErrorMsg()"/>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <q-input class= "col-grow" :label="$t('accountMgmt.resetPassword.confirmPwd')"
          v-model="confpw" type="password" @blur.native="$v.confpw.$touch"
          :error="$v.confpw.$error" :error-message="$t('accountMgmt.resetPassword.pwdMustMatch')"/>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <div class="q-ma-sm">
            <q-btn class="float-right" :label="$t('common.cancel')" color="secondary" to="/login" />
          </div>
          <div class="q-ma-sm">
            <q-btn class="float-right" :label="$t('accountMgmt.resetPassword.changePassword')" color="positive" type="submit" @click="resetUserPassword" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import i18nStrings from 'i18n/accountMgmt/accountMgmt'
import i18nPwdCheck from 'i18n/passwordCheck/passwordCheck'
import { mergeDeep } from 'modules/tools.mjs'

import { checkPwdStrength, pwdCheckError, owaspConfig } from 'modules/passwordChecker'
import { required, sameAs } from 'vuelidate/lib/validators'
import userinfo from 'modules/userinfo'
import API from 'modules/API'

export default {
  name: 'ChangePasswordPage',
  props: [ 'email' ],
  i18n: {
    messages: mergeDeep(i18nStrings, i18nPwdCheck)
  },
  data () {
    return {
      userEmail: this.email,
      token: undefined,
      newpw: undefined,
      confpw: undefined
    }
  },
  validations () {
    return {
      token: { required },
      newpw: { required, pwdStrength: checkPwdStrength(this.userEmail) },
      confpw: {
        sameAsPassword: sameAs('newpw')
      }
    }
  },
  async created () {
    // at this point we must be logged out
    await userinfo.logout()
  },
  methods: {
    pwdCheckErrorMsg () {
      let pwdError = pwdCheckError(this.email, this.newpw)
      let msg = this.$i18n.t(pwdError, owaspConfig)
      return msg
    },
    async resetUserPassword () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await API.changePW(this.token, this.newpw)
          this.$q.dialog({
            title: this.$i18n.t('accountMgmt.resetPassword.passwordChanged'),
            message: this.$i18n.t('accountMgmt.resetPassword.passwordChangedExplanation'),
            ok: true,
            cancel: false,
            preventClose: true
          }).onOk(() => {
            this.$router.push('/login')
          })
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('accountMgmt.resetPassword.changePasswordError') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>
