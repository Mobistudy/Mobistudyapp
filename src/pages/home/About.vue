<template>
  <q-page padding class="flex flex-center">
    <div class="text-h6 q-mt-lg">
      About
    </div>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">Introduction</q-item-label>
          <q-item-label caption>Mobistudy is an open iniative that allows citizens to help health research with their data. Participants download an app (iOS or Android) and, after registering and filling-in a short profile, they are proposed with research studies. If they find a study they may be interested in, they are guided through an easy-to-understand informed consent process. Upon acceptance, participants are then proposed "tasks", such as filling forms and questionnaires and provide their health data through Google Fit or Apple HealthKit.</q-item-label>
        </q-item-section>
    </q-item>
    <q-item class="q-mt-md q-mb-lg">
        <q-item-section>
          <q-item-label caption>Mobistudy is currently managed by the Internet Of Things and People research center, Malmö University.</q-item-label>
        </q-item-section>
    </q-item>
    <q-item>
      <div class="text-center">
        <div class="col-12">
          <img src="~/assets/malmo_logo.png" style="max-width:50%"/>
        </div>
      </div>
    </q-item>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">Terms and Conditions</q-item-label>
          <q-item-label caption>This is an alpha version of Mobistudy and is meant to be used for technical testing only. Please do not use this app unless you are a member of the development team of Mobistudy.</q-item-label>
        </q-item-section>
    </q-item>
    <q-item class="q-mt-md">
        <q-item-section>
          <q-item-label class="q-pb-sm">Privacy policy</q-item-label>
          <q-item-label caption><main-privacy-policy></main-privacy-policy></q-item-label>
        </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import MainPrivacyPolicy from '../../components/MainPrivacyPolicy'

export default {
  name: 'AboutPage',
  components: { MainPrivacyPolicy }
}
</script>

<style>
</style>
