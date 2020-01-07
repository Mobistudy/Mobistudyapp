<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-h4">Sign up</p>

        <q-field
          icon="mail_outline"
          :error="$v.account.email.$error"
          error-message="Please type a valid email"
        >
          <q-input
            label="Email"
            @blur="$v.account.email.$touch"
            v-model="account.email"
          />
        </q-field>
        <q-field
          icon="vpn_key"
          :error="$v.account.pw1.$error"
          :error-message="getFirstPwdCheckError(account.pw1)"
        >
          <q-input
            label="Password"
            v-model="account.pw1"
            @blur="$v.account.pw1.$touch"
            type="password"
          />
        </q-field>
        <q-field
          icon="vpn_key"
          :error="$v.account.pw2.$error"
          error-message="Passwords must match"
        >
          <q-input
            label="Confirm Password"
            v-model="account.pw2"
            @blur="$v.account.pw2.$touch"
            type="password"
          />
        </q-field>
        <q-btn
          flat
          to="register_pp"
          label="Back"
        />
        <q-btn
          color="primary"
          :disable="$v.account.$error"
          @click="register()"
          label="Next"
        />

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import zxcvbn from 'zxcvbn'
import owasp from 'owasp-password-strength-test'
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import { required, email, sameAs } from 'vuelidate/lib/validators'

owasp.config({
  allowPassphrases: true,
  maxLength: 70,
  minLength: 8,
  minPhraseLength: 10,
  minOptionalTestsToPass: 3
})

function checkPwdStrength (pwd) {
  if (this.account.email) {
    // check if password includes name in email
    let i = this.account.email.indexOf('@')
    if (i > 0) {
      let userName = this.account.email.substring(0, i)
      if (pwd.toUpperCase().includes(userName.toUpperCase())) {
        return false
      }
    }
  }
  if (!owasp.test(pwd).strong) return false

  let strengthCheck = zxcvbn(pwd)
  if (strengthCheck.score < 2) return false

  return true
}

export default {
  name: 'SignUp',
  data () {
    return {
      account: {
        email: '',
        pw1: '',
        pw2: ''
      }
    }
  },
  validations: {
    account: {
      email: { required, email },
      pw1: { required, checkPwdStrength },
      pw2: { sameAsPassword: sameAs('pw1') }
    }
  },
  methods: {
    getFirstPwdCheckError (pwd) {
      if (this.account.email) {
        // check if password includes name in email
        let i = this.account.email.indexOf('@')
        if (i > 0) {
          let userName = this.account.email.substring(0, i)
          if (pwd.toUpperCase().includes(userName.toUpperCase())) {
            return 'Password cannot contain email'
          }
        }
      }
      let result = owasp.test(pwd)
      if (!result.strong) {
        return result.errors[0]
      } else {
        result = zxcvbn(pwd)
        if (result.feedback) {
          let mesg = 'The password is too simple'
          if (result.feedback.warning) mesg = result.feedback.warning
          // uncomment this code to show also suggestions
          // if (result.feedback.suggestions && result.feedback.suggestions.length) {
          //   mesg += '.\nSuggestion: ' + result.feedback.suggestions[0]
          // }
          return mesg
        } else return 'All OK'
      }
    },
    async register () {
      this.$v.account.$touch()
      if (this.$v.account.$error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          await API.registerUser(this.account.email.toLowerCase(), this.account.pw1)
          let user = await API.login(this.account.email.toLowerCase(), this.account.pw1)
          await userinfo.login(user)
          API.setToken(user.token)

          this.$router.push('/register_profile')
        } catch (error) {
          if (error.response && error.response.status === 409) {
            this.$q.notify({
              color: 'negative',
              message: 'User already exists',
              icon: 'report_problem'
            })
          } else {
            this.$q.notify({
              color: 'negative',
              message: 'Registration failed: ' + error.message,
              icon: 'report_problem'
            })
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
