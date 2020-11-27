<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      reveal
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-avatar>
          <q-icon
            color="white"
            :name="this.$route.query.icon"
          />
        </q-avatar>
        <q-toolbar-title>{{ this.$route.query.title }}</q-toolbar-title>
        <q-btn
          flat
          dense
          @click="confirm = true"
          icon-right="clear"
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
              label="Cancel"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Quit task"
              color="primary"
              v-close-popup
              @click="goBack()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <transition
        :enter-active-class="'animated ' + this.slideName"
        leave-active-class="fadeOut"
        mode="out-in"
      >
        <router-view @updateTransition="update" />
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
.text-h6,
.text-h5 {
  margin-top: 20px;
}
.block {
  margin-top: 2px;
}
</style>
