<template>
  <q-page padding>
    <Intro :introductionSlides="slides" @start="start()">
    </Intro>
  </q-page>
</template>
<script>
import i18nDataQuery from '@i18n/tasks/dataQuery'

import Intro from '@components/tasks/IntroCarousel.vue'

export default {
  components: {
    Intro
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      slides: this.$q.platform.is.ios ? i18nDataQuery[this.$root.$i18n.locale].tasks.dataQuery.introductionSlidesiOS : i18nDataQuery[this.$root.$i18n.locale].tasks.dataQuery.introductionSlidesAndroid
    }
  },
  methods: {

    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId

      this.$router.replace({ name: 'dataQueryPermissions', params: { studyKey, taskId } })
    }
  }
}
</script>
