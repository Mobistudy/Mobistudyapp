<template>
  <q-form ref="profileForm" @submit.prevent="">
    <!-- firstname -->
    <q-input :label="$t('userMgmt.profile.firstName')" :rules="[val => !!val || $t('userMgmt.profile.firstNameError')]"
      v-model="profile.name">
      <template v-slot:before>
        <q-icon name="face" />
      </template>
    </q-input>

    <!-- surname -->
    <q-input :label="$t('userMgmt.profile.surname')" :rules="[val => !!val || $t('userMgmt.profile.surnameError')]"
      v-model="profile.surname">
      <template v-slot:before>
        <q-icon name="face" color="white" />
      </template>
    </q-input>

    <!-- date of birth -->
    <q-input :label="$t('userMgmt.profile.dateOfBirth')" v-model="profile.dateOfBirth"
      :rules="[val => !!val || $t('userMgmt.profile.dateOfBirthError')]">
      <template v-slot:before>
        <q-icon name="calendar_today" />
      </template>
      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
        <q-date minimal v-model="profile.dateOfBirth" class="cursor-pointer" default-view="Years" mask="YYYY-MM-DD"
          format="YYYY-MM-DD" default-year-month="1970/01" :navigation-max-year-month="maxDoB"
          @update:model-value="() => $refs.qDateProxy.hide()">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn padding="md lg" :label="$t('common.close')" color="primary" flat v-close-popup />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-input>

    <!-- language -->
    <q-select v-model="profile.language" :options="languageOptions" emit-value map-options
      @update:model-value="selectLanguage()" :label="$t('userMgmt.profile.language')"
      :rules="[val => !!val || $t('userMgmt.profile.languageError')]">
      <template v-slot:before>
        <q-icon name="language" />
      </template>
    </q-select>

    <!-- country -->
    <q-select :label="$t('userMgmt.profile.country')" v-model="profile.country" :options="countryOptions" emit-value
      map-options :rules="[val => !!val || $t('userMgmt.profile.countryError')]">
      <template v-slot:before>
        <q-icon name="flag" />
      </template>
    </q-select>

    <!-- sex -->
    <q-select :label="$t('userMgmt.profile.sex')" v-model="profile.sex" :options="sexOptions" emit-value map-options
      :rules="[val => !!val || $t('userMgmt.profile.sexError')]">
      <template v-slot:before>
        <q-icon name="wc" />
      </template>
    </q-select>

    <!-- weight -->
    <q-input :label="$t('userMgmt.profile.weight')" v-model="profile.weight"
      :rules="[val => !!val && (val > 30 && val < 160) || $t('userMgmt.profile.weightError')]" type='number'>
      <template v-slot:before>
        <q-icon name="monitor_weight" /> <!-- placeholder icon -->
      </template>
    </q-input>

    <!-- height -->
    <q-input :label="$t('userMgmt.profile.height')" v-model="profile.height"
      :rules="[val => !!val && (val > 50 && val < 250) || $t('userMgmt.profile.heightError')]" type='number'>
      <template v-slot:before>
        <q-icon name="accessibility" /> <!-- placeholder icon -->
      </template>
    </q-input>

    <!-- conditions -->
    <q-select ref="diseasesSelect" :label="$t('userMgmt.profile.conditions')" v-model="diseasesVue" use-input use-chips
      multiple input-debounce="500" :options="diseaseOptions" @filter="searchDisease" @add="clearDiseasesFilter">
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ noResultTextDisease }}
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:before>
        <q-icon name="medical_information" />
      </template>
    </q-select>

    <!-- medications -->
    <q-select class="q-my-md" ref="medsSelect" v-model="medsVue" use-input use-chips multiple input-debounce="500"
      :label="$t('userMgmt.profile.medications')" :options="medOptions" @filter="searchMeds" @add="clearMedsFilter">
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            {{ noResultTextMeds }}
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:before>
        <q-icon name="medication" />
      </template>
    </q-select>

    <!-- studies suggestions -->
    <q-toggle class="q-mt-lg q-ma-sm" :label="$t('userMgmt.profile.studiesSuggestions')"
      v-model="profile.studiesSuggestions" left-label />

    <div class="q-my-md row justify-evenly">
      <q-btn class="mobibtn" v-if="buttonCancelText" :label="buttonCancelText" color="secondary"
        @click="buttonCancelClick()" />
      <q-btn class="mobibtn" v-if="buttonOkText" :label="buttonOkText" color="primary" @click="buttonOkClick()" />
    </div>

  </q-form>
</template>

<script>
import i18nUserMgmt from '@i18n/userMgmt'
import i18nCommon from '@i18n/common'
import { mergeDeep } from '@shared/tools.js'

