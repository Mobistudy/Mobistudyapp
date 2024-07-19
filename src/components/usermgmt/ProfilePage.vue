<template>
  <q-page padding>
    <div class="row fit justify-center">
      <div class="text-h5 text-center q-pt-md">
        {{ $t('userMgmt.registration.createProfile') }}
      </div>
    </div>

    <profile-editor v-model="profile" :buttonOkText="$t('common.next')" @buttonOk="saveProfile()"
      @language-changed="languageChanged" :key="componentKey" />

  </q-page>
</template>

<script>
import i18nMessages from '@i18n/userMgmt'
import i18nCommon from '@i18n/common'
import { mergeDeep } from '@shared/tools.js'

import ProfileEditor from '@components/userMgmt/ProfileEditor'
import API from '@shared/API'
import session from '@shared/session'
import DB from '@shared/db'

export default {
  name: 'ProfilePage',
  components: { ProfileEditor },
  i18n: {
    messages: mergeDeep(i18nCommon, i18nMessages)
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
        studiesSuggestions: true
      },
      componentKey: 0
    }
  },
  methods: {
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
        const userSession = session.getUserSession()

        // cloned object where we can change some properties
        let profile = structuredClone(this.profile)
        profile.dateOfBirth = dobTemp
        profile.userKey = userSession.user.userKey
        profile.updatedTS = new Date()
        const newprofile = await API.createProfile(profile)
        if (newprofile) profile = newprofile

        // language may have changed:
        // set language and participant key also in session
        userSession.user.language = profile.language
        userSession.user.participantKey = profile._key
        session.setUserSession(userSession)
        await DB.setUserSession(userSession)

        this.$router.replace({ name: 'tasker' })
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('userMgmt.registration.registrationError') + ': ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    languageChanged () {
      // force re-render
      this.componentKey += 1
    }
  }
}
</script>

<style></style>
