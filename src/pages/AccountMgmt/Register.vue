<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="q-headline">Registration</p>
        <q-stepper vertical ref="stepper">
          <q-step title="Terms of Use">
            <h5>Terms and conditions</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt dictum faucibus. Nunc vel ultricies
              quam, vel molestie tellus. Curabitur viverra tristique quam, vitae ornare ex pulvinar sed. Vestibulum sagittis
              eros non ante dignissim, et faucibus turpis auctor. Duis volutpat massa lorem, in luctus lacus rutrum quis.
              Integer eu urna id quam dignissim ultrices ut vel metus. Proin vel porta velit. Pellentesque dictum tortor
              mollis pretium aliquet. Curabitur scelerisque augue non posuere tincidunt. Duis vitae lobortis urna. Aliquam
              mollis turpis ut erat tristique fermentum. Integer sollicitudin posuere mi sed laoreet. In semper quam vitae
              enim condimentum tincidunt. Proin ac metus maximus, venenatis urna at, rhoncus magna. Mauris leo nunc,
              faucibus suscipit suscipit id, maximus quis ipsum.
            </p>
            <q-stepper-navigation>
              <q-btn color="primary" @click="$refs.stepper.next()" label="Accept" />
            </q-stepper-navigation>
          </q-step>

          <q-step default icon="account_circle" title="Account" subtitle="Setup your Mobistudy Account">
            <q-field icon="mail_outline" :error="$v.account.email.$error" error-label="Please type a valid email">
              <q-input float-label="Email" @blur="$v.account.email.$touch" v-model="account.email"/>
            </q-field>
            <q-field icon="vpn_key" :error="$v.account.pw1.$error || $v.account.pw2.$error"
            error-label="Passwords do not match">
            <q-input float-label="Password" v-model="account.pw1" type="password"/>
            <q-input float-label="Confirm Password" v-model="account.pw2" @blur="$v.account.pw2.$touch" type="password"/>
          </q-field>
          <q-stepper-navigation>
            <q-btn color="primary" @click="register()" label="Next" />
          </q-stepper-navigation>
        </q-step>

        <!-- Step: -->
        <q-step title="Profile" subtitle="Tell us your details">
          <q-field icon="face" :error="$v.profile.firstname.$error || $v.profile.surname.$error" error-label="Required">
            <q-input float-label="First Name" v-model="profile.firstname"/>
            <q-input float-label="Surname" v-model="profile.surname"/>
          </q-field>
          <q-field icon="wc" :error="$v.profile.gender.$error" error-label="Required">
            <q-select float-label="Gender" v-model="profile.gender" :options="profile.genderOptions"/>
          </q-field>
          <q-field icon="cake" :error="$v.profile.dob.$error" error-label="Required">
            <q-datetime type="date" v-model="profile.dob" format="DD/MM/YYYY" float-label="Date of Birth"/>
          </q-field>
          <q-field icon="local_hospital">
            <q-select multiple chips float-label="Do you have any of these conditions?" v-model="profile.diseases"
            :options="profile.diseaseOptions"/>
          </q-field>
          <q-field icon="local_pharmacy">
            <q-select multiple chips float-label="Are you on any of these medications?" v-model="profile.medications"
            :options="profile.medicationOptions"/>
          </q-field>
          <br/>
          <q-toggle class="q-ma-sm" label="Do you smoke?" v-model="profile.smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free"/>
          <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="profile.activeLifestyle" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/>
          <br/>
          <q-stepper-navigation>
            <q-btn flat @click="$refs.stepper.previous()"  label="Back"/>
            <q-btn color="primary" @click="saveProfile()"  label="Next" />
          </q-stepper-navigation>
        </q-step>
        <!--
        Optional.

        "Globally" available Stepper navigation which means
        that it will be visible regardless of the current step.
        If we'd put QStepperNavigation under a QStep then we'd
        be using it for that step only.
      -->
    </q-stepper>
  </q-page>
</q-page-container>
</q-layout>
</template>

<script>
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import {required, email, sameAs} from 'vuelidate/lib/validators'
import profileOptions from 'src/modules/profileOptions'

export default {
  // name: 'PageName',
  data () {
    return {
      account: {
        email: '',
        pw1: '',
        pw2: ''
      },
      profile: {
        firstname: '',
        surname: '',
        dob: '',
        smoker: false,
        activeLifestyle: false,
        diseases: [],
        medications: [],
        studyCode: '',
        gender: '',
        diseaseOptions: profileOptions.diseases,
        medicationOptions: profileOptions.medications,
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
      pw1: {required},
      pw2: {
        sameAsPassword: sameAs('pw1')
      }
    },
    profile: {
      firstname: {required},
      surname: {required},
      dob: {required},
      gender: {required}
    }
  },
  methods: {
    async register () {
      this.$v.account.$touch()
      if (this.$v.account.error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          await API.registerUser(this.account.email, this.account.pw1)
          let user = await API.login(this.account.email, this.account.pw1)
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
          await API.createProfile({
            userKey: userinfo.user._key,
            createdTS: new Date(),
            dateOfBirth: this.profile.dob.substring(0, 10),
            gender: this.profile.gender,
            diseases: this.profile.diseases,
            medications: this.profile.medications
          })
          let user = await API.login(this.account.email, this.account.pw1)
          await userinfo.login(user)
          API.setToken(userinfo.token)

          this.$router.push('/home')
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
