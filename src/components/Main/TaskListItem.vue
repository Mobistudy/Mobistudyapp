<template>
  <q-item>
    <q-item-side :icon="task.icon" />
    <q-item-main :label="task.title" :sublabel="task.main" />
    <q-item-side right stamp="3 days remaining" />
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['task']
}
</script>

<style>
</style>
