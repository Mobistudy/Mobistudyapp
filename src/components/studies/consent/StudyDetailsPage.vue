<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('studies.studyDetails') }}
    </div>
    <study-info :studyDescription="studyDescription" />
    <div class="q-my-md flex flex-center">
      <q-btn color="primary" class="full-width q-mt-sm q-mb-lg mobibtn" :label="$t('common.next')"
        @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import session from '@shared/session'

import StudyInfo from '@components/studies/StudyInfo'

export default {
  name: 'StudyDetailsPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  data () {
    return {
      studyDescription: {}
    }
  },
  created () {
    const sd = session.getStudyDescription()
    if (!sd) {
      this.$router.go(-1)
    } else {
      this.studyDescription = sd
    }
  },
  components: { StudyInfo },
  methods: {
    next () {
      this.$router.replace({ name: 'privacyPolicy' })
    }
  }
}
</script>
