<template>
  <q-page padding>
    <Intro :introductionSlides="slides" v-on:start="start()"></Intro>
  </q-page>
</template>

<script>
import i18nMiband3 from '@i18n/tasks/miband3'
import Intro from '@components/tasks/IntroCarousel.vue'

export default {
  name: 'Miband3IntroPage',
  components: {
    Intro
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      slides: i18nMiband3[this.$root.$i18n.locale].tasks.miband3.introductionSlides
    }
  },
  methods: {
    start () {
      this.$router.replace({ name: 'miband3Permissions', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
