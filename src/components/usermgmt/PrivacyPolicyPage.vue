<template>
  <q-page padding>
    <div class="text-h5 text-center">
      {{ $t('userMgmt.registration.privacyPolicy') }}
    </div>
    <div class="q-my-md mobitxt1" v-html="PP"></div>

    <div class="q-my-md row justify-around">
      <q-btn class="q-ma-sm mobibtn" :label="$t('common.cancel')" color="negative" to="login" replace />
      <q-btn class="q-ma-sm mobibtn" :label="$t('common.accept')" color="primary" @click="signup" />
    </div>
  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nUserMgmt from '@i18n/userMgmt'
import i18nPrivacyPolicy from '@i18n/privacyPolicy'
import { mergeDeep } from '@shared/tools.js'

export default {
  name: 'PrivacyPolicy',
  props: {
    serverId: String
  },
  data: function () {
    let privacyPolicy = ''
    if (this.serverId === 'malmo') {
      privacyPolicy = this.$t('privacyPolicyMalmo')
    } else if (this.serverId === 'ucbm') {
      privacyPolicy = this.$t('privacyPolicyUCBM')
    } else if (this.serverId === 'test') {
      privacyPolicy = this.$t('privacyPolicyTest')
    }
    return {
      PP: privacyPolicy
    }
  },
  i18n: {
    messages: mergeDeep(i18nUserMgmt, i18nPrivacyPolicy, i18nCommon)
  },
  methods: {
    signup () {
      this.$router.push({ name: 'signup', params: { serverId: this.serverId } })
    }
  }
}
</script>

<style></style>
