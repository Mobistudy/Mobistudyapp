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
          <div class="q-mt-sm text-secondary" v-if="taskType[taskIndex] === 'dataQuery'">
            This may require the app to access some functionalities on the phone.
          </div>
        </q-item-main>
        <q-item-side>
          <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
        </q-item-side>
      </q-item>
    </q-list>
    <div class="q-my-md row justify-between">
      <q-btn label="Deny" color="negative" @click="deny()"></q-btn>
      <q-btn label="Accept" color="primary" @click="accept()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'

export default {
  name: 'ConsentItemsPage',
  props: ['studyDescription'],
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: []
    }
  },
  created () {
    for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
      if (this.studyDescription.consent.extraItems[i].optional) this.consentedExtraItems.push(false)
      else this.consentedExtraItems.push(true)
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
    }
  },
  methods: {
    accept () {
      this.$router.push({ name: 'invitation', params: { studyDescription: this.studyDescription } })
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
