<template>
  <div class="row">
    <q-card inline style="width: 66vw; margin-left: 17vw; margin-right: 17vw">
      <q-card-title>
        <q-icon :name="task.icon" />
        {{ task.title }}
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        {{ task.main }}
      </q-card-main>
      <q-card-separator></q-card-separator>
      <q-card-actions>
        <q-btn flat color="primary" :label="task.submitText" />
      </q-card-actions>
    </q-card>
    <br />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['task']
}
</script>

<style>
</style>
