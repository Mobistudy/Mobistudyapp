<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{$t('studies.privacyPolicy')}}
    </div>
    <div
      class="q-my-md"
      v-html="studyDescription.consent.privacyPolicy[$i18n.locale]"
    ></div>

    <div class="q-my-md row justify-around">
      <q-btn
        :label="$t('common.reject')"
        flat
        color="negative"
        @click="deny()"
      ></q-btn>
      <q-btn
        :label="$t('common.accept')"
        color="primary"
        @click="accept()"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from 'modules/API/API'

export default {
  name: 'PrivacyPolicyPage',
  props: ['studyDescription'],
  methods: {
    accept () {
      this.$router.push({ name: 'consentItems', params: { studyDescription: this.studyDescription } })
    },
    async deny () {
      this.$q.dialog({
        title: this.$i18n.t('studies.discardStudy'),
        message: this.$i18n.t('studies.discardStudyConfirm'),
        color: 'primary',
        ok: this.$i18n.t('common.yes'),
        cancel: this.$i18n.t('common.cancel')
      }).onOk(async () => {
        let studyParticipation = {
          studyKey: this.studyDescription._key,
          currentStatus: 'rejected',
          rejectedTS: new Date()
        }
        try {
          // call the API
          await API.updateStudyStatus(userinfo.user._key, this.studyDescription._key, studyParticipation)
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

<style>
</style>
