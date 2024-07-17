<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('studies.privacyPolicy') }}
    </div>
    <div class="q-my-md mobitxt1" v-html="studyDescription.consent.privacyPolicy[$i18n.locale]"></div>

    <div class="q-my-md row justify-around">
      <q-btn class="mobibtn" :label="$t('common.reject')" color="negative" @click="deny()"></q-btn>
      <q-btn class="mobibtn" :label="$t('common.accept')" color="primary" @click="accept()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import session from '@shared/session'
import DB from '@shared/db'
import API from '@shared/API'

export default {
  name: 'PrivacyPolicyPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  data () {
    return {
      studyDescription: {}
    }
  },
  created () {
    const sd = session.getStudyDescription()
    if (!sd) {
      this.$router.push({ name: 'tasker' })
    } else {
      this.studyDescription = sd
    }
  },
  methods: {
    accept () {
      this.$router.push({ name: 'consentItems' })
    },
    async deny () {
      this.$q.dialog({
        title: this.$i18n.t('studies.discardStudy'),
        message: this.$i18n.t('studies.discardStudyConfirm'),
        color: 'primary',
        ok: this.$i18n.t('common.yes'),
        cancel: this.$i18n.t('common.cancel')
      }).onOk(async () => {
        const studyParticipation = {
          studyKey: this.studyDescription._key,
          currentStatus: 'rejected',
          rejectedTS: new Date()
        }
        try {
          // call the API
          const userSession = session.getUserSession()
          await API.updateStudyStatus(userSession.user.userKey, this.studyDescription._key, studyParticipation)
          // call the DB
          let studies = await DB.getStudiesParticipation()
          if (!studies) studies = []
          studies.push(studyParticipation)
          await DB.setStudiesParticipation(studies)

          this.$router.push({ name: 'studies' })
        } catch (error) {
          console.error('Cannot connect to server', error)
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('errors.connectionError') + ': ' + error.messagee,
            icon: 'report_problem'
          })
        }
      })
    }
  }
}
</script>

<style></style>
