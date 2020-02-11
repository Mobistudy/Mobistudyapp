<template>
      <q-page padding>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-center q-pt-md">{{ $t('accountMgmt.profile.headline') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-input :label="$t('accountMgmt.profile.firstName')" :error="$v.profile.name.$error" :error-message="$t('accountMgmt.profile.firstNameError')" v-model="profile.name" @blur="$v.profile.name.$touch">
            <template v-slot:before>
              <q-icon name="face" />
            </template>
          </q-input>
        </q-list>

        <q-list>
          <q-input :label="$t('accountMgmt.profile.surname')" :error="$v.profile.surname.$error" :error-message="$t('accountMgmt.profile.surnameError')" v-model="profile.surname" @blur="$v.profile.surname.$touch">
            <template v-slot:before>
              <q-icon name="face" color="white" />
            </template>
          </q-input>
        </q-list>

        <q-list>
          <q-select v-model="profile.sex" :options="profile.sexOptions" :error="$v.profile.sex.$error" @blur="$v.profile.sex.$touch" :label="$t('accountMgmt.profile.sex')" :error-message="$t('accountMgmt.profile.sexError')">
            <template v-slot:before>
              <q-icon name="wc" />
            </template>
          </q-select>
        </q-list>

        <q-list>
          <q-input v-model="profile.dateOfBirth" mask="####/##/##" :rules="['YYYY/MM/DD']" :label="$t('accountMgmt.profile.dateOfBirth')" :error-message="$t('accountMgmt.profile.dateOfBirthError')" :error="$v.profile.dateOfBirth.$error" @blur="$v.profile.dateOfBirth.$touch">
            <template v-slot:before>
              <q-icon name="cake" />
            </template>
            <template v-slot:append>
              <q-icon name="calendar_today" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="profile.dateOfBirth" @input="() => $refs.qDateProxy.hide()" mask="YYYY/MM/DD" format="YYYY/MM/DD" :title="$t('accountMgmt.profile.dateOfBirth')" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-list>

        <q-list>
          <q-select
            v-model="profile.diseases"
            use-input
            use-chips
            multiple
            input-debounce="500"
            :label="$t('accountMgmt.profile.conditions')"
            :hint="$t('accountMgmt.profile.conditionsHint')"
            :options="diseaseOptions"
            @filter="searchDisease">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ noResultTextDisease }}
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:before>
              <q-icon name="local_hospital"/>
            </template>
            <template v-slot:loading >
              <div class="q-pa-md">
                <div class="q-gutter-md row">
                  <q-spinner
                    color="primary"
                    size="3em"
                    :thickness="2"
                  />
                </div>
              </div>
            </template>
          </q-select>
        </q-list>

        <!-- <q-list>
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
        </q-list> -->

        <q-list>
          <q-select
            v-model="profile.medications"
            use-input
            use-chips
            multiple
            input-debounce="500"
            :label="$t('accountMgmt.profile.medications')"
            :hint="$t('accountMgmt.profile.medicationsHint')"
            :options="medOptions"
            @filter="searchMeds">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ noResultTextMeds }}
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:before>
              <q-icon name="local_pharmacy"/>
            </template>
            <template v-slot:loading >
              <div class="q-pa-md">
                <div class="q-gutter-md row">
                  <q-spinner
                    color="primary"
                    size="3em"
                    :thickness="2"
                  />
                </div>
              </div>
            </template>
          </q-select>
        </q-list>

        <q-list>
          <q-toggle class="q-mt-lg q-ma-sm" :label="$t('accountMgmt.profile.smoke')" v-model="profile.lifestyle.smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free"/><br/>
          <q-toggle class="q-ma-sm" :label="$t('accountMgmt.profile.lifestyle')" v-model="profile.lifestyle.active" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/><br/>
        </q-list>

        <q-list>
          <q-btn class="full-width q-mt-md q-mb-lg" color="primary" :disable="$v.profile.$anyError" @click="saveProfile()"  :label="$t('accountMgmt.profile.buttonNext')" />
        </q-list>

    </q-page>
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
      },
      diseaseOptions: [],
      medOptions: [],
      noResultTextDisease: '',
      noResultTextMeds: ''
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
    // TODO: Commented out since the computed Models somehow didn't properly work -> Diseases and Meds are directly set to profile.diseases/.medications
    /* diseasesVue: {
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
    }  */
  },
  methods: {
    async searchDisease (diseaseDescription, done, abort) {
      console.log(diseaseDescription)
      try {
        const results = await API.searchSNOMEDDisease(diseaseDescription)

        if (diseaseDescription === '') {
          done(() => {
            this.diseaseOptions = []
          })
          this.noResultTextDisease = 'Search for medical conditions'
          return
        } else {
          this.noResultTextDisease = 'No results'
        }
        if (results.length === 0) {
          this.$q.notify('No matches.')
        }
        done(() => {
          const selDis = Object.keys(this.profile.diseases)
          const disFil = results.filter((entry) => !selDis.includes(entry.term))
          this.diseaseOptions = disFil
        })
      } catch (error) {
        this.$q.notify('Cannot find diseases. Please Try again.')
        console.error(error)
        done([])
      }
    },
    async searchMeds (medDescription, done, abort) {
      console.log(medDescription)
      try {
        const results = await API.searchSNOMEDMedication(medDescription)

        if (medDescription === '') {
          done(() => {
            this.medOptions = []
          })
          this.noResultTextMeds = 'Search for medications'
          return
        } else {
          this.noResultTextMeds = 'No results'
        }
        if (results.length === 0) {
          this.$q.notify('No matches.')
        }
        done(() => {
          const selMed = Object.keys(this.profile.medications)
          const medFil = results.filter((entry) => !selMed.includes(entry.term))
          this.medOptions = medFil
        })
      } catch (error) {
        this.$q.notify('Cannot find meds. Please Try again.')
        console.error(error)
        done([])
      }
    },
    /* selectedDisease (item, done) {
      this.profile.diseases.push({
        name: item.label,
        conceptId: item.conceptId
      })
      // if (!this.profile.diseases.find(x => x.name === item.label)) {
      //  this.profile.diseases.push({
      //    name: item.label,
      //    conceptId: item.conceptId
      //  })
      // }
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
    },  */
    /* selectedMeds (item) {
      if (!this.profile.medications.find(x => x.name === item.label)) {
        this.profile.medications.push({
          name: item.label,
          conceptId: item.conceptId
        })
      }
    },
    duplicatedMeds (label) {
      this.$q.notify(`"${label}" already in list`)
    }, */
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
