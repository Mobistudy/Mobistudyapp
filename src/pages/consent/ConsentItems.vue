<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{$t('studies.consent.informedConsent')}}
    </div>
    <div class="text-body2">
      {{$t('studies.consent.consentExplanation')}}
    </div>
    <consents
      :studyDescription="studyDescription"
      v-model="studyParticipation"
    />
    <div class="q-my-md row justify-evenly">
      <q-btn
        :label="$t('common.reject')"
        color="negative"
        flat
        @click="deny()"
      ></q-btn>
      <q-btn
        :label="$t('studies.consent.joinStudy')"
        color="primary"
        :disabled="!canAccept"
        @click="accept()"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import Consents from 'components/Consents.vue'
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API/API'

export default {
  name: 'ConsentItemsPage',
  props: ['studyDescription'],
  components: {
    Consents
  },
  data () {
    return {
      studyParticipation: {
        studyKey: this.studyDescription._key,
        currentStatus: undefined,
        acceptedTS: undefined,
        reminders: false,
        taskItemsConsent: [],
        extraItemsConsent: []
      }
    }
  },
  async created () {
    if (this.studyDescription.consent.extraItems && this.studyDescription.consent.extraItems.length) {
      for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
        this.studyParticipation.extraItemsConsent.push({
          consented: false
        })
      }
    }
    for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
      this.studyParticipation.taskItemsConsent.push({
        taskId: this.studyDescription.consent.taskItems[i].taskId,
        consented: false
      })
    }
  },
  computed: {
    canAccept () {
      if (this.studyDescription.consent.extraItems && this.studyDescription.consent.extraItems.length) {
        for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
          if (!this.studyDescription.consent.extraItems[i].optional) {
            if (!this.studyParticipation.extraItemsConsent.consented) return false
          }
        }
      }
      return true
    }
  },
  methods: {
    async accept () {
      try {
        // set the study as accepted
        this.studyParticipation.currentStatus = 'accepted'
        this.studyParticipation.acceptedTS = new Date()

        // call the API
        await API.updateStudyStatus(userinfo.user._key, this.studyDescription._key, this.studyParticipation)
        // call the DB
        let studies = await DB.getStudiesParticipation()
        if (!studies) studies = []
        studies.push(this.studyParticipation)
        await DB.setStudiesParticipation(studies)
        this.$router.push({ name: 'studies' })
      } catch (error) {
        console.error('Cannot join study', error)
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
          icon: 'report_problem'
        })
      }
      this.$router.push({ name: 'accepted', params: { studyDescription: this.studyDescription } })
    },
    async deny () {
      this.$q.dialog({
        title: this.$i18n.t('studies.discardStudy'),
        message: this.$i18n.t('studies.discardStudyConfirm'),
        color: 'primary',
        ok: this.$i18n.t('common.yes'),
        cancel: this.$i18n.t('common.cancel')
      }).onOk(async () => {
        this.studyParticipation.currentStatus = 'rejected'
        this.studyParticipation.rejectedTS = new Date()

        try {
          // call the API
          await API.updateStudyStatus(userinfo.user._key, this.studyDescription._key, this.studyParticipation)
          // call the DB
          let studies = await DB.getStudiesParticipation()
          if (!studies) studies = []
          studies.push(this.studyParticipation)
          await DB.setStudiesParticipation(studies)

          this.$router.push({ name: 'studies' })
        } catch (error) {
          console.error('Cannot connect to server', error)
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
