<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-h6 text-center q-pt-md">
        {{ $t('info.about') }}
      </div>
    </div>
    <div align="center">
      <div class="q-pa-md">
        <q-btn to='/introduction' style='width: 200px' :label="$t('info.introduction')" color='primary'/>
      </div>
      <div class="q-pa-md">
        <q-btn to='/aboutPrivacyPolicy' style='width: 200px' :label="$t('info.privacyPolicy')" color='primary' />
        </div>
      <div class="q-pa-md">
        <q-btn to='/acknowledgements' style='width: 200px' :label="$t('info.acknowledgements')" color='primary' />
      </div>
       <div class="q-pa-md">
        <q-btn to='/contact' style='width: 200px' :label="$t('info.contact')" color='primary' />
      </div>
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
