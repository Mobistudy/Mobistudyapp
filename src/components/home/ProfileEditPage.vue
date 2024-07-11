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
import DB from '@shared/db'
import notifications from '@shared/notifications'
import userinfo from '@shared/userinfo'

export default {
  name: 'ProfileEditPage',
  components: { ProfileEditor },
  i18n: {
    messages: mergeDeep(i18nCommon, i18nUserMgmt)
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
        const profile = this.profile
        profile.dateOfBirth = dobTemp
        profile.userKey = userinfo.user._key
        profile.updatedTS = new Date()
        await API.updateProfile(profile)
        await userinfo.setProfile(profile)

        this.$router.push({ name: 'tasker' })
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
        const email = userinfo.user.email
        notifications.cancelAll()

        await userinfo.logout()
        API.unsetToken()
        await DB.emptyUserData()
        this.$router.push({ name: 'changepw', params: { email } })
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

<style></style>
