<template>
  <q-item @click.native="changeRoute">
    <q-item-section avatar>
      <q-icon
        color="grey"
        :name="icon"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ main }}</q-item-label>
    </q-item-section>
    <q-item-section
      side
      top
    >{{ timeRemaining }}</q-item-section>
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
  methods: {
    changeRoute: function () {
      // // // // // // // // // // // DEBUGGING //
      console.log('TEST')
      console.log('taskID:', this.task.taskID)
      console.log('studyKey:', this.task.studyKey)
      console.log('iconName:', this.icon)

      // these bring the user to the correct route depending on the task
      if (this.task.formKey) {
        this.$router.push({ name: 'form', params: { iconName: this.icon, studyKey: this.task.studyKey, taskId: this.task.taskID, formKey: this.task.formKey } })
      } else if (this.task.type === 'smwt') {
        this.$router.push({ name: 'smwtIntro', params: { iconName: this.icon, studyKey: this.task.studyKey, taskID: this.task.taskID } })
      } else if (this.task.type === 'qcst') {
        this.$router.push({ name: 'qcstIntro', params: { iconName: this.icon, studyKey: this.task.studyKey, taskID: this.task.taskID } })
      } else if (this.task.studyKey && this.task.taskID) {
        this.$router.push({ name: 'dataQuery', params: { iconName: this.icon, taskID: this.task.taskID, studyKey: this.task.studyKey } })
      } else {
        return false
      }
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
    } else if (this.task.type === 'miband3') {
      // TODO: add icon and text
    }
  },
  computed: {
    timeRemaining: function () {
      return 'Due ' + moment(this.task.due).fromNow()
    }
  }
}
</script>
