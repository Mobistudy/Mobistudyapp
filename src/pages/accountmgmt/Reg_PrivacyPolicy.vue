<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('accountMgmt.registration.privacyPolicy') }}
    </div>
    <div class="q-my-md" v-html="$t('privacyPolicy')" ></div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-ma-sm" :label="$t('common.cancel')" color="secondary" to="login" />
      <q-btn class="q-ma-sm" :label="$t('common.accept')" color="primary" to="signup" />
    </div>
  </q-page>
</template>

<script>
import i18nString from 'i18n/accountMgmt/accountMgmt'
import i18nPP from 'i18n/about/privacyPolicy'
import { mergeDeep } from 'modules/tools.mjs'

export default {
  name: 'PrivacyPolicy',
  i18n: {
    messages: mergeDeep(i18nString, i18nPP)
  }
}
</script>

<style>
</style>
