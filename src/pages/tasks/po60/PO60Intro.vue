<template>
    <Intro
      :introductionSlides="$t('studies.tasks.po60.introductionSlides')"
      v-on:start="start()"
    >
    </Intro>
</template>

<script>
import Intro from 'components/Intro.vue'
export default {
  name: 'PO60IntroPage',
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number
  },
  methods: {
    start () {
      console.log('Study key:', this.studyKey)
      this.$router.push({ name: 'po60Connect', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
