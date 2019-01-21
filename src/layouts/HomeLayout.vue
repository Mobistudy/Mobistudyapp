<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Mobistudy
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null">
      <q-list no-border link inset-delimiter >
        <q-list-header>Logged in as {{ name }} {{ surname }}</q-list-header>
        <q-item to="tasker">
          <q-item-side icon="school" />
          <q-item-main label="Daily tasks" sublabel="See upcoming tasks" />
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
          <q-item-main label="About" sublabel="About Mobistudy"/>
        </q-item>
        <q-item to="dev">
          <q-item-side icon="build" />
          <q-item-main label="Developer Panel" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import userinfo from '../modules/userinfo'

export default {
  name: 'HomeLayout',
  data () {
    return {
      name: userinfo.user.name,
      surname: userinfo.user.surname,
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
