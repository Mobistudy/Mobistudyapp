<template>
  <q-page padding>
    <!-- content -->
    <div v-if="finished">
      <h2 style="margin-top: 0">This is what is giong to be sent</h2>
      <div class="chart-container" style="position: relative; height:50vh; width:80vw; margin-left: auto; margin-right: auto">
        <canvas ref="chart"></canvas>
      </div>
      <br />
      <q-btn color="primary" class="q-py-sm q-px-xl float-center" size="lg" label="Click here to submit and continue" @click="submit" />
    </div>
  </q-page>
</template>

<script>
import * as healthstore from '../../modules/mockHealthstore'
import DB from '../../modules/db'
import Chartjs from 'chart.js'
import moment from 'moment'

export default {
  name: 'DataQueryPage',
  data: function () {
    return {
      task: {},
      finished: false,
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
      let healthData
      if (taskDescr.aggregated) {
        if (taskDescr.bucket) {
          healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: taskDescr.dataType,
            bucket: taskDescr.bucket
          })
        } else {
          healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: taskDescr.dataType
          })
        }
      } else {
        healthData = await healthstore.query({
          startDate: startDate.toDate(),
          endDate: new Date(),
          dataType: taskDescr.dataType
        })
      }

      console.log(healthData)
      this.$q.loading.hide()
      // now plot the data

      let ctx = this.$refs.chart
      let chartData = { labels: [], values: [] }
      for (let i = 0; i < healthData.length; i++) {
        chartData.labels.push(healthData[i].endDate)
        chartData.values.push(healthData[i].value)
      }

      let chartJSData = {
        labels: chartData.labels,
        datasets: [{
          label: taskDescr.dataType.charAt(0).toUpperCase() + taskDescr.dataType.slice(1),
          data: chartData.values
        }]
      }

      // NEED TO SPLIT CODE HERE FOR DEPENDING ON DATA TYPE

      let chartJSOptions = {
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

      Chartjs(ctx, {
        type: 'bar',
        data: chartJSData,
        options: chartJSOptions
      })
    } catch (error) {
      console.error(error)
      this.$q.loading.hide()
      this.$q.notify({
        color: 'negative',
        message: 'Cannot retrieve data: ' + error.message,
        icon: 'report_problem'
      })
    }
  }
}
</script>

<style>
</style>
