<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-h4">Create Profile</p>
          <div class="q-pa-md">
            <q-field :error="$v.profile.name.$error || $v.profile.surname.$error" error-message="First Name and Surname required">
              <q-input label="First Name" v-model="profile.name" @blur="$v.profile.name.$touch"/>
              <q-input label="Surname" v-model="profile.surname" @blur="$v.profile.surname.$touch"/>
              <template v-slot:before>
                  <q-icon name="face" />
              </template>
            </q-field>

            <div class="q-gutter-md">
              <q-select v-model="profile.sex" :options="profile.sexOptions" :error="$v.profile.sex.$error" @blur="$v.profile.sex.$touch" label="Sex" error-message="Required">
                <template v-slot:before>
                  <q-icon name="wc" />
                </template>
              </q-select>
            </div>

            <div class="q-gutter-md">
              <!-- TODO: NEED TO FIX VALIDATION-RULES FOR CUSTOM FORMAT! -->
              <q-input v-model="profile.dateOfBirth" mask="##/##/####" :rules="['DD/MM/YYYY']" label="Date of Birth" error-message="Required" :error="$v.profile.dateOfBirth.$error" @blur="$v.profile.dateOfBirth.$touch">
                <template v-slot:before>
                  <q-icon name="cake" />
                </template>
                <template v-slot:append>
                  <q-icon name="calendar_today" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="profile.dateOfBirth" @input="() => $refs.qDateProxy.hide()" mask="DD/MM/YYYY" format="DD/MM/YYYY" title="Date of Birth" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

          <!-- <q-field class="q-mt-sm" icon="local_hospital" helper="Do you suffer from any long-term medical condition?">
            <q-chips-input placeholder="Conditions" v-model="diseasesVue" @duplicate="duplicatedDisease">
              <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
            </q-chips-input>
          </q-field> -->

            <!-- TODO: FIX SEARCH, DOESN'T WORK YET -->
            <div class="q-gutter-md">
              <q-select
                icon="local_hospital"
                v-model="diseasesVue"
                use-input
                use-chips
                hide-selected
                fill-input
                input-debounce="0"
                :options="diseasesVue"
                @filter="searchDisease"
                @selected="selectedDisease"
                label="Conditions"
                hint="Do you suffer from any long-term medical condition?">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:before>
                  <q-icon name="local_hospital" />
                </template>
              </q-select>
            </div>

          <!--
            <q-field class="q-mt-lg" icon="local_pharmacy" helper="Are you on any long-term medication?">
              <q-chips-input placeholder="Medications" v-model="medsVue" @duplicate="duplicatedMeds">
                <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
              </q-chips-input>
            </q-field> -->

            <!-- TODO: FIX SEARCH, DOESN'T WORK YET -->
            <div class="q-gutter-md">
              <q-select
                v-model="medsVue"
                use-input
                use-chips
                hide-selected
                fill-input
                input-debounce="0"
                :options="medsVue"
                @filter="searchMeds"
                @selected="selectedMeds"
                label="Medications"
                hint="Are you on any long-term medication?">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:before>
                  <q-icon name="local_pharmacy" />
                </template>
              </q-select>
            </div>

            <q-toggle class="q-mt-lg q-ma-sm" label="Do you smoke?" v-model="profile.lifestyle.smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free"/><br/>
            <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="profile.lifestyle.active" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/><br/>
            <!-- <q-btn flat @click="$refs.stepper.previous()"  label="Back"/> -->

            <!-- TODO: FIX VALIDATION ON CLICK, DOESN'T WORK YET -->
            <q-btn color="primary" @click="saveProfile()"  label="Next" />
          </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import { required } from 'vuelidate/lib/validators'

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
      name: { required },
      surname: { required },
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
    async searchDisease (diseaseDescription, done) {
      console.log(diseaseDescription)
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
