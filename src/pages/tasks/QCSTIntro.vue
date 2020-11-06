<template>
  <q-page padding>
    <div class="text-h5 text-center">{{ $t('studies.tasks.qcst.title') }}</div>
    <div class="text-subtitle1 q-mt-md">
      {{ $t('common.introduction') }}
    </div>
    <div>
      {{ $t('studies.tasks.qcst.prerequisiteNote') }}
    </div>
    <div>
      <ul>
        <li
          v-for="(prerequisite, idx) in $t('studies.tasks.qcst.prerequisites')"
          :key="idx"
        >
          {{ prerequisite.p }}
        </li>
      </ul>
    </div>
    <div class="text-subtitle1 q-mt-md">
      {{ $t('common.instructions') }}
    </div>
    <div>
      <ul>
        <li
          v-for="(instruction, idx) in $t('studies.tasks.qcst.instructions')"
          :key="idx"
        >
          {{ instruction.i }}
        </li>
      </ul>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        color="primary"
        @click="start()"
        replace
        :label="$t('common.start')"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'QCSTIntroPage',
  props: {
    icon: String,
    studyKey: String,
    taskId: Number
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId)
      this.$router.push({ name: 'qcst', params: { studyKey, taskId } })
    }
  }
}
</script>
