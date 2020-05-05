<template>
  <q-page padding>
    <div class="text-center text-h6 q-mt-lg">
      {{ $t("studies.tasks.qcst.title") }}
    </div>
    <q-item class="q-mt-md">
      <q-item-section>
        <q-item-label class="q-pb-sm">{{
          $t("common.introduction")
        }}</q-item-label>
        <q-item-label caption>
          <p>{{ $t("studies.tasks.qcst.prerequisiteNote") }}<br /><br /></p>
          <ul>
            <li
              v-for="(prerequisite, idx) in $t(
                'studies.tasks.qcst.prerequisite'
              )"
              :key="idx"
            >
              {{ prerequisite.p }}
            </li>
          </ul>
        </q-item-label>
        <q-item-label class="q-pb-sm">{{
          $t("common.instructions")
        }}</q-item-label>
        <q-item-label caption>
          <p>{{ $t("studies.tasks.instructionsNote") }}</p>
          <ul>
            <li
              v-for="(instruction, idx) in $t(
                'studies.tasks.qcst.qcstInstructions'
              )"
              :key="idx"
            >
              {{ instruction.i }}
            </li>
          </ul>
        </q-item-label>
        <div class="row justify-center q-mt-lg">
          <q-btn color="primary" @click="start()" :label="$t('common.start')" />
        </div>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
export default {
  name: 'QCSTIntroPage',
  methods: {
    start () {
      const studyKey = this.$route.params.studyKey
      const taskID = this.$route.params.taskID
      console.log('StudyKey ' + studyKey + ',taskID ' + taskID)
      this.$router.push({ name: 'qcst', params: { studyKey, taskID } })
    }
  }
}
</script>
