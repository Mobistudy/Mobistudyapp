<template>
  <q-page padding>
    <p class="q-title q-mt-lg" style="text-align: center">
      <img src="~/assets/thank-you.svg" style="width:30vw; max-width:150px;" ><br />
    </p>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-center text-h6">
            {{ $t('consent.accepted.joined') }} {{studyDescription.generalities.title}}!
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-center text-subtitle1">
            {{ $t('consent.accepted.reminder') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.accepted.name') }}
          </q-item-label>
          <q-item-label caption>
            {{pi.name}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.accepted.institution') }}
          </q-item-label>
          <q-item-label caption>
            {{pi.institution}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.accepted.contact') }}
          </q-item-label>
          <q-item-label caption>
            {{pi.contact}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-separator inset v-if="index != studyDescription.generalities.principalInvestigators.length-1" />
    </q-list>

    <div class="q-my-lg flex flex-center">
      <q-btn class="full-width" :label="$t('consent.accepted.buttonNext')" color="primary" @click="next()"></q-btn>
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
