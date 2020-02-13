<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h6 text-center q-pt-md">
        {{ $t('accountMgmt.registration.createProfile') }}
      </div>
    </div>

    <profile-editor v-model="profile" />

    <q-btn class="full-width q-mt-md q-mb-lg" color="positive"
    :disable="$v.profile.$error" @click="saveProfile()"
    :label="$t('common.next')" />

  </q-page>
</template>

<script>
import ProfileEditor from '../../components/ProfileEditor'
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'

export default {
  name: 'RegisterPage',
  components: { ProfileEditor },
  data () {
    return {
      profile: {
        name: '',
        surname: '',
        dateOfBirth: '',
        country: '',
        language: '',
        sex: '',
        diseases: [],
        medications: [],
        lifestyle: {
          smoker: false,
          active: false
        }
      }
    }
  },
  methods: {
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
      if (this.$v.profile.$error) {
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
            sex: this.profile.sex,
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
