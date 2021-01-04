<template>
  <div class="q-pa-md">
    <Intro
      v-bind:slides="$t('studies.tasks.miband3.slides')"
      v-on:start="start()"
    >
    </Intro>
  </div>
</template>

<script>
import Intro from 'components/Intro.vue'
export default {
  name: 'Miband3IntroPage',
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number
  },
  methods: {
    start () {
      this.$router.push({ name: 'miband3Connect', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
