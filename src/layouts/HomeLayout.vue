<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      reveal
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-avatar rounded>
          <img src="icons/favicon-128x128.png">
        </q-avatar>
        <q-toolbar-title>
          {{ $t('layouts.home') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer
      bordered
      class="elevated"
    >
      <q-tabs
        mobile-arrows
        narrow-indicator
        dense
        active-color="secondary"
        class="bg-white text-grey-7 row"
      >
        <q-route-tab
          class="q-px-sm col"
          :to="{ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true, pathIndex: 1 } }"
          icon="check_box"
        >{{ $t('layouts.homeMenu.dailyTasks') }}
        </q-route-tab>
        <q-route-tab
          class="q-px-sm col"
          :to="{ name: 'profile', params: { pathIndex: 2 } }"
          icon="account_box"
        >{{ $t('layouts.homeMenu.profile') }}
        </q-route-tab>
        <q-route-tab
          class="q-px-sm col"
          :to="{ name: 'studies', params: { pathIndex: 3 } }"
          icon="local_library"
        >{{ $t('layouts.homeMenu.studies') }}
        </q-route-tab>
        <q-route-tab
          class="q-px-sm col"
          :to="{ name: 'about', params: { pathIndex: 4 } }"
          icon="help"
        >{{ $t('layouts.homeMenu.about') }}
        </q-route-tab>
        <!--<q-route-tab
          class="q-px-sm"
          :to="{ name: 'test', params: { pathIndex: 5 } }"
          icon="bug_report"
        >TEST</q-route-tab>-->
      </q-tabs>
    </q-footer>
    <q-page-container>
      <transition
        :enter-active-class="'animated ' + this.slideName"
        mode="out-in"
      >
        <router-view @updateTransition="update"></router-view>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'HomeLayout',
  data () {
    return {
      leftDrawerOpen: false,
      slideName: ''
    }
  },
  methods: {
    update (transition) {
      setTimeout(() => {
        this.slideName = transition
      }, 10)
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.params.pathIndex
      const fromDepth = from.params.pathIndex
      this.slideName = toDepth < fromDepth ? 'slideInLeft' : 'slideInRight'
    }
  }
}
</script>

<style scoped>
</style>
