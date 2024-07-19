<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <img v-if="!subAbout" square src="logos/mobistudy-white.svg" style="max-width: 130px">
        <q-avatar v-if="subAbout" rounded>
          <q-btn flat dense icon-right="arrow_back" :to="{ name: 'about' }" />
        </q-avatar>

        <q-toolbar-title v-if="subAbout">
          {{ $t('layouts.about') }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="elevated">
      <q-tabs mobile-arrows narrow-indicator dense active-color="primary" class="bg-white text-grey-7 row">
        <q-route-tab class="q-px-sm col" :to="{ name: 'tasker' }" replace icon="check_box">{{
          $t('layouts.homeMenu.dailyTasks') }}
        </q-route-tab>
        <q-route-tab class="q-px-sm col" :to="{ name: 'profile' }" replace icon="account_box">{{
          $t('layouts.homeMenu.profile') }}
        </q-route-tab>
        <q-route-tab class="q-px-sm col" :to="{ name: 'studies' }" replace icon="local_library">{{
          $t('layouts.homeMenu.studies') }}
        </q-route-tab>
        <q-route-tab class="q-px-sm col" :to="{ name: 'about' }" replace icon="help">{{
          $t('layouts.homeMenu.about') }}
        </q-route-tab>
        <!--<q-route-tab
          class="q-px-sm"
          :to="{ name: 'test' }"
          icon="bug_report"
        >TEST</q-route-tab>-->
      </q-tabs>
    </q-footer>
    <q-page-container>

      <router-view v-slot="{ Component }">
        <transition :enter-active-class="slideName" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script>
import i18nCommon from '@i18n/common'

function pathToIndex (p) {
  if (p.startsWith('/tasker')) return 1
  if (p.startsWith('/profile')) return 2
  if (p.startsWith('/studies')) return 3
  if (p.startsWith('/about')) return 4
}

export default {
  name: 'HomeLayout',
  i18n: {
    messages: i18nCommon
  },
  data () {
    return {
      // tells if we are inside one of the about sections
      subAbout: false,
      slideName: 'animated slideInRight'
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
      // detect if we are inside the about section, in a sub section
      if (to.path.startsWith('/about/')) {
        this.subAbout = true
      } else {
        this.subAbout = false
      }

      const toDepth = pathToIndex(to.path)
      const fromDepth = pathToIndex(from.path)

      // if we are coming from a subsection inside about, always slide in right
      if (from.path.startsWith('/about/')) {
        this.slideName = 'animated slideInLeft'
      } else {
        this.slideName = toDepth < fromDepth ? 'animated slideInLeft' : 'animated slideInRight'
      }
    }
  }
}
</script>

<style scoped></style>
