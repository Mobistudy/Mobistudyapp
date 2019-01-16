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
        let taskId = Number(this.$route.params.taskID)
        await API.sendDataQuery(this.healthData)
        // mark last completion of the task in studies participation
        let studies = await DB.getStudiesParticipation()
        let sudyInd = studies.findIndex(x => x.studyKey === this.$route.params.studyKey)
        if (!studies[sudyInd].tasksStatus) studies[sudyInd].tasksStatus = []
        let taksstatusInd = studies[sudyInd].tasksStatus.findIndex(x => x.taskId === taskId)
        if (taksstatusInd < 0) {
          // this case shouldn't happen really
          studies[sudyInd].tasksStatus.push({
            taskId: taskId, consented: true, lastExecuted: new Date()
          })
          taksstatusInd = 0
        } else {
          studies[sudyInd].tasksStatus[taksstatusInd].lastExecuted = new Date()
        }
        await DB.setStudiesParticipation(studies)
        this.$router.push('/home')
      } catch (error) {
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: 'Cannot send data: ' + error.message,
          icon: 'report_problem'
        })
      }
    }
  }
}
</script>

<style>
</style>
