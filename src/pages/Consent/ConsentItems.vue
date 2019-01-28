<template>
  <q-page padding>
    <p class="flex flex-center q-headline">
      Consent to these items
    </p>
    <q-list>
      <div>
        <q-item v-if="studyDescription.consent.extraItems" v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex">
          <q-item-main :label="extraItem.description" />
          <q-item-side>
            <q-checkbox v-model="consentedExtraItems[extraIndex]" :disabled="!extraItem.optional"/>
          </q-item-side>
        </q-item>
      </div>
      <q-item v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
        <q-item-main :label="taskItem.description">
          <div v-if="taskType[taskIndex] === 'dataQuery'">
            <div class="q-mt-sm text-secondary">
              This item requires the app to access some functionalities on the phone.
            </div>
            <q-btn label="Give permission to this app" :disabled="!consentedTaskItems[taskIndex] || permissionsGiven[taskIndex]" @click="requestDQPermission(taskIndex)"></q-btn>
          </div>
        </q-item-main>
        <q-item-side>
          <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
        </q-item-side>
      </q-item>
    </q-list>
    <div class="q-my-md row justify-between">
      <q-btn label="Deny" color="negative" @click="deny()"></q-btn>
      <q-btn label="Join the study" color="primary" :disabled="!canAccept" @click="accept()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'
import * as healthStore from '../../modules/mockHealthstore'

export default {
  name: 'ConsentItemsPage',
  props: ['studyDescription'],
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      permissionsGiven: []
    }
  },
  created () {
    for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
      if (this.studyDescription.consent.extraItems[i].optional) this.consentedExtraItems.push(false)
      else this.consentedExtraItems.push(true)
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
          taskItemsConsent: [],
          extraItemsConsent: []
        }
        for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
          studyParticipation.extraItemsConsent.push({
            consented: this.consentedExtraItems[i]
          })
        }
        for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
          studyParticipation.taskItemsConsent.push({
            taskId: this.studyDescription.consent.taskItems[i].taskId, consented: this.consentedTaskItems[i]
          })
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
          message: 'Cannot join this study: ' + error.message,
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
            message: 'Permission given',
            icon: 'check'
          })
        } catch (error) {
          console.error('Cannot get authorisation for health', error)
          this.$q.notify({
            color: 'negative',
            message: 'Cannot be authorised: ' + error.message,
            icon: 'report_problem'
          })
        }
      }
    },
    async deny () {
      try {
        await this.$q.dialog({
          title: 'Discard study',
          message: 'Are you sure you want to discard this study',
          color: 'primary',
          ok: 'Yes',
          cancel: 'Cancel'
        })
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
      } catch (e) {
        // do nothing
      }
    }
  }
}
</script>

<style>
</style>
