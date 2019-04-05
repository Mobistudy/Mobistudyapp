<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="q-headline">Registration</p>
        <q-stepper vertical ref="stepper">
          <q-step title="Terms of Use">
            <p>
              This version of the Mobistudy is meant to be used of technical testing and to support the PAS-4YP study.
              Once you have completed the study, please delete this app.
              An official and permanent version of this app will become available in the future.
            </p>
            <q-stepper-navigation>
              <q-btn flat @click="$router.push('login')"  label="Back"/>
              <q-btn color="primary" @click="$refs.stepper.next()" label="Accept" />
            </q-stepper-navigation>
          </q-step>

          <q-step icon="lock" title="Privacy policy">
            <main-privacy-policy></main-privacy-policy>
            <q-stepper-navigation>
              <q-btn flat @click="$refs.stepper.previous()"  label="Back"/>
              <q-btn color="primary" @click="$refs.stepper.next()" label="Accept" />
            </q-stepper-navigation>
          </q-step>

          <q-step default icon="account_circle" title="Account" subtitle="Setup your Mobistudy Account">
            <q-field icon="mail_outline" :error="$v.account.email.$error" error-label="Please type a valid email">
              <q-input float-label="Email" @blur="$v.account.email.$touch" v-model="account.email"/>
            </q-field>
            <q-field icon="vpn_key" :error="$v.account.pw1.$error" :error-label="getFirstPwdCheckError(account.pw1)">
              <q-input float-label="Password" v-model="account.pw1" @blur="$v.account.pw1.$touch" type="password"/>
            </q-field>
            <q-field icon="vpn_key" :error="$v.account.pw2.$error" error-label="Passwords must match">
              <q-input float-label="Confirm Password" v-model="account.pw2" @blur="$v.account.pw2.$touch" type="password"/>
            </q-field>
            <q-stepper-navigation>
              <q-btn flat @click="$refs.stepper.previous()"  label="Back"/>
              <q-btn color="primary" :disable="$v.account.$error" @click="register()" label="Next" />
            </q-stepper-navigation>
          </q-step>

          <!-- Step: -->
          <!-- Following commented out for 4YP. To be uncommented after. -->
          <q-step icon="assignment_ind" title="Profile" subtitle="Tell us your details">
            <!-- <q-field icon="face" :error="$v.profile.name.$error || $v.profile.surname.$error" error-label="Required">
              <q-input float-label="First Name" v-model="profile.name"/>
              <q-input float-label="Surname" v-model="profile.surname"/>
            </q-field> -->
            <q-field icon="wc" :error="$v.profile.gender.$error" error-label="Required">
              <q-select float-label="Gender" v-model="profile.gender" :options="profile.genderOptions"/>
            </q-field>
            <q-field icon="cake" :error="$v.profile.dateOfBirth.$error" error-label="Required">
              <q-datetime type="date" v-model="profile.dateOfBirth" format="DD/MM/YYYY" float-label="Date of Birth"/>
            </q-field>

            <!-- <q-field class="q-mt-sm" icon="local_hospital" helper="Do you suffer from any long-term medical condition?">
              <q-chips-input placeholder="Conditions" v-model="diseasesVue" @duplicate="duplicatedDisease">
                <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
              </q-chips-input>
            </q-field>

            <q-field class="q-mt-lg" icon="local_pharmacy" helper="Are you on any long-term medication?">
              <q-chips-input placeholder="Medications" v-model="medsVue" @duplicate="duplicatedMeds">
                <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
              </q-chips-input>
            </q-field> -->

            <!-- <q-toggle class="q-mt-lg q-ma-sm" label="Do you smoke?" v-model="profile.lifestyle.smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free"/>
            <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="profile.lifestyle.active" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/> -->
            <q-stepper-navigation>
              <q-btn flat @click="$refs.stepper.previous()"  label="Back"/>
              <q-btn color="primary" @click="saveProfile()"  label="Next" />
            </q-stepper-navigation>
          </q-step>
      </q-stepper>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import PWDchecker from 'zxcvbn'
import owasp from 'owasp-password-strength-test'
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import {required, email, sameAs} from 'vuelidate/lib/validators'
import MainPrivacyPolicy from '../../components/MainPrivacyPolicy'

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
  if (owasp.test(pwd).strong) {
    let strength = PWDchecker(pwd)
    return strength.score >= 2
  } else return false
}

