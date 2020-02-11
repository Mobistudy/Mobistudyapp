<template>
  <q-page padding class="flex flex-center">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-center" v-html="studyDescription.consent.invitation.replace(new RegExp('\n', 'g'), '<br>')"></q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-btn class="q-mt-lg full-width" :label="$t('consent.invitation.buttonNext')" color="primary" @click="next()"></q-btn>
      </q-item>
    </q-list>
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
