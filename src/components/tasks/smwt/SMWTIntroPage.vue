<template>
  <q-page padding>
    <Intro :introductionSlides="slides" v-on:start="start()">
    </Intro>
  </q-page>
</template>

<script>
import i18nSMWT from '@i18n/tasks/smwt'
import Intro from '@components/tasks/IntroCarousel.vue'

export default {
  name: 'SMWTIntroPage',
  components: {
    Intro
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      slides: i18nSMWT[this.$root.$i18n.locale].tasks.smwt.introductionSlides
    }
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      this.$router.replace({ name: 'smwt', params: { studyKey, taskId } })
    }
  }
}
</script>
