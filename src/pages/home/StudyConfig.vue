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
      <q-tab
        name="info"
        icon="info"
        :label="$t('common.info')"
      />
      <q-tab
        name="privacy"
        icon="lock"
        :label="$t('common.privacy')"
      />
      <q-tab
        v-if="studyParticipation.currentStatus == 'accepted'"
        name="consent"
        icon="done"
        :label="$t('common.consent')"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel name="info">
        <study-info :studyDescription="studyDescription" />
      </q-tab-panel>

      <q-tab-panel
        name="privacy"
        v-html="studyDescription.consent.privacyPolicy[$i18n.locale].replace(new RegExp('\n', 'g'), '<br>')"
      >
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
          v-show="studyParticipation.currentStatus === 'accepted'"
          :studyDescription="studyDescription"
          v-model="studyParticipation"
        />

        <div class="q-my-md row justify-center">
          <q-btn
            :label="$t('studies.consent.updateConsent')"
            color="primary"
            :disabled="!canUpdate"
            @click="updateConsent()"
          ></q-btn>
        </div>
        <div class="q-my-md row justify-center">
          <q-btn
            :label="$t('studies.consent.withdraw')"
            color="negative"
            @click="withdraw()"
          ></q-btn>
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
import API from 'modules/API/API'

export default {
  name: 'StudyConfigPage',
  props: ['studyDescription'],
  components: { StudyInfo, Consents },
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
      await API.updateStudyStatus(userinfo.user._key, this.studyParticipation.studyKey, this.studyParticipation)
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
      })
    }
  }
}
</script>

<style>
</style>
