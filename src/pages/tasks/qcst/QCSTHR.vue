<template>
  <q-page padding>
    <q-item-section id="heartRate">
      <h6>{{ $t("studies.tasks.qcst.enterHR") }}</h6>
      <p class="mobitxt1 q-mb-lg">
        {{ $t("studies.tasks.qcst.enterHRInstructions") }}
      </p>
      <q-input
        outlined
        v-model="heartRate"
        label="Heart rate"
        type="number"
      />
      <q-btn
        class="full-width mobibtn q-mt-lg"
        color="primary"
        @click="completeTest()"
        :label="$t('common.next')"
        :disable="!heartRate"
      />
    </q-item-section>
  </q-page>
</template>

<script>
export default {
  name: 'QCSTHRPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      heartRate: undefined
    }
  },
  methods: {
    completeTest () {
      const report = this.report
      this.report.heartRate = this.heartRate

      this.$router.push({ name: 'qcstSummary', params: { report: report } })
    }
  }
}
</script>
