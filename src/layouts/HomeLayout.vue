<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ $t('layouts.home') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null" overlay behavior="mobile" elevated>
      <q-list no-border link inset-delimiter >

        <q-item to="tasker">
          <q-item-section avatar>
            <q-icon color="primary" name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('layouts.homeMenu.dailyTasks') }}</q-item-label>
            <q-item-label caption>{{ $t('layouts.homeMenu.dailyTasksAction') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="profile">
          <q-item-section avatar>
            <q-icon color="grey" name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('layouts.homeMenu.profile') }}</q-item-label>
            <q-item-label caption>{{ $t('layouts.homeMenu.profileAction') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="studies">
          <q-item-section avatar>
            <q-icon color="grey" name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('layouts.homeMenu.studies') }}</q-item-label>
            <q-item-label caption>{{ $t('layouts.homeMenu.studiesAction') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="about">
          <q-item-section avatar>
            <q-icon color="grey" name="help" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('layouts.homeMenu.about') }}</q-item-label>
            <q-item-label caption>{{ $t('layouts.homeMenu.aboutAction') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="test">
          <q-item-section avatar>
            <q-icon color="grey" name="bug_report" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TEST</q-item-label>
            <q-item-label caption>Test page</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

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
