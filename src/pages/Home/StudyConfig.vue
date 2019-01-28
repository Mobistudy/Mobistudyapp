<template>
  <q-page padding>
    <q-tabs animated swipeable inverted color="secondary" align="justify">
      <q-tab default name="info" slot="title" icon="info" label="Info" />
      <q-tab name="privacy" slot="title" icon="lock" label="Privacy" />
      <q-tab v-if="studyParticipation.currentStatus == 'accepted'" name="consent" slot="title" icon="done" label="Consent" />

      <q-tab-pane name="info">
        <p class="q-title" style="text-align: center">
          {{studyDescription.generalities.title}}
        </p>
        <p class="q-subheading">
          {{studyDescription.generalities.description}}
        </p>
        <p class="q-subheading">
          Principal investigators:
        </p>
        <div class="q-my-lg">
          <div class="q-my-sm" v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
            <div class="q-mb-sm row">
              <div class="col-4">
                Name:
              </div>
              <div class="col">
                {{pi.name}}
              </div>
            </div>
            <div class="q-mb-sm row">
              <div class="col-4">
                Institution:
              </div>
              <div class="col">
                {{pi.institution}}
              </div>
            </div>
            <div class="q-mb-sm row">
              <div class="col-4">
                Contact details:
              </div>
              <div class="col">
                {{pi.contact}}
              </div>
            </div>
            <q-card-separator v-if="index != studyDescription.generalities.principalInvestigators.length-1" />
          </div>
        </div>
      </q-tab-pane>
      <q-tab-pane name="privacy">{{studyDescription.consent.privacyPolicy}}</q-tab-pane>
      <q-tab-pane v-if="studyParticipation.currentStatus == 'accepted'" name="consent">
        <p class="q-subheading">
          You can opt-in or opt-out of these items whenever you want:
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
              <div v-if="taskType[taskIndex] === 'dataQuery' && !permissionsGiven[taskIndex]">
                <div class="q-mt-sm text-secondary">
                  This item requires the app to access some functionalities on the phone.
                </div>
                <q-btn label="Give permission to this app" :disabled="!consentedTaskItems[taskIndex]" @click="requestDQPermission(taskIndex)"></q-btn>
              </div>
            </q-item-main>
            <q-item-side>
              <q-checkbox v-model="consentedTaskItems[taskIndex]"/>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="q-my-md row justify-center">
          <q-btn label="Update consent" color="primary" :disabled="!canUpdate" @click="updateConsent()"></q-btn>
        </div>
        <div class="q-my-md row justify-center">
          <q-btn label="Withdraw from the study" color="negative" @click="withdraw()"></q-btn>
        </div>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'

export default {
  name: 'StudyConfigPage',
  props: ['studyDescription'],
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      permissionsGiven: [],
      studyParticipation: {}
    }
  },
  async created () {
    this.studyParticipation = await DB.getStudyParticipation(this.studyDescription._key)
    for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
      this.consentedExtraItems.push(this.studyParticipation.extraItemsConsent[i].consented)
    }
    for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
      this.consentedTaskItems.push(this.studyParticipation.taskItemsConsent[i].consented)
      this.permissionsGiven.push(this.studyParticipation.taskItemsConsent[i].consented)
    }
  },
  computed: {
    taskType () {
      return this.studyDescription.consent.taskItems.map(ti => {
        return this.studyDescription.tasks.find(t => t.id === ti.taskId).type
      })
    },
    canUpdate () {
      if (!this.studyParticipation || !this.studyParticipation.extraItemsConsent) return false
      for (let i = 0; i < this.studyParticipation.extraItemsConsent.length; i++) {
        if (this.consentedExtraItems[i] !== this.studyParticipation.extraItemsConsent[i].consented) {
          return true
        }
      }
      for (let i = 0; i < this.studyParticipation.taskItemsConsent.length; i++) {
        if (this.consentedTaskItems[i] !== this.studyParticipation.taskItemsConsent[i].consented && this.permissionsGiven[i]) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    async updateConsent () {
      for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
        this.studyParticipation.extraItemsConsent[i].consented = this.consentedExtraItems[i]
      }
      for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
        this.studyParticipation.taskItemsConsent[i].consented = this.consentedTaskItems[i]
      }
      // call the API
      await API.updateStudyStatus(userinfo.user._key, this.studyParticipation.studyKey, this.studyParticipation)
      await DB.setStudyParticipation(this.studyParticipation)
      this.$q.notify({
        color: 'positive',
        message: 'Consent updated',
        icon: 'check'
      })
    },
    async withdraw () {
      try {
        let withdrawalReason = await this.$q.dialog({
          title: 'Withdraw',
          message: 'Are you sure you want to withdraw from this study? If yes, please state why',
          color: 'negative',
          prompt: {
            model: '',
            type: 'text'
          },
          ok: 'Withdraw',
          cancel: 'Cancel'
        })
        // set the study as withdrawn
        this.studyParticipation.currentStatus = 'withdrawn'
        this.studyParticipation.withdrawalTS = new Date()
        this.studyParticipation.withdrawalReason = withdrawalReason
        try {
          await API.updateStudyStatus(userinfo.user._key, this.studyParticipation.studyKey, this.studyParticipation)
          delete this.studyParticipation.extraItemsConsent
          delete this.studyParticipation.taskItemsConsent
          await DB.setStudyParticipation(this.studyParticipation)
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
