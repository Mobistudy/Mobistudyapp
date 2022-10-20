<template>
  <q-page padding>
    <div class="justify center">
      <p class="text-h6 text-center q-pt-md">{{$t('about.privacyPolicy')}}</p>
      <div
        class="mobitxt1"
        v-html="$t('privacyPolicy')"
      ></div>
    </div>
  </q-page>
</template>

<script>
import i18nAbout from 'i18n/about/about'
import PP from 'i18n/about/privacyPolicy'
import { mergeDeep } from 'modules/tools'

export default {
  name: 'PrivacyPolicyPage',
  i18n: {
    messages: mergeDeep(i18nAbout, PP)
  }
}
</script>

<style>
</style>
