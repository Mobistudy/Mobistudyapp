<template>
  <q-page padding>
    <!-- content -->
    <q-list highlight>
      <q-list-header>New studies</q-list-header>
      <q-item v-for="study in newStudies" :key="study.id">
        <q-item-main>
          <q-item-tile label>{{study.generalities.title}}</q-item-tile>
          <q-item-tile sublabel>{{study.generalities.description}}</q-item-tile>
          <div v-for="(question, index) in study.inclusionCriteria.criteriaQuestions" :key="index">
            {{question.title}}
            <q-radio v-model="newStudiesCustomAnswers[study._key][index]" val="Yes" label="Yes" />
            <q-radio v-model="newStudiesCustomAnswers[study._key][index]" val="No" label="No" />
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
        <q-item-main>No active studies found.  Press the green plus sign in the bottom right to add a study.</q-item-main>
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
    <q-btn round color="positive" @click="promptNewStudy()" class="fixed" icon="add" style="right: 18px; bottom: 18px" size="lg" />
  </q-page>
</template>

<script>
// import DB from '../../modules/db'
import API from '../../modules/API'

export default {
  name: 'Studies',
  data () {
    return {
      newStudies: [],
      newStudiesCustomAnswers: {},
      activeStudies: [],
      previousStudies: []
    }
  },
  async created () {
    // let's see if there are any new eligible studies
    try {
      let newStudiesKeys = await API.getNewStudiesKeys()
      console.log('New studies', newStudiesKeys)
      for (let studyKey of newStudiesKeys) {
        let studyDescr = await API.getStudyDescription(studyKey)
        this.newStudies.push(studyDescr)
        this.newStudiesCustomAnswers[studyKey] = []
        console.log(this.newStudiesCustomAnswers)
      }
    } catch (error) {
      console.error('Cannot connect to server', error)
      this.$q.notify({
        color: 'negative',
        message: 'Cannot delete user: ' + error.message,
        icon: 'report_problem'
      })
    }
  },
  methods: {
    promptNewStudy () {
      let _this = this
      this.$q.dialog({
        title: 'Add Study',
        message: 'Please enter your study code below.',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        color: 'secondary'
      }).then(data => {
        _this.$q.loading.show()
        _this.$router.push({ path: `addStudy/${data}` })
      }).catch(() => {
        // this.$q.notify('Ok, no mood for talking, right?')
      })
    }
  }
}
</script>

<style>
</style>
