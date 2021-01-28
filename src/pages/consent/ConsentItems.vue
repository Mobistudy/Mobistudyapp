<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{$t('studies.consent.informedConsent')}}
    </div>
    <div class="text-body2">
      {{$t('studies.consent.consentExplanation')}}
    </div>
    <consents
      :studyDescription="studyDescription" :taskType="taskType"
      :consentedExtraItems="consentedExtraItems" :consentedTaskItems="consentedTaskItems"
      :remindersPermissionGiven="remindersPermissionGiven" :remindersPermissionNeeded="remindersPermissionNeeded"
      @checkboxReminders="requestNotificationsPermission"
    />
    <div class="q-my-md row justify-evenly">
      <q-btn :label="$t('common.reject')" color="negative" flat @click="deny()"></q-btn>
      <q-btn :label="$t('studies.consent.joinStudy')" color="positive" :disabled="!canAccept" @click="accept()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import Consents from 'components/Consents.vue'
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API'
import notifications from 'modules/notifications'

export default {
  name: 'ConsentItemsPage',
  props: ['studyDescription'],
  components: {
    Consents
  },
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      remindersPermissionNeeded: Boolean,
      remindersPermissionGiven: Boolean
    }
  },
  async created () {
    let hasPermissionsAlready = await notifications.hasPermission()
    this.remindersPermissionNeeded = !hasPermissionsAlready
    this.remindersPermissionGiven = hasPermissionsAlready

    if (this.studyDescription.consent.extraItems && this.studyDescription.consent.extraItems.length) {
      for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
        if (this.studyDescription.consent.extraItems[i].optional) this.consentedExtraItems.push(false)
        else this.consentedExtraItems.push(true)
      }
    }
    for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
      this.consentedTaskItems.push(false)
    }
  },
  computed: {
    taskType () {
      return this.studyDescription.consent.taskItems.map(ti => {
        return this.studyDescription.tasks.find(t => t.id === ti.taskId).type
      })
    },
    canAccept () {
      for (let i = 0; i < this.taskType.length; i++) {
        if (this.taskType[i] === 'dataQuery' && !this.consentedTaskItems[i]) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    async accept () {
      try {
        // set the study as accepted
        let studyParticipation = {
          studyKey: this.studyDescription._key,
          currentStatus: 'accepted',
          acceptedTS: new Date(),
          reminders: this.remindersPermissionGiven,
          taskItemsConsent: [],
          extraItemsConsent: []
        }
        if (this.studyDescription.consent.extraItems) {
          for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
            studyParticipation.extraItemsConsent.push({
              consented: this.consentedExtraItems[i]
            })
          }
        }
        if (this.studyDescription.consent.taskItems) {
          for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
            studyParticipation.taskItemsConsent.push({
              taskId: this.studyDescription.consent.taskItems[i].taskId, consented: this.consentedTaskItems[i]
            })
          }
        }
        // call the API
        await API.updateStudyStatus(userinfo.user._key, this.studyDescription._key, studyParticipation)
        // call the DB
        let studies = await DB.getStudiesParticipation()
        if (!studies) studies = []
        studies.push(studyParticipation)
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
            message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      })
    },
    async requestNotificationsPermission (hasRemindersPermission) {
      if (hasRemindersPermission) {
        this.remindersPermissionGiven = false
      } else {
        try {
          console.log('Requesting permission')
          this.remindersPermissionGiven = await notifications.requestPermission()
          this.$q.notify({
            color: 'positive',
            message: this.$i18n.t('studies.consent.OSPermissionGiven'),
            icon: 'check'
          })
        } catch (error) {
          console.error('Cannot get authorisation for sending reminders', error)
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error.message,
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
