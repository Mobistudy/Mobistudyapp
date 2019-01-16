<template>
  <q-page padding>
    <div v-if="nostudies" class="q-title">
      You are registered to no studies yet.
    </div>
    <q-list v-else highlight v-show="!$q.loading.isActive">
      <q-list-header>Today's pending tasks</q-list-header>
      <!--<study-active v-for="study in activeStudies" v-bind:study="study" v-bind:key="study.id"></study-active>-->
      <div>
        <taskListItem v-for="(task, uindex) in tasks.upcoming" :task="task" :key="uindex"></taskListItem>
      </div>
      <q-item v-if="tasks.upcoming.length === 0">
        <q-item-side icon="check" />
        <q-item-main sublabel="No tasks pending" />
      </q-item>
      <q-item-separator inset />
      <q-list-header>Past days missed tasks</q-list-header>
      <div>
        <taskListItem v-for="(task, mindex) in tasks.missed" :task="task" :key="mindex"></taskListItem>
      </div>
      <q-item v-if="tasks.missed.length === 0">
        <q-item-side icon="check" />
        <q-item-main sublabel="No tasks missed" />
      </q-item>
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
import session from '../../modules/session'
import taskCard from 'components/Main/TaskCard.vue'
import taskListItem from 'components/Main/TaskListItem.vue'
import DB from '../../modules/db'
import API from '../../modules/API'
import * as scheduler from '../../modules/scheduler'

export default {
  name: 'TaskerPage',
  components: {
    taskCard, taskListItem
  },
  data () {
    return {
      nostudies: false,
      tasks: {
        upcoming: [],
        missed: []
      }
    }
  },
  async created () {
    this.load()
  },
  methods: {
    async load () {
      this.$q.loading.show()
      try {
        if (!session.tasksSynchronised) {
          await scheduler.cancelNotifications()

          try {
            let profile = await API.getProfile()
            if (!profile.studies || profile.studies.length === 0) {
              // this user has no studies !
              this.$q.loading.hide()
              this.nostudies = true
              return
            }
            await DB.setStudiesParticipation(profile.studies)
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
        let activestudiesPart = studiesPart.filter((s) => {
          return s.currentStatus === 'accepted'
        })

        let activeStudiesDescr = []
        for (const study of activestudiesPart) {
          let studyDescr = await DB.getStudyDescription(study.studyKey)
          if (!studyDescr) {
            // study description needs to be retrieved from the server
            studyDescr = await API.getStudyDescription(study.studyKey)
            await DB.setStudyDescription(study.studyKey, studyDescr)
            if (session.tasksSynchronised) {
              // only schedule it here if we are not scheduling all of them
              await scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
            }
          }
          if (!session.tasksSynchronised) {
            await scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
          }
          activeStudiesDescr.push(studyDescr)
        }

        session.tasksSynchronised = true
        let res = scheduler.generateTasker(activestudiesPart, activeStudiesDescr)
        this.tasks = res

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
    }
  }
}
</script>
