<template>
  <q-page padding>
    <div class="justify center">
      <p class="text-h6 text-center q-pt-md">{{$t('about.privacyPolicy')}}</p>
      <div v-html="$t('privacyPolicy')"></div>
    </div>
  </q-page>
</template>

<script>
import PP from 'i18n/about/privacyPolicy'

export default {
  name: 'PrivacyPolicyPage',
  i18n: {
    messages: PP
  }
}
</script>

<style>
</style>
