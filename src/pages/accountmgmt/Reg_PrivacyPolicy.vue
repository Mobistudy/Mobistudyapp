<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-center q-py-md">{{ $t('accountMgmt.privacy.privacyPol') }}</q-item-label>
          <q-item-label caption><main-privacy-policy></main-privacy-policy></q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row justify-evenly">
        <q-btn class="q-ma-sm" label="Cancel" color="secondary" to="login" />
        <q-btn class="q-ma-sm" label="Accept" color="primary" to="signup" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import MainPrivacyPolicy from '../../components/MainPrivacyPolicy'

export default {
  name: 'PrivacyPolicy',
  components: { MainPrivacyPolicy }
}
</script>

<style>
</style>
