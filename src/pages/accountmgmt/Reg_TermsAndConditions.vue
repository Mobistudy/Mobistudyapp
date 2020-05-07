<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('accountMgmt.registration.termsAndConditions') }}
    </div>
    <div class="q-my-md" style="white-space: pre-line;">{{ $t('termsAndConditionsFull') }}</div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-ma-sm" :label="$t('common.cancel')" color="secondary" to="login" />
      <q-btn class="q-ma-sm" :label="$t('common.accept')" color="primary" to="register_pp" />
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'TermsAndConditons'
}
</script>

<style>
</style>
