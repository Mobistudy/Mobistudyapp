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
            :name="this.icon"
          />
        </q-avatar>
        <q-toolbar-title>{{ this.title }}</q-toolbar-title>
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
      slideName: '',
      title: undefined,
      icon: undefined
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
  },
  created () {
    if (this.$route.query.type === 'dataQuery') {
      this.title = this.$i18n.t('studies.tasks.dataQuery.shortTitle')
      this.icon = 'insert_chart_outlined'
    } else if (this.$route.query.type === 'form') {
      this.title = this.task.formTitle[this.$root.$i18n.locale]
      this.icon = 'format_list_bulleted'
    } else if (this.$route.query.type === 'smwt') {
      this.title = this.$i18n.t('studies.tasks.smwt.shortTitle')
      this.icon = 'directions_walk'
    } else if (this.$route.query.type === 'qcst') {
      this.title = this.$i18n.t('studies.tasks.qcst.shortTitle')
      this.icon = 'layers'
    } else if (this.$route.query.type === 'miband3') {
      this.title = this.$i18n.t('studies.tasks.miband3.shortTitle')
      this.icon = 'watch'
    }
  }
}
</script>
