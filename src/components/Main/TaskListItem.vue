<template>
  <q-item>
    <q-item-side :icon="task.icon" />
    <q-item-main :label="task.title" :sublabel="task.main" />
    <q-item-side right :stamp="timeRemaining" />
  </q-item>
</template>

<script>
import moment from 'moment'

export default {
  // name: 'ComponentName',
  props: ['task'],
  computed: {
    timeRemaining: function () {
      return 'Due ' + moment(this.task.due).fromNow()
    }
  }
}
</script>

<style>
</style>
