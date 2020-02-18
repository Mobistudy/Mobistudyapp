<template>
  <q-layout view="lHh Lpr lFf">
    <q-item-label header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="goBack()" aria-label="Back" >
          <q-icon name="arrow_back" />
        </q-btn>

        <q-toolbar-title>
          {{ $t('layouts.task') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-item-label>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskLayout',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
