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
      const type = this.task.type
      const studyKey = this.task.studyKey
      const taskId = this.task.taskId
      const formKey = this.task.formKey

      // these bring the user to the correct route depending on the task
      if (formKey) {
        this.$router.push({ name: 'form', params: { studyKey: studyKey, taskId: taskId, formKey: formKey }, query: { type } })
      } else if (type === 'smwt') {
        this.$router.push({ name: 'smwtIntro', params: { studyKey: studyKey, taskId: taskId }, query: { type } })
      } else if (type === 'qcst') {
        this.$router.push({ name: 'qcstIntro', params: { studyKey: studyKey, taskId: taskId }, qquery: { type } })
      } else if (type === 'miband3') {
        this.$router.push({ name: 'miband3Intro', params: { studyKey: studyKey, taskId: taskId }, query: { type } })
      } else if (studyKey && taskId) {
        this.$router.push({ name: 'dataQuery', params: { taskId: taskId, studyKey: studyKey }, query: { type } })
      } else {
        return false
      }
    }
  },
  created () {
    if (this.task.type === 'dataQuery') {
      this.title = this.$i18n.t('studies.tasks.dataQuery.shortTitle')
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
      this.title = this.$i18n.t('studies.tasks.miband3.shortTitle')
      this.main = this.$i18n.t('studies.tasks.miband3.shortDescription')
      this.icon = 'watch'
    }
  },
  computed: {
    timeRemaining: function () {
      return 'Due ' + moment(this.task.due).fromNow()
    }
  }
}
</script>
