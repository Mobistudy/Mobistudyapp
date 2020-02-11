<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div style="width: 90vw">
          <p class="text-h4">{{ $t('accountMgmt.resetPw.headline') }}</p>
            <q-field :error="$v.email.$error" :error-message="$t('accountMgmt.resetPw.emailError')">
                <q-input v-model.trim="$v.email.$model" type="email" :label="$t('accountMgmt.resetPw.email')" :placeholder="$t('accountMgmt.resetPw.emailPlaceholder')"
                 autocomplete="on" @blur="$v.email.$touch"/>
              </q-field>
            <br />
            <q-btn class="float-left" :label="$t('accountMgmt.resetPw.buttonBack')" color="secondary" @click="$router.push('login')" />
            <q-btn class="float-right" :label="$t('accountMgmt.resetPw.buttonNext')" color="positive" type="submit" @click="submit" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators'
import API from '../../modules/API'

export default {
  name: 'ResetPasswordPage',
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
          this.$router.push('/changepw')
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: 'Login failed: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>

<style>
</style>
