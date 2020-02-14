<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <p class="q-title q-mt-lg" style="text-align: center">
          <img src="~/assets/mobistudy_logo.svg" style="width:30vw; max-width:150px;" ><br />
        </p>
        <div style="width: 90vw">
          <p class="text-h5">{{ $t('accountMgmt.login.login') }}</p>
          <q-input
            v-model="username"
            :label="$t('accountMgmt.email')"
            @blur="$v.username.$touch"
            :error="$v.username.$error" :error-message="$t('accountMgmt.emailRequiredError')"
          />
          <q-input
            v-model="password"
            :label="$t('accountMgmt.password')"
            type="password"
            @blur="$v.password.$touch"
            :error="$v.password.$error" :error-message="$t('accountMgmt.passwordRequiredError')"
          />
          <div class="row">
            <q-btn
              class="q-ma-sm full-width"
              :label="$t('accountMgmt.login.login')"
              color="positive"
              @click="login"
              type="submit"
            />
            <q-btn
              class="q-ma-sm q-mb-lg full-width"
              :label="$t('accountMgmt.login.lostpw')"
              color="grey"
              flat outline
              to="resetpw"
            />
            <q-list class="full-width">
              <q-separator />
              <q-item class="full-width">
                <q-item-section class="full-width">
                  <q-item-label class="text-center q-mt-lg q-mb-md">{{ $t('accountMgmt.login.noAcc') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="full-width">
                <q-item-section class="full-width">
                  <q-btn class="full-width" :label="$t('accountMgmt.register')" color="primary" to="register_tc"/>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import DB from '../../modules/db'
import API from '../../modules/API'
import userinfo from '../../modules/userinfo'
import notifications from '../../modules/notifications'

export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  async created () {
    if (userinfo.user.loggedin) {
      notifications.cancelAll()
      userinfo.logout()
      API.unsetToken()
      DB.emptyUserData()
    }
  },
  methods: {
    async login () {
      this.$v.$touch()
      if (!this.$v.$error) {
        try {
          let user = await API.login(this.username.toLowerCase(), this.password)
          // user is authenticated, return user object
          await userinfo.login(user)
          API.setToken(user.token)

          // retrieve the profile information
          // TODO: if the profile information is not available, it should go to a dedicated page where to fill it in
          let profile = await API.getProfile(userinfo.user._key)
          await userinfo.setProfile(profile)

          // TODO: IMPLEMENT PROFILE COMPLETED FLAG TO ACTUALLY BE ABLE TO USE THIS CHECK
          if (!profile) {
            this.$router.push('/register_profile')
          } else {
            if (profile.studies) await DB.setStudiesParticipation(profile.studies)
            this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
          }
        } catch (error) {
          console.error(error)
          this.error = true
          if (error.response && error.response.status === 401) {
            this.$q.notify({
              color: 'negative',
              message: 'Cannot login, wrong credentials',
              icon: 'report_problem'
            })
          } else {
            this.$q.notify({
              color: 'negative',
              message: 'Login failed: ' + error.message,
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
