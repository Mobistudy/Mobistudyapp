<template>
  <q-page padding>
    <!-- content -->
    <p>6MWT</p>
  </q-page>
</template>

<script>
export default {
  name: 'DataQueryPage',
  components: { },
  data: function () {
    return {
      task: {},
      taskDescr: {},
      chartData: null,
      chartOptions: null,
      healthData: null,
      plotLine: false,
      plotBar: false,
      loading: false
    }
  }
}
</script>

<style>
</style>
