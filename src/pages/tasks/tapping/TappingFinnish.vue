<template>
  <q-page padding>
    <q-item-section id="tappingData">
      <h6>Finished task</h6>
      <p>
        <i></i>
      </p>
<!--      <q-input-->
<!--        outlined-->
<!--        v-model="heartRate"-->
<!--        label="Heart rate"-->
<!--        type="number"-->
<!--      />-->
<!--      <q-btn-->
<!--        color="primary"-->
<!--        @click="completeTest()"-->
<!--        :label="$t('common.next')"-->
<!--        class="q-mt-md"-->
<!--      />-->
    </q-item-section>
  </q-page>
</template>

<script>
export default {
  name: 'TappingFinishPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      tappingData: undefined
    }
  },
  methods: {
    completeTest () {
      const report = this.report
      this.report.counter = this.counter

      this.$router.push({ name: 'tappingSummary', params: { report: report } })
    }
  }
}
</script>
