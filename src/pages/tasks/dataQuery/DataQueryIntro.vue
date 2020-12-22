<template>
  <q-page>
    <Intro
      v-bind:slides="$t('studies.tasks.dataQuery.slides')"
      v-on:start="start()"
    >
    </Intro>
  </q-page>
</template>
<script>
import Intro from 'components/Intro.vue'
export default {
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId)

      this.$router.push({ name: 'dataQuery', params: { studyKey: studyKey, taskId: taskId } })
      this.$emit('updateTransition', 'fadeInDown')
    }
  }
}
</script>
