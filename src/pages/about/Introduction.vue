<template>
  <q-page padding>
    <div class="row justify-center">
    </div>
    <p class="text-h6 q-mt-lg">{{$t('info.introduction')}}</p>
    <p v-html="$t('info.introductionFull')"></p>
    <div class="row justify-center">
        <img src="~/assets/malmo_logo.png" style="max-width:50%"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>

<style>
</style>
