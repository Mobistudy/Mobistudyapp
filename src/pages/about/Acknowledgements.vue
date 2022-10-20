<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.acknowledgements')}}</p>
    <div
      class="mobitxt1"
      v-html="$t('acknowledgements')"
    ></div>
  </q-page>
</template>

<script>
import { mergeDeep } from 'modules/tools'
import i18nAbout from 'i18n/about/about'
import ACKS from 'i18n/about/acks'

export default {
  name: 'AcknowledgementsPage',
  i18n: {
    messages: mergeDeep(i18nAbout, ACKS)
  }
}
</script>

<style>
</style>
