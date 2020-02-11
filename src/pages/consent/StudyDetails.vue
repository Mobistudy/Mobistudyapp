<template>
  <q-page padding>
    <q-list class="flex flex-center">
      <q-item>
        <q-item-label class="text-h5">
          {{ $t('consent.studyDetails.headline')}}
        </q-item-label>
      </q-item>
    </q-list>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6">
            {{ $t('consent.studyDetails.studyHeadline')}}:<br />{{studyDescription.generalities.title}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label v-html="studyDescription.generalities.longDescription.replace(new RegExp('\n', 'g'), '<br>')">
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle1">
            {{ $t('consent.studyDetails.investigatorListHeadline')}}:
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index+ 'pi'">
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.studyDetails.name')}}:
          </q-item-label>
          <q-item-label caption>
            {{pi.name}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.studyDetails.institution')}}:
          </q-item-label>
          <q-item-label caption>
            {{pi.institution}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.studyDetails.contact')}}:
          </q-item-label>
          <q-item-label caption>
            {{pi.contact}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset v-if="index != studyDescription.generalities.principalInvestigators.length-1" />
    </q-list>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle1 q-mt-md">
            {{ $t('consent.studyDetails.involvedInstitutions')}}:
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list v-for="(institution, index) in studyDescription.generalities.institutions" :key="index + 'in'">
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.studyDetails.institutionName')}}:
          </q-item-label>
          <q-item-label caption>
            {{institution.name}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('consent.studyDetails.institutionContact')}}:
          </q-item-label>
          <q-item-label caption>
            {{institution.contact}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.dataAccess == 'anonymised'">
        <q-item-section>
          <q-item-label>{{ $t('consent.studyDetails.dataAccess.anonymised')}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.dataAccess == 'no'">
        <q-item-section>
          <q-item-label>{{ $t('consent.studyDetails.dataAccess.no')}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.dataAccess == 'full'">
        <q-item-section>
          <q-item-label>{{ $t('consent.studyDetails.dataAccess.full')}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.reasonForDataAccess">
        <q-item-section>
          <q-item-label>{{ $t('consent.studyDetails.dataAccess.reasonHeadline')}}:</q-item-label>
          <q-item-label caption>{{institution.reasonForDataAccess}}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator class="q-my-md" inset v-if="index != studyDescription.generalities.institutions.length-1"/>

    </q-list>

    <div class="q-my-md flex flex-center">
      <q-btn class="full-width q-mt-sm q-mb-lg" :label="$t('consent.studyDetails.buttonNext')" @click="next()"></q-btn>
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
