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
          <span class="q-ml-sm">This will terminate the current task and you will be redirected to the start page. No data will be saved. Do you really want to quit?</span>
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
    // stopTest()
      this.$router.go(-1)
    }
    //   stopTest () {
    //   this.stopTest = function () {
    //   started = false
    //   // if there were no steps, then just give zero
    //   if (positions[0].steps !== undefined && positions[0].steps === 0) {
    //     distance = 0
    //     return
    //   }

    //   // last update of the distance
    //   var selected = selectPosition(positions[0].timestamp, 10) // for the last sample, let's try to focus on the last 10 seconds
    //   if (!selected) { // if there is no candidate for selection, well, then just use the last one
    //     selected = positions[0]
    //   }
    //   if (selected.timestamp !== selectedPositions[0].timestamp) { // it may happen that it was already selected
    //     distance += crowDist(selectedPositions[0], selected)
    //     selectedPositions.unshift(selected)
    //   }
    // }
    //  }
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
