<template>
  <q-page padding>
    <div class="q-my-md" style="white-space: pre-line;">{{ studyDescription.consent.privacyPolicy[$i18n.locale] }}</div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-mt-lg full-width" :label="$t('common.next')" color="primary" @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'InvitationPage',
  props: ['studyDescription'],
  methods: {
    next () {
      this.$router.push({ name: 'studyDetails', params: { studyDescription: this.studyDescription } })
    }
  }
}
</script>

<style>
</style>
