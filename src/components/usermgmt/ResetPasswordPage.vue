<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <div class="text-h4">{{ $t('userMgmt.resetPassword.resetPassword') }}</div>
        <q-form ref="resetPWForm">
          <div style="width: 90vw">
            <q-input v-model="email" type="email" :label="$t('userMgmt.email')" autocomplete="on" :rules="emailRules">
              <template v-slot:prepend>
                <q-icon name="mail_outline" />
              </template>
            </q-input>

            <q-select v-model="server" :options="serverOptions" emit-value map-options :label="$t('userMgmt.server')"
              :rules="[val => !!val || $t('userMgmt.serverRequiredError')]">
              <template v-slot:prepend>
                <q-icon name="domain" />
              </template>
            </q-select>

            <div class="row fit justify-around q-mt-lg">
              <q-btn class="mobibtn" :label="$t('common.cancel')" color="secondary" @click="$router.push('login')" />

              <q-btn class="mobibtn" :label="$t('userMgmt.resetPassword.resetPassword')" color="primary" type="submit"
                @click="submit" :loading="resetting" />
            </div>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mergeDeep } from '@shared/tools'
import i18nCommon from '@i18n/common'
import i18nUserMgmt from '@i18n/userMgmt'

import API from '@shared/API'

import { patterns } from 'quasar'
const { testPattern } = patterns

export default {
  name: 'ResetPasswordPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nUserMgmt)
  },
  data () {
    return {
      resetting: false,
      email: null,
      emailRules: [
        val => !!val || this.$t('userMgmt.emailRequiredError'),
        val => testPattern.email(val) || this.$t('userMgmt.emailRequiredError')
      ],
      server: '',
      serverOptions: []
    }
  },
  async created () {
    this.resetting = false
    this.serverOptions = API.getServersList().map((opt) => {
      return {
        label: opt.names[this.$root.$i18n.locale],
        value: opt.url
      }
    })
  },
  methods: {
    async submit () {
      const valid = await this.$refs.resetPWForm.validate(true)
      if (valid) {
        try {
          this.resetting = true
          // set the server URL
          API.setBaseUrl(this.server)
          // send request for pw reset
          await API.resetPW(this.email.toLowerCase())
          this.$router.push({ name: 'changepw', params: { email: this.email } })
          this.resetting = false
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            message: this.$i18n.t('userMgmt.resetPassword.resetPasswordError') + ': ' + error.message,
            icon: 'report_problem'
          })
        }
      } else {
        this.$q.notify(this.$i18n.t('errors.correctFields'))
      }
    }
  }
}
</script>
