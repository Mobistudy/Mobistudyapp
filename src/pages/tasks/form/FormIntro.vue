<template>
  <q-page>
    <div class="q-pa-md">
      <div
        class="text-h5 text-center q-pb-sm q-pt-md"
        v-if="title"
      >
        {{title}}
      </div>
      <div
        class="text-justify q-mt-lg"
        v-html="description"
      >
      </div>

      <q-btn
        color="primary q-mt-xl"
        class="full-width"
        @click="start()"
        replace
        :label="$t('common.start')"
      />

    </div>
  </q-page>
</template>
<script>
import API from 'modules/API/API'
import DB from 'modules/db'

export default {
  name: 'FormIntroPage',
  props: {
    studyKey: String,
    taskId: Number,
    formKey: String
  },
  data () {
    return {
      title: '',
      description: ''
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

    this.title = formDescr.name[this.$i18n.locale]
    this.description = formDescr.description[this.$i18n.locale]
  }
}
</script>
