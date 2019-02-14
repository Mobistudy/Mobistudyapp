<template>
  <q-page padding class="flex flex-center">
    <div class="q-title">
      Introduction
    </div>
    <p>
      Mobistudy is an open iniative that allows citizens to help health research
      with their data.
      Participants download an app (iOS or Android) and, after registering and filling-in
      a short profile, they are proposed with research studies.
      If they find a study they may be interested in, they are guided through an
      easy-to-understand informed consent process.
      Upon acceptance, participants are then proposed "tasks", such as filling forms
      and questionnaires and provide their health data through Google Fit or Apple HealthKit.
    </p>
    <p>
      Mobistudy is currently managed by the Institute of Biomedical Engineering,
      University of Oxford.
    </p>
    <div class="text-center q-mb-lg">
      <img src="~assets/oxforduni_logo.png" />
    </div>
    <div class="q-title">
      Terms and conditions
    </div>
    <p>
      This is an alpha version of Mobistudy and is meant to be used for technical
      testing only. Please do not use this app unless you are a member of the
      development team of Mobistudy.
    </p>
    <div class="q-title">
      Privacy policy
    </div>
    <main-privacy-policy></main-privacy-policy>
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
