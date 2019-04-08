<template>
  <q-page padding>
    <div class="q-pa-lg flex flex-center">
      <p v-html="studyDescription.consent.invitation.replace(new RegExp('\n', 'g'), '<br>')"></p>
      <q-btn class="q-mt-lg" label="Next" color="primary" @click="next()"></q-btn>
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
