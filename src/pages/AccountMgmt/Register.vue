<template>
  <q-page padding>
    <!-- content -->
    <h4>Registration</h4>
    <q-stepper vertical ref="stepper">
      <!-- Step: -->
      <q-step default icon="account_circle" title="Profile" subtitle="Your Details">
        <q-field icon="face" :error="error_name" error-label="Required">
          <q-input float-label="First Name" v-model="firstname" />
          <q-input float-label="Surname" v-model="surname" />
        </q-field>
        <q-field icon="mail_outline" :error="error_email" error-label="Required">
          <q-input float-label="Email" v-model="email" />
        </q-field>
        <q-field icon="lock" :error="error_username" error-label="Required">
          <q-input float-label="Username" v-model="username" />
        </q-field>
        <q-field icon="vpn_key" :error="error_password" error-label="Passwords do not match">
          <q-input float-label="Password" v-model="pw1" type="password" />
          <q-input float-label="Confirm Password" v-model="pw2" type="password" />
        </q-field>
        <q-stepper-navigation>
          <q-btn
            color="primary"
            @click="stageOne()"
            label="Next"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- Step: -->
      <q-step title="Study" subtitle="Add a clinical study">
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
            @click="stageTwo()"
            label="Next"
          />
        </q-stepper-navigation>
      </q-step>

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
            @click="stageThree()"
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
export default {
  // name: 'PageName',
  data () {
    return {
      error_name: false,
      error_email: false,
      error_username: false,
      error_password: false,
      firstname: '',
      surname: '',
      email: '',
      username: '',
      pw1: '',
      pw2: '',
      error_studyCode: false,
      studyCode: ''
    }
  },
  methods: {
    stageOne () {
      // Validate Form
      this.$data.error_name = this.$data.firstname.length === 0 || this.$data.surname.length === 0
      this.$data.error_email = this.$data.email.length === 0
      this.$data.error_username = this.$data.username.length === 0
      this.$data.error_password = this.$data.pw1.length === 0 || this.$data.pw1 !== this.$data.pw2
      if (!(this.$data.error_name || this.$data.error_email || this.$data.error_username || this.$data.error_password)) {
        this.$refs.stepper.next()
      }
    },
    stageTwo () {
      this.$refs.stepper.next()
    },
    stageThree () {
      this.$refs.stepper.next()
    }
  }
}
</script>

<style>
</style>
