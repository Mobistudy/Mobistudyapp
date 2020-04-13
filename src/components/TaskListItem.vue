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
      this.title = this.$i18n.t('studies.tasks.dataQuery.title')
      this.main = this.$i18n.t('studies.tasks.dataQuery.shortDescription')
      this.icon = 'insert_chart_outlined'
    } else if (this.task.type === 'form') {
      this.title = this.task.formTitle[this.$root.$i18n.locale]
      this.main = this.$i18n.t('studies.tasks.form.shortDescription')
      this.icon = 'format_list_bulleted'
    } else if (this.task.type === 'smwt') {
      this.title = this.$i18n.t('studies.tasks.smwt.shortTitle')
      this.main = this.$i18n.t('studies.tasks.smwt.shortDescription')
      this.icon = 'directions_walk'
    }
  },
  computed: {
    timeRemaining: function () {
      return 'Due ' + moment(this.task.due).fromNow()
    },
    toAddress: function () {
      if (this.task.formKey) {
        return 'form/' + this.task.studyKey + '/' + this.task.taskID + '/' + this.task.formKey
      } else if (this.task.type === 'smwt') {
        return 'smwt'
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
