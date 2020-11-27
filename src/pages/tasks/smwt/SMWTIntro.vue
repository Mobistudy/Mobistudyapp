<template>
  <q-page padding>
    <div class="text-h5 text-center">{{ $t('studies.tasks.smwt.title') }}</div>
    <div class="text-subtitle1 q-mt-md">
      {{ $t('common.introduction') }}
    </div>
    <div>
      {{ $t('studies.tasks.smwt.description') }}
    </div>
    <div class="text-subtitle1 q-mt-md">
      {{ $t('common.instructions') }}
    </div>
    <div>
      <ul>
        <li
          v-for="(instruction, idx) in $t('studies.tasks.smwt.instructions')"
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
  name: 'SMWTIntroPage',
  props: {
    studyKey: String,
    taskId: Number
  },
  methods: {
    start () {
      const title = this.title
      const icon = this.icon
      const studyKey = this.studyKey
      const taskId = this.taskId
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId)
      this.$router.push({ name: 'smwt', params: { title: title, icon: icon, studyKey, taskId } })
      this.$emit('updateTransition', 'fadeInDown')
    }
  }
}
</script>
