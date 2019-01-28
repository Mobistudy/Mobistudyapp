<template>
  <q-page padding>
    <q-alert class="q-mb-lg" v-if="newstudies" icon="new_releases" type="warning" :actions="[
          { label: 'Check it', handler: () => { this.$router.push('/studies') } }
        ]">New study available!</q-alert>
    <div v-if="nostudies" class="q-title">
      You are currently not participating in any study.
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
import taskCard from 'components/Main/TaskCard.vue'
import taskListItem from 'components/Main/TaskListItem.vue'
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'
import * as scheduler from '../../modules/scheduler'

export default {
  name: 'TaskerPage',
  components: {
    taskCard, taskListItem
  },
  props: ['rescheduleTasks', 'checkNewStudies'],
  data () {
    return {
      nostudies: false,
      newstudies: false,
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
        let activestudiesPart = studiesPart.filter((s) => {
          return s.currentStatus === 'accepted'
        })

        if (!activestudiesPart || activestudiesPart.length === 0) {
          // this user has no studies !
          this.$q.loading.hide()
          this.nostudies = true
          return
        }

        let activeStudiesDescr = []
        for (const study of activestudiesPart) {
          let studyDescr = await DB.getStudyDescription(study.studyKey)
          if (!studyDescr) {
            // study description needs to be retrieved from the server
            studyDescr = await API.getStudyDescription(study.studyKey)
            await DB.setStudyDescription(study.studyKey, studyDescr)
            if (!this.rescheduleTasks) {
              // only schedule it here if we are not scheduling all of them
              await scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
            }
          }
          if (this.rescheduleTasks) {
            // schedule all of them
            await scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
          }
          activeStudiesDescr.push(studyDescr)
        }

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
