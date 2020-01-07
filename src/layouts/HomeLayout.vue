<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Mobistudy
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null" overlay behavior="mobile" elevated>
      <q-list no-border link inset-delimiter >
        <!--<q-list-header>Logged in as {{ name }} {{ surname }}</q-list-header>-->
        <q-item-label header>Logged in.</q-item-label>

        <q-separator />

        <q-item to="tasker">
          <q-item-section avatar>
            <q-icon color="primary" name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Daily tasks</q-item-label>
            <q-item-label caption>See upcoming tasks</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="profile">
          <q-item-section avatar>
            <q-icon color="grey" name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Edit profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="studies">
          <q-item-section avatar>
            <q-icon color="grey" name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Manage Studies</q-item-label>
            <q-item-label caption>Add or withdraw from studies</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="about">
          <q-item-section avatar>
            <q-icon color="grey" name="help" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
            <q-item-label caption>About Mobistudy</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="charting">
          <q-item-section avatar>
            <q-icon color="grey" name="directions_run" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Your Fitness</q-item-label>
            <q-item-label caption>Your data from the last week</q-item-label>
          </q-item-section>
        </q-item>
        <!--<q-item to="dev">-->
          <!--<q-item-side icon="build" />-->
          <!--<q-item-main label="Developer Panel" />-->
        <!--</q-item>-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
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
