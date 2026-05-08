<template>
  <q-page padding>
    <div class="q-my-md mobitxt1" style="white-space: pre-line;">{{ invitationText }}</div>

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
      invitationText: ''
    }
  },
  created () {
    const sd = session.getStudyDescription()
    this.invitationText = this.translate(sd.consent.invitation)
    if (!sd) {
      this.$router.go(-1)
    } else {
      this.studyDescription = sd
    }
  },
  methods: {
    translate (messages) {
      if (messages[this.$i18n.locale]) return messages[this.$i18n.locale]
      else if (messages[this.$i18n.fallbackLocale]) return messages[this.$i18n.fallbackLocale]
      else {
        // eslint-disable-next-line no-unreachable-loop
        for (const locale in messages) {
          return messages[locale]
        }
      }
    },
    next () {
      this.$router.replace({ name: 'studyDetails' })
    }
  }
}
</script>

<style></style>
