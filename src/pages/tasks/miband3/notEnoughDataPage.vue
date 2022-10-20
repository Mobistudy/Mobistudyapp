<template>
  <q-page class="q-my-lg">
    <div class="mobitxt2">{{ $t('studies.tasks.miband3.notEnoughData') }}</div>
    <q-btn
      @click="cancelTask"
      class="q-my-lg full-width mobibtn"
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
