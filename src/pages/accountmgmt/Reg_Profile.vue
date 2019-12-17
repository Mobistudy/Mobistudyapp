<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-h4">Sign up</p>
             <q-field icon="face" :error="$v.profile.name.$error || $v.profile.surname.$error" error-label="Required">
              <q-input float-label="First Name" v-model="profile.name"/>
              <q-input float-label="Surname" v-model="profile.surname"/>
            </q-field>

            <q-field icon="wc" :error="$v.profile.gender.$error" error-label="Required">
              <q-select float-label="Gender" v-model="profile.gender" :options="profile.genderOptions"/>
            </q-field>
            <q-field icon="cake" :error="$v.profile.dateOfBirth.$error" error-label="Required">
              <q-datetime type="date" v-model="profile.dateOfBirth" format="DD/MM/YYYY" float-label="Date of Birth"/>
            </q-field>

            <q-field class="q-mt-sm" icon="local_hospital" helper="Do you suffer from any long-term medical condition?">
              <q-chips-input placeholder="Conditions" v-model="diseasesVue" @duplicate="duplicatedDisease">
                <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
              </q-chips-input>
            </q-field>

            <q-field class="q-mt-lg" icon="local_pharmacy" helper="Are you on any long-term medication?">
              <q-chips-input placeholder="Medications" v-model="medsVue" @duplicate="duplicatedMeds">
                <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
              </q-chips-input>
            </q-field>

            <q-toggle class="q-mt-lg q-ma-sm" label="Do you smoke?" v-model="profile.lifestyle.smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free"/>
            <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="profile.lifestyle.active" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/>
            <q-btn flat @click="$refs.stepper.previous()"  label="Back"/>
            <q-btn color="primary" @click="saveProfile()"  label="Next" />
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import { required, email, sameAs } from 'vuelidate/lib/validators'
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
  if (!owasp.test(pwd).strong) return false

  let strengthCheck = zxcvbn(pwd)
  if (strengthCheck.score < 2) return false

  return true
}

export default {
  name: 'RegisterPage',
  data () {
    return {
      profile: {
        name: '',
        surname: '',
        dateOfBirth: '',
        diseases: [],
        medications: [],
        lifestyle: {
          smoker: false,
          active: true
        },
        sex: '',
        sexOptions: [
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
    profile: {
      name: {required},
      surname: {required},
      dateOfBirth: { required },
      sex: { required }
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
            name: this.profile.name,
            surname: this.profile.surname,
            dateOfBirth: dobTemp,
            sex: this.profile.sex
            diseases: this.profile.diseases,
            medications: this.profile.medications,
            lifestyle: this.profile.lifestyle
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
