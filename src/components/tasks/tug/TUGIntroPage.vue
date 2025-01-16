<template>
  <q-page padding>
    <Intro :introductionSlides="slides" v-on:start="start()">
    </Intro>
  </q-page>
</template>

<script>
import i18nTUG from '@i18n/tasks/tug'
import Intro from '@components/tasks/IntroCarousel.vue'

export default {
  name: 'TUGIntroPage',
  components: {
    Intro
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      slides: i18nTUG[this.$root.$i18n.locale].tasks.tug.introductionSlides
    }
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      this.$router.replace({ name: 'tugPermissions', params: { studyKey, taskId } })
    }
  }
}
</script>
