<template>
  <q-page padding>
    <!-- content -->
    <q-list v-for="(study, studyIndex) in newStudies" :key="studyIndex">
      <q-list-header>You are invited to join</q-list-header>
      <q-item >
        <q-item-main>
          <q-item-tile label>{{study.generalities.title}}</q-item-tile>
          <q-item-tile sublabel>{{study.generalities.description}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-list-header>Answer the following to know if you are eligible</q-list-header>
      <q-item v-for="(question, questionIndex) in study.inclusionCriteria.criteriaQuestions" :key="questionIndex">
        <q-item-main>
          <p>
            {{question.title}}
          </p>
          <div class="row">
            <q-radio class="col" v-model="newStudiesCustomAnswers[studyIndex][questionIndex]" val="yes" label="Yes" />
            <q-radio class="col" v-model="newStudiesCustomAnswers[studyIndex][questionIndex]" val="no" label="No" />
          </div>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <div class="q-ma-sm text-negative" v-show="!eligible[studyIndex] && newStudiesCustomAnswers[studyIndex].length === study.inclusionCriteria.criteriaQuestions.length"
          color="negative">
          You are not eligible for this study
        </div>
        <div class="row justify-center">
          <div class="col">
            <q-btn color="primary" label="Join" :disable="!eligible[studyIndex]" @click="joinStudy(studyIndex)"></q-btn>
          </div>
          <div class="col">
            <q-btn color="negative" label="Discard" @click="discardStudy(studyIndex)"></q-btn>
          </div>
        </div>
      </q-item-main>
    </q-item>
  </q-list>

  <q-list highlight>
    <q-list-header>Active studies</q-list-header>
    <q-item v-for="study in activeStudies" :key="study.id">
      <q-item-main :label="study.generalities.title" :sublabel="'End Date: ' + endDate" />
      <q-item-side right>
        <q-btn flat round dense icon="more_vert">
          <q-popover>
            <q-list link>
              <q-item v-close-overlay>
                <q-item-main class="text-negative" label="Withdraw from Study" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-item-side>
    </q-item>

    <q-item v-if="activeStudies.length === 0">
      <q-item-main>No active studies found.</q-item-main>
    </q-item>
    <q-item-separator v-if="previousStudies.length !== 0" />
    <q-list-header v-if="previousStudies.length !== 0">Previous studies</q-list-header>
    <q-item v-for="study in previousStudies" :key="study.id">
      <q-item-main :label="study.generalities.title" :sublabel="'Ended: ' + endDate" />
      <q-item-side right>
        <q-btn flat round dense icon="more_vert">
          <q-popover>
            <q-list link>
              <q-item v-close-overlay>
                <q-item-main label="Hide" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-item-side>
    </q-item>
  </q-list>
</q-page>
</template>

<script>
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'

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
      let studies = await DB.getStudiesParticipation()
      if (studies) {
        this.activeStudies = studies.filter(s => { return s.currentStatus === 'accepted' })
        this.previousStudies = studies.filter(s => { return (s.currentStatus === 'withdrawn' || s.currentStatus === 'completed') })
      }
    } catch (error) {
      console.error('Cannot connect to server', error)
      this.$q.notify({
        color: 'negative',
        message: 'Cannot retrieve study description: ' + error.message,
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
    async discardStudy (index) {
      try {
        await this.$q.dialog({
          title: 'Discard study',
          message: 'Are you sure you want to discard this study',
          color: 'primary',
          ok: 'Yes',
          cancel: 'Cancel'
        })
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
        console.log(studyParticipation)
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
    },
    async joinStudy (index) {
      let study = this.newStudies[index]
      this.$router.push({ name: 'invitation', params: { studyDescription: study } })
    }
  }
}
</script>

<style>
</style>
