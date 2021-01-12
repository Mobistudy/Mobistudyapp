<template>
  <q-page>
    <Intro
      v-bind:slides="$t('studies.tasks.form.introductionSlides')"
      v-on:start="start()"
    >
      <template v-slot:slide-0>
        <div class="text-center text-h5">
          {{introduction.title[$i18n.locale]}}
        </div>
        <div class="text-center text-body1 q-mt-lg">
          <div v-html="introduction.description[$i18n.locale]"></div>
        </div>
      </template>
    </Intro>
  </q-page>
</template>
<script>
import Intro from 'components/Intro.vue'
import API from 'modules/API'
import DB from 'modules/db'
export default {
  data () {
    return {
      introduction: {
        title: '',
        description: ''
      }
    }
  },
  components: {
    Intro
  },
  props: {
    studyKey: String,
    taskId: Number,
    formKey: String
  },
  methods: {
    start () {
      const studyKey = this.studyKey
      const taskId = this.taskId
      const formKey = this.formKey
      console.log('StudyKey ' + studyKey + ',taskId ' + taskId, 'formKey:', formKey)

      this.$router.push({ name: 'form', params: { studyKey: studyKey, taskId: taskId, formKey: formKey } })
      this.$emit('updateTransition', 'fadeInDown')
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

    this.introduction = {
      title: formDescr.name,
      description: formDescr.description
    }
  }
}
</script>
