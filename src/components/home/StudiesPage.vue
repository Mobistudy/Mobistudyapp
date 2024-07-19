<template>
  <q-page padding>
    <q-card bordered v-for="(study, studyIndex) in newStudies" :key="studyIndex" class="q-mb-md">
      <q-card-section>
        <div class="row no-wrap">
          <div class="col">
            <div class="text-h6">{{ $t('studies.newStudyInvite') }}</div>
            <div class="text-subtitle1">{{ study.generalities.title[$i18n.locale] }}</div>
            <div class="text-subtitle2">{{ study.generalities.shortDescription[$i18n.locale] }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section
        v-if="study.inclusionCriteria.criteriaQuestions && study.inclusionCriteria.criteriaQuestions.length > 0">
        {{ $t('studies.newStudyExtraCriteria') }}:
        <div v-for="(question, questionIndex) in study.inclusionCriteria.criteriaQuestions" :key="questionIndex">
          <p class="q-mt-md text-subtitle2">{{ question.title[$i18n.locale] }}</p>
          <div class="row">
            <q-radio class="col" v-model="newStudiesCustomAnswers[studyIndex][questionIndex]" val="yes"
              :label="$t('common.yes')" />
            <q-radio class="col" v-model="newStudiesCustomAnswers[studyIndex][questionIndex]" val="no"
              :label="$t('common.no')" />
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <div class="q-ma-sm text-negative" color="negative">
        <span
          v-show="!eligible[studyIndex] && newStudiesCustomAnswers[studyIndex].length === study.inclusionCriteria.criteriaQuestions.length">
          {{ $t('studies.notEligible') }}
        </span>
      </div>

      <q-card-actions align="around">
        <q-btn class="mobibtn" color="negative" :label="$t('studies.discardStudy')"
          @click="discardStudy(studyIndex)"></q-btn>
        <q-btn class="mobibtn" color="primary" :label="$t('studies.joinStudy')" :disable="!eligible[studyIndex]"
          @click="joinStudy(studyIndex)"></q-btn>
      </q-card-actions>
    </q-card>

    <q-list separator bordered>
      <q-item-label header>{{ $t('studies.activeStudies') }}</q-item-label>
      <q-item clickable v-ripple v-for="(study, index) in activeStudies" :key="'as' + index"
        @click="showDetails(study._key)">
        <q-item-section avatar>
          <q-icon color="primary" name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ study.generalities.title[$i18n.locale] }}</q-item-label>
          <q-item-label caption lines="1">End Date: {{ nicerDate(study.generalities.endDate) }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="activeStudies.length === 0">
        <q-item-section>{{ $t('studies.noActiveStudies') }}</q-item-section>
      </q-item>

      <q-separator v-if="previousStudies.length !== 0" />

      <q-item-label header v-if="previousStudies.length !== 0">{{ $t('studies.previousStudies') }}</q-item-label>
      <q-item clickable v-ripple v-for="(study, index) in previousStudies" :key="'ps' + index"
        @click="showDetails(study._key)">
        <q-item-section avatar>
          <q-icon color="primary" name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ study.generalities.title[$i18n.locale] }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky v-if="pageLoaded" position="bottom-right" :offset="[18, 18]">
      <q-btn class="mobibtn" @click="showInvitationDialog" fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import session from '@shared/session'
import DB from '@shared/db'
import API from '@shared/API'
import { date } from 'quasar'

