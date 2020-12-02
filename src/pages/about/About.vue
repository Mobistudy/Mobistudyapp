<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-h5 q-mt-lg">
        {{ $t('info.about') }}
      </div>
    </div>
      <div class="q-pa-md">
        <q-btn to='/introduction' :label="$t('info.introduction')" color='primary'/>
      </div>
      <div class="q-pa-md">
        <q-btn to='/aboutPrivacyPolicy' :label="$t('info.privacyPolicy')" color='primary' />
        </div>
      <div class="q-pa-md">
        <q-btn to='/acknowledgements' :label="$t('info.acknowledements')" color='primary' />
        </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style>
</style>
