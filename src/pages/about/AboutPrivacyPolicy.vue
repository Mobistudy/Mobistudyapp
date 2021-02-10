<template>
  <q-page padding>
    <div class="justify center">
      <p class="text-h6 text-center q-pt-md">{{$t('accountMgmt.registration.privacyPolicy')}}</p>
      <div v-html="$t('privacyPolicyFull')"></div>
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
