<template>
  <q-page padding>

    <div class="text-center text-h6 q-mt-md">
      {{ $t('tasks.form.formCompleted') }}
    </div>
    <table class="summaryTable q-my-lg">
      <tbody>
        <tr>
          <td>{{ $t('tasks.form.askedQuestions') }}</td>
          <td> {{ asked }} </td>
        </tr>
        <tr>
          <td>{{ $t('tasks.form.answeredQuestions') }}</td>
          <td> {{ answered }} </td>
        </tr>

        <tr v-for="(value, key) in summaryFunctionValues" :key="key">
          <td>{{ key }}:</td>
          <td> {{ value }} </td>
        </tr>
      </tbody>
    </table>
    <div class="row justify-around q-mt-xl">
      <q-btn class="mobibtn" color="negative" :loading="sending" :label="$t('common.discard')" @click="discard()" />
      <q-btn class="mobibtn" color="primary" @click="send()" :loading="sending" :label="$t('common.send')" />
    </div>

  </q-page>
</template>

<script>
import i18nStudies from '@i18n/studies'
import i18nCommon from '@i18n/common'
import i18nForm from '@i18n/tasks/form'
import { mergeDeep } from '@shared/tools.js'

import API from '@shared/API'
import DB from '@shared/db'
import session from '@shared/session'

export default {
  name: 'FormSummaryPage',
  data: function () {
    return {
      sending: false,
      asked: undefined,
      answered: undefined,
      summaryFunctionValues: {}
    }
  },
  i18n: {
    messages: mergeDeep(i18nCommon, i18nStudies, i18nForm)
  },
  async created () {
    const report = session.getTaskReport()
    const formDescr = await DB.getFormDescription(report.formKey)

    this.asked = report.summary.asked
    this.answered = report.summary.answered

    // compute the summary values
    if (formDescr.summaryFunction && formDescr.summaryFunction !== '') {
      try {
        // eslint-disable-next-line no-new-func
        const summaryFun = new Function('answers', '"use strict";' + formDescr.summaryFunction)

        const summary = summaryFun(report.data)

        for (const summaryField in summary) {
          // add the field value to the report
          report.summary[summaryField] = summary[summaryField]

          // translate the summary field for view
          const fieldNames = formDescr.summaryFunctionDescription[summaryField].name
          const fieldNamesTranslated = fieldNames[this.$i18n.locale]

          if (formDescr.summaryFunctionDescription[summaryField].type === 'category') {
            // translate the category
            const categoryName = formDescr.summaryFunctionDescription[summaryField].categories[summary[summaryField]].name
            const categoryNameTranslated = categoryName[this.$i18n.locale]
            this.summaryFunctionValues[fieldNamesTranslated] = categoryNameTranslated
          } else if (typeof summary[summaryField] === 'number') {
            this.summaryFunctionValues[fieldNamesTranslated] = summary[summaryField].toFixed(1)
          } else {
            // add value as is
            this.summaryFunctionValues[fieldNamesTranslated] = summary[summaryField]
          }
        }
      } catch (e) {
        console.error('Error computing summary values', e)
      }
    }
  },
  methods: {

    async send () {
      this.sending = true

      const report = session.getTaskReport()
      report.discarded = false

      try {
        await API.sendTasksResults(report)
        await DB.setTaskCompletion(
          report.studyKey,
          report.taskId,
          new Date()
        )
        this.sending = false

        this.$router.go(-1)
      } catch (error) {
        this.sending = false
        console.error('Error sending tasks results', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
    },
    async discard () {
      this.$router.go(-1)
    }
  }
}
</script>
