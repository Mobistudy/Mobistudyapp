<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.introduction')}}</p>
    <div style="text-align: center;">
      <img
        src="imgs/MobistudyIntroScreens_1.svg"
        style="width: 60%"
      >
    </div>
    <div v-html="$t('introduction')"></div>
  </q-page>
</template>

<script>
import { mergeDeep } from 'modules/tools'
import i18nAbout from 'i18n/about/about'
import Intro from 'i18n/about/introduction'

export default {
  name: 'IntroductionPage',
  i18n: {
    messages: mergeDeep(i18nAbout, Intro)
  }
}
</script>

<style>
</style>
