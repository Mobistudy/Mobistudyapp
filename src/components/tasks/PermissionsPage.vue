<template>
  <q-page class="q-my-lg">
    <div class="mobitxt2">{{ $t('tasks.miband3.notEnoughData') }}</div>
    <q-btn @click="cancelTask" class="q-my-lg full-width mobibtn">{{ $t('common.close') }}</q-btn>
  </q-page>
</template>

<script>

tasks.miband3.OSpermissioniOS

export default {
  name: 'Miband3NohataPage',
  props: ['studyKey', 'taskId', 'taskType'],
  methods: {
    async cancelTask () {
      this.$router.go(-1)
    }
  }
}
</script>
