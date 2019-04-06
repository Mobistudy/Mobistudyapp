<template>
  <q-page padding>
    <p class="q-title" style="text-align: center">
      <img src="statics/icons/thank-you.svg" style="width:30vw; max-width:150px;" ><br />
      You've just joined {{studyDescription.generalities.title}} !
    </p>
    <p class="q-subheading">
      Remember, you can always contact the principal investigators at:
    </p>
    <div class="q-my-lg">
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

    <div class="q-my-md flex flex-center">
      <q-btn label="Next" color="primary" @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'StudyDetailsPage',
  props: ['studyDescription'],
  methods: {
    next () {
      this.$router.push({ name: 'tasker', params: { rescheduleTasks: true, checkNewStudies: true } })
    }
  }
}
</script>

<style>
</style>
