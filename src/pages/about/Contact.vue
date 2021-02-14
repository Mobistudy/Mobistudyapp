<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.contact')}}</p>
    <div v-html="$t('contactFull')"></div>
    <div class="row justify-center">
      <img
        src="~/assets/malmo_logo.png"
        style="max-width:50%"
      />
    </div>
  </q-page>
</template>

<script>
import { mergeDeep } from 'modules/tools'
import i18nAbout from 'i18n/about/about'
import Contact from 'i18n/about/contact'

export default {
  name: 'ContactPage',
  i18n: {
    messages: mergeDeep(i18nAbout, Contact)
  }
}
</script>

<style>
</style>
