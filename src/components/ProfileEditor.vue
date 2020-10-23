<template>
  <div>
    <q-input
      :label="$t('accountMgmt.profile.firstName')"
      :error="$v.value.name.$error"
      :error-message="$t('accountMgmt.profile.firstNameError')"
      v-model="value.name"
      @input="update()"
      @blur="$v.value.name.$touch"
    >
      <template v-slot:before>
        <q-icon name="face" />
      </template>
    </q-input>

    <!-- surname -->
    <q-input
      :label="$t('accountMgmt.profile.surname')"
      :error="$v.value.surname.$error"
      :error-message="$t('accountMgmt.profile.surnameError')"
      v-model="value.surname"
      @input="update()"
      @blur="$v.value.surname.$touch"
    >
      <template v-slot:before>
        <q-icon
          name="face"
          color="white"
        />
      </template>
    </q-input>

    <!-- language -->
    <q-select
      v-model="value.language"
      :options="languageOptions"
      emit-value
      map-options
      @input="selectLanguage()"
      :error="$v.value.language.$error"
      @blur="$v.value.language.$touch"
      :label="$t('accountMgmt.profile.language')"
      :error-message="$t('accountMgmt.profile.languageError')"
    >
      <template v-slot:before>
        <q-icon name="language" />
      </template>
    </q-select>

    <!-- country -->
    <q-select
      :label="$t('accountMgmt.profile.country')"
      v-model="value.country"
      @input="update()"
      :options="countryOptions"
      emit-value
      map-options
      :error="$v.value.country.$error"
      :error-message="$t('accountMgmt.profile.countryError')"
      @blur="$v.value.country.$touch"
    >
      <template v-slot:before>
        <q-icon name="flag" />
      </template>
    </q-select>

    <!-- sex -->
    <q-select
      :label="$t('accountMgmt.profile.sex')"
      v-model="value.sex"
      :options="sexOptions"
      emit-value
      map-options
      :error="$v.value.sex.$error"
      @blur="$v.value.sex.$touch"
      :error-message="$t('accountMgmt.profile.sexError')"
      @input="update()"
    >
      <template v-slot:before>
        <q-icon name="wc" />
      </template>
    </q-select>

    <!-- date of birth -->
    <q-input
      :label="$t('accountMgmt.profile.dateOfBirth')"
      v-model="value.dateOfBirth"
      @input="update()"
      mask="####/##/##"
      :rules="['YYYY/MM/DD']"
      :error-message="$t('accountMgmt.profile.dateOfBirthError')"
      :error="$v.value.dateOfBirth.$error"
      @blur="$v.value.dateOfBirth.$touch"
    >
      <template v-slot:before>
        <q-icon name="cake" />
      </template>
      <template v-slot:append>
        <q-icon
          name="calendar_today"
          class="cursor-pointer"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="value.dateOfBirth"
              @input="() => $refs.qDateProxy.hide()"
              default-view="Years"
              mask="YYYY/MM/DD"
              format="YYYY/MM/DD"
              :title="$t('accountMgmt.profile.dateOfBirth')"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-select
      :label="$t('accountMgmt.profile.conditions')"
      v-model="diseasesVue"
      @input="update()"
      use-input
      use-chips
      multiple
      input-debounce="500"
      :options="diseaseOptions"
      @filter="searchDisease"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ noResultTextDisease }}
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:before>
        <q-icon name="local_hospital" />
      </template>
    </q-select>

    <q-select
      v-model="medsVue"
      @input="update()"
      use-input
      use-chips
      multiple
      input-debounce="500"
      :label="$t('accountMgmt.profile.medications')"
      :options="medOptions"
      @filter="searchMeds"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ noResultTextMeds }}
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:before>
        <q-icon name="local_pharmacy" />
      </template>
    </q-select>

    <q-toggle
      class="q-mt-lg q-ma-sm"
      :label="$t('accountMgmt.profile.studiesSuggestions')"
      v-model="value.studiesSuggestions"
      @input="update()"
      left-label
    />

    <div class="q-my-md row justify-evenly">
      <q-btn
        v-if="buttonCancel"
        :label="buttonCancel"
        color="secondary"
        @click="buttonCancelClick()"
      />
      <q-btn
        v-if="buttonOk"
        :label="buttonOk"
        color="positive"
        @click="buttonOkClick()"
      />
    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import API from 'modules/API'

export default {
  name: 'ProfileEditor',
  props: ['value', 'buttonCancel', 'buttonOk'],
  data () {
    return {
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
    value: {
      name: {
        required
      },
      surname: {
        required
      },
      dateOfBirth: {
        required
      },
      sex: {
        required
      },
      language: {
        required
      },
      country: {
        required
      }
    }
  },
  computed: {
    // these are used to map label and value to term and conceptId
    diseasesVue: {
      get: function () {
        if (this.value.diseases && this.value.diseases.length) {
          return this.value.diseases.map(x => {
            return {
              label: x.term,
              value: x.conceptId,
              vocabulary: x.vocabulary
            }
          })
        } else return []
      },
      set: function (diseasesOpts) {
        this.value.diseases = diseasesOpts.map(x => {
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
        if (this.value.medications && this.value.medications.length) {
          return this.value.medications.map(x => {
            return {
              label: x.term,
              value: x.conceptId,
              vocabulary: x.vocabulary
            }
          })
        } else return []
      },
      set: function (medOptions) {
        this.value.medications = medOptions.map(x => {
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
      this.$root.$i18n.locale = this.value.language
      this.update()
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
          message: this.$i18n.t('accountMgmt.profile.conditionSearchError') + ': ' + error.message,
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
          message: this.$i18n.t('accountMgmt.profile.medicationSearchError') + ': ' + error.message,
          icon: 'report_problem'
        })
        abort()
      }
    },
    update () {
      this.$emit('input', this.value)
    },
    buttonCancelClick () {
      this.$emit('buttonCancel', this.value)
    },
    buttonOkClick () {
      this.$v.value.$touch()
      if (this.$v.value.$error) {
        this.$q.notify(this.$i18n.t('errors.correctFields'))
      } else {
        this.$emit('buttonOk', this.value)
      }
    }
  }
}
</script>
