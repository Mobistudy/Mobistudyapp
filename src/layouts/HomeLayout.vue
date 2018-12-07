<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Mobistudy
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Logged in as Jameson Lee</q-list-header>
        <q-item to="tasker">
          <q-item-side icon="school" />
          <q-item-main label="Clinical Study" sublabel="See upcoming events and tasks" />
        </q-item>
        <q-item to="profile">
          <q-item-side icon="account_box" />
          <q-item-main label="Profile" sublabel="Edit profile"/>
        </q-item>
        <q-item to="studies">
          <q-item-side icon="settings" />
          <q-item-main label="Manage Studies" sublabel="Add or withdraw from studies"/>
        </q-item>
        <q-item to="about">
          <q-item-side icon="help" />
          <q-item-main label="About" sublabel="Contact us"/>
        </q-item>
        <q-item to="login">
          <q-item-side icon="exit_to_app" />
          <q-item-main label="Log out" />
        </q-item>
        <q-item to="dev">
          <q-item-side icon="build" />
          <q-item-main label="Developer Panel" :sublabel="'State: ' + JSON.stringify(loggedIn)" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view @recheck-login="isLoggedIn" />
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
