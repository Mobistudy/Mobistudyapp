<template>
  <q-page padding>
    <p class="text-h6 text-center q-pt-md">{{$t('about.acknowledgements')}}</p>
    <div v-html="$t('about.acknowledgementsFull')"></div>
  </q-page>
</template>

<script>
export default {
  name: 'Acknowledgements'
}
</script>

<style>
</style>
