<template>
  <q-page padding>
    <div align="center">
      <div class="q-my-sm text-center">Mobistudy Participants' app version {{ appVersion }}</div>
      <div class="q-pa-md">
        <q-btn flat :to="{ path: '/about/introduction' }" style='width: 200px' :label="$t('about.introduction')"
          color='primary' />
      </div>
      <div class="q-pa-md">
        <q-btn flat :to="{ path: '/about/privacyPolicy' }" style='width: 200px' :label="$t('about.privacyPolicy')"
          color='primary' />
      </div>
      <div class="q-pa-md">
        <q-btn flat :to="{ path: '/about/acknowledgements' }" style='width: 200px' :label="$t('about.acknowledgements')"
          color='primary' />
      </div>
      <div class="q-pa-md">
        <q-btn flat :to="{ path: '/about/contact' }" style='width: 200px' :label="$t('about.contact')"
          color='primary' />
      </div>
      <div class="q-pa-md">
        <q-btn flat :to="{ path: '/about/license' }" style='width: 200px' :label="$t('about.license')"
          color='primary' />
      </div>
    </div>
  </q-page>
</template>

<script>
import i18nStrings from '@i18n/about'

export default {
  name: 'AboutPage',
  i18n: {
    messages: i18nStrings
  },
  computed: {
    appVersion () {
      return process.env.APP_VERSION
    }
  }
}
</script>

<style></style>
