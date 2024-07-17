<template>
  <q-page padding>
    <div class="text-center">
      <img src="~/assets/thank-you.svg" style="width:30vw; max-width:150px;"><br />
    </div>
    <div class="text-h5 text-center">
      {{ $t('studies.consent.accepted') }} {{ studyDescription.generalities.title[$i18n.locale] }}!
    </div>
    <div class="q-my-md mobitxt1 text-center">
      {{ $t('studies.consent.contactReminder') }}
    </div>

    <q-list v-for="(pi, index) in studyDescription.generalities.principalInvestigators" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.investigatorName') }}
          </q-item-label>
          <q-item-label caption>
            {{ pi.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.institution') }}
          </q-item-label>
          <q-item-label caption>
            {{ pi.institution }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ $t('studies.contact') }}
          </q-item-label>
          <q-item-label caption>
            {{ pi.contact }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="q-mt-sm" v-if="index != studyDescription.generalities.principalInvestigators.length - 1" />
    </q-list>

    <div class="q-my-md flex flex-center">
      <q-btn class="full-width mobibtn" :label="$t('common.next')" color="primary" @click="next()"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nStudies from '@i18n/studies'

import session from '@shared/session'

export default {
  name: 'AcceptedPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies)
  },
  data () {
    return {
      studyDescription: {}
    }
  },
  async created () {
    const sd = session.getStudyDescription()
    if (!sd) {
      this.$router.push({ name: 'tasker' })
    } else {
      this.studyDescription = sd
    }
  },
  methods: {
    next () {
      session.removeStudyDescription()
      this.$router.push({ name: 'tasker' })
    }
  }
}
</script>

<style></style>
