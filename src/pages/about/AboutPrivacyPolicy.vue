<template>
  <q-page padding>
      <div class="row justify-center">
      </div>
      <div class="justify center">
        <p class="text-h6 q-mt-lg">{{$t('accountMgmt.registration.privacyPolicy')}}</p>
        <p v-html="$t('privacyPolicyFull')"></p>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'PrivacyPolicy'
}
</script>

<style>
</style>
