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
      <consents
        :studyDescription="studyDescription" :taskType="taskType"
        :consentedExtraItems="consentedExtraItems" :consentedTaskItems="consentedTaskItems"
        :remindersPermissionGiven="remindersPermissionGiven" :remindersPermissionNeeded="remindersPermissionNeeded"
        @checkboxReminders="requestNotificationsPermission"
      />

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
import Consents from 'components/Consents.vue'
import StudyInfo from 'components/StudyInfo'
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API'
import notifications from 'modules/notifications'

export default {
  name: 'StudyConfigPage',
  props: ['studyDescription'],
  components: { StudyInfo, Consents },
  data () {
    return {
      consentedExtraItems: [],
      consentedTaskItems: [],
      studyParticipation: {},
      remindersPermissionNeeded: Boolean,
      remindersPermissionGiven: Boolean,
      tab: 'info'
    }
  },
  async created () {
    this.studyParticipation = await DB.getStudyParticipation(this.studyDescription._key)
    // if it's withdrawn or completed we don't need to show the following
    if (this.studyParticipation.currentStatus !== 'withdrawn' && this.studyParticipation.currentStatus !== 'completed') {
      if (this.studyParticipation.reminders) {
        this.remindersPermissionNeeded = false
        this.remindersPermissionGiven = true
      } else {
        let hasPermissionsAlready = await notifications.hasPermission() // true : false
        this.remindersPermissionNeeded = !hasPermissionsAlready // false : true
        this.remindersPermissionGiven = hasPermissionsAlready // true : false
      }
      if (this.studyDescription.consent.extraItems) {
        for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
          this.consentedExtraItems.push(this.studyParticipation.extraItemsConsent[i].consented)
        }
      }
      if (this.studyDescription.consent.taskItems) {
        for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
          this.consentedTaskItems.push(this.studyParticipation.taskItemsConsent[i].consented)
        }
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
      if (this.studyParticipation.taskItemsConsent) {
        for (let i = 0; i < this.studyParticipation.taskItemsConsent.length; i++) {
          if (this.consentedTaskItems[i] !== this.studyParticipation.taskItemsConsent[i].consented) {
            return true
          }
        }
      }
      if (this.studyParticipation.extraItemsConsent) {
        for (let i = 0; i < this.studyParticipation.extraItemsConsent.length; i++) {
          if (this.consentedExtraItems[i] !== this.studyParticipation.extraItemsConsent[i].consented) {
            return true
          }
        }
      }
      return this.remindersPermissionGiven !== this.studyParticipation.reminders
    }
  },
  methods: {
    async updateConsent () {
      this.studyParticipation.reminders = this.remindersPermissionGiven
      for (let i = 0; i < this.studyDescription.consent.taskItems.length; i++) {
        this.studyParticipation.taskItemsConsent[i].consented = this.consentedTaskItems[i]
      }
      if (this.studyParticipation.extraItemsConsent) {
        for (let i = 0; i < this.studyDescription.consent.extraItems.length; i++) {
          this.studyParticipation.extraItemsConsent[i].consented = this.consentedExtraItems[i]
        }
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
    async requestNotificationsPermission (hasRemindersPermission) {
      if (hasRemindersPermission) {
        this.remindersPermissionGiven = false
      } else {
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
