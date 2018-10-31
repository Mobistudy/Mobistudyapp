<template>
  <q-page padding>
    <!-- content -->
    <h4>Registration</h4>
    <q-stepper vertical ref="stepper">
      <!-- Step: -->
      <q-step default icon="account_circle" title="Account" subtitle="Setup your Mobistudy Account">
        <q-field icon="face" :error="$v.firstname.$error || $v.surname.$error" error-label="Required">
          <q-input float-label="First Name" v-model="firstname" />
          <q-input float-label="Surname" v-model="surname" />
        </q-field>
        <q-field icon="mail_outline" :error="$v.email.$error" error-label="Please type a valid email">
          <q-input float-label="Email" @blur="$v.email.$touch" v-model="email" />
        </q-field>
        <q-field icon="vpn_key" :error="$v.pw1.$error || $v.pw2.$error" error-label="Passwords do not match">
          <q-input float-label="Password" v-model="pw1" type="password" />
          <q-input float-label="Confirm Password" v-model="pw2" @blur="$v.pw2.$touch" type="password" />
        </q-field>
        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="nextStage()"
            label="Next"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- Step: -->
      <q-step title="Profile" subtitle="Tell us your details">
        <q-field icon="wc" :error="$v.gender.$error" error-label="Required">
          <q-select float-label="Gender" :options="genderOptions" />
        </q-field>
        <q-field icon="cake" :error="$v.dob.$error" error-label="Required">
          <q-datetime minimal v-model="dob" float-label="Date of Birth" type="date" />
        </q-field>
        <q-field icon="local_hospital">
          <q-select multiple chips float-label="Do you have any of these conditions?" v-model="diseases" :options="diseaseOptions" />
        </q-field>
        <q-field icon="local_pharmacy">
          <q-select multiple chips float-label="Are you on any of these medications?" v-model="medications" :options="medicationOptions" />
        </q-field>
        <!--<q-field>-->
        <br />
          <q-toggle class="q-ma-sm" label="Do you smoke?" v-model="smoker" checked-icon="smoking_rooms" unchecked-icon="smoke_free" />
        <!--</q-field>-->
        <!--<q-field>-->
          <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="activeLifestyle" checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal" />
        <br />
        <!--</q-field>-->
        <q-stepper-navigation>
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            label="Back"
          />
          <q-btn
            color="primary"
            @click="nextStage()"
            label="Next"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- Step: -->
      <!--<q-step title="Study" subtitle="Add a clinical study">
        <q-field icon="school" :error="error_studyCode" error-label="Invalid Code">
          <q-input float-label="Study Code" v-model="studyCode" />
        </q-field>
        <q-stepper-navigation>
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            label="Back"
          />
          <q-btn
            color="primary"
            @click="$refs.stepper.next()"
            label="Next"
          />
        </q-stepper-navigation>
      </q-step>-->

      <!-- Step: -->
      <q-step title="Terms of Use">
        <h5>Your Information</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt dictum faucibus. Nunc vel ultricies quam, vel molestie tellus. Curabitur viverra tristique quam, vitae ornare ex pulvinar sed. Vestibulum sagittis eros non ante dignissim, et faucibus turpis auctor. Duis volutpat massa lorem, in luctus lacus rutrum quis. Integer eu urna id quam dignissim ultrices ut vel metus. Proin vel porta velit. Pellentesque dictum tortor mollis pretium aliquet. Curabitur scelerisque augue non posuere tincidunt. Duis vitae lobortis urna. Aliquam mollis turpis ut erat tristique fermentum. Integer sollicitudin posuere mi sed laoreet. In semper quam vitae enim condimentum tincidunt. Proin ac metus maximus, venenatis urna at, rhoncus magna. Mauris leo nunc, faucibus suscipit suscipit id, maximus quis ipsum.</p>
        <h5>EULA</h5>
        <p>Sed vitae eros volutpat, semper lacus eget, tincidunt lacus. Donec sit amet tristique mauris, non vehicula sapien. Duis libero lectus, gravida vitae lorem quis, auctor interdum neque. Maecenas nunc nulla, semper a ipsum in, tincidunt iaculis mauris. Integer quis dignissim lectus. Cras blandit nibh vel lacinia sollicitudin. Phasellus nec fermentum urna. Curabitur ac molestie mi. Praesent posuere mi eget tempor sodales. Donec vitae elit eu quam rhoncus vulputate eu eu dolor. In id purus id orci bibendum eleifend. Nulla nec ex in massa fringilla sollicitudin non sed diam. Ut commodo felis vel placerat fringilla. Morbi nec mattis tortor, id bibendum arcu. Quisque a bibendum ante.</p>
        <q-stepper-navigation>
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            label="Back"
          />
          <q-btn
            color="primary"
            @click="$refs.stepper.next()"
            label="Accept"
          />
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
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  // name: 'PageName',
  data () {
    return {
      firstname: '',
      surname: '',
      email: '',
      pw1: '',
      pw2: '',
      dob: '',
      smoker: false,
      activeLifestyle: false,
      diseases: [],
      medications: [],
      studyCode: '',
      diseaseOptions: [
        {
          label: 'Asthma',
          value: 'asthma'
        },
        {
          label: 'Diabetes',
          value: 'diabetes'
        },
        {
          label: 'COPD',
          value: 'copd'
        }
      ],
      medicationOptions: [
        {
          label: 'Simvastatin',
          value: 'simvastatin'
        },
        {
          label: 'Omeprazole',
          value: 'omeprazole'
        },
        {
          label: 'Duloxetine',
          value: 'duloxetine'
        }
      ],
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
  validations: {
    email: {required, email},
    firstname: {required},
    surname: {required},
    pw1: {required},
    pw2: {
      sameAsPassword: sameAs('pw1')
    },
    dob: {required},
    gender: {required}
  },
  methods: {
    nextStage () {
      this.$v.touch()
      if (this.$v.$invalid) {

      } else {
        this.$refs.stepper.next()
      }
    }
  }
}
</script>

<style>
</style>
