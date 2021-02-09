<template>
  <q-page padding>
    <div align="center">
      <div class="q-pa-md">
        <q-btn flat to='/introduction' style='width: 200px' :label="$t('about.introduction')" color='primary'/>
      </div>
      <div class="q-pa-md">
        <q-btn flat to='/aboutPrivacyPolicy' style='width: 200px' :label="$t('about.privacyPolicy')" color='primary' />
        </div>
      <div class="q-pa-md">
        <q-btn flat to='/acknowledgements' style='width: 200px' :label="$t('about.acknowledgements')" color='primary' />
      </div>
       <div class="q-pa-md">
        <q-btn flat to='/contact' style='width: 200px' :label="$t('about.contact')" color='primary' />
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
