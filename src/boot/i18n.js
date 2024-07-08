import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: navigator.language.split('-')[0], // can use this instead: https://quasar.dev/options/app-internationalization#detecting-locale
  fallbackLocale: 'en',
  globalInjection: true
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
