<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('userMgmt.registration.privacyPolicy') }}
    </div>
    <div class="q-my-md mobitxt1" v-html="$t('privacyPolicy')"></div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-ma-sm mobibtn" :label="$t('common.cancel')" color="negative" to="login" />
      <q-btn class="q-ma-sm mobibtn" :label="$t('common.accept')" color="primary" to="signup" />
    </div>
  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nUserMgmt from '@i18n/userMgmt'
import i18nPrivacyPolicy from '@i18n/privacyPolicy'
import { mergeDeep } from '@shared/tools.js'

export default {
  name: 'PrivacyPolicy',
  i18n: {
    messages: mergeDeep(i18nUserMgmt, i18nPrivacyPolicy, i18nCommon)
  }
}
</script>

<style></style>
