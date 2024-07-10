<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="fit row justify-center">
          <div class="text-h4">{{ $t('userMgmt.resetPassword.newPassword') }}</div>
        </div>
        <div class="fit row justify-center q-mt-lg">
          <p class="col">{{ $t('userMgmt.resetPassword.newPasswordExplanation') }}</p>
        </div>
        <q-form ref="changePWForm">
          <div class="fit row justify-center q-mt-lg">
            <q-input padding="md lg" class="col-grow" v-model="token" type="textarea" autogrow clearable
              :label="$t('userMgmt.resetPassword.token')" :hint="$t('userMgmt.resetPassword.tokenHint')"
              :rules="[val => !!val || $t('userMgmt.resetPassword.tokenError')]" />
          </div>

          <div class="fit row justify-center q-mt-lg">
            <q-input padding="md lg" class="col-grow" :label="$t('userMgmt.resetPassword.newPassword')" v-model="newpw"
              :type="showNewPassword ? 'text' : 'password'" :rules="[validatePasswordStrength]" append>
              <template #append>
                <q-icon name="visibility" v-if="!showNewPassword" @click="showNewPassword = true" />
                <q-icon name="visibility_off" v-else @click="showNewPassword = false" />
              </template>
            </q-input>
          </div>

          <div style="width: 90vw">
            <q-input padding="md lg" class="col-grow" :label="$t('userMgmt.resetPassword.confirmPwd')" v-model="confpw"
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="[val => val === this.newpw || this.$t('userMgmt.resetPassword.pwdMustMatch')]" append>
              <template #append>
                <q-icon name="visibility" v-if="!showConfirmPassword" @click="showConfirmPassword = true" />
                <q-icon name="visibility_off" v-else @click="showConfirmPassword = false" />
              </template>
            </q-input>
          </div>
          <div class="fit row justify-around q-mt-lg">
            <q-btn class="mobibtn" :label="$t('common.cancel')" color="secondary" to="/login" />

            <q-btn class="mobibtn" :label="$t('userMgmt.resetPassword.changePassword')" color="primary" type="submit"
              @click="resetUserPassword" />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import commonMessages from '@i18n/common'
import userMgmtMessages from '@i18n/userMgmt'
import pwdCheckMessages from '@i18n/passwordcheck'

import { checkPwdStrength, owaspConfig } from '@shared/passwordChecker'
import userinfo from '@shared/userinfo'
import API from '@shared/API/API'

export default {
  name: 'ChangePasswordPage',
  props: ['email'],
  i18n: {
    messages: mergeDeep(commonMessages, pwdCheckMessages, userMgmtMessages)
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
  async created () {
    // at this point we must be logged out
    await userinfo.logout()
  },
  methods: {
    validatePasswordStrength (pwd) {
      const msg = checkPwdStrength(this.email, pwd)
      if (msg) return this.$t(msg, owaspConfig)
      else return true // return true if succeed, string if error
    },
    async resetUserPassword () {
      const valid = await this.$refs.changePWForm.validate(true)
      if (valid) {
        try {
          await API.changePW(this.token, this.newpw)
          this.$q.dialog({
            title: this.$i18n.t('userMgmt.resetPassword.passwordChanged'),
            message: this.$i18n.t('userMgmt.resetPassword.passwordChangedExplanation'),
            ok: true,
            cancel: false,
            preventClose: true
          }).onOk(() => {
            this.$router.push('/login')
          })
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('userMgmt.resetPassword.changePasswordError') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>
