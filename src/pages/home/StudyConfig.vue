<template>
  <q-page padding>
      <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      >
      <q-tab name="info" icon="info" :label="$t('common.info')" />
      <q-tab name="privacy" icon="lock" :label="$t('common.privacy')" />
      <q-tab v-if="studyParticipation.currentStatus == 'accepted'" name="consent" icon="done" :label="$t('common.consent')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info">
          <study-info :studyDescription="studyDescription" />
        </q-tab-panel>

      <q-tab-panel name="privacy" v-html="studyDescription.consent.privacyPolicy[$i18n.locale].replace(new RegExp('\n', 'g'), '<br>')">
      </q-tab-panel>

      <q-tab-panel name="consent">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-subtitle1">{{ $t('studies.consent.itemsExplanation') }}:</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list v-if="studyDescription.consent.extraItems">
          <q-item v-for="(extraItem, extraIndex) in studyDescription.consent.extraItems" :key="extraIndex">
            <q-item-section>
              <q-item-label>{{extraItem.description[$i18n.locale]}}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox v-model="consentedExtraItems[extraIndex]" :disabled="!extraItem.optional"/>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list v-for="(taskItem, taskIndex) in studyDescription.consent.taskItems" :key="taskIndex">
          <q-item>
          <q-item-section >
            <q-item-label class="q-my-md">{{taskItem.description[$i18n.locale]}}</q-item-label>
              <q-item-label v-if="taskType[taskIndex] !== 'form' && !permissionsGiven[taskIndex] || taskType[taskIndex] !== 'form' && !consentedTaskItems[taskIndex]">
                <div class="q-mt-sm text-secondary">
                  {{ $t('studies.consent.OSpermission') }}
                  {{ $t('studies.consent.giveOSPermission') }}
                </div>
              </q-item-label>
          </q-item-section>
            <q-item-section avatar>
              <q-checkbox @click.native="(consentedTaskItems[taskIndex] || !permissionsGiven[taskIndex]) ? requestDQPermission(taskIndex) : null" v-model="consentedTaskItems[taskIndex]"/>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator/>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>{{ $t('studies.consent.remindersConsent') }}</q-item-label>
              <q-item-label caption>{{ $t('studies.consent.remindersOSPermission') }}</q-item-label>
              <q-btn class="q-mt-lg" :label="$t('studies.consent.giveRemindersOSPermission')" :disabled="!reminders || remindersPermissionGiven" @click="requestNotificationsPermission()"></q-btn>
            </q-item-section>
            <q-item-section avatar>
              <q-checkbox v-model="reminders"/>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-my-md row justify-center">
          <q-btn :label="$t('studies.consent.updateConsent')" color="primary" :disabled="!canUpdate" @click="updateConsent()"></q-btn>
        </div>
        <div class="q-my-md row justify-center">
          <q-btn :label="$t('studies.consent.withdraw')" color="negative" @click="withdraw()"></q-btn>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import StudyInfo from 'components/StudyInfo'
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API'
import healthStore from 'modules/healthstore'
import notifications from 'modules/notifications'

export default {
  name: 'StudyConfigPage',
  props: ['studyDescription'],
  components: { StudyInfo },
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      permissionsGiven: [],
      studyParticipation: {},
      reminders: false,
      remindersPermissionNeeded: true,
      remindersPermissionGiven: false,
      tab: 'info'
    }
  },
  async created () {
    this.studyParticipation = await DB.getStudyParticipation(this.studyDescription._key)
    // if it's wothdrawn or completed we don't need to show the following
    if (this.studyParticipation.currentStatus !== 'withdrawn' && this.studyParticipation.currentStatus !== 'completed') {
      this.reminders = this.studyParticipation.reminders
      if (this.reminders) {
        this.remindersPermissionNeeded = false
        this.remindersPermissionGiven = true
      } else {
        let hasPermissionsAlready = await notifications.hasPermission()
        this.remindersPermissionNeeded = !hasPermissionsAlready
        this.remindersPermissionGiven = hasPermissionsAlready
      }
      for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
        this.consentedExtraItems.push(this.studyParticipation.extraItemsConsent[i].consented)
      }
      for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
        this.consentedTaskItems.push(this.studyParticipation.taskItemsConsent[i].consented)
        this.permissionsGiven.push(this.studyParticipation.taskItemsConsent[i].consented)
      }
    }
  },
  computed: {
    taskType () {
      return this.studyDescription.consent.taskItems.map(ti => {
        return this.studyDescription.tasks.find(t => t.id === ti.taskId).type
      })
    },
    canUpdate () {
      if (this.reminders !== this.studyParticipation.reminders) {
        if (this.reminders && !this.remindersPermissionGiven) return false
        return true
      }
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
      this.studyParticipation.reminders = this.reminders
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
        message: this.$i18n.t('studies.consent.consentUpdated'),
        icon: 'check'
      })
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
    async withdraw () {
      this.$q.dialog({
        title: 'Withdraw',
        message: 'Are you sure you want to withdraw from this study? If yes, please state why',
        color: 'negative',
        prompt: {
          model: '',
          type: 'text'
        },
        ok: 'Withdraw',
        cancel: 'Cancel'
      }).onOk(async (withdrawalReason) => {
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
        this.$emit('updateTransition', 'slideInDown')
      })
    }
  }
}
</script>

<style>
</style>
