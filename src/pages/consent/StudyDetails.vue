<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('studies.studyDetails')}}
    </div>
    <study-info :studyDescription="studyDescription" />
    <div class="q-my-md flex flex-center">
      <q-btn color="primary" class="full-width q-mt-sm q-mb-lg" :label="$t('common.next')" @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import StudyInfo from 'components/StudyInfo'

export default {
  name: 'StudyDetailsPage',
  props: ['studyDescription'],
  components: { StudyInfo },
  methods: {
    next () {
      this.$router.push({ name: 'privacyPolicy', params: { studyDescription: this.studyDescription } })
    }
  }
}
</script>
