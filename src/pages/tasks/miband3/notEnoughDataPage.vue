<template>
  <q-page class="q-pa-md">
    <div class="">{{ $t('studies.tasks.miband3.notEnoughData') }}</div>
    <q-btn
      @click="cancelTask"
      class="absolute-center"
    >{{ $t('common.close')  }}</q-btn>
  </q-page>
</template>

<script>
export default {
  name: 'NotEnoughDataPage',

  methods: {
    async cancelTask () {
      this.$router.push({ name: 'tasker' })
    }
  }
}
</script>
