<template>
  <q-page padding>
    <div align="center">
      <div class="q-pa-md">
        <q-btn
          flat
          :to="{ path: '/about/introduction', params: { pathIndex: 6 } }"
          style='width: 200px'
          :label="$t('about.introduction')"
          color='primary'
        />
      </div>
      <div class="q-pa-md">
        <q-btn
          flat
          :to="{ path: '/about/privacyPolicy', params: { pathIndex: 6 } }"
          style='width: 200px'
          :label="$t('about.privacyPolicy')"
          color='primary'
        />
      </div>
      <div class="q-pa-md">
        <q-btn
          flat
          :to="{ path: '/about/acknowledgements', params: { pathIndex: 6 } }"
          style='width: 200px'
          :label="$t('about.acknowledgements')"
          color='primary'
        />
      </div>
      <div class="q-pa-md">
        <q-btn
          flat
          :to="{ path: '/about/contact', params: { pathIndex: 6 } }"
          style='width: 200px'
          :label="$t('about.contact')"
          color='primary'
        />
      </div>
      <div class="q-pa-md">
        <q-btn
          flat
          :to="{ path: '/about/license', params: { pathIndex: 6 } }"
          style='width: 200px'
          :label="$t('about.license')"
          color='primary'
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPagePage'
}
</script>

<style>
</style>
