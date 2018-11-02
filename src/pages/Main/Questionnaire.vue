<template>
  <q-page padding>
    Hi
    <!-- content -->
  </q-page>
</template>

<script>
// let mobistudyAPI = require('src/modules/mobistudyAPI')
import * as mobistudyAPI from 'src/modules/mobistudyAPI'

export default {
  // name: 'PageName',
  data () {
    return {
      questionnaire: {}
    }
  },
  created () {
    let _this = this
    mobistudyAPI.getQuestionnaire(this.$route.params.key).then(function (questionnaireObject) {
      _this.questionnaire = questionnaireObject
    }).catch(function (error) {
      alert(error)
      // this.$router.go(-1)
    })
  }
}
</script>

<style>
</style>
