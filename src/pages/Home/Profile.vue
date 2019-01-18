<template>
  <q-page padding>
    <p class="q-title">
      Your profile
    </p>
    <q-field icon="face" :error="$v.profile.name.$error || $v.profile.surname.$error" error-label="Required">
      <q-input float-label="First Name" v-model="profile.name"/>
      <q-input float-label="Surname" v-model="profile.surname"/>
    </q-field>
    <q-field icon="wc" :error="$v.profile.gender.$error" error-label="Required">
      <q-select float-label="Gender" v-model="profile.gender" :options="genderOptions"/>
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
    <div class="q-mt-lg row">
      <div class="q-ma-sm"><q-btn color="positive" label="Update" @click="saveProfile()" /></div>
      <div class="q-ma-sm"><q-btn color="tertiary" label="Cancel" to="home" /></div>
      <div class="q-ma-sm"><q-btn color="secondary" to="changePW" label="Change Password" /></div>
      <div class="q-ma-sm"><q-btn color="warning" class="float-right" label="Logout" to="Login" /></div>
      <div class="q-ma-sm"><q-btn color="negative" class="float-right" label="Delete user" @click="deleteUser()" /></div>
    </div>
  </q-page>
</template>

<script>
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'ProfilePage',
  data () {
    return {
      profile: {
        diseases: [],
        medications: [],
        lifestyle: {}
      },
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
  },
  async created () {
    try {
      this.profile = await API.getProfile(userinfo.user._key)
      await userinfo.setProfile(this.profile)
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        message: 'Cannot update: ' + error.message,
        icon: 'report_problem'
      })
    }
  },
  validations: {
    profile: {
      name: {required},
      surname: {required},
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
    async saveProfile () {
      this.$v.profile.$touch()
      if (this.$v.profile.error) {
        this.$q.notify('Please correct the indicated fields.')
      } else {
        try {
          let profile = {
            userKey: userinfo.user._key,
            updatedTS: new Date(),
            name: this.profile.name,
            surname: this.profile.surname,
            dateOfBirth: this.profile.dateOfBirth.substring(0, 10),
            gender: this.profile.gender,
            diseases: this.profile.diseases,
            medications: this.profile.medications,
            lifestyle: this.profile.lifestyle
          }
          await API.updateProfile(profile)
          await userinfo.setProfile(profile)

          this.$router.push('/home')
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot update: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    },
    async deleteUser () {
      this.$q.dialog({
        title: 'Warning',
        message: 'Deleting your user will delete all the data permanently for all studies. Are you sure you want to continue?',
        color: 'negative',
        ok: 'DELETE',
        cancel: true
      }).then(async () => {
        try {
          await API.deleteUser(userinfo.user._key)
          this.$router.push('/login')
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: 'Cannot delete user: ' + error.message,
            icon: 'report_problem'
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
