<template>
  <q-page class="q-my-lg">
    <div class="mobitxt2">{{ $t('tasks.miband3.notEnoughData') }}</div>
    <q-btn @click="cancelTask" class="q-my-lg full-width mobibtn">{{ $t('common.close') }}</q-btn>
  </q-page>
</template>

<script>
import i18nMiband3 from '@i18n/tasks/miband3'

export default {
  name: 'Miband3NohataPage',
  i18n: {
    messages: i18nMiband3
  },
  methods: {
    async cancelTask () {
      this.$router.go(-1)
    }
  }
}
</script>
