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
import moment from 'moment'

export default {
  name: 'DataQueryPage',
  components: { BarChart },
  data: function () {
    return {
      task: {},
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
    const taskDescr = studyDescr.tasks.find(x => x.id === Number(taskID))

    let startDate = moment()

    if (taskDescr.scheduling.intervalType === 'd') {
      startDate.subtract(taskDescr.scheduling.interval, 'days')
    } else if (taskDescr.scheduling.intervalType === 'w') {
      startDate.subtract(taskDescr.scheduling.interval, 'weeks')
    } else if (taskDescr.scheduling.intervalType === 'm') {
      startDate.subtract(taskDescr.scheduling.interval, 'months')
    } else if (taskDescr.scheduling.intervalType === 'y') {
      startDate.subtract(taskDescr.scheduling.interval, 'years')
    }
    try {
      if (taskDescr.aggregated) {
        if (taskDescr.bucket) {
          this.healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: taskDescr.dataType,
            bucket: taskDescr.bucket
          })
        } else {
          this.healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: taskDescr.dataType
          })
        }
      } else {
        this.healthData = await healthstore.query({
          startDate: startDate.toDate(),
          endDate: new Date(),
          dataType: taskDescr.dataType
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
          label: taskDescr.dataType.charAt(0).toUpperCase() + taskDescr.dataType.slice(1),
          data: chartData.values,
          backgroundColor: '#800000'
        }]
      }

      // NEED TO SPLIT CODE HERE FOR DEPENDING ON DATA TYPE
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
              unit: taskDescr.bucket
            }
          }]
        }
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
