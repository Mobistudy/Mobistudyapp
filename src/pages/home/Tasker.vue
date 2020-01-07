<template>
  <q-page padding>
    <q-banner rounded inline-actions class="bg-warning text-white q-mb-lg" v-if="newstudies" icon="new_releases" type="warning">
        New study available!
        <template v-slot:action>
          <q-btn flat color="white" label="Check it" to="studies"/>
        </template>
    </q-banner>

    <div v-if="nostudies" class="q-title">
      You are currently not participating in any study.
    </div>
    <q-list v-else highlight>
      <q-item-label header>Today's pending tasks</q-item-label>
      <!--<study-active v-for="study in activeStudies" v-bind:study="study" v-bind:key="study.id"></study-active>-->
      <div>
        <taskListItem v-for="(task, uindex) in tasks.upcoming" :task="task" :key="uindex"></taskListItem>
      </div>
      <q-item v-if="tasks.upcoming.length === 0">
        <q-item-section avatar>
          <q-icon color="primary" name="check" />
        </q-item-section>
        <q-item-section>
          <q-item-label>No tasks pending</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset />
      <q-item-label header>Past days missed tasks</q-item-label>
      <div>
        <taskListItem v-for="(task, mindex) in tasks.missed" :task="task" :key="mindex"></taskListItem>
      </div>
      <q-item v-if="tasks.missed.length === 0">
        <q-item-section avatar>
          <q-icon color="primary" name="check" />
        </q-item-section>
        <q-item-section>
          <q-item-label>No tasks missed</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-if="this.tasks.completedStudyAlert" v-model="completedStudyModal" maximized>
      <div class="q-pa-lg text-center" style="background-color:white">
        <div class="text-h4 q-mb-md">You have completed a study!</div>
        <div>
          <img src="statics/icons/confetti.svg" style="width:30vw; max-width:150px;" ><br />
          <p>You have completed all the tasks for the {{this.tasks.completedStudyAlert.studyTitle}} study.</p>
          <p>Thank very much for this!</p>
        </div>
        <p>Please, be aware that some studies may require some further action,
          Check the study description in the "Manage Studies" menu.</p>
        <q-btn color="primary" @click="studyCompleted()" label="Close" />
      </div>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
// import taskCard from 'components/Main/TaskCard.vue'
import taskListItem from 'components/Main/TaskListItem.vue'
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'
import * as scheduler from '../../modules/scheduler'

export default {
  name: 'TaskerPage',
  components: {
    /* taskCard, */ taskListItem
  },
  props: ['rescheduleTasks', 'checkNewStudies'],
  data () {
    return {
      nostudies: false,
      newstudies: true,
      tasks: {
        upcoming: [],
        missed: [],
        completedStudyAlert: {
          studyTitle: undefined
        }
      },
      completedStudyModal: false
    }
  },
  async created () {
    this.load()
  },
  methods: {
    async load () {
      this.$q.loading.show()
      try {
        if (this.checkNewStudies) {
          // let's see if there are any new eligible studies
          try {
            let newStudyIds = await API.getNewStudiesKeys()
            if (newStudyIds.length > 0) {
              // there's a new study in town! warn the user!
              this.newstudies = true
            }
          } catch (error) {
            console.error('Cannot connect to server, but thats OK', error)
            // if it fails it's fine
          }
        }

        if (this.rescheduleTasks) {
          // the first time we show this component, tasks are re-scheduled
          await scheduler.cancelNotifications()

          try {
            // let's retrieve the studies from the API, just in case
            let profile = await API.getProfile(userinfo.user._key)
            if (!profile.studies || profile.studies.length === 0) {
              await DB.setStudiesParticipation([])
              // this user has no studies !
              this.$q.loading.hide()
              this.nostudies = true
              return
            } else {
              await DB.setStudiesParticipation(profile.studies)
            }
          } catch (error) {
            console.error('Cannot connect to server, but thats OK', error)
            // if it fails, we just rely on the stored data
          }
        }

        // retrieve studies
        let studiesPart = await DB.getStudiesParticipation()
        if (!studiesPart) {
          // this user has no studies !
          this.$q.loading.hide()
          this.nostudies = true
          return
        }

        let activestudiesPart = []
        let activeStudiesDescr = []
        for (const studyPart of studiesPart) {
          let studyDescr = await DB.getStudyDescription(studyPart.studyKey)
          if (!studyDescr) {
            // study description needs to be retrieved from the server
            studyDescr = await API.getStudyDescription(studyPart.studyKey)
            await DB.setStudyDescription(studyPart.studyKey, studyDescr)
            if (studyPart.currentStatus === 'accepted' && !this.rescheduleTasks && studyPart.reminders) {
              // only schedule it here if we are not scheduling all of them
              await scheduler.scheduleNotificationsSingleStudy(new Date(studyPart.acceptedTS), studyDescr, studyPart)
            }
          }
          if (studyPart.currentStatus === 'accepted' && this.rescheduleTasks && studyPart.reminders) {
            // schedule all of them
            await scheduler.scheduleNotificationsSingleStudy(new Date(studyPart.acceptedTS), studyDescr, studyPart)
          }
          if (studyPart.currentStatus === 'accepted') {
            activestudiesPart.push(studyPart)
            activeStudiesDescr.push(studyDescr)
          }
        }

        if (activeStudiesDescr.length === 0) {
          // this user has no studies !
          this.$q.loading.hide()
          this.nostudies = true
          return
        }

        let res = scheduler.generateTasker(activestudiesPart, activeStudiesDescr)
        this.tasks = res

        if (res.completedStudyAlert) this.completedStudyModal = true
        this.$q.loading.hide()
      } catch (error) {
        console.error(error)
        this.$q.loading.hide()

        this.$q.dialog({
          title: 'Error',
          message: 'The app is experiencing an unexpected error, please make sure that you have an Internet connection and retry.',
          color: 'warning',
          ok: 'Retry',
          preventClose: true
        }).then(() => {
          console.log('retry')
          this.load()
        }).catch(() => {
          console.log('error')
        })
      }
    },
    async studyCompleted () {
      let studyPart = this.tasks.completedStudyAlert.studyPart
      // set the study as completed
      studyPart.currentStatus = 'completed'
      studyPart.completedTS = new Date()
      try {
        await API.updateStudyStatus(userinfo.user._key, studyPart.studyKey, studyPart)
        delete studyPart.extraItemsConsent
        delete studyPart.taskItemsConsent
        await DB.setStudyParticipation(studyPart)
        this.load()
        this.completedStudyModal = false
      } catch (error) {
        console.error('Cannot set the study as completed', error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot set the study as completed: ' + error.message,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>
