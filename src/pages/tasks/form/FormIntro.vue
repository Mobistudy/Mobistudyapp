<template>
  <q-page>
    <Intro
      :introductionSlides="introSlides"
      v-on:start="start()"
    >
    </Intro>
  </q-page>
</template>
<script>
import Intro from 'components/Intro.vue'
import API from 'modules/API/API'
import DB from 'modules/db'

export default {
  name: 'FormIntroPage',
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number,
    formKey: String
  },
  data () {
    return {
      introSlides: [
        {
          title: '',
          description: ''
        }
      ]
    }
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      const formKey = this.formKey

      this.$router.push({ name: 'form', params: { studyKey: studyKey, taskId: taskId, formKey: formKey } })
    }
  },
  async created () {
    const formKey = this.formKey

    let formDescr = await DB.getFormDescription(formKey)
    if (!formDescr) {
      // we need to retrieve it from the API
      this.$q.loading.show()
      formDescr = await API.getForm(formKey)
      await DB.setFormDescription(formKey, formDescr)
      this.$q.loading.hide()
    }

    this.introSlides[0].title = formDescr.name[this.$i18n.locale]
    this.introSlides[0].description = formDescr.description[this.$i18n.locale]
  }
}
</script>
