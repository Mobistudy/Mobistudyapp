<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-center q-py-md">{{ $t('accountMgmt.registration.privacyPolicy') }}</q-item-label>
          <q-item-label v-html="$t('privacyPolicyFull')" caption />
        </q-item-section>
      </q-item>
      <q-item class="row justify-evenly">
        <q-btn class="q-ma-sm" :label="$t('common.cancel')" color="secondary" to="login" />
        <q-btn class="q-ma-sm" :label="$t('common.accept')" color="primary" to="signup" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'PrivacyPolicy'
}
</script>

<style>
</style>
