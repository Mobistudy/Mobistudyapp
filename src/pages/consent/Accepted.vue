<template>
  <q-page padding>
    <div class="text-center">
      <img
        src="~/assets/thank-you.svg"
        style="width:30vw; max-width:150px;"
      ><br />
    </div>
    <div class="text-h5 text-center">
      {{ $t('studies.consent.accepted') }} {{ studyDescription.generalities.title[$i18n.locale] }}!
    </div>
    <div class="q-my-md text-subtitle1 text-center">
      {{ $t('studies.consent.contactReminder') }}
    </div>

    <q-list
      v-for="(pi, index) in studyDescription.generalities.principalInvestigators"
      :key="index"
    >
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.investigatorName') }}
          </q-item-label>
          <q-item-label caption>
            {{pi.name}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.institution') }}
          </q-item-label>
          <q-item-label caption>
            {{pi.institution}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.contact') }}
          </q-item-label>
          <q-item-label caption>
            {{pi.contact}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator
        class="q-mt-sm"
        v-if="index != studyDescription.generalities.principalInvestigators.length-1"
      />
    </q-list>

    <div class="q-my-md flex flex-center">
      <q-btn
        class="full-width"
        :label="$t('common.next')"
        color="primary"
        @click="next()"
      ></q-btn>
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
