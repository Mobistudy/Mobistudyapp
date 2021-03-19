<template>
  <q-page padding>
    <Intro
      :introductionSlides="$t('studies.tasks.qcst.introductionSlides')"
      v-on:start="start()"
    >
    </Intro>
  </q-page>
</template>

<script>
import Intro from 'components/Intro.vue'
export default {
  name: 'QCSTIntroPage',
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

      this.$router.push({ name: 'qcst', params: { studyKey: studyKey, taskId: taskId } })
    }
  }
}
</script>