export default {
  name: 'RegisterPage',
  components: { MainPrivacyPolicy },
  data () {
    return {
      account: {
        email: '',
        pw1: '',
        pw2: ''
      },
      profile: {
        // Following commented out for 4YP. To be uncommented after.
        // name: '',
        // surname: '',
        dateOfBirth: '',
        // diseases: [],
        // medications: [],
        // lifestyle: {
        //   smoker: false,
        //   active: true
        // },
        gender: '',
        genderOptions: [
          {
            label: 'Male',
            value: 'male'
          },
          {
            label: 'Female',
            value: 'female'
          },
          {
            label: 'Other',
            value: 'other'
          }
        ]
      }
    }
  },
  validations: {
    account: {
      email: {required, email},
      pw1: { required, checkPwdStrength },
      pw2: { sameAsPassword: sameAs('pw1') }
    },
    profile: {
      // Following commented out for 4YP. To be uncommented after.
      // name: {required},
      // surname: {required},
      dateOfBirth: {required},
      gender: {required}
    }
  },
  computed: {
    diseasesVue: {
      get: function () {
        return this.profile.diseases.map(x => x.name)
      },
      set: function (names) {
        this.profile.diseases = this.profile.diseases.filter(x => {
          return names.includes(x.name)
        })
      }
    },
    medsVue: {
      get: function () {
        return this.profile.medications.map(x => x.name)
      },
      set: function (names) {
        this.profile.medications = this.profile.medications.filter(x => {
          return names.includes(x.name)
        })
      }
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
        result = PWDchecker(pwd)
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
    async searchDisease (diseaseDescription, done) {
      try {
        const results = await API.searchSNOMEDDisease(diseaseDescription)
        if (results.length === 0) {
          this.$q.notify('No matches.')
        }
        const selDis = Object.keys(this.profile.diseases)
        const disFil = results.filter((entry) => !selDis.includes(entry.term))
        done(disFil)
      } catch (error) {
        this.$q.notify('Cannot find diseases. Please Try again.')
        console.error(error)
        done([])
      }
    },
    selectedDisease (item) {
      if (!this.profile.diseases.find(x => x.name === item.label)) {
        this.profile.diseases.push({
          name: item.label,
          conceptId: item.conceptId
        })
      }
    },
    duplicatedDisease (label) {
      this.$q.notify(`"${label}" already in list`)
    },
    async searchMeds (medDescription, done) {
      try {
        const results = await API.searchSNOMEDMedication(medDescription)
        if (results.length === 0) {
          this.$q.notify('No matches.')
        }
        const selMeds = Object.keys(this.profile.medications)
        const medsFil = results.filter((entry) => !selMeds.includes(entry.term))
        done(medsFil)
      } catch (error) {
        this.$q.notify('Cannot find medication. Please Try again.')
        console.error(error)
        done([])
      }
    },
    selectedMeds (item) {
      if (!this.profile.medications.find(x => x.name === item.label)) {
        this.profile.medications.push({
          name: item.label,
          conceptId: item.conceptId
        })
      }
    },
    duplicatedMeds (label) {
      this.$q.notify(`"${label}" already in list`)
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

          this.$refs.stepper.next()
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
    },
    async saveProfile () {
      this.$v.profile.$touch()
      if (this.$v.profile.error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          // iOS SAFARI COMPATIBILITY
          let dobTemp = ''
          if (this.profile.dateOfBirth instanceof Date) {
            dobTemp = this.profile.dateOfBirth.toISOString().substring(0, 10)
          } else if (typeof this.profile.dateOfBirth === 'string') {
            dobTemp = this.profile.dateOfBirth.substring(0, 10)
          } else {
            dobTemp = this.profile.dateOfBirth
            console.error(this.profile.dateOfBirth + ' cannot be cut to date only')
          }
          let profile = {
            userKey: userinfo.user._key,
            updatedTS: new Date(),
            // name: this.profile.name,
            // surname: this.profile.surname,
            dateOfBirth: dobTemp,
            gender: this.profile.gender
            // diseases: this.profile.diseases,
            // medications: this.profile.medications,
            // lifestyle: this.profile.lifestyle
          }
          await API.createProfile(profile)
          await userinfo.setProfile(profile)

          this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
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
