<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round @click="goBack()" aria-label="Back">
          <q-icon name="arrow_back" />
        </q-btn>
        <q-toolbar-title>
          {{ $t('layouts.registration') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import i18nCommon from '@i18n/common'

export default {
  name: 'RegLayout',
  i18n: {
    messages: i18nCommon
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
