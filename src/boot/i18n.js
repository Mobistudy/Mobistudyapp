import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { mergeDeep } from 'modules/tools'
import studiesMessages from 'i18n/studies/studies'
import commonMessages from 'i18n/common/common'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages: mergeDeep(commonMessages, studiesMessages)
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
