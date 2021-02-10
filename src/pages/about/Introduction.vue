<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.introduction')}}</p>
    <div v-html="$t('about.introductionFull')"></div>
  </q-page>
</template>

<script>
export default {
  name: 'IntroductionPage'
}
</script>

<style>
</style>
