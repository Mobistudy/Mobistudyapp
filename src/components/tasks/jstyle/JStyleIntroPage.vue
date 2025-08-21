<template>
  <q-page padding>
    <Intro :introductionSlides="slides" v-on:start="start()"></Intro>
  </q-page>
</template>

<script>
import i18nJStyle from '@i18n/tasks/jstyle'
import Intro from '@components/tasks/IntroCarousel.vue'

export default {
  name: 'JStyleIntroPage',
  components: {
    Intro
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      slides: i18nJStyle[this.$root.$i18n.locale].tasks.jstyle.introductionSlides
    }
  },
  methods: {
    start () {
      this.$router.replace({ name: 'jstylePermissions', params: { studyKey: this.studyKey, taskId: this.taskId } })
    }
  }
}
</script>
