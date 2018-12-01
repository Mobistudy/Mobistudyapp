<template>
  <q-page padding>
    <!-- content -->
    <q-field
      icon="face"
    >
      <q-input float-label="First Name" disable v-model="profile.firstname" />
      <q-input float-label="Surname" disable v-model="profile.surname" />
    </q-field>
    <q-field icon="cake">
      <q-datetime minimal disable format="DD/MM/YYYY" v-model="profile.dob" float-label="Date of Birth" type="date"/>
    </q-field>
    <q-field
      icon="mail_outline"
    >
      <q-input float-label="Email" v-model="profile.email" />
    </q-field>
    <q-field icon="wc">
      <q-select float-label="Gender" v-model="profile.gender" :options="profileOptions.genders"/>
    </q-field>
    <q-field icon="local_hospital">
      <q-select multiple chips float-label="Do you have any of these conditions?" v-model="profile.diseases"
                :options="profileOptions.diseases"/>
    </q-field>
    <q-field icon="local_pharmacy">
      <q-select multiple chips float-label="Are you on any of these medications?" v-model="profile.medications"
                :options="profileOptions.medications"/>
    </q-field>
    <!--<q-field>-->
    <br/>
    <q-toggle class="q-ma-sm" label="Do you smoke?" v-model="profile.smoker" checked-icon="smoking_rooms"
              unchecked-icon="smoke_free"/>
    <!--</q-field>-->
    <!--<q-field>-->
    <q-toggle class="q-ma-sm" label="Do you have an active lifestyle?" v-model="profile.activeLifestyle"
              checked-icon="directions_run" unchecked-icon="airline_seat_recline_normal"/>
    <br/>
    <br />
    <q-btn color="positive" label="Update" @click="updateProfile" />&nbsp;
    <q-btn color="secondary" to="changePW" label="Change Password" />
    <q-btn color="negative" class="float-right" label="Logout" @click="logout()" />
  </q-page>
</template>

<script>
let db = require('src/modules/db')
let api = require('src/modules/mobistudyAPI')
import profileOptions from 'src/modules/profileOptions'
import {required, email} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      profile: null,
      profileOptions: profileOptions
    }
  },
  created () {
    this.getProfile()
  },
  computed: {

  },
  methods: {
    updateProfile () {
      this.$v.$touch()
      let _this = this
      if (!this.$v.$invalid) {
        api.updateProfile(this.profile).then(function (success) {
          if (success) {
            _this.$q.notify({
              message: 'Profile updated successfully!',
              type: 'positive',
              icon: 'profile'
            })
          }
          return Promise.resolve(success)
        }).then(function (success) {
          if (success) {
            return db.setUserSession(_this.profile)
          }
        }).catch(function (err) {
          _this.$q.notify(err.message)
        })
      }
    },
    logout () {
      let _this = this
      db.rmUserSession().then(function (res) {
        _this.$emit('recheck-login')
        _this.$router.push('/login')
      }).catch(function (err) {
        console.log(err)
        alert('logout failed')
      })
      // Old callback code
      /* db.rmUserSession(function (res) {
        if (res) {
          _this.$emit('recheck-login')
          _this.$router.push('/login')
        } else {
          alert('logout failed')
        }
      }) */
    },
    getProfile () {
      let _this = this
      db.getUserSession().then(function (res) {
        _this.profile = res
      })
      // Old callback code
      /* db.getUserSession(function (res, err) {
        if (res !== -1) {
          _this.profile = res
        }
      }) */
    }
  },
  validations: {
    profile: {
      email: {email, required}
    }
  }
  // name: 'PageName',
}
</script>

<style>
</style>
