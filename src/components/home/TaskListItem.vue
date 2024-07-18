<template>
  <q-item :to="'/tasks' + task.type" @click="changeRoute" v-if="this.task.studyKey">
    <q-item-section avatar>
      <q-icon color="grey" :name="icon" style="font-size: 2.5em;" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="mobitxt1">{{ title }}</q-item-label>
      <q-item-label caption>{{ main }}</q-item-label>
    </q-item-section>
    <q-item-section v-if="this.isMissedTask" side top>
      {{ timeRemaining }}
    </q-item-section>
  </q-item>
</template>

<script>
import i18nTasksTitles from '@i18n/tasks/titles'

export default {
  name: 'TaskListItem',
  props: ['task', 'isMissedTask'],
  i18n: {
    messages: i18nTasksTitles
  },
  data () {
    return {
      icon: undefined,
      title: undefined,
      main: undefined
    }
  },
  methods: {
    changeRoute (evt, go) {
      evt.preventDefault()

      const type = this.task.type
      const studyKey = this.task.studyKey
      const taskId = this.task.taskId
      const formKey = this.task.formKey
      const query = { icon: this.icon, title: this.title }

      // these bring the user to the correct route depending on the task
      if (type === 'form') {
        this.$router.push({ name: 'formIntro', params: { studyKey, taskId, formKey }, query })
      } else if (type === 'smwt') {
        this.$router.push({ name: 'smwtIntro', params: { studyKey, taskId }, query })
      } else if (type === 'qcst') {
        this.$router.push({ name: 'qcstIntro', params: { studyKey, taskId }, query })
      } else if (type === 'miband3') {
        this.$router.push({ name: 'miband3Intro', params: { studyKey, taskId }, query })
      } else if (type === 'po60') {
        this.$router.push({ name: 'po60Intro', params: { studyKey, taskId }, query })
      } else if (type === 'position') {
        this.$router.push({ name: 'positionIntro', params: { studyKey, taskId }, query })
      } else if (type === 'peakFlow') {
        this.$router.push({ name: 'peakFlowIntro', params: { studyKey, taskId }, query })
      } else if (type === 'dataQuery') {
        this.$router.push({ name: 'dataQueryIntro', params: { taskId, studyKey }, query })
      } else if (type === 'fingerTapping') {
        this.$router.push({ name: 'fingerTappingIntro', params: { taskId, studyKey }, query })
      } else if (type === 'tugt') {
        this.$router.push({ name: 'tugtIntro', params: { taskId, studyKey }, query })
      } else if (type === 'holdPhone') {
        this.$router.push({ name: 'holdPhoneIntro', params: { taskId, studyKey }, query })
      } else if (type === 'vocalization') {
        this.$router.push({ name: 'vocalizationIntro', params: { taskId, studyKey }, query })
      } else if (type === 'drawing') {
        this.$router.push({ name: 'drawingIntro', params: { taskId, studyKey }, query })
      } else {
        throw new Error('Could not changeRoute with task type.')
      }
    }
  },
  created () {
    if (this.task.type === 'dataQuery') {
      this.title = this.$i18n.t('tasks.dataQuery.shortTitle')
      this.main = this.$i18n.t('tasks.dataQuery.shortDescription')
      this.icon = 'insert_chart_outlined'
    } else if (this.task.type === 'form') {
      this.title = this.task.formName[this.$root.$i18n.locale]
      this.main = this.$i18n.t('tasks.form.shortDescription')
      this.icon = 'format_list_bulleted'
    } else if (this.task.type === 'smwt') {
      this.title = this.$i18n.t('tasks.smwt.shortTitle')
      this.main = this.$i18n.t('tasks.smwt.shortDescription')
      this.icon = 'directions_walk'
    } else if (this.task.type === 'qcst') {
      this.title = this.$i18n.t('tasks.qcst.shortTitle')
      this.main = this.$i18n.t('tasks.qcst.shortDescription')
      this.icon = 'layers'
    } else if (this.task.type === 'miband3') {
      this.title = this.$i18n.t('tasks.miband3.shortTitle')
      this.main = this.$i18n.t('tasks.miband3.shortDescription')
      this.icon = 'watch'
    } else if (this.task.type === 'po60') {
      this.title = this.$i18n.t('tasks.po60.shortTitle')
      this.main = this.$i18n.t('tasks.po60.shortDescription')
      this.icon = 'touch_app'
    } else if (this.task.type === 'position') {
      this.title = this.$i18n.t('tasks.position.shortTitle')
      this.main = this.$i18n.t('tasks.position.shortDescription')
      this.icon = 'place'
    } else if (this.task.type === 'peakFlow') {
      this.title = this.$i18n.t('tasks.peakflow.shortTitle')
      this.main = this.$i18n.t('tasks.peakflow.shortDescription')
      this.icon = 'air'
    } else if (this.task.type === 'fingerTapping') {
      this.title = this.$i18n.t('tasks.fingerTapping.shortTitle')
      this.main = this.$i18n.t('tasks.fingerTapping.shortDescription')
      this.icon = 'touch_app'
    } else if (this.task.type === 'tugt') {
      this.title = this.$i18n.t('tasks.tugt.shortTitle')
      this.main = this.$i18n.t('tasks.tugt.shortDescription')
      this.icon = 'transfer_within_a_station'
    } else if (this.task.type === 'holdPhone') {
      this.title = this.$i18n.t('tasks.holdPhone.shortTitle')
      this.main = this.$i18n.t('tasks.holdPhone.shortDescription')
      this.icon = 'svguse:icons/holdphone-icon.svg#holdphone-icon'
    } else if (this.task.type === 'vocalization') {
      this.title = this.$i18n.t('tasks.vocalization.shortTitle')
      this.main = this.$i18n.t('tasks.vocalization.shortDescription')
      this.icon = 'record_voice_over'
    } else if (this.task.type === 'drawing') {
      this.title = this.$i18n.t('tasks.drawing.shortTitle')
      this.main = this.$i18n.t('tasks.drawing.shortDescription')
      this.icon = 'draw'
    }

    if (this.task.customTitle && this.task.customTitle[this.$i18n.locale]) {
      this.title = this.task.customTitle[this.$i18n.locale]
    }
  },
  computed: {
    timeRemaining: function () {
      let s = this.$i18n.t('tasks.due') + ' '
      const secs = new Date().getTime() - this.task.due.getTime()
      if ((secs / (24 * 60 * 60 * 1000)) > 0) {
        s += this.$i18n.tc('tasks.daysAgo', Math.round(secs / (24 * 60 * 60 * 1000)))
      } else if ((secs / (60 * 60 * 1000)) > 0) {
        s += this.$i18n.tc('tasks.hoursAgo', Math.round(secs / (24 * 60 * 60 * 1000)))
      } else if ((secs / (60 * 1000)) > 0) {
        s += this.$i18n.tc('tasks.minsAgo', Math.round(secs / (24 * 60 * 60 * 1000)))
      }
      return s
    }
  }
}
</script>
