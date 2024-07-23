<template>
  <div>
    <div class="text-h6 text-center">
      {{ studyDescription.generalities.title[$i18n.locale] }}
    </div>
    <q-separator class="q-my-md" />
    <div class="mobitxt1" v-html="studyDescription.generalities.longDescription[$i18n.locale]">
    </div>
    <q-separator class="q-my-md" />
    <div class="text-subtitle1">
      {{ $t('studies.principalInvestigators') }}:
    </div>
    <q-list v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('studies.investigatorName') }}:</q-item-label>
          <q-item-label caption>{{ pi.name }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('studies.institution') }}:</q-item-label>
          <q-item-label caption>{{ pi.institution }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('studies.contact') }}:</q-item-label>
          <q-item-label caption>{{ pi.contact }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="q-mt-sm" v-if="index != studyDescription.generalities.principalInvestigators.length - 1" />
    </q-list>

    <q-separator class="q-my-md" />

    <div class="text-subtitle1 q-mt-md">
      {{ $t('studies.institutions') }}:
    </div>

    <q-list v-for="(institution, index) in studyDescription.generalities.institutions" :key="index + 'in'">
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.institution') }}:
          </q-item-label>
          <q-item-label caption>
            {{ institution.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.contact') }}:
          </q-item-label>
          <q-item-label caption>
            {{ institution.contact }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.dataAccess == 'anonymised'">
        <q-item-section>
          <q-item-label>{{ $t('studies.dataAccess.anonymised') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.dataAccess == 'no'">
        <q-item-section>
          <q-item-label>{{ $t('studies.dataAccess.noAccess') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.dataAccess == 'full'">
        <q-item-section>
          <q-item-label>{{ $t('studies.dataAccess.full') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="institution.reasonForDataAccess">
        <q-item-section>
          <q-item-label>{{ $t('studies.dataAccess.reason') }}:</q-item-label>
          <q-item-label caption>{{ institution.reasonForDataAccess[$i18n.locale] }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator class="q-my-md" inset v-if="index != studyDescription.generalities.institutions.length - 1" />

    </q-list>
  </div>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

export default {
  name: 'StudyInfo',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  props: {
    studyDescription: {
      type: Object,
      required: true
    }
  }
}
</script>