import API from '@shared/API'
import { date } from 'quasar'

export default {
  name: 'ProfileEditor',
  props: ['modelValue', 'buttonCancelText', 'buttonOkText'],
  emits: ['update:modelValue', 'language-changed', 'buttonOk'],
  i18n: {
    messages: mergeDeep(i18nUserMgmt, i18nCommon)
  },
  data () {
    return {
      maxDoB: date.formatDate(Date.now(), 'YYYY/MM'),
      sexOptions: [
        {
          label: this.$i18n.t('userMgmt.profile.sexes.male'),
          value: 'male'
        },
        {
          label: this.$i18n.t('userMgmt.profile.sexes.female'),
          value: 'female'
        },
        {
          label: this.$i18n.t('userMgmt.profile.sexes.other'),
          value: 'other'
        }
      ],
      languageOptions: [
        {
          label: this.$i18n.t('userMgmt.profile.languages.en'),
          value: 'en'
        },
        {
          label: this.$i18n.t('userMgmt.profile.languages.sv'),
          value: 'sv'
        },
        {
          label: this.$i18n.t('userMgmt.profile.languages.es'),
          value: 'es'
        },
        {
          label: this.$i18n.t('userMgmt.profile.languages.it'),
          value: 'it'
        }
      ],
      countryOptions: [
        {
          label: this.$i18n.t('userMgmt.profile.countries.gb'),
          value: 'gb'
        },
        {
          label: this.$i18n.t('userMgmt.profile.countries.se'),
          value: 'se'
        },
        {
          label: this.$i18n.t('userMgmt.profile.countries.es'),
          value: 'es'
        },
        {
          label: this.$i18n.t('userMgmt.profile.countries.it'),
          value: 'it'
        }
      ],
      diseaseOptions: [],
      medOptions: [],
      noResultTextDisease: '',
      noResultTextMeds: ''
    }
  },
  computed: {
    profile: {
      get () {
        return this.modelValue
      },
      set (newVal) {
        this.$emit('update:modelValue', newVal)
      }
    },
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
      set: function (diseaseOpts) {
        this.profile.diseases = diseaseOpts.map(x => {
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
      this.$emit('language-changed')
    },
    async searchDisease (diseaseDescription, update, abort) {
      console.log('searching ', diseaseDescription)
      if (diseaseDescription.length < 3) {
        update(() => {
          this.diseaseOptions = []
          this.noResultTextDisease = this.$i18n.t('userMgmt.profile.conditionsSearch')
        })
        return
      }
      try {
        let concepts = await API.searchDiseaseConcept(diseaseDescription, this.profile.language)
        concepts = concepts.filter((concept) => {
          if (!this.conceptIdExistsInArrayOfObjects(this.profile.diseases, concept.conceptId)) {
            return true
          } else return false
        })
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
            this.noResultTextDisease = this.$i18n.t('userMgmt.profile.noResults')
          })
        }
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('userMgmt.profile.conditionSearchError') + ': ' + error.message,
          icon: 'report_problem'
        })
        abort()
      }
    },
    async searchMeds (medDescription, update, abort) {
      if (medDescription.length < 3) {
        update(() => {
          this.medOptions = []
          this.noResultTextMeds = this.$i18n.t('userMgmt.profile.conditionsSearch')
        })
        return
      }
      try {
        let concepts = await API.searchMedicationConcept(medDescription, this.profile.language)
        concepts = concepts.filter((concept) => {
          if (!this.conceptIdExistsInArrayOfObjects(this.profile.medications, concept.conceptId)) {
            return true
          } else return false
        })
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
            this.noResultTextMeds = this.$i18n.t('userMgmt.profile.noResults')
          })
        }
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('userMgmt.profile.medicationSearchError') + ': ' + error.message,
          icon: 'report_problem'
        })
        abort()
      }
    },
    conceptIdExistsInArrayOfObjects (array, conceptId) {
      let exists = false
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of array.entries()) {
        if (value.conceptId === conceptId) {
          exists = true
        }
      }
      return exists
    },
    clearDiseasesFilter (d) {
      if (this.$refs.diseasesSelect !== void 0) {
        this.$refs.diseasesSelect.updateInputValue('')
      }
    },
    clearMedsFilter () {
      if (this.$refs.medsSelect !== void 0) {
        this.$refs.medsSelect.updateInputValue('')
      }
    },
    buttonCancelClick () {
      this.$emit('buttonCancel')
    },
    async buttonOkClick () {
      const valid = await this.$refs.profileForm.validate(true)
      if (!valid) {
        this.$q.notify(this.$i18n.t('errors.correctFields'))
      } else {
        this.$emit('buttonOk', this.profile)
      }
    }
  }
}
</script>
