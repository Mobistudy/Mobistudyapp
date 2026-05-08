export default {
  methods: {
    translate (messages) {
      if (messages[this.$i18n.locale]) return messages[this.$i18n.locale]
      else if (messages[this.$i18n.fallbackLocale]) return messages[this.$i18n.fallbackLocale]
      else {
        // eslint-disable-next-line no-unreachable-loop
        for (const locale in messages) {
          return messages[locale]
        }
      }
    }
  }
}
