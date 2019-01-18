<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <!--<q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >-->
      <q-toolbar color="primary">
        <q-btn   flat dense   round @click="goBack()" aria-label="Back" >
          <q-icon name="arrow_back" />
        </q-btn>

        <q-toolbar-title>
          Mobistudy
          <!--<div slot="subtitle">Running on Quasar v{{ $q.version }}</div>-->
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
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
