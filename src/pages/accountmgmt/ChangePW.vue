<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        {{ $t('accountMgmt.changePw.hint') }}
        <div>
          <q-field v-bind:label="$t('accountMgmt.changePw.token')" :hint="$t('accountMgmt.changePw.tokenHint')" :error="$v.token.$error" :error-message="$t('accountMgmt.changePw.tokenError')" >
            <q-input v-model="token" type="text" @blur="$v.token.$touch" clearable/>
          </q-field>
          <q-field :error="$v.newpw.$error || $v.confpw.$error" :error-message="$t('accountMgmt.changePw.pwError')">
            <q-input :label="$t('accountMgmt.changePw.newPw')" v-model="newpw" type="password" />
            <q-input :label="$t('accountMgmt.changePw.confPw')" v-model="confpw" type="password" />
          </q-field>
          <br />
          <div class="q-mt-lg row">
            <div class="q-ma-sm">
              <q-btn class="float-right" :label="$t('accountMgmt.changePw.cancel')" flat="true" color="grey" to="login" />
            </div>
            <div class="q-ma-sm">
              <q-btn class="float-right" :label="$t('accountMgmt.changePw.changePw')" color="positive" type="submit" @click="resetUserPassword" />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// TODO: NEED TO ADD PROPER PW SECURITY CHECK AS IN INITIAL PW
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
