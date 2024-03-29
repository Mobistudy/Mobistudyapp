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
          <q-input
            padding="md lg"
            class="col-grow"
            v-model="token"
            type="textarea"
            autogrow
            @blur.native="$v.token.$touch"
            clearable
            :label="$t('accountMgmt.resetPassword.token')"
            :hint="$t('accountMgmt.resetPassword.tokenHint')"
            :error="$v.token.$error"
            :error-message="$t('accountMgmt.resetPassword.tokenError')"
          />
        </div>
        <div class="fit row justify-center q-mt-lg">
          <q-input
            padding="md lg"
            class="col-grow"
            :label="$t('accountMgmt.resetPassword.newPassword')"
            v-model="newpw"
            :type="showNewPassword ? 'text' : 'password'"
            @blur.native="$v.newpw.$touch"
            :error="$v.newpw.$error"
            :error-message="pwdCheckErrorMsg()"
            append>
            <template #append>
              <q-icon
                name="visibility"
                v-if="!showNewPassword"
                @click="showNewPassword = true"
              />
              <q-icon
                name="visibility_off"
                v-else
                @click="showNewPassword = false"
              />
            </template>
          </q-input>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <q-input
            padding="md lg"
            class="col-grow"
            :label="$t('accountMgmt.resetPassword.confirmPwd')"
            v-model="confpw"
            :type="showConfirmPassword ? 'text' : 'password'"
            @blur.native="$v.confpw.$touch"
            :error="$v.confpw.$error"
            :error-message="$t('accountMgmt.resetPassword.pwdMustMatch')"
            append>
            <template #append>
              <q-icon
                name="visibility"
                v-if="!showConfirmPassword"
                @click="showConfirmPassword = true"
              />
              <q-icon
                name="visibility_off"
                v-else
                @click="showConfirmPassword = false"
              />
            </template>
          </q-input>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <div class="q-ma-sm">
            <q-btn
              padding="md lg"
              class="float-right"
              :label="$t('common.cancel')"
              color="secondary"
              to="/login"
            />
          </div>
          <div class="q-ma-sm">
            <q-btn
              padding="md lg"
              class="float-right"
              :label="$t('accountMgmt.resetPassword.changePassword')"
              color="primary"
              type="submit"
              @click="resetUserPassword"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import i18nStrings from 'i18n/accountMgmt/accountMgmt'
import i18nPwdCheck from 'i18n/passwordcheck/passwordCheck'
import { mergeDeep } from 'modules/tools.js'

import { checkPwdStrength, pwdCheckError, owaspConfig } from 'modules/passwordChecker'
import { required, sameAs } from 'vuelidate/lib/validators'
import userinfo from 'modules/userinfo'
import API from 'modules/API/API'

export default {
  name: 'ChangePasswordPage',
  props: ['email'],
  i18n: {
    messages: mergeDeep(i18nStrings, i18nPwdCheck)
  },
  data () {
    return {
      userEmail: this.email,
      token: undefined,
      newpw: undefined,
      confpw: undefined,
      showNewPassword: false,
      showConfirmPassword: false
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
