<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-h4">Terms and Condtions</p>
        <p>
          This version of the Mobistudy is meant to be used of technical testing and to support the PAS-4YP study.
          Once you have completed the study, please delete this app.
          An official and permanent version of this app will become available in the future.
        </p>
        <div class="row justify-evenly">
          <q-btn
            class="q-ma-sm"
            label="Cancel"
            color="secondary"
            to="login"
          />
          <q-btn
            class="q-ma-sm"
            label="Accept"
            color="primary"
            to="register_pp"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'TermsAndConditons'
}
</script>

<style>
</style>
