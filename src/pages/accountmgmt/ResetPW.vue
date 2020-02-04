<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div style="width: 90vw">
          <p class="text-h4">Reset password</p>
            <q-field :error="$v.email.$error" error-message="An email address is required.">
                <q-input v-model.trim="$v.email.$model" type="email" float-label="Email" placeholder="e.g. email@email.com"
                 autocomplete="on" @blur="$v.email.$touch"/>
              </q-field>
            <br />
            <q-btn class="float-left" label="Cancel" color="secondary" @click="$router.push('login')" />
            <q-btn class="float-right" label="Reset Password" color="positive" type="submit" @click="submit" />
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
