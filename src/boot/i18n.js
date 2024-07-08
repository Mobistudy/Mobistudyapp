import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { mergeDeep } from '@shared/tools'
import studiesMessages from '@i18n/studies/studies'
import commonMessages from '@i18n/common/common'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: mergeDeep(commonMessages, studiesMessages)
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
