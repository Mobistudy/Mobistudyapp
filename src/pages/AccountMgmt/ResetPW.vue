<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
    <div style="width: 90vw">
      <q-field :error="$v.email.$error" error-label="Valid email required">
        <q-input lower-case float-label="Email" v-model="email" />
      </q-field>
      <br />
      <q-btn class="float-right" label="Reset Password" color="positive" type="submit" @click="submit" />
    </div>
  </q-page>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
let api = require('src/modules/API')

export default {
  // name: 'PageName',
  data () {
    return {
      email: null
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      let _this = this
      if (!this.$v.$invalid) {
        api.resetPW(this.email).then(function () {
          _this.$q.notify({
            message: 'If you\'re registered in the system, you should receive an email shortly!',
            type: 'positive',
            icon: 'mail'
          })
          _this.$router.push('/login')
        }).catch(function (err) {
          _this.$q.notify(err.message)
        })
      }
    }
  },
  validations: {
    email: {required, email}
  }
}
</script>

<style>
</style>
