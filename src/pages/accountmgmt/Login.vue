<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <p class="q-title q-mt-lg" style="text-align: center">
          <img src="~/assets/mobistudy_logo.svg" style="width:30vw; max-width:150px;" ><br />
        </p>
        <div style="width: 90vw">
          <p class="text-h5">{{ $t('accountMgmt.loginPage.login') }}</p>
          <!--<q-input v-model="username" float-label="Username" />-->
          <q-input
            v-model="username"
            v-bind:label="$t('accountMgmt.loginPage.email')"
          />
          <q-input
            v-model="password"
            v-bind:label="$t('accountMgmt.loginPage.password')"
            type="password"
          />
          <div class="row">
            <q-btn
              class="q-ma-sm full-width"
              v-bind:label="$t('accountMgmt.loginPage.login')"
              color="positive"
              @click="login"
              type="submit"
            />
            <q-btn
              class="q-ma-sm q-mb-lg full-width"
              v-bind:label="$t('accountMgmt.loginPage.lostpw')"
              color="grey"
              flat outline
              to="resetpw"
            />
            <q-list class="full-width">
              <q-separator />
              <q-item class="full-width">
                <q-item-section class="full-width">
                  <q-item-label class="text-center q-mt-lg q-mb-md">{{ $t('accountMgmt.loginPage.noAcc') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="full-width">
                <q-item-section class="full-width">
                  <q-btn class="full-width" v-bind:label="$t('accountMgmt.loginPage.register')" color="grey" to="register_tc"/>
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
  async created () {
    if (userinfo.user.loggedin) {
      notifications.cancelAll()
      userinfo.logout()
      API.unsetToken()
      DB.emptyDB()
    }
  },
  methods: {
    async login () {
      try {
        let user = await API.login(this.username.toLowerCase(), this.password)
        console.info('Logged in! ', user)
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
</script>

<style>
</style>
