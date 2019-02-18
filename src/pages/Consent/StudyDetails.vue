<template>
  <q-page padding>
    <p class="flex flex-center q-headline">
      Study details
    </p>
    <p class="q-title">
      Title of this study: {{studyDescription.generalities.title}}
    </p>
    <p class="q-subheading">
      {{studyDescription.generalities.longDescription}}
    </p>

    <div class="q-my-lg">
      <div class="q-title">
        Principal investigators:
      </div>
      <div class="q-my-sm" v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
        <div class="q-mb-sm row">
          <div class="col-4">
            Name:
          </div>
          <div class="col">
            {{pi.name}}
          </div>
        </div>
        <div class="q-mb-sm row">
          <div class="col-4">
            Institution:
          </div>
          <div class="col">
            {{pi.institution}}
          </div>
        </div>
        <div class="q-mb-sm row">
          <div class="col-4">
            Contact details:
          </div>
          <div class="col">
            {{pi.contact}}
          </div>
        </div>
        <q-card-separator v-if="index != studyDescription.generalities.principalInvestigators.length-1" />
      </div>
    </div>

    <div class="q-my-lg">
      <div class="q-title">
        Involved institutions:
      </div>
      <div class="q-my-sm" v-for="(institution, index) in studyDescription.generalities.institutions" :key="index">
        <div class="q-mb-sm row">
          <div class="col-4">
            Name:
          </div>
          <div class="col">
            {{institution.name}}
          </div>
        </div>
        <div class="q-mb-sm row">
          <div class="col-4">
            Contact details:
          </div>
          <div class="col">
            {{institution.contact}}
          </div>
        </div>
        <div class="q-mb-sm row">
          <div v-if="institution.dataAccess == 'anonymised'">
            This institution will have access to your data in an anonymised way.
          </div>
          <div v-if="institution.dataAccess == 'no'">
            This institution will not have access to your data.
          </div>
          <div v-if="institution.dataAccess == 'full'">
            This institution will have full access to your data.
          </div>
          <div>
            Reason For Data Access': {{institution.reasonForDataAccess}}
          </div>
        </div>
        <q-card-separator v-if="index != studyDescription.generalities.institutions.length-1"/>
      </div>
    </div>
    <div class="q-my-md flex flex-center">
      <q-btn label="Next" @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'StudyDetailsPage',
  props: ['studyDescription'],
  methods: {
    next () {
      this.$router.push({ name: 'privacyPolicy', params: { studyDescription: this.studyDescription } })
    }
  }
}
</script>

<style>
</style>
