<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.introduction')}}</p>
    <p v-html="$t('about.introductionFull')"></p>
    <div class="row justify-center">
        <img src="~/assets/malmo_logo.png" style="max-width:50%"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'IntroductionPage'
}
</script>

<style>
</style>
