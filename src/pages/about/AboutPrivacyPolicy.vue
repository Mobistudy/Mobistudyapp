<template>
  <q-page padding>
      <div class="justify center">
        <p class="text-h6 text-center q-pt-md">{{$t('accountMgmt.registration.privacyPolicy')}}</p>
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
