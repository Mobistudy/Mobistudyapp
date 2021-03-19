<template>
  <Intro
    :introductionSlides="instructions"
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
  computed: {
    instructions () {
      if (this.$q.platform.is.ios) return this.$t('studies.tasks.po60.introductionSlidesiOS')
      else return this.$t('studies.tasks.po60.introductionSlidesAndroid')
    }
  },
  methods: {
    start () {
      this.$router.push({ name: 'po60Connect', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
