<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      reveal
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="cancel()"
          aria-label="Back"
        >
          <q-icon name="arrow_back" />
        </q-btn>
        <q-toolbar-title>
          {{ $t('layouts.consent') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskLayout',
  methods: {
    cancel () {
      this.$router.push({ name: 'studies' })
    }
  }
}
</script>

<style>
</style>
