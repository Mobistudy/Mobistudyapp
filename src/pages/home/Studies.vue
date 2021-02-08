<template>
  <q-page padding>
    <q-card
      bordered
      v-for="(study, studyIndex) in newStudies"
      :key="studyIndex"
      class="q-mb-md"
    >
      <q-card-section>
        <div class="row no-wrap">
          <div class="col">
            <div class="text-h6">{{ $t('studies.newStudyInvite') }}</div>
            <div class="text-subtitle1">{{study.generalities.title[$i18n.locale]}}</div>
            <div class="text-subtitle2">{{study.generalities.shortDescription[$i18n.locale]}}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        {{ $t('studies.newStudyExtraCriteria') }}:
        <div
          v-for="(question, questionIndex) in study.inclusionCriteria.criteriaQuestions"
          :key="questionIndex"
        >
          <p class="q-mt-md text-subtitle2">{{question.title[$i18n.locale]}}</p>
          <div class="row">
            <q-radio
              class="col"
              v-model="newStudiesCustomAnswers[studyIndex][questionIndex]"
              val="yes"
              :label="$t('common.yes')"
            />
            <q-radio
              class="col"
              v-model="newStudiesCustomAnswers[studyIndex][questionIndex]"
              val="no"
              :label="$t('common.no')"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <div
        class="q-ma-sm text-negative"
        color="negative"
      >
        <span v-show="!eligible[studyIndex] && newStudiesCustomAnswers[studyIndex].length === study.inclusionCriteria.criteriaQuestions.length">
          {{ $t('studies.notEligible') }}
        </span>
      </div>

      <q-card-actions align="around">
        <q-btn
          flat
          color="negative"
          :label="$t('studies.discardStudy')"
          @click="discardStudy(studyIndex)"
        ></q-btn>
        <q-btn
          color="primary"
          :label="$t('studies.joinStudy')"
          :disable="!eligible[studyIndex]"
          @click="joinStudy(studyIndex)"
        ></q-btn>
      </q-card-actions>
    </q-card>

    <q-list
      separator
      bordered
    >
      <q-item-label header>{{ $t('studies.activeStudies') }}</q-item-label>
      <q-item
        clickable
        v-ripple
        v-for="(study, index) in activeStudies"
        :key="'as' + index"
        @click.native="showDetails(study)"
      >
        <q-item-section avatar>
          <q-icon
            color="primary"
            name="settings"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{study.generalities.title[$i18n.locale]}}</q-item-label>
          <q-item-label
            caption
            lines="1"
          >End Date: {{nicerDate(study.generalities.endDate)}}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="activeStudies.length === 0">
        <q-item-section>{{ $t('studies.noActiveStudies') }}</q-item-section>
      </q-item>

      <q-separator v-if="previousStudies.length !== 0" />

      <q-item-label
        header
        v-if="previousStudies.length !== 0"
      >{{ $t('studies.previousStudies') }}</q-item-label>
      <q-item
        clickable
        v-ripple
        v-for="(study, index) in previousStudies"
        :key="'ps' + index"
        @click.native="showDetails(study)"
      >
        <q-item-section avatar>
          <q-icon
            color="primary"
            name="settings"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{study.generalities.title[$i18n.locale]}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        @click="showInvitationDialog"
        fab
        icon="add"
        color="accent"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import userinfo from 'modules/userinfo'
import DB from 'modules/db'
import API from 'modules/API'
import { date } from 'quasar'

export default {
  name: 'Studies',
  data () {
    return {
      newStudies: [],
      newStudiesCustomAnswers: [],
      activeStudies: [],
      previousStudies: []
    }
  },
  async created () {
    this.$q.loading.show()
    try {
      // let's see if there are any new eligible studies
      let newStudiesKeys = await API.getNewStudiesKeys()
      for (let i = 0; i < newStudiesKeys.length; i++) {
        let studyKey = newStudiesKeys[i]
        let studyDescr = await API.getStudyDescription(studyKey)
        this.newStudiesCustomAnswers.push([])
        this.newStudies.push(studyDescr)
      }
      // existing studies
      let studiesParts = await DB.getStudiesParticipation()
      if (studiesParts) {
        for (let studyPart of studiesParts) {
          if (studyPart.currentStatus === 'accepted') {
            let s = await DB.getStudyDescription(studyPart.studyKey)
            this.activeStudies.push(s)
          } else if (studyPart.currentStatus === 'withdrawn' || studyPart.currentStatus === 'completed') {
            let s = await DB.getStudyDescription(studyPart.studyKey)
            this.previousStudies.push(s)
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
  },
  computed: {
    eligible () {
      let eligibleRet = []
      for (let i = 0; i < this.newStudies.length; i++) {
        let study = this.newStudies[i]
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
    showDetails (study) {
      this.$router.push({ name: 'studyConfig', params: { studyDescription: study } })
    },
    async discardStudy (index) {
      this.$q.dialog({
        title: this.$i18n.t('studies.discardStudy'),
        message: this.$i18n.t('studies.discardStudyConfirm'),
        color: 'primary',
        ok: this.$i18n.t('common.yes'),
        cancel: this.$i18n.t('common.cancel')
      }).onOk(async () => {
        let study = this.newStudies[index]
        let studyParticipation = {
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
          await API.updateStudyStatus(userinfo.user._key, study._key, studyParticipation)
          // call the DB
          let studies = await DB.getStudiesParticipation()
          if (!studies) studies = []
          studies.push(studyParticipation)
          await DB.setStudiesParticipation(studies)
          this.newStudies.splice(index, 1)
          this.newStudiesCustomAnswers.splice(index, 1)
          this.$router.push({ name: 'tasker', params: { rescheduleTasks: false, checkNewStudies: true } })
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
      let study = this.newStudies[index]
      this.$emit('updateTransition', 'slideInDown')
      this.$router.push({ name: 'invitation', params: { studyDescription: study } })
    },
    async showInvitationDialog () {
      try {
        this.$q.dialog({
          title: 'New study',
          message: 'Paste your invitation code here',
          color: 'primary',
          ok: true,
          cancel: true,
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
        if (error.response.status === 404) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('errors.invitationalStudyNotFound'),
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
      studies.find((study) => {
        if (study._key === studyToFind._key) {
          studyFound = true
        }
      })
      return studyFound
    }
  }
}
</script>

<style>
</style>
