<template>
      <q-page padding>
        <div class="row fit justify-center">
          <div class="text-h6 text-center q-pt-md">
            {{ $t('accountMgmt.registration.createProfile') }}
          </div>
        </div>
        <q-input :label="$t('accountMgmt.profile.firstName')"
        :error="$v.profile.name.$error" :error-message="$t('accountMgmt.profile.firstNameError')"
        v-model="profile.name" @blur="$v.profile.name.$touch">
          <template v-slot:before>
            <q-icon name="face" />
          </template>
        </q-input>

        <!-- surname -->
        <q-input :label="$t('accountMgmt.profile.surname')"
        :error="$v.profile.surname.$error" :error-message="$t('accountMgmt.profile.surnameError')"
        v-model="profile.surname" @blur="$v.profile.surname.$touch">
          <template v-slot:before>
            <q-icon name="face" color="white" />
          </template>
        </q-input>

        <!-- lanuage -->
        <q-select v-model="profile.language" :options="languageOptions"
        emit-value map-options @input="selectLanguage()"
        :error="$v.profile.language.$error" @blur="$v.profile.language.$touch"
        :label="$t('accountMgmt.profile.language')" :error-message="$t('accountMgmt.profile.languageError')">
          <template v-slot:before>
            <q-icon name="language" />
          </template>
        </q-select>

        <q-select v-model="profile.country" :options="countryOptions"
        emit-value map-options
        :error="$v.profile.country.$error" @blur="$v.profile.country.$touch"
        :label="$t('accountMgmt.profile.country')" :error-message="$t('accountMgmt.profile.countryError')">
          <template v-slot:before>
            <q-icon name="flag" />
          </template>
        </q-select>

        <q-select v-model="profile.sex" :options="sexOptions"
        emit-value map-options
        :error="$v.profile.sex.$error" @blur="$v.profile.sex.$touch"
        :label="$t('accountMgmt.profile.sex')" :error-message="$t('accountMgmt.profile.sexError')">
          <template v-slot:before>
            <q-icon name="wc" />
          </template>
        </q-select>

        <q-input v-model="profile.dateOfBirth" mask="####/##/##" :rules="['YYYY/MM/DD']"
        :label="$t('accountMgmt.profile.dateOfBirth')"
        :error-message="$t('accountMgmt.profile.dateOfBirthError')" :error="$v.profile.dateOfBirth.$error"
        @blur="$v.profile.dateOfBirth.$touch">
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

        <q-select
          v-model="diseasesVue"
          use-input
          use-chips
          multiple
          input-debounce="500"
          :label="$t('accountMgmt.profile.conditions')"
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
        </q-select>

        <q-select
          v-model="medsVue"
          use-input
          use-chips
          multiple
          input-debounce="500"
          :label="$t('accountMgmt.profile.medications')"
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
        </q-select>

        <q-toggle class="q-mt-lg q-ma-sm" :label="$t('accountMgmt.profile.smoke')"
        v-model="profile.lifestyle.smoker" checked-icon="smoking_rooms"
        unchecked-icon="smoke_free"/><br/>
        <q-toggle class="q-ma-sm" :label="$t('accountMgmt.profile.lifestyle')"
        v-model="profile.lifestyle.active" checked-icon="directions_run"
        unchecked-icon="airline_seat_recline_normal"/>

        <q-btn class="full-width q-mt-md q-mb-lg" color="positive"
        :disable="$v.profile.$error" @click="saveProfile()"
        :label="$t('common.next')" />

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
        country: '',
        language: '',
        sex: '',
        diseases: [],
        medications: [],
        lifestyle: {
          smoker: false,
          active: false
        }
      },
      sexOptions: [
        {
          label: this.$i18n.t('accountMgmt.profile.sexes.male'),
          value: 'male'
        },
        {
          label: this.$i18n.t('accountMgmt.profile.sexes.female'),
          value: 'female'
        },
        {
          label: this.$i18n.t('accountMgmt.profile.sexes.other'),
          value: 'other'
        }
      ],
      languageOptions: [
        {
          label: this.$i18n.t('accountMgmt.profile.languages.en'),
          value: 'en'
        },
        {
          label: this.$i18n.t('accountMgmt.profile.languages.sv'),
          value: 'sv'
        }
      ],
      countryOptions: [
        {
          label: this.$i18n.t('accountMgmt.profile.countries.gb'),
          value: 'gb'
        },
        {
          label: this.$i18n.t('accountMgmt.profile.countries.se'),
          value: 'se'
        }
      ],
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
      sex: { required },
      language: { required },
      country: { required }
    }
  },
  computed: {
    // these are used to map label and value to term and conceptId
    diseasesVue: {
      get: function () {
        if (this.profile.diseases && this.profile.diseases.length) {
          return this.profile.diseases.map(x => {
            return {
              label: x.term,
              value: x.conceptId,
              vocabulary: x.vocabulary
            }
          })
        } else return []
      },
      set: function (diseasesOpts) {
        this.profile.diseases = diseasesOpts.map(x => {
          return {
            term: x.label,
            conceptId: x.value,
            vocabulary: x.vocabulary
          }
        })
      }
    },
    medsVue: {
      get: function () {
        if (this.profile.medications && this.profile.medications.length) {
          return this.profile.medications.map(x => {
            return {
              label: x.term,
              value: x.conceptId,
              vocabulary: x.vocabulary
            }
          })
        } else return []
      },
      set: function (medOptions) {
        this.profile.medications = medOptions.map(x => {
          return {
            term: x.label,
            conceptId: x.value,
            vocabulary: x.vocabulary
          }
        })
      }
    }
  },
  methods: {
    selectLanguage () {
      this.$root.$i18n.locale = this.profile.language
    },
    async searchDisease (diseaseDescription, update, abort) {
      if (diseaseDescription.length < 3) {
        update(() => {
          this.diseaseOptions = []
          this.noResultTextDisease = this.$i18n.t('accountMgmt.profile.conditionsSearch')
        })
        return
      }
      try {
        const concepts = await API.searchDiseaseConcept(diseaseDescription)
        if (concepts.length) {
          update(() => {
            this.diseaseOptions = concepts.map((c) => {
              return {
                label: c.term,
                value: c.conceptId,
                vocabulary: c.vocabulary
              }
            })
          })
        } else {
          update(() => {
            this.diseaseOptions = []
            this.noResultTextDisease = this.$i18n.t('accountMgmt.profile.noResults')
          })
        }
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot find disease: ' + error.message,
          icon: 'report_problem'
        })
        abort()
      }
    },
    async searchMeds (medDescription, update, abort) {
      if (medDescription.length < 3) {
        update(() => {
          this.medOptions = []
          this.noResultTextMeds = this.$i18n.t('accountMgmt.profile.conditionsSearch')
        })
        return
      }
      try {
        const concepts = await API.searchMedicationConcept(medDescription)
        if (concepts.length) {
          update(() => {
            this.medOptions = concepts.map((c) => {
              return {
                label: c.term,
                value: c.conceptId,
                vocabulary: c.vocabulary
              }
            })
          })
        } else {
          update(() => {
            this.medOptions = []
            this.noResultTextMeds = this.$i18n.t('accountMgmt.profile.noResults')
          })
        }
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot find medication: ' + error.message,
          icon: 'report_problem'
        })
        abort()
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
