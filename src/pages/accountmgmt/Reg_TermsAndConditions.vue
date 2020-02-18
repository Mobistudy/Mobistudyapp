<template>
  <q-page class="flex flex-center">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-center q-pb-md">{{ $t('accountMgmt.registration.termsAndConditions') }}</q-item-label>
          <q-item-label caption>{{ $t('accountMgmt.registration.termsAndConditionsFull') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row justify-evenly">
        <q-btn class="q-ma-sm" :label="$t('common.cancel')" color="secondary" to="login" />
        <q-btn class="q-ma-sm" :label="$t('common.accept')" color="primary" to="register_pp" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

export default {
  name: 'TermsAndConditons'
}
</script>

<style>
</style>
