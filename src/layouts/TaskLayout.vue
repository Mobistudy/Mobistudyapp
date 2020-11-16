<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      reveal
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar id="tasker">
        <q-btn
          flat
          dense
          @click="confirm = true"
          icon-right="clear"
          :label="$t('layouts.close')"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-dialog
        v-model="confirm"
        persistent
      >
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              size="lg"
            />
            <span class="q-ml-sm">{{ $t('studies.tasks.cancelTask') }}</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Quit task"
              color="primary"
              v-close-popup
              @click="goBack()"
            />
            <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <transition
        :enter-active-class="'animated ' + this.slideName"
        leave-active-class="fadeOut"
        mode="out-in"
      >
        <router-view @updateTransition="update"/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskLayout',
  data () {
    return {
      confirm: false,
      slideName: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
    },
    update (transition) {
      setTimeout(() => {
        this.slideName = transition
      }, 10)
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
.q-avatar {
  margin: 0px 0px 5px 5px;
}
.block {
  margin-top: 2px;
}
</style>
