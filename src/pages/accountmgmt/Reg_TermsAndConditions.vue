<template>
  <q-page class="flex flex-center">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-center q-pb-md">{{ $t('accountMgmt.tAndC.headline') }}</q-item-label>
          <q-item-label caption>{{ $t('accountMgmt.tAndC.tAndCText') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row justify-evenly">
        <q-btn class="q-ma-sm" :label="$t('accountMgmt.tAndC.buttonCancel')" color="secondary" to="login" />
        <q-btn class="q-ma-sm" :label="$t('accountMgmt.tAndC.buttonNext')" color="primary" to="register_pp" />
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
