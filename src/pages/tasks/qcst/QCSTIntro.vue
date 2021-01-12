<template>
  <q-page padding>
    <Intro
      v-bind:slides="$t('studies.tasks.qcst.introductionSlides')"
      v-on:start="start()"
    >
      <template v-slot:slide-0>
        <!-- Enter non-default content here, one for each slide, if you need full customization. -->
      </template>
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
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId)

      this.$router.push({ name: 'qcst', params: { studyKey: studyKey, taskId: taskId } })
      this.$emit('updateTransition', 'fadeInDown')
    }
  }
}
</script>
