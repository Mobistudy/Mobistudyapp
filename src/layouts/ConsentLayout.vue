<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="cancel()" aria-label="Back" >
          <q-icon name="arrow_back" />
        </q-btn>

        <q-toolbar-title>
          New study
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

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
