<template>
  <q-item :to="toAddress">
    <q-item-side :icon="icon" />
    <q-item-main :label="title" :sublabel="main" />
    <q-item-side right :stamp="timeRemaining" />
  </q-item>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TaskListItem',
  props: ['task'],
  data () {
    return {
      icon: undefined,
      title: undefined,
      main: undefined
    }
  },
  created () {
    if (this.task.type === 'dataQuery') {
      this.title = 'Data Query'
      this.main = 'We\'d like to request some data from you'
      this.icon = 'directions_walk'
    } else if (this.task.type === 'form') {
      this.title = this.task.formTitle
      this.main = 'We\'d like to ask you a few questions'
      this.icon = 'ballot'
    }
  },
  computed: {
    timeRemaining: function () {
      return 'Due ' + moment(this.task.due).fromNow()
    },
    toAddress: function () {
      if (this.task.formKey) {
        return 'form/' + this.task.studyKey + '/' + this.task.taskID + '/' + this.task.formKey
      } else if (this.task.studyKey && this.task.taskID) {
        return 'dataQuery/' + this.task.studyKey + '/' + this.task.taskID
      }
    }
  }
}
</script>

<style>
</style>
