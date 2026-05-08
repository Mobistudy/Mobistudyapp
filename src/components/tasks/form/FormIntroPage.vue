<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h5 text-center q-pb-sm q-pt-md" v-if="title">
        {{ title }}
      </div>
      <div class="text-justify q-mt-lg mobitxt1" v-html="description">
      </div>

      <q-btn color="primary q-mt-xl" class="full-width mobibtn" @click="start()" replace :label="$t('common.start')" />

    </div>
  </q-page>
</template>
<script>
import API from '@shared/API'
import DB from '@shared/db'
import translateMixin from '@shared/mixins/translate'

export default {
  name: 'FormIntroPage',
  mixins: [translateMixin],
  props: {
    studyKey: String,
    taskId: String,
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
      this.$router.replace({ name: 'form', params: { studyKey: this.studyKey, taskId: this.taskId, formKey: this.formKey } })
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
      this.title = this.translate(formDescr.name)
      this.description = this.translate(formDescr.description)
    } catch (error) {
      console.error('Error loading form description', error)
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
