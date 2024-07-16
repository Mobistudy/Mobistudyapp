<template>
  <q-page padding>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="info" icon="info" :label="$t('common.info')" />
      <q-tab name="privacy" icon="lock" :label="$t('common.privacy')" />
      <q-tab v-if="studyParticipation.currentStatus == 'accepted'" name="consent" icon="done"
        :label="$t('common.consent')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="info">
        <study-info :studyDescription="studyDescription" />
      </q-tab-panel>

      <q-tab-panel name="privacy">
        <div v-html="studyDescription.consent.privacyPolicy[$i18n.locale].replace(new RegExp('\n', 'g'), '<br>')"></div>
      </q-tab-panel>

      <q-tab-panel name="consent">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-subtitle1">{{ $t('studies.consent.itemsExplanation') }}:</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <consent-form v-show="studyParticipation.currentStatus === 'accepted'" :studyDescription="studyDescription"
          v-model="studyParticipation" />

        <div class="q-my-md row justify-center">
          <q-btn :label="$t('studies.consent.updateConsent')" color="primary" :disabled="!canUpdate"
            @click="updateConsent()"></q-btn>
        </div>
        <div class="q-my-md row justify-center">
          <q-btn :label="$t('studies.consent.withdraw')" color="negative" @click="withdraw()"></q-btn>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import ConsentForm from '@components/studies/ConsentForm.vue'
import StudyInfo from '@components/studies/StudyInfo'
import session from '@shared/session'
import DB from '@shared/db'
import API from '@shared/API'

export default {
  name: 'StudyConfigPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  props: ['studyDescription'],
  components: { StudyInfo, ConsentForm },
  data () {
    return {
      studyParticipation: {},
      tab: 'info'
    }
  },
  async created () {
    this.studyParticipation = await DB.getStudyParticipation(this.studyDescription._key)
  },
  computed: {
    canUpdate () {
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
    async updateConsent () {
      // call the API
      const userSession = session.getUserSession()

      await API.updateStudyStatus(userSession.user.userKey, this.studyParticipation.studyKey, this.studyParticipation)
      await DB.setStudyParticipation(this.studyParticipation)
      this.$q.notify({
        color: 'primary',
        message: this.$i18n.t('studies.consent.consentUpdated'),
        icon: 'check'
      })
    },
    async withdraw () {
      this.$q.dialog({
        title: this.$i18n.t('studies.consent.withdraw'),
        message: this.$i18n.t('studies.consent.withdrawalConfirm'),
        color: 'negative',
        prompt: {
          model: '',
          type: 'text'
        },
        ok: {
          label: this.$i18n.t('studies.consent.withdraw'),
          color: 'negative'
        },
        cancel: {
          label: this.$i18n.t('common.cancel'),
          color: 'primary',
          flat: true
        }
      }).onOk(async (withdrawalReason) => {
        // set the study as withdrawn
        this.studyParticipation.currentStatus = 'withdrawn'
        this.studyParticipation.withdrawalTS = new Date()
        this.studyParticipation.withdrawalReason = withdrawalReason
        try {
          const userSession = session.getUserSession()

          await API.updateStudyStatus(userSession.user.userKey, this.studyParticipation.studyKey, this.studyParticipation)
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
      })
    }
  }
}
</script>

<style></style>
