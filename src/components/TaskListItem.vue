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
      let icon = this.icon
      let studyKey = this.task.studyKey
      let taskId = this.task.taskId
      let formKey = this.task.formKey

      console.log(this.title, '\nStudy Key:', studyKey, '\nTask ID:', taskId, '\nForm Key:', formKey)

      // these bring the user to the correct route depending on the task
      if (this.task.formKey) {
        this.$router.push({ name: 'form', params: { icon: icon, studyKey: studyKey, taskId: taskId, formKey: formKey } })
      } else if (this.task.type === 'smwt') {
        this.$router.push({ name: 'smwtIntro', params: { icon: icon, studyKey: studyKey, taskId: taskId } })
      } else if (this.task.type === 'qcst') {
        this.$router.push({ name: 'qcstIntro', params: { icon: icon, studyKey: studyKey, taskId: taskId } })
      } else if (this.task.studyKey && this.task.taskId) {
        this.$router.push({ name: 'dataQuery', params: { icon: icon, taskId: taskId, studyKey: studyKey } })
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
