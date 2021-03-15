<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('accountMgmt.profile.profile') }}
      </div>
    </div>

    <profile-editor
      v-model="profile"
      :buttonOk="$t('common.update')"
      @buttonOk="saveProfile()"
    />

    <q-separator />

    <q-item class="q-mt-md">
      <q-item-section avatar>
        <q-icon
          color="grey"
          name="security"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{$t('accountMgmt.resetPassword.resetPassword')}}</q-item-label>
        <q-item-label caption>{{$t('accountMgmt.resetPassword.resetPasswordShort')}}</q-item-label>
        <div class="q-my-md">
          <q-btn
            color="secondary"
            @click="resetPwd()"
            :label="$t('accountMgmt.resetPassword.resetPassword')"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-separator inset />

    <q-item class="q-mt-md">
      <q-item-section avatar>
        <q-icon
          color="grey"
          name="exit_to_app"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{$t('accountMgmt.login.logout')}}</q-item-label>
        <q-item-label caption>{{$t('accountMgmt.login.logoutShort')}}</q-item-label>
        <div class="q-my-md">
          <q-btn
            color="warning"
            :label="$t('accountMgmt.login.logout')"
            @click="logout()"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-separator inset />

    <q-item class="q-mt-md">
      <q-item-section avatar>
        <q-icon
          color="grey"
          name="delete_forever"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{$t('accountMgmt.deleteAccount')}}</q-item-label>
        <q-item-label caption>{{$t('accountMgmt.deleteShort')}}</q-item-label>
        <div class="q-my-md">
          <q-btn
            color="negative"
            :label="$t('common.delete')"
            @click="deleteUser()"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import i18nStrings from 'i18n/accountMgmt/accountMgmt'

import ProfileEditor from 'components/ProfileEditor'
import API from 'modules/API'
import DB from 'modules/db'
import notifications from 'modules/notifications'
import userinfo from 'modules/userinfo'

export default {
  name: 'ProfilePage',
  components: { ProfileEditor },
  i18n: {
    messages: i18nStrings
  },
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
      }
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
        message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
        icon: 'report_problem'
      })
      this.$q.loading.hide()
    }
  },
  methods: {
    async logout () {
      this.$q.dialog({
        title: this.$i18n.t('accountMgmt.login.logout'),
        message: this.$i18n.t('accountMgmt.login.logoutConfirmation'),
        ok: {
          label: this.$i18n.t('accountMgmt.login.logout'),
          color: 'warning'
        },
        cancel: {
          label: this.$i18n.t('common.cancel'),
          color: 'primary',
          flat: true
        }
      }).onOk(async () => {
        try {
          await userinfo.logout()
        } catch (error) {
          console.log(error)
        }
        API.setToken('')
        this.$router.push('/login')
      })
    },
    async saveProfile () {
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
        let profile = this.profile
        profile.dateOfBirth = dobTemp
        profile.userKey = userinfo.user._key
        profile.updatedTS = new Date()
        await API.updateProfile(profile)
        await userinfo.setProfile(profile)

        this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async resetPwd () {
      // get the token and go to the change password screen
      try {
        await API.resetPW(userinfo.user.email.toLowerCase())
        // keep a copy of the email before it's deleted by logout
        let email = userinfo.user.email
        notifications.cancelAll()

        await userinfo.logout()
        API.unsetToken()
        await DB.emptyUserData()
        this.$router.push({ name: 'changepw', params: { email: email } })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async deleteUser () {
      this.$q.dialog({
        title: this.$i18n.t('common.warning'),
        message: this.$i18n.t('accountMgmt.deleteWarning'),
        ok: {
          label: this.$i18n.t('common.delete'),
          color: 'negative'
        },
        cancel: {
          label: this.$i18n.t('common.cancel'),
          color: 'primary',
          flat: true
        }
      }).onOk(async () => {
        try {
          await API.deleteUser(userinfo.user.user._key)
          this.$router.push('/login')
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
