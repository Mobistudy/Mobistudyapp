<template>
  <q-page class="flex flex-center">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-center q-pb-md">Terms and Condtions</q-item-label>
          <q-item-label caption>This version of the Mobistudy is meant to be used of technical testing and to support the PAS-4YP study.
          Once you have completed the study, please delete this app.
          An official and permanent version of this app will become available in the future.</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row justify-evenly">
        <q-btn class="q-ma-sm" label="Cancel" color="secondary" to="login" />
        <q-btn class="q-ma-sm" label="Accept" color="primary" to="register_pp" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

export default {
  name: 'TermsAndConditons'
}
</script>

<style>
</style>
