<template>
  <q-page padding>
    <div class="q-my-md mobitxt1" style="white-space: pre-line;">{{ studyDescription.consent.invitation[$i18n.locale] }}
    </div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-mt-lg full-width mobibtn" :label="$t('common.next')" color="primary" @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import session from '@shared/session'

export default {
  name: 'InvitationPage',
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
  methods: {
    next () {
      this.$router.replace({ name: 'studyDetails' })
    }
  }
}
</script>

<style></style>
