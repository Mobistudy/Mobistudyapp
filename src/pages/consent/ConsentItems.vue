<template>
  <q-page padding><div class="text-h5 text-center">
      {{$t('studies.consent.informedConsent')}}
    </div>
    <div class="text-body2">
      {{$t('studies.consent.consentExplanation')}}
    </div>

    <q-list>
      <div v-if="studyDescription.consent.extraItems">
        <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex" >
          <q-item-section>
            <q-item-label>{{extraItem.description[$i18n.locale]}}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="consentedExtraItems[extraIndex]" :disable="!extraItem.optional"/>
          </q-item-section>
        </q-item>
        <q-separator inset />
      </div>
      <q-list v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
        <q-item v-if="taskType[taskIndex] === 'dataQuery'">
          <q-item-section>
            <q-item-label class="q-my-md">{{taskItem.description[$i18n.locale]}}</q-item-label>
            <q-btn :label="$t('studies.consent.giveOSPermission')" :disabled="!consentedTaskItems[taskIndex] || permissionsGiven[taskIndex]" :color="getColour(taskIndex)" :outline="getOutline(taskIndex)" @click="requestDQPermission(taskIndex)"></q-btn>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
          </q-item-section>
        </q-item>
        <q-item v-if="taskType[taskIndex] === 'form'">
          <q-item-section>
            <q-item-label class="q-my-md">{{taskItem.description[$i18n.locale]}}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator v-if="remindersPermissionNeeded" />
      <q-item v-if="remindersPermissionNeeded">
        <q-item-section :label="$t('studies.consent.remindersConsent')">
          <div>
            <div class="q-my-md">
              {{$t('studies.consent.remindersOSPermission')}}
            </div>
            <q-btn :label="$t('studies.consent.giveRemindersOSPermission')" :disabled="!reminders || remindersPermissionGiven" :color="getReminderColour()" :outline="getReminderOutline()" @click="requestNotificationsPermission()"></q-btn>
          </div>
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox v-model="reminders"/>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-my-md row justify-between">
      <q-btn :label="$t('common.reject')" color="negative" @click="deny()"></q-btn>
      <q-btn :label="$t('studies.consent.joinStudy')" color="positive" :disabled="!canAccept" @click="accept()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'
import healthStore from '../../modules/healthstore'
import notifications from '../../modules/notifications'

export default {
  name: 'ConsentItemsPage',
  props: ['studyDescription'],
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      permissionsGiven: [],
      reminders: false,
      remindersPermissionNeeded: true,
      remindersPermissionGiven: false
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
      this.permissionsGiven.push(false)
    }
  },
  computed: {
    taskType () {
      return this.studyDescription.consent.taskItems.map(ti => {
        return this.studyDescription.tasks.find(t => t.id === ti.taskId).type
      })
    },
    canAccept () {
      if (this.reminders && !this.remindersPermissionGiven) return false
      for (let i = 0; i < this.taskType.length; i++) {
        if (this.taskType[i] === 'dataQuery' && this.consentedTaskItems[i] && !this.permissionsGiven[i]) {
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
          reminders: this.reminders,
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
    async requestDQPermission (taskIndex) {
      let taskId = this.studyDescription.consent.taskItems[taskIndex].taskId
      let taskdescr = this.studyDescription.tasks.find(t => t.id === taskId)
      if (taskdescr && taskdescr.dataType) {
        try {
          await healthStore.requestAuthorization([taskdescr.dataType])
          this.$set(this.permissionsGiven, taskIndex, true)
          this.$q.notify({
            color: 'positive',
            message: this.$i18n.t('studies.consent.OSPermissionGiven'),
            icon: 'check'
          })
        } catch (error) {
          console.error('Cannot get authorisation for health', error)
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('studies.consent.OSPermissionNotGiven') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    },
    async requestNotificationsPermission () {
      try {
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
    getColour (taskIndex) {
      if (!this.consentedTaskItems[taskIndex]) {
        return 'amber'
      } else if (this.permissionsGiven[taskIndex]) {
        return 'positive'
      } else {
        return 'amber'
      }
    },
    getOutline (taskIndex) {
      if (!this.consentedTaskItems[taskIndex]) {
        return true
      } else if (this.permissionsGiven[taskIndex]) {
        return true
      } else {
        return false
      }
    },
    getReminderColour () {
      if (!this.reminders) {
        return 'amber'
      } else if (this.remindersPermissionGiven) {
        return 'positive'
      } else {
        return 'amber'
      }
    },
    getReminderOutline () {
      if (!this.reminders) {
        return true
      } else if (this.remindersPermissionGiven) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>
