<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-h4">Privacy Policy</p>
        <main-privacy-policy></main-privacy-policy>
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
            to="signup"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainPrivacyPolicy from '../../components/MainPrivacyPolicy'

export default {
  name: 'PrivacyPolicy',
  components: { MainPrivacyPolicy }
}
</script>

<style>
</style>
