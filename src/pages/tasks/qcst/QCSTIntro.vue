<template>
  <q-page padding>
    <Intro
      v-bind:title="$t('studies.tasks.qcst.title')"
      v-bind:prerequisites="$t('studies.tasks.qcst.prerequisites')"
      v-bind:instructions="$t('studies.tasks.qcst.instructions')"
    >
      <template v-slot:initialIntro>
        <div class="text-subtitle1 q-mt-md">
          {{ $t('common.introduction') }}
        </div>
      </template>

      <template v-slot:prerequisitesIntro>
        <div>
          {{ $t('studies.tasks.qcst.prerequisiteNote') }}
        </div>
      </template>

      <template v-slot:instructionsIntro>
        <div class="text-subtitle1 q-mt-md">
          {{ $t('common.instructions') }}
        </div>
      </template>

      <template v-slot:finishButton>
        <div class="row justify-center q-mt-lg">
          <q-btn
            color="primary"
            @click="start()"
            replace
            :label="$t('common.start')"
          />
        </div>
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
