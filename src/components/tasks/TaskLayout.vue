<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense @click="confirm = true" aria-label="Back">
          <q-icon name="arrow_back" />
        </q-btn>

        <q-avatar>
          <q-icon color="white" :name="this.icon" />
        </q-avatar>
        <q-toolbar-title>{{ this.title }}</q-toolbar-title>
        <!-- <q-btn flat dense @click="confirm = true" icon-right="clear" /> -->
      </q-toolbar>

    </q-header>
    <q-page-container>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="negative" text-color="white" size="lg" />
            <span class="q-ml-sm mobitxt1">{{ $t('studies.tasks.cancelTask') }}</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" v-close-popup>
              {{ $t('studies.tasks.cancelTaskLabel') }}
            </q-btn>
            <q-btn flat color="primary" v-close-popup @click="goBack()">
              {{ $t('studies.tasks.quitTaskLabel') }}
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <router-view v-slot="{ Component }">
        <transition :enter-active-class="'animated ' + this.slideName" leave-active-class="fadeOut" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script>
import i18nStudies from '@i18n/studies'

export default {
  name: 'TaskLayout',
  i18n: {
    messages: i18nStudies
  },
  data () {
    return {
      confirm: false,
      slideName: '',
      title: undefined,
      icon: undefined
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    update (transition) {
      setTimeout(() => {
        this.slideName = transition
      }, 10)
    }
  },
  created () {
    this.title = this.$route.query.title
    this.icon = this.$route.query.icon
  }
}
</script>
