<template>
  <q-page padding>
    <!-- content -->
    <div v-if="chartData">
      <p style="margin-top: 0">This is what is going to be sent</p>
      <bar-chart :chart-data="chartData" :options="chartOptions"></bar-chart>
      <div class="row">
        <q-btn color="primary" class="col" label="Send" @click="submit()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import * as healthstore from '../../modules/mockHealthstore'
import BarChart from 'components/Main/BarChart.js'
import userinfo from '../../modules/userinfo'
import DB from '../../modules/db'
import API from '../../modules/API'
import HealthDataEnum from '../../modules/healthstoreDataTypesEnum'
import moment from 'moment'

export default {
  name: 'DataQueryPage',
  components: { BarChart },
  data: function () {
    return {
      task: {},
      taskDescr: {},
      chartData: null,
      chartOptions: null,
      healthData: null
    }
  },
  async mounted () {
    this.$q.loading.show()
    const studyKey = this.$route.params.studyKey
    const taskID = this.$route.params.taskID

    const studyDescr = await DB.getStudyDescription(studyKey)
    this.taskDescr = studyDescr.tasks.find(x => x.id === Number(taskID))

    let startDate = moment()

    if (this.taskDescr.scheduling.intervalType === 'd') {
      startDate.subtract(this.taskDescr.scheduling.interval, 'days')
    } else if (this.taskDescr.scheduling.intervalType === 'w') {
      startDate.subtract(this.taskDescr.scheduling.interval, 'weeks')
    } else if (this.taskDescr.scheduling.intervalType === 'm') {
      startDate.subtract(this.taskDescr.scheduling.interval, 'months')
    } else if (this.taskDescr.scheduling.intervalType === 'y') {
      startDate.subtract(this.taskDescr.scheduling.interval, 'years')
    }
    try {
      if (this.taskDescr.aggregated) {
        if (this.taskDescr.bucket) {
          this.healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: this.taskDescr.dataType,
            bucket: this.taskDescr.bucket
          })
        } else {
          this.healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: this.taskDescr.dataType
          })
        }
      } else {
        this.healthData = await healthstore.query({
          startDate: startDate.toDate(),
          endDate: new Date(),
          dataType: this.taskDescr.dataType
        })
      }

      this.$q.loading.hide()
      // now plot the data

      let chartData = { labels: [], values: [] }
      for (let i = 0; i < this.healthData.length; i++) {
        chartData.labels.push(this.healthData[i].endDate)
        chartData.values.push(this.healthData[i].value)
      }

      this.chartData = {
        labels: chartData.labels,
        datasets: [{
          label: HealthDataEnum.valueToString(this.taskDescr.dataType),
          data: chartData.values,
          backgroundColor: '#800000'
        }]
      }

      let unit = ''
      if (this.taskDescr.bucket) unit = this.taskDescr.bucket
      else if (this.healthData.length) unit = this.healthData[0].unit

      // TODO: NEED TO SPLIT CODE HERE FOR DEPENDING ON DATA TYPE
      if (this.taskDescr.dataType === 'steps' ||
      this.taskDescr.dataType === 'weight' ||
      this.taskDescr.dataType === 'height' ||
      this.taskDescr.dataType === 'heart_rate' ||
      this.taskDescr.dataType === 'heart_rate.variability' ||
      this.taskDescr.dataType === 'calories' ||
      this.taskDescr.dataType === 'distance') {
        this.chartOptions = {
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              type: 'time',
              bounds: 'data',
              time: {
                unit: unit
              }
            }]
          }
        }
      } else if (this.taskDescr.dataType === 'activity') {
        // TODO: the activity chart depends if it's aggregated or not
        // aggregated: a bar chart with different bars per activity type, indicating the time in hours
        // not aggregated: stepped line with activities instead of numbers on the y axis
      }
    } catch (error) {
      console.error(error)
      this.$q.loading.hide()
      this.$q.notify({
        color: 'negative',
        message: 'Cannot retrieve data: ' + error.message,
        icon: 'report_problem'
      })
    }
  },
  methods: {
    async submit () {
      try {
        let studyKey = this.$route.params.studyKey
        let taskId = Number(this.$route.params.taskID)
        await API.sendDataQuery({
          userKey: userinfo.user._key,
          studyKey: studyKey,
          taskId: taskId,
          dataType: this.taskDescr.dataType,
          generatedTS: new Date(),
          healthData: this.healthData
        })
        await DB.setTaskCompletion(studyKey, taskId, new Date())
        this.$router.push('/home')
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send data: ' + error.message,
          icon: 'report_problem',
          onDismiss () {
            this.$router.push('/home')
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
