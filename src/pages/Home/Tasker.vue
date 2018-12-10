<template>
  <!--<q-page padding class="row items-start flex flex-center">-->
  <q-page padding>
    <!--<div class="row">-->
    <!--<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">-->
    <!--<taskCard v-for="task in tasks" v-bind:task="task" v-bind:key="task.id"></taskCard>-->
    <!--</div>-->
    <q-list highlight>
      <q-list-header>Current Tasks</q-list-header>
      <!--<study-active v-for="study in activeStudies" v-bind:study="study" v-bind:key="study.id"></study-active>-->
      <taskListItem v-for="(task, index) in tasks" v-if="!task.missed" :task="task" :key="index"></taskListItem>
      <q-item v-if="taskNumbers.current === 0">
        <q-item-side icon="check" />
        <q-item-main sublabel="No tasks pending" />
      </q-item>
      <q-item-separator inset />
      <q-list-header>Missed Tasks</q-list-header>
      <taskListItem v-for="(task, index) in tasks" v-if="task.missed" :task="task" :key="index"></taskListItem>
      <q-item v-if="taskNumbers.missed === 0">
        <q-item-side icon="check" />
        <q-item-main sublabel="No tasks missed" />
      </q-item>
      <!--<study-previous v-for="study in previousStudies" v-bind:study="study" v-bind:key="study.id"></study-previous>-->
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
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
      tasks: [ ]
    }
  },
  async created () {
    // retrieve studies
    let studies = await DB.getStudiesParticipation()
    if (!studies) {
      // shouldn't happen, but just in case...
      let profile = await API.getProfile()
      await DB.setStudiesParticipation(profile.studies)
    }

    let activestudies = studies.filter((s) => {
      return s.currentStatus === 'accepted'
    })

    let activeStudiesDescr = []
    for (const study of activestudies) {
      let studyDescr = await DB.getStudyDescription(study.studyKey)
      if (!studyDescr) {
        studyDescr = await API.getStudyDescription(study.studyKey)
        try {
          await DB.setStudyDescription(study.studyKey, studyDescr)
          scheduler.scheduleNotificationsSingleStudy(new Date(study.acceptedTS), studyDescr)
        } catch (err) {
          console.error('Cannot save study description on store?!?!?', err)
        }
      }
      activeStudiesDescr.push(studyDescr)
    }

    let res = scheduler.generateTasker(activestudies, activeStudiesDescr)
    console.log(res)
    this.tasks = this.tasks.concat(res.upcoming, res.missed)
  },
  computed: {
    taskNumbers: function () {
      let countCurrent = 0
      let countMissed = 0
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].missed) {
          countMissed++
        } else {
          countCurrent++
        }
      }
      return {current: countCurrent, missed: countMissed}
    }
  }
}
</script>
