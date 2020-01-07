/* eslint-disable vue/return-in-computed-property */
<template>
  <q-item :to="toAddress">
    <q-item-section avatar>
      <q-icon color="grey" :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ main }}</q-item-label>
    </q-item-section>
    <q-item-section side top>{{ timeRemaining }}</q-item-section>
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
      // eslint-disable-next-line brace-style
      }
      // NEED TO CHECK IF THE FOLLOWING ELSE BREAKS THE CODE, HAD TO PUT IT IN SO THE FUNCTION ALWAYS RETURNS A VALUE-> FOR DOC SEE: https://eslint.vuejs.org/rules/return-in-computed-property.html
      else {
        return false
      }
    }
  }
}
</script>

<style>
</style>
