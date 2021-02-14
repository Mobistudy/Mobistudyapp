<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.acknowledgements')}}</p>
    <div v-html="$t('acknowledgements')"></div>
  </q-page>
</template>

<script>
import ACKS from 'i18n/about/acks'

export default {
  name: 'AcknowledgementsPage',
  i18n: {
    messages: ACKS
  }
}
</script>

<style>
</style>
