<template>
  <q-page padding>
    <Intro
      v-bind:title="$t('studies.tasks.qcst.title')"
      v-bind:prerequisites="introTools.createPrerequisites($t('studies.tasks.qcst.prerequisites'), prerequisiteImages)"
      v-bind:instructions="introTools.createInstructions($t('studies.tasks.qcst.instructions'), instructionImages)"
      v-on:start="start()"
    >
      <template v-slot:initialIntro>
        <!-- Enter non-default content here -->
      </template>

      <template v-slot:prerequisitesIntro>
        <!-- Enter non-default content here -->
      </template>

      <template v-slot:instructionsIntro>
        <!-- Enter non-default content here -->
      </template>

      <template v-slot:finishButton>
        <!-- Enter non-default content here -->
      </template>
    </Intro>
  </q-page>
</template>

<script>
import Intro from 'components/Intro.vue'
import introTools from 'modules/introTools'
export default {
  name: 'QCSTIntroPage',
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number
  },
  data () {
    return {
      prerequisiteImages: ['https://i.picsum.photos/id/43/200/200.jpg?hmac=gMoEYpdjrHoRnKoyIdtTknuqyCQDTC8exwLaKHpMv6E', 'https://i.picsum.photos/id/1031/200/200.jpg?hmac=E9kagTB6aHlVO8qmJYAQYYGJP3IvPT_v0N3ju0Rc4Gw'],
      instructionImages: [],
      introTools
    }
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId)

      this.$router.push({ name: 'qcst', params: { studyKey: studyKey, taskId: taskId } })
      this.$emit('updateTransition', 'fadeInDown')
    }
  },
  created () {
    console.log('Method:', this.createPrerequisites)
  }
}
</script>
