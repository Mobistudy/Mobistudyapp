<template>
  <q-page padding>
    <Intro
      :introductionSlides="$t('studies.tasks.position.introductionSlides')"
      v-on:start="start()"
    >
    </Intro>
  </q-page>
</template>

<script>
import Intro from 'components/Intro.vue'
export default {
  name: 'PositionIntroPage',
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
      this.$router.push({ name: 'position', params: { studyKey: studyKey, taskId: taskId } })
    }
  }
}
</script>
