<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-h5 q-mt-lg">
        {{ $t('info.about') }}
      </div>
    </div>
    <p class="text-h6">{{$t('info.introduction')}}</p>
    <p v-html="$t('info.introductionFull')"></p>
    <div class="row justify-center">
        <img src="~/assets/malmo_logo.png" style="max-width:50%"/>
    </div>

    <p class="text-h6 q-mt-lg">{{$t('accountMgmt.registration.privacyPolicy')}}</p>
    <p v-html="$t('privacyPolicyFull')"></p>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style>
</style>
