<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('studies.consent.informedConsent') }}
    </div>
    <div class="mobitxt1 q-my-md">
      {{ $t('studies.consent.consentExplanation') }}
    </div>
    <consent-form :studyDescription="studyDescription" v-model="studyParticipation" />
    <div class="q-my-md row justify-evenly">
      <q-btn class="mobibtn" :label="$t('common.reject')" color="negative" @click="deny()"></q-btn>
      <q-btn class="mobibtn" :label="$t('studies.consent.joinStudy')" color="primary" :disabled="!canAccept"
        @click="accept()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import ConsentForm from '@components/studies/ConsentForm.vue'
import session from '@shared/session'
import DB from '@shared/db'
import API from '@shared/API'

export default {
  name: 'ConsentItemsPage',
  props: ['studyDescription'],
  components: {
    ConsentForm
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
      // there must be at least one task accepted
      const consentedTasks = this.studyParticipation.taskItemsConsent.reduce((acc, curr) => acc + curr.consented, 0)
      if (consentedTasks === 0 && this.studyParticipation.taskItemsConsent.length > 0) return false

      // all mandatory extra items must have been accepted
      if (this.studyDescription.consent.extraItems && this.studyDescription.consent.extraItems.length) {
        for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
          if (!this.studyDescription.consent.extraItems[i].optional) {
            if (!this.studyParticipation.extraItemsConsent[i].consented) return false
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
        const userSession = session.getUserSession()
        await API.updateStudyStatus(userSession.user.userKey, this.studyDescription._key, this.studyParticipation)
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
          const userSession = session.getUserSession()
          await API.updateStudyStatus(userSession.user.userKey, this.studyDescription._key, this.studyParticipation)
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

<style></style>
