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
        class="text-justify q-mt-lg mobitxt1"
        v-html="description"
      >
      </div>

      <q-btn
        color="primary q-mt-xl"
        class="full-width mobibtn"
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
      description: '',
      // form name object here is kept for being passed to the next component
      formName: {}
    }
  },
  methods: {
    start () {
      this.$router.push({ name: 'form', params: { studyKey: this.studyKey, taskId: this.taskId, formKey: this.formKey, formName: this.formName } })
    }
  },
  async created () {
    const formKey = this.formKey

    try {
      let formDescr = await DB.getFormDescription(formKey)
      if (!formDescr) {
        // we need to retrieve it from the API
        this.$q.loading.show()
        formDescr = await API.getForm(formKey)
        await DB.setFormDescription(formKey, formDescr)
      }
      this.title = formDescr.name[this.$i18n.locale]
      this.description = formDescr.description[this.$i18n.locale]

      // form name is passed as a parameter to the next components
      this.formName = formDescr.name
    } catch (error) {
      console.error(error)
      this.$q.notify({
        color: 'negative',
        message: 'Cannot retrieve information for form ' + this.formKey + ', ' + error.message,
        icon: 'report_problem',
        onDismiss: () => {
          this.$router.go(-1)
        }
      })
    }
    this.$q.loading.hide()
    this.isRetrieving = false
  }
}
</script>
