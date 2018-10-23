<template>
  <q-item>
    <q-item-main :label="study.name" :sublabel="'End Date: ' + study.endDate" />
    <q-item-side right>
      <q-btn flat round dense icon="more_vert">
        <q-popover>
          <q-list link>
            <q-item v-close-overlay>
              <q-item-main class="text-negative" label="Withdraw from Study" />
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
