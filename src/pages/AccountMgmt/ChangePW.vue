<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
    <div style="width: 80vw">
      <q-field :error="$v.oldpw.$error || !oldpwmatch" error-label="Old password incorrect" >
        <q-input float-label="Old Password" v-model="oldpw" type="password" />
      </q-field>
      <q-field :error="$v.newpw.$error || $v.confpw.$error" error-label="Passwords do not match">
        <q-input float-label="New Password" v-model="newpw" type="password" />
        <q-input float-label="Confirm Password" v-model="confpw" type="password" />
      </q-field>
      <br />
      <q-btn class="float-right" label="Change Password" color="positive" type="submit" @click="submit" />
    </div>
  </q-page>
</template>

<script>
import {required, sameAs} from 'vuelidate/lib/validators'
let api = require('src/modules/mobistudyAPI')

export default {
  // name: 'PageName',
  data () {
    return {
      oldpw: null,
      newpw: null,
      confpw: null,
      oldpwmatch: true
    }
  },
  validations: {
    oldpw: {required},
    newpw: {required},
    confpw: {
      sameAsPassword: sameAs('newpw')
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      let _this = this
      if (!this.$v.$invalid) {
        api.changePW(this.oldpw, this.newpw).then(function (success) {
          if (success) {
            _this.$q.notify({
              message: 'Password changed successfully!',
              type: 'positive',
              icon: 'lock'
            })
            _this.$router.push('/tasker')
          } else {
            _this.oldpwmatch = false
          }
        }).catch(function (err) {
          _this.$q.notify(err.message)
        })
      }
    }
  }
}
</script>

<style>
</style>
