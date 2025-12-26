<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('userMgmt.profile.profile') }}
      </div>
    </div>

    <profile-editor v-model="profile" :buttonOkText="$t('common.update')" @buttonOk="saveProfile()" />

    <q-separator />

    <q-item class="q-mt-md">
      <q-item-section avatar>
        <q-icon color="grey" name="security" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('userMgmt.resetPassword.resetPassword') }}</q-item-label>
        <q-item-label caption>{{ $t('userMgmt.resetPassword.resetPasswordShort') }}</q-item-label>
        <div class="q-my-md">
          <q-btn class="mobibtn" color="secondary" @click="resetPwd()"
            :label="$t('userMgmt.resetPassword.resetPassword')" />
        </div>
      </q-item-section>
    </q-item>

    <q-separator inset />

    <q-item class="q-mt-md">
      <q-item-section avatar>
        <q-icon color="grey" name="exit_to_app" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('userMgmt.login.logout') }}</q-item-label>
        <q-item-label caption>{{ $t('userMgmt.login.logoutShort') }}</q-item-label>
        <div class="q-my-md">
          <q-btn class="mobibtn" color="warning" :label="$t('userMgmt.login.logout')" @click="logout()" />
        </div>
      </q-item-section>
    </q-item>

    <q-separator inset />

    <q-item class="q-mt-md">
      <q-item-section avatar>
        <q-icon color="grey" name="delete_forever" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('userMgmt.deleteAccount') }}</q-item-label>
        <q-item-label caption>{{ $t('userMgmt.deleteShort') }}</q-item-label>
        <div class="q-my-md">
          <q-btn class="mobibtn" color="negative" :label="$t('common.delete')" @click="deleteUser()" />
        </div>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nUserMgmt from '@i18n/userMgmt'

import ProfileEditor from '@components/userMgmt/ProfileEditor'
import API from '@shared/API'
import session from '@shared/session'
import DB from '@shared/db'
import * as scheduler from '@shared/scheduler'
import notifications from '@shared/notifications'

export default {
  name: 'ProfileEditPage',
  components: { ProfileEditor },
  i18n: {
    messages: mergeDeep(i18nCommon, i18nUserMgmt)
  },
  data () {
    return {
      userSession: {},
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
    this.userSession = session.getUserSession()
    const userKey = this.userSession.user.userKey
    try {
      this.profile = await API.getProfile(userKey)
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
        title: this.$i18n.t('userMgmt.login.logout'),
        message: this.$i18n.t('userMgmt.login.logoutConfirmation'),
        ok: {
          label: this.$i18n.t('userMgmt.login.logout'),
          color: 'warning'
        },
        cancel: {
          label: this.$i18n.t('common.cancel'),
          color: 'primary',
          flat: true
        }
      }).onOk(async () => {
        // log out
        try {
          API.setBaseUrl(null)
          API.unsetToken()
          session.removeUserSession()
          await scheduler.cancelNotifications()
          await DB.emptyUserData()
        } catch (error) {
          console.error('Cannot logout correctly', error)
        }
        this.$router.replace('/login')
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
        const profile = this.profile
        profile.dateOfBirth = dobTemp
        profile.userKey = this.userSession.user.userKey
        profile.updatedTS = new Date()
        await API.updateProfile(profile)

        // language may have changed:
        // set language also in session
        this.userSession.user.language = profile.language
        session.setUserSession(this.userSession)
        await DB.setUserSession(this.userSession)

        this.$router.replace({ name: 'tasker' })
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
        const userEmail = this.userSession.user.email
        await API.resetPW(userEmail)
        // keep a copy of the email before it's deleted by logout
        notifications.cancelAll()

        // logout
        try {
          API.setBaseUrl(null)
          API.unsetToken()
          session.removeUserSession()
          await scheduler.cancelNotifications()
          await DB.emptyUserData()
        } catch (error) {
          console.error('Cannot logout correctly', error)
        }

        this.$router.replace({ name: 'changepw', params: { userEmail } })
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
        message: this.$i18n.t('userMgmt.deleteWarning'),
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
          const userKey = this.userSession.user.userKey
          await API.deleteUser(userKey)

          // logout
          try {
            API.setBaseUrl(null)
            API.unsetToken()
            session.removeUserSession()
            await scheduler.cancelNotifications()
            await DB.emptyUserData()
          } catch (error) {
            console.error('Cannot logout correctly', error)
          }

          this.$router.replace('/login')
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

<style></style>
