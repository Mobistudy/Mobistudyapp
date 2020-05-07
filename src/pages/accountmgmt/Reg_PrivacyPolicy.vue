<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('accountMgmt.registration.privacyPolicy') }}
    </div>
    <div class="q-my-md" v-html="$t('privacyPolicyFull')" ></div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-ma-sm" :label="$t('common.cancel')" color="secondary" to="login" />
      <q-btn class="q-ma-sm" :label="$t('common.accept')" color="primary" to="signup" />
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
