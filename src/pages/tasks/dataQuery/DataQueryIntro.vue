<template>
  <q-page>
    <Intro
      v-bind:introductionSlides="instructions"
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
  computed: {
    instructions () {
      if (this.$q.platform.is.ios) return this.$t('studies.tasks.dataQuery.introductionSlidesiOS')
      else return this.$t('studies.tasks.dataQuery.introductionSlidesAndroid')
    }
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId

      this.$router.push({ name: 'dataQuery', params: { studyKey: studyKey, taskId: taskId } })
      this.$emit('updateTransition', 'fadeInDown')
    }
  }
}
</script>
