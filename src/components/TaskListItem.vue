<template>
  <q-item
    @click.native="changeRoute"
    v-if="this.task.studyKey"
  >
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
      v-if="this.isMissedTask"
      side
      top
    >
      {{ timeRemaining }}
    </q-item-section>
  </q-item>
</template>

<script>

import moment from 'moment'

export default {
  name: 'TaskListItem',
  props: ['task', 'isMissedTask'],
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
      if (type === 'form') {
        this.$router.push({ name: 'formIntro', params: { studyKey: studyKey, taskId: taskId, formKey: formKey }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'smwt') {
        this.$router.push({ name: 'smwtIntro', params: { studyKey: studyKey, taskId: taskId }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'qcst') {
        this.$router.push({ name: 'qcstIntro', params: { studyKey: studyKey, taskId: taskId }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'miband3') {
        this.$router.push({ name: 'miband3Intro', params: { studyKey: studyKey, taskId: taskId }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'po60') {
        this.$router.push({ name: 'po60Intro', params: { studyKey: studyKey, taskId: taskId }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'position') {
        this.$router.push({ name: 'positionIntro', params: { studyKey: studyKey, taskId: taskId }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'peakFlow') {
        this.$router.push({ name: 'peakFlowIntro', params: { studyKey: studyKey, taskId: taskId }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'dataQuery') {
        this.$router.push({ name: 'dataQueryIntro', params: { taskId: taskId, studyKey: studyKey }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'fingerTapping') {
        this.$router.push({ name: 'fingerTappingIntro', params: { taskId: taskId, studyKey: studyKey }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'tugt') {
        this.$router.push({ name: 'tugtIntro', params: { taskId: taskId, studyKey: studyKey }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'holdPhone') {
        this.$router.push({ name: 'holdPhoneIntro', params: { taskId: taskId, studyKey: studyKey }, query: { icon: this.icon, title: this.title } })
      } else if (type === 'drawing') {
        this.$router.push({ name: 'drawingIntro', params: { taskId: taskId, studyKey: studyKey }, query: { icon: this.icon, title: this.title } })
      } else {
        throw new Error('Could not changeRoute with task type.')
      }
    }
  },
  created () {
    if (this.task.type === 'dataQuery') {
      this.title = this.$i18n.t('studies.tasks.dataQuery.shortTitle')
      this.main = this.$i18n.t('studies.tasks.dataQuery.shortDescription')
      this.icon = 'insert_chart_outlined'
    } else if (this.task.type === 'form') {
      this.title = this.task.formName[this.$root.$i18n.locale]
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
    } else if (this.task.type === 'po60') {
      this.title = this.$i18n.t('studies.tasks.po60.shortTitle')
      this.main = this.$i18n.t('studies.tasks.po60.shortDescription')
      this.icon = 'touch_app'
    } else if (this.task.type === 'position') {
      this.title = this.$i18n.t('studies.tasks.position.shortTitle')
      this.main = this.$i18n.t('studies.tasks.position.shortDescription')
      this.icon = 'place'
    } else if (this.task.type === 'peakFlow') {
      this.title = this.$i18n.t('studies.tasks.peakflow.shortTitle')
      this.main = this.$i18n.t('studies.tasks.peakflow.shortDescription')
      this.icon = 'air'
    } else if (this.task.type === 'fingerTapping') {
      this.title = this.$i18n.t('studies.tasks.fingerTapping.shortTitle')
      this.main = this.$i18n.t('studies.tasks.fingerTapping.shortDescription')
      this.icon = 'touch_app'
    } else if (this.task.type === 'tugt') {
      this.title = this.$i18n.t('studies.tasks.tugt.shortTitle')
      this.main = this.$i18n.t('studies.tasks.tugt.shortDescription')
      this.icon = 'transfer_within_a_station'
    } else if (this.task.type === 'holdPhone') {
      this.title = this.$i18n.t('studies.tasks.holdPhone.shortTitle')
      this.main = this.$i18n.t('studies.tasks.holdPhone.shortDescription')
      this.icon = 'svguse:icons/holdphone-icon.svg#holdphone-icon'
    } else if (this.task.type === 'drawing') {
      this.title = this.$i18n.t('studies.tasks.drawing.shortTitle')
      this.main = this.$i18n.t('studies.tasks.drawing.shortDescription')
      this.icon = 'svguse:icons/drawing-icon.svg#drawing-icon'
    }
  },
  computed: {
    timeRemaining: function () {
      return this.$i18n.t('studies.tasks.due') + ' ' + moment(this.task.due).fromNow()
    }
  }
}
</script>
