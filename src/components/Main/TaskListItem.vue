<template>
  <q-item :to="toAddress">
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
    },
    toAddress: function () {
      if (this.task.formKey) {
        return 'questionnaire/' + this.task.formKey
      } else if (this.task.dataConfig) {
        return 'dataQuery/' + this.task.dataConfig
      }
    }
  }
}
</script>

<style>
</style>
