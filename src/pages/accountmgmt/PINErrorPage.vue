<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <div style="text-align: center">
          <img
            class="q-mb-sm"
            style="width:40vw; max-width:150px"
            src="/statics/warning-24px.svg"
          />
          <div class="text-body1 q-mt-xl">
            <h6 class="text-h6">{{ $t('pin.bugTitle') }}</h6>
            <p class="q-mb-lg"> {{ $t('pin.bugMessage') }}</p>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  created () {
    console.log('PINErrorPage created...')
  }
}
</script>
