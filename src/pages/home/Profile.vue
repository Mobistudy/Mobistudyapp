<template>
  <q-page padding>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-center q-pt-md">
            {{$t('home.profile.headline')}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-input :label="$t('home.profile.firstNameLabel')" :error="$v.profile.name.$error" :error-message="$t('home.profile.firstNameError')" v-model="profile.name" @blur="$v.profile.name.$touch">
        <template v-slot:before>
          <q-icon name="face" />
        </template>
      </q-input>
    </q-list>

    <q-list>
      <q-input :label="$t('home.profile.surnameLabel')" :error="$v.profile.surname.$error" :error-message="$t('home.profile.surnameError')" v-model="profile.surname" @blur="$v.profile.surname.$touch">
        <template v-slot:before>
          <q-icon name="face" color="white" />
        </template>
      </q-input>
    </q-list>

    <q-list>
      <q-select v-model="profile.sex" map-options :options="sexOptions" :error="$v.profile.sex.$error" @blur="$v.profile.sex.$touch" :label="$t('home.profile.sexLabel')" :error-message="$t('home.profile.sexError')">
        <template v-slot:before>
          <q-icon name="wc" />
        </template>
      </q-select>
    </q-list>

    <q-list>
      <!-- TODO: NEED TO FIX VALIDATION-RULES FOR CUSTOM FORMAT! AS IN Reg_Profile.vue -->
      <q-input v-model="profile.dateOfBirth" mask="####/##/##" :rules="['YYYY/MM/DD']" :label="$t('home.profile.dateOfBirthLabel')" :error-message="$t('home.profile.dateOfBirthError')" :error="$v.profile.dateOfBirth.$error" @blur="$v.profile.dateOfBirth.$touch">
        <template v-slot:before>
          <q-icon name="cake" />
        </template>
        <template v-slot:append>
          <q-icon name="calendar_today" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="profile.dateOfBirth" @input="() => $refs.qDateProxy.hide()" mask="YYYY/MM/DD" format="YYYY/MM/DD" :title="$t('home.profile.dateOfBirthTitle')" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-list>

    <!-- Following commented out for 4YP. To be uncommented after. -->
    <!-- <q-field class="q-mt-sm" icon="local_hospital" helper="Do you suffer from any long-term medical condition?">
      <q-chips-input placeholder="Conditions" v-model="diseasesVue" @duplicate="duplicatedDisease">
        <q-autocomplete @search="searchDisease" @selected="selectedDisease" />
      </q-chips-input>
    </q-field>

    <q-field class="q-mt-lg" icon="local_pharmacy" helper="Are you on any long-term medication?">
      <q-chips-input placeholder="Medications" v-model="medsVue" @duplicate="duplicatedMeds">
        <q-autocomplete @search="searchMeds" @selected="selectedMeds" />
      </q-chips-input>
    </q-field> -->

    <!-- <q-toggle class="q-mt-lg q-ma-sm" label="Do you smoke?" v-model="profile.lifestyle.smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free"/>
    <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="profile.lifestyle.active" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/> -->
    <div class="q-mt-md q-mb-lg row q-px-md">
      <div class="q-ma-sm"><q-btn color="primary" :label="$t('home.profile.buttonUpdate')" @click="saveProfile()" /></div>
      <div class="q-ma-sm"><q-btn color="grey" :label="$t('home.profile.buttonCancel')" to="home" /></div>
    </div>
    <q-separator />
    <q-item class="q-mt-md">
        <q-item-section avatar>
          <q-icon color="grey" name="security" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('home.profile.changePwHeadline')}}</q-item-label>
          <q-item-label caption>{{$t('home.profile.changePwText')}}</q-item-label>
          <div class="q-my-md"><q-btn color="secondary" to="changePW" :label="$t('home.profile.buttonChangePw')" /></div>
        </q-item-section>
    </q-item>
    <q-separator inset />
      <q-item class="q-mt-md">
        <q-item-section avatar>
          <q-icon color="grey" name="exit_to_app" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('home.profile.logoutHeadline')}}</q-item-label>
          <q-item-label caption>{{$t('home.profile.logoutText')}}</q-item-label>
          <div class="q-my-md"><q-btn color="warning" to="Login" :label="$t('home.profile.buttonLogout')" /></div>
        </q-item-section>
      </q-item>
    <q-separator inset />
      <q-item class="q-mt-md">
        <q-item-section avatar>
          <q-icon color="grey" name="delete_forever" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{$t('home.profile.deleteHeadline')}}</q-item-label>
          <q-item-label caption>{{$t('home.profile.deleteText')}}</q-item-label>
          <div class="q-my-md"><q-btn color="negative" :label="$t('home.profile.buttonDelete')" @click="deleteUser()" /></div>
        </q-item-section>
      </q-item>
    <q-separator inset />
  </q-page>
</template>

<script>
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ProfilePage',
  data () {
    return {
      profile: {
        // Following commented out for 4YP. To be uncommented after.
        // diseases: [],
        // medications: [],
        // lifestyle: {}
      },
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
  },
  async created () {
    this.$q.loading.show()
    try {
      this.profile = await API.getProfile(userinfo.user._key)
      await userinfo.setProfile(this.profile)
      this.$q.loading.hide()
    } catch (error) {
      this.$q.notify({
        color: 'negative',
        message: 'Cannot update: ' + error.message,
        icon: 'report_problem'
      })
      this.$q.loading.hide()
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
            // Following commented out for 4YP. To be uncommented after.
            // name: this.profile.name,
            // surname: this.profile.surname,
            dateOfBirth: dobTemp,
            sex: this.profile.sex
            // diseases: this.profile.diseases,
            // medications: this.profile.medications,
            // lifestyle: this.profile.lifestyle
          }
          await API.updateProfile(profile)
          await userinfo.setProfile(profile)

          this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
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
        ok: {
          label: 'DELETE',
          push: true,
          color: 'negative'
        },
        cancel: {
          push: true,
          color: 'grey',
          flat: true
        }
      }).onOk(async () => {
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
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    }
  }
}
</script>

<style>
</style>
