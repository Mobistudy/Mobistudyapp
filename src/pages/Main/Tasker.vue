<template>
  <!--<q-page padding class="row items-start flex flex-center">-->
  <q-page padding>
    <!--<div class="row">-->
    <!--<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">-->
    <!--<taskCard v-for="task in tasks" v-bind:task="task" v-bind:key="task.id"></taskCard>-->
    <!--</div>-->
    <q-list highlight>
      <q-list-header>Pending Tasks</q-list-header>
      <!--<study-active v-for="study in activeStudies" v-bind:study="study" v-bind:key="study.id"></study-active>-->
      <taskListItem v-for="(task,index) in tasks" v-if="!task.future" :task="task" :key="index"></taskListItem>
      <q-item-separator inset />
      <q-list-header>Future Tasks</q-list-header>
      <taskListItem v-for="(task, index) in tasks" v-if="task.future" :task="task" :key="index"></taskListItem>
      <!--<study-previous v-for="study in previousStudies" v-bind:study="study" v-bind:key="study.id"></study-previous>-->
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
import taskCard from 'components/Main/TaskCard.vue'
import taskListItem from 'components/Main/TaskListItem.vue'

export default {
  name: 'PageIndex',
  components: {
    taskCard, taskListItem
  },
  created () {

  },
  methods: {

  },
  data () {
    return {
      tasks: [
        {
          id: 0,
          title: 'Questionnaire 1',
          main: 'blah',
          submitText: 'Take Questionnaire',
          icon: 'ballot',
          future: false,
          due: 1540479083000
        },
        {
          id: 1,
          title: 'Questionnaire 2',
          main: 'blahblah',
          submitText: 'Take Questionnaire',
          icon: 'ballot',
          future: false,
          due: 1540651883000
        },
        {
          id: 2,
          title: 'Pedometer Data',
          main: 'We\'d like to analyse how many steps you\'ve taken over the past week',
          submitText: 'Send Data',
          icon: 'directions_walk',
          future: true,
          due: 1540612283000
        },
        {
          id: 3,
          title: 'Pedometer Data again',
          main: 'We\'d like to analyse how many steps you\'ve taken over the past week',
          submitText: 'Send Data',
          icon: 'directions_walk',
          future: true,
          due: 1543290683000
        }
      ]
    }
  }
}
</script>