export default {
  name: 'StudiesPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  data () {
    return {
      newStudies: [],
      newStudiesCustomAnswers: [],
      activeStudies: [],
      previousStudies: [],
      pageLoaded: false
    }
  },
  async created () {
    this.$q.loading.show()
    try {
      // let's see if there are any new eligible studies
      const newStudiesKeys = await API.getNewStudiesKeys()
      for (let i = 0; i < newStudiesKeys.length; i++) {
        const studyKey = newStudiesKeys[i]
        const studyDescr = await API.getStudyDescription(studyKey)
        this.newStudiesCustomAnswers.push([])
        this.newStudies.push(studyDescr)
      }
      // existing studies
      const studiesParts = await DB.getStudiesParticipation()
      if (studiesParts) {
        for (const studyPart of studiesParts) {
          if (studyPart.currentStatus === 'accepted') {
            const s = await DB.getStudyDescription(studyPart.studyKey)
            if (s) this.activeStudies.push(s)
          } else if (studyPart.currentStatus === 'withdrawn' || studyPart.currentStatus === 'completed') {
            const s = await DB.getStudyDescription(studyPart.studyKey)
            if (s) this.previousStudies.push(s)
          }
        }
      }

    } catch (error) {
      console.error('Cannot connect to server', error)
      this.$q.notify({
        color: 'negative',
        message: this.$i18n.t('errors.connectionError') + ': ' + error.message,
        icon: 'report_problem'
      })
    }
    this.$q.loading.hide()
    this.pageLoaded = true
  },
  computed: {
    eligible () {
      const eligibleRet = []
      for (let i = 0; i < this.newStudies.length; i++) {
        const study = this.newStudies[i]
        if (!study.inclusionCriteria.criteriaQuestions || study.inclusionCriteria.criteriaQuestions.length === 0) eligibleRet.push(true)
        else {
          let allOK = true
          for (let j = 0; j < study.inclusionCriteria.criteriaQuestions.length; j++) {
            if (study.inclusionCriteria.criteriaQuestions[j].answer !== this.newStudiesCustomAnswers[i][j]) {
              allOK = false
              break
            }
          }
          eligibleRet.push(allOK)
        }
      }
      return eligibleRet
    }
  },
  methods: {
    nicerDate (d) {
      return date.formatDate(d, 'YYYY/MM/DD')
    },
    showDetails (studyKey) {
      this.$router.replace({ name: 'studyConfig', params: { studyKey } })
    },
    async discardStudy (index) {
      this.$q.dialog({
        title: this.$i18n.t('studies.discardStudy'),
        message: this.$i18n.t('studies.discardStudyConfirm'),
        color: 'primary',
        ok: this.$i18n.t('common.yes'),
        cancel: this.$i18n.t('common.cancel')
      }).onOk(async () => {
        const study = this.newStudies[index]
        const studyParticipation = {
          studyKey: study._key
        }
        if (!this.eligible[index] && (this.newStudiesCustomAnswers[index].length === study.inclusionCriteria.criteriaQuestions.length)) {
          // excluded
          studyParticipation.currentStatus = 'excluded'
          studyParticipation.excludedTS = new Date()
          studyParticipation.criteriaAnswers = this.newStudiesCustomAnswers[index]
        } else {
          // rejected
          studyParticipation.currentStatus = 'rejected'
          studyParticipation.rejectedTS = new Date()
        }
        try {
          // call the API
          const userSession = session.getUserSession()
          await API.updateStudyStatus(userSession.user.userKey, study._key, studyParticipation)
          // call the DB
          let studies = await DB.getStudiesParticipation()
          if (!studies) studies = []
          studies.push(studyParticipation)
          await DB.setStudiesParticipation(studies)
          this.newStudies.splice(index, 1)
          this.newStudiesCustomAnswers.splice(index, 1)
          this.$router.replace({ name: 'tasker' })
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
    async joinStudy (index) {
      const study = this.newStudies[index]
      // keep the study in session so to pass it along
      session.setStudyDescription(study)
      this.$router.push({ name: 'invitation' })
    },
    async showInvitationDialog () {
      try {
        this.$q.dialog({
          title: this.$i18n.t('studies.newStudy'),
          message: this.$i18n.t('studies.insertInvitationCode'),
          color: 'primary',
          ok: this.$i18n.t('common.next'),
          cancel: this.$i18n.t('common.cancel'),
          prompt: {
            model: '',
            type: 'text'
          }
        }).onOk((invitationCode) => {
          this.addInvitationalStudy(invitationCode)
        })
      } catch (e) {
        // nothing to do
      }
    },
    async addInvitationalStudy (invitationCode) {
      let study
      try {
        study = await API.getInvitationalStudy(invitationCode)
      } catch (error) {
        console.error('Error:', error)
        if (error.response && error.response.status && error.response.status === 404) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('errors.invitationalStudyNotFound'),
            icon: 'report_problem'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('errors.connectionError'),
            icon: 'report_problem'
          })
        }
        return
      }
      if (this.studyExists(this.newStudies, study)) {
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('errors.invitationalStudyAlreadyAdded'),
          icon: 'report_problem'
        })
        return
      }
      if (await this.alreadyParticipateInStudy(study._key)) {
        this.$q.notify({
          color: 'negative',
          message: this.$i18n.t('errors.invitationalStudyAlreadyParticipated'),
          icon: 'report_problem'
        })
      } else {
        this.newStudiesCustomAnswers.push([])
        this.newStudies.push(study)
      }
    },
    async alreadyParticipateInStudy (studyKey) {
      const studyParticipation = await DB.getStudyParticipation(studyKey)
      if (!studyParticipation) return false
      else return true
    },
    studyExists (studies, studyToFind) {
      let studyFound = false
      studies.forEach((study) => {
        if (study._key === studyToFind._key) {
          studyFound = true
        }
      })
      return studyFound
    }
  }
}
</script>

<style></style>
