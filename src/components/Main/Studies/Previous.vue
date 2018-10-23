<template>
  <q-item>
    <q-item-main :label="study.name" :sublabel="'Ended: ' + study.endDate" />
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
export default {
  // name: 'ComponentName',
  props: ['study']
}
</script>

<style>
</style>
