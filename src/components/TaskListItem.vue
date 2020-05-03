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
    } else if (this.task.type === 'qcst') {
      this.title = this.$i18n.t('studies.tasks.qcst.shortTitle')
      this.main = this.$i18n.t('studies.tasks.qcst.shortDescription')
      this.icon = 'layers'
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
        return 'smwtIntro/' + this.task.studyKey + '/' + this.task.taskID
      } else if (this.task.type === 'qcst') {
        return 'qcst/' + this.task.studyKey + '/' + this.task.taskID
      } else if (this.task.studyKey && this.task.taskID) {
        return 'dataQuery/' + this.task.studyKey + '/' + this.task.taskID
      } else {
        return false
      }
    }
  }
}
</script>
