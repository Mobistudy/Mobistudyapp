<template>
  <q-page padding>
    <q-item-section id="heartRate">
      <h6>{{ $t("studies.tasks.qcst.enterHR") }}</h6>
      <p>
        <i>{{ $t("studies.tasks.qcst.enterHRInstructions") }}</i>
      </p>
      <q-input
        outlined
        v-model="heartRate"
        label="Heart rate"
        type="number"
      />
      <q-btn
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
      const title = this.title
      const icon = this.icon
      const report = this.report
      this.report.heartRate = this.heartRate
      this.$router.push({ name: 'qcstSummary', params: { title: title, icon: icon, report: report } })
    }
  }
}
</script>
