<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          {{ $t('layouts.home') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="elevated">
      <q-tabs mobile-arrows narrow-indicator dense active-color="secondary" class="bg-white text-black">
        <q-route-tab class="q-px-sm" to="tasker" icon="check_box">{{ $t('layouts.homeMenu.dailyTasks') }}</q-route-tab>
        <q-route-tab class="q-px-sm" to="profile" icon="account_box" >{{ $t('layouts.homeMenu.profile') }}</q-route-tab>
        <q-route-tab class="q-px-sm" to="studies" icon="settings">{{ $t('layouts.homeMenu.studies') }}</q-route-tab>
        <q-route-tab class="q-px-sm" to="about" icon="help">{{ $t('layouts.homeMenu.about') }}</q-route-tab>
        <q-route-tab class="q-px-sm" to="test" icon="bug_report">TEST</q-route-tab>
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'HomeLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
