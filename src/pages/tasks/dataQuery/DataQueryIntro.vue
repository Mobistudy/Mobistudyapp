<template>
  <q-page>
    <Intro
      v-if="android"
      v-bind:slides="$t('studies.tasks.dataQuery.introductionSlidesiOS')"
      v-on:start="start()"
    >
    </Intro>
    <Intro
      v-if="ios"
      v-bind:slides="$t('studies.tasks.dataQuery.introductionSlidesAndroid')"
      v-on:start="start()"
    >
    </Intro>
  </q-page>
</template>
<script>
import Intro from 'components/Intro.vue'
export default {
  data () {
    return {
      ios: false,
      android: false
    }
  },
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number
  },
  created () {
    this.ios = this.$q.platform.is.ios
    this.android = this.$q.platform.is.android
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId)

      this.$router.push({ name: 'dataQuery', params: { studyKey: studyKey, taskId: taskId } })
      this.$emit('updateTransition', 'fadeInDown')
    }
  }
}
</script>
