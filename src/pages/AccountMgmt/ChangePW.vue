<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        If you're registered in the system, you should receive an email shortly.
        Please copy/paste the token from your email to this form.
        If you fill the form and change your password on the Mobistudy web page, please tap on Cancel.
        <div style="width: 80vw">
          <q-field label="Token" helper="As received on your email." :error="$v.token.$error" error-label="A token is required." >
            <q-input v-model="token" type="text" @blur="$v.token.$touch" clearable/>
          </q-field>
          <q-field :error="$v.newpw.$error || $v.confpw.$error" error-label="Passwords do not match">
            <q-input float-label="New Password" v-model="newpw" type="password" />
            <q-input float-label="Confirm Password" v-model="confpw" type="password" />
          </q-field>
          <br />
          <q-btn class="float-right" label="Change Password" color="positive" type="submit" @click="resetUserPassword" />
          <q-btn class="float-right" label="Cancel" color="secondary"  to="login" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators'
import userinfo from '../../modules/userinfo'
import API from '../../modules/API'

export default {
  name: 'ChangePasswordPage',
  data () {
    return {
      token: undefined,
      newpw: undefined,
      confpw: undefined
    }
  },
  validations: {
    token: { required },
    newpw: { required },
    confpw: {
      sameAsPassword: sameAs('newpw')
    }
  },
  created () {
    // at this point we must be logged out
    userinfo.logout()
  },
  methods: {
    async resetUserPassword () {
      this.$v.$touch()
      if (!this.$v.error) {
        try {
          await API.changePW(this.token, this.newpw)
          this.$q.dialog({
            title: 'New password set',
            message: 'Now, you can login.',
            ok: true,
            cancel: false,
            preventClose: true
          }).then(() => {
            this.$router.push('/login')
          })
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot change password: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    }
  }
}
</script>
