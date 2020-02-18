<template>
  <q-page padding>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h5 text-center">
            {{$t('consent.privacy.headline')}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label v-html="studyDescription.consent.privacyPolicy.replace(new RegExp('\n', 'g'), '<br>')"></q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item class="row justify-between">
        <q-btn :label="$t('consent.privacy.buttonBack')" color="negative" @click="deny()"></q-btn>
        <q-btn :label="$t('consent.privacy.buttonNext')" color="primary" @click="accept()"></q-btn>
      </q-item>
    </q-list>

    <div class="q-my-md row justify-between">

    </div>
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'

export default {
  name: 'PrivacyPolicyPage',
  props: ['studyDescription'],
  methods: {
    accept () {
      this.$router.push({ name: 'consentItems', params: { studyDescription: this.studyDescription } })
    },
    async deny () {
      this.$q.dialog({
        title: 'Discard study',
        message: 'Are you sure you want to discard this study',
        color: 'primary',
        ok: 'Yes',
        cancel: 'Cancel'
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
            message: 'Cannot discard this study: ' + error.message,
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
