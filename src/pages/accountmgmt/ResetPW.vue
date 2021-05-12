<template>
  <q-layout>
    <q-page-container>
      <q-page
        padding
        class="flex flex-center"
      >
        <div class="text-h4">{{ $t('accountMgmt.resetPassword.resetPassword') }}</div>
        <div style="width: 90vw">
          <q-input
            v-model.trim="$v.email.$model"
            type="email"
            :label="$t('accountMgmt.email')"
            autocomplete="on"
            @blur.native="$v.email.$touch"
            :error-message="$t('accountMgmt.emailRequiredError')"
            :error="$v.email.$error"
          />
          <br>
          <q-btn
            class="float-left"
            :label="$t('common.cancel')"
            color="secondary"
            @click="$router.push('login')"
          />
          <q-btn
            class="float-right"
            :label="$t('accountMgmt.resetPassword.resetPassword')"
            color="primary"
            type="submit"
            @click="submit"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import i18nString from 'i18n/accountMgmt/accountMgmt'

import { required, email } from 'vuelidate/lib/validators'
import API from 'modules/API/API'

export default {
  name: 'ResetPasswordPage',
  i18n: {
    messages: i18nString
  },
  data () {
    return {
      email: null
    }
  },
  validations: {
    email: { required, email }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await API.resetPW(this.email.toLowerCase())
          this.$router.push({ name: 'changepw', params: { email: this.email } })
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('accountMgmt.resetPassword.resetPasswordError') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>
