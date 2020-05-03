<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar id="tasker">
        <q-toolbar-title>
          {{ $t('layouts.close') }}
        </q-toolbar-title>
        <q-btn flat dense round @click="confirm = true" aria-label="Close">
          <q-icon name="clear" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">{{ $t('studies.tasks.cancelTask') }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Quit task" color="primary" v-close-popup @click="goBack()" />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskLayout',
  data () {
    return {
      confirm: false
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'tasker' })
    }
  }
}
</script>

<style>
#tasker {
  justify-content: flex-end;
}
.q-toolbar__title {
  flex: none;
}
</style>
