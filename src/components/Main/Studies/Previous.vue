<template>
  <q-item>
    <q-item-main :label="study.config.generalities.title" :sublabel="'Ended: ' + endDate" />
    <q-item-side right>
      <q-btn flat round dense icon="more_vert">
        <q-popover>
          <q-list link>
            <q-item v-close-overlay>
              <q-item-main label="Hide" />
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-item-side>
  </q-item>
</template>

<script>
let moment = require('moment')

export default {
  // name: 'ComponentName',
  props: ['study'],
  computed: {
    endDate: function () {
      return moment(this.study.config.generalities.endDate).format('DD/MM/YYYY')
    }
  }
}
</script>

<style>
</style>
