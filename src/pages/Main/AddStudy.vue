<template>
  <q-page padding>
    <!-- content -->
    <div v-if="config !== false">
      <q-jumbotron>
        <h2>{{ config.generalities.title }}</h2>
        <div class="q-subheading">{{ config.generalities.description}}</div>
      </q-jumbotron>
      <br />
        <table width="100%">
          <tr>
            <td>Start: {{ config.generalities.startDate }}</td>
            <td style="text-align: right">End: {{ config.generalities.endDate }}</td>
          </tr>
        </table>
      <br />
        <q-card>
          <q-card-title>
            Study Owners  <q-icon slot="right" name="contacts" />
          </q-card-title>
          <q-card-separator />
          <q-list>
            <q-collapsible v-for="(investigator, index) in config.generalities.principalInvestigators" :label="investigator.name" :investigator="investigator" :key="index">
              <div>
                {{ investigator.contact }}
              </div>
              <div>
                {{ investigator.institution }}
              </div>
            </q-collapsible>
          </q-list>
        </q-card>
      <br />
      <q-card>
        <q-card-title>
          Institutions <q-icon slot="right" name="school" />
        </q-card-title>
        <q-card-separator />
        <q-list>
          <q-collapsible v-for="(institution, index) in config.generalities.institutions" :label="institution.name" :institution="institution" :key="index">
            <div>
              {{ institution.contact }}
            </div>
          </q-collapsible>
        </q-list>
      </q-card>
      <br v-if="config.inclusionCriteria.criteriaQuestions.length !== 0" />
      <q-card v-if="config.inclusionCriteria.criteriaQuestions.length !== 0">
        <q-card-title>
          Questions <q-icon slot="right" name="ballot" />
          <span slot="subtitle">Tick if applicable</span>
        </q-card-title>
        <q-card-separator />
        <q-list>
          <q-item v-for="(question, index) in config.inclusionCriteria.criteriaQuestions" :key="index" :question="question" tag="label">
            <q-item-side>
              <q-checkbox v-model="answers.criteriaQuestions[index]" />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{ config.inclusionCriteria.criteriaQuestions[index].title }}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-card>
      <br />
      <q-card>
        <q-card-title>
          Consent <q-icon slot="right" name="done" />
          <span slot="subtitle">{{ config.consent.invitation }}</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          {{ config.consent.privacyPolicy }}
        </q-card-main>
        <q-card-separator />
        <q-card-actions align="center">
          <q-btn color="primary" label="I agree and would like to participate" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
let api = require('src/modules/API')

export default {
  data () {
    return {
      keyError: false,
      config: false,
      answers: {
        criteriaQuestions: {}
      }
    }
  },
  created () {
    let _this = this
    api.getStudyConfig(this.$route.params.key).then(function (res) {
      _this.config = res
      // Generate answer model
      for (let i = 0; i < _this.config.inclusionCriteria.criteriaQuestions.length; i++) {
        _this.$set(_this.answers.criteriaQuestions, i, false)
      }
      // TODO - CHECK INCLUSION CRITERIA
      /*
      if (inclusionCriteria !== met) {
        _this.$q.loading.hide()
        _this.$q.notify('You do not meet the criteria for this study')
        _this.keyError = true
      } else {
        _this.$q.loading.hide()
      }
       */
      _this.$q.loading.hide()
    }).catch(function (err) {
      _this.$q.loading.hide()
      _this.$q.notify(err.message)
      _this.keyError = true
    })
  },
  methods: {
  },
  watch: {
    keyError: function (val) {
      if (val) {
        this.$router.go(-1)
      }
    }
  }
  // name: 'PageName',
}
</script>

<style>
</style>
