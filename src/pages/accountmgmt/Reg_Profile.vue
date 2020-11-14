<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('accountMgmt.registration.createProfile') }}
      </div>
    </div>

    <profile-editor
      v-model="profile"
      :buttonOk="$t('common.next')"
      @buttonOk="saveProfile()"
    />

  </q-page>
</template>

<script>
import ProfileEditor from 'components/ProfileEditor'
import API from 'modules/API'
import userinfo from 'modules/userinfo'

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
        studiesSuggestions: true
      }
    }
  },
  methods: {
    async saveProfile () {
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
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('accountMgmt.registration.registrationError') + ': ' + error.message,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>

<style>
</style>
