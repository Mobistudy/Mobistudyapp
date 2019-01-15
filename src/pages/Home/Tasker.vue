<template>
  <q-page padding>
    <q-list highlight v-show="!$q.loading.isActive">
      <q-list-header>Today's tasks</q-list-header>
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
        if (!session.notificationsScheduled) {
          await scheduler.cancelNotifications()
        }
        // retrieve studies
        let studies
        try {
          // TODO: not sure we need to ask the API each time
          // update the profile, just in case there have been changes
          let profile = await API.getProfile()
          studies = profile.studies
          await DB.setStudiesParticipation(studies)
        } catch (err) {
          // if no Internet, then take the stored value
          studies = await DB.getStudiesParticipation()
          if (!studies) {
            // studies have never been retrieved, we can't do anything
            throw new Error('No studies have aver been retrieved')
          }
        }

        let activestudies = studies.filter((s) => {
          return s.currentStatus === 'accepted'
        })

        let activeStudiesDescr = []
        for (const study of activestudies) {
          let studyDescr = await DB.getStudyDescription(study.studyKey)
          if (!studyDescr) {
            studyDescr = await API.getStudyDescription(study.studyKey)
            await DB.setStudyDescription(study.studyKey, studyDescr)
            if (session.notificationsScheduled) {
              await scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
            }
          }
          if (!session.notificationsScheduled) {
            await scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
          }
          activeStudiesDescr.push(studyDescr)
        }

        session.notificationsScheduled = true
        console.log('ACTIVE STUDIES', activestudies)
        let res = scheduler.generateTasker(activestudies, activeStudiesDescr)
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
