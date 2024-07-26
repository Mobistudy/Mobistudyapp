<template>
  <q-page padding>
    <!-- content -->
    <div>
      <p class="mobitxt1">{{ explanation }}</p>
      <div style="margin: 0 auto; padding: 0rem 1rem;">
        <canvas height="400" ref="chart" />
      </div>
      <div class="q-mt-lg row justify-around">
        <q-btn class="mobibtn" color="negative" :loading="sending" :label="$t('common.discard')" @click="discard()" />
        <q-btn class="mobibtn" color="primary" :loading="sending" :label="$t('common.send')" @click="send()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nHealthDataTypes from '@i18n/healthDataTypes/healthDataTypes'
import i18nDataQuery from '@i18n/tasks/dataQuery'
import { mergeDeep } from '@shared/tools'

import phone from '@shared/phone'
import healthstore from '@shared/healthstore'
import session from '@shared/session'
import DB from '@shared/db'
import API from '@shared/API'
import HealthDataEnum from '@shared/healthDataTypesEnum'
import { DateTime } from 'luxon'

import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'

// a bunch of colors that nicely fit together on a multi-line or bar chart
// if there are more than 10 colors, we are in trouble
const chartColors = [
  '#800000',
  '#778000',
  '#118000',
  '#008080',
  '#003780',
  '#080080',
  '#440080',
  '#790080',
  '#800046',
  '#800046'
]

// holder of the data to be visualized
let healthData = {}
// holder of the chart options
let chartOptions = {}

export default {
  name: 'DataQueryPage',
  props: ['studyKey', 'taskId'],
  i18n: {
    messages: mergeDeep(i18nCommon, i18nDataQuery, i18nHealthDataTypes)
  },
  data: function () {
    return {
      sending: false,
      report: {}
    }
  },
  computed: {
    explanation () {
      if (this.$q.platform.is.ios) return this.$t('tasks.dataQuery.dataQueryExplanationiOS')
      else return this.$t('tasks.dataQuery.dataQueryExplanationAndroid')
    }
  },
  async mounted () {
    this.$q.loading.show()
    const studyKey = this.studyKey
    const taskId = parseInt(this.taskId)

    const studyDescr = await DB.getStudyDescription(studyKey)
    const taskDescr = studyDescr.tasks.find(x => x.id === taskId)

    const userSession = session.getUserSession()

    this.report = {
      userKey: userSession.user.userKey,
      participantKey: userSession.user.participantKey,
      studyKey,
      taskId,
      taskType: 'dataQuery',
      createdTS: new Date(),
      phone: phone.device,
      summary: {
        startedTS: new Date(),
        completedTS: new Date(),
        dataType: taskDescr.dataType
      },
      data: []
    }

    const studyParticipation = await DB.getStudyParticipation(studyKey)
    const lastCompleted = studyParticipation.taskItemsConsent.find(x => x.taskId === Number(taskId)).lastExecuted

    let startDate = DateTime.now()

    if (typeof lastCompleted !== 'undefined') {
      startDate = DateTime.fromISO(lastCompleted)
    } else {
      if (taskDescr.scheduling.intervalType === 'd') {
        startDate = startDate.minus({ days: taskDescr.scheduling.interval })
      } else if (taskDescr.scheduling.intervalType === 'w') {
        startDate = startDate.minus({ weeks: taskDescr.scheduling.interval })
      } else if (taskDescr.scheduling.intervalType === 'm') {
        startDate = startDate.minus({ months: taskDescr.scheduling.interval })
      } else if (taskDescr.scheduling.intervalType === 'y') {
        startDate = startDate.minus({ years: taskDescr.scheduling.interval })
      }
    }
    // console.log(`Retrieving ${taskDescr.dataType}, aggregated: ${taskDescr.aggregated}, bucket: ${taskDescr.bucket}`)
    // console.log('Start Date: ' + startDate.toDate())

    try {
      if (taskDescr.aggregated) {
        if (taskDescr.bucket && taskDescr.bucket !== 'none') {
          healthData = await healthstore.queryAggregated({
            startDate: startDate.toJSDate(),
            endDate: new Date(),
            dataType: HealthDataEnum.toNativeType(taskDescr.dataType),
            bucket: taskDescr.bucket
          })
        } else {
          healthData = await healthstore.queryAggregated({
            startDate: startDate.toJSDate(),
            endDate: new Date(),
            dataType: HealthDataEnum.toNativeType(taskDescr.dataType)
          })
        }
      } else {
        healthData = await healthstore.query({
          startDate: startDate.toJSDate(),
          endDate: new Date(),
          dataType: HealthDataEnum.toNativeType(taskDescr.dataType)
        })
      }
      console.log('raw health data', healthData)

      // now plot the data
      // NEED TO SPLIT CODE HERE DEPENDING ON DATA TYPE AND IF AGGREGATED OR NOT
      const chartData = { labels: [], datasets: [] }

      if (taskDescr.aggregated) {
        // AGGREGATED
        if (taskDescr.bucket && taskDescr.bucket !== 'none') {
          // AGGREGATED and BUCKETED
          if (taskDescr.dataType === 'activity') {
            // activity is treated differently
            const activityTypes = []
            for (let i = 0; i < healthData.length; i++) {
              chartData.labels.push(healthData[i].endDate)
              for (const activityType in healthData[i].value) {
                let dataSetIndex = activityTypes.indexOf(activityType)
                if (dataSetIndex < 0) {
                  dataSetIndex = chartData.datasets.length
                  activityTypes.push(activityType)
                  chartData.datasets.push({
                    label: activityType,
                    data: [],
                    backgroundColor: chartColors[dataSetIndex]
                  })
                }
                const duration = parseInt(healthData[i].value[activityType].duration / 3600000)
                chartData.datasets[dataSetIndex].data.push(duration)
              }
            }
            const timeAggregation = taskDescr.bucket

            chartOptions = {
              maintainAspectRatio: false,
              scales: {
                y: {
                  stacked: true,
                  ticks: {
                    beginAtZero: true
                  }
                },
                x: {
                  stacked: true,
                  type: 'time',
                  bounds: 'data',
                  time: { timeAggregation }
                }
              }
            }
          } else {
            // Non activity
            chartData.datasets.push({
              label: this.$i18n.t('healthDataTypes.' + taskDescr.dataType),
              data: [],
              backgroundColor: '#800000'
            })
            for (let i = 0; i < healthData.length; i++) {
              chartData.labels.push(healthData[i].endDate)
              chartData.datasets[0].data.push(healthData[i].value)
            }

            chartOptions = {
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                },
                x: {
                  type: 'time',
                  bounds: 'data'
                }
              }
            }
          }
        } else {
          // AGGREGATED but not BUCKETED
          if (taskDescr.dataType === 'activity') {
            // activity is treated differently
            const activityTypes = []
            const label = DateTime.fromJSDate(healthData.startDate).toLocaleString(DateTime.DATETIME_SHORT) + ' to ' + DateTime.fromJSDate(healthData.endDate).toLocaleString(DateTime.DATETIME_SHORT)
            chartData.labels.push(label)
            for (const activityType in healthData.value) {
              let dataSetIndex = activityTypes.indexOf(activityType)
              if (dataSetIndex < 0) {
                dataSetIndex = chartData.datasets.length
                activityTypes.push(activityType)
                chartData.datasets.push({
                  label: activityType,
                  data: [],
                  backgroundColor: chartColors[dataSetIndex]
                })
              }
              const duration = parseInt(healthData.value[activityType].duration / 3600000)
              chartData.datasets[dataSetIndex].data.push(duration)
            }

            chartOptions = {
              responsive: true,
              scales: {
                y: {
                  stacked: true,
                  beginAtZero: true
                },
                x: {
                  stacked: true
                }
              }
            }
          } else {
            chartData.datasets.push({
              label: this.$i18n.t('healthDataTypes.' + taskDescr.dataType),
              data: [],
              backgroundColor: '#800000'
            })
            const label = DateTime.fromJSDate(healthData.startDate).toLocaleString(DateTime.DATETIME_SHORT) + ' to ' + DateTime.fromJSDate(healthData.endDate).toLocaleString(DateTime.DATETIME_SHORT)
            chartData.labels.push(label)
            chartData.datasets[0].data.push(healthData.value)

            chartOptions = {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          }
        }

        console.log(chartData)
        console.log(chartOptions)
        const chartCtx = this.$refs.chart
        // eslint-disable-next-line no-new
        new Chart(chartCtx, {
          type: 'bar',
          data: chartData,
          options: chartOptions
        })
      } else {
        // NOT AGGREGATED
        chartData.datasets.push({
          label: this.$i18n.t('healthDataTypes.' + taskDescr.dataType),
          data: [],
          fill: false,
          pointRadius: 0,
          lineTension: 0,
          backgroundColor: '#800000',
          borderColor: 'rgba(128,0,0,0.66)'
        })
        for (let i = 0; i < healthData.length; i++) {
          chartData.labels.push(healthData[i].endDate)
          chartData.datasets[0].data.push(healthData[i].value)
        }

        chartOptions = {
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              type: 'time',
              bounds: 'data'
              // time: {
              //   unit: unit
              // }
            }]
          }
        }

        const chartCtx = this.$refs.chart
        // eslint-disable-next-line no-new
        new Chart(chartCtx, {
          type: 'line',
          data: chartData,
          options: chartOptions
        })
        // TODO: not aggregated activity: stepped line with activities instead of numbers on the y axis
      }

      this.report.summary.completedTS = new Date()
      this.report.summary.length = healthData.length
      this.report.summary.firstDate = healthData[0].startDate
      this.report.summary.lastDate = healthData[healthData.length - 1].endDate
      // TODO: add some additional summary information depending on the data type, such as statistics
      this.report.data = {
        dataType: taskDescr.dataType,
        samples: healthData
      }

      this.chartData = chartData
      this.$q.loading.hide()
    } catch (error) {
      console.error(error)
      this.$q.loading.hide()
      this.$q.notify({
        color: 'negative',
        message: error.message,
        icon: 'report_problem',
        onDismiss () {
          this.$router.push('/home')
        }
      })
    }
  },
  methods: {
    async send () {
      this.sending = true

      try {
        await API.sendTasksResults(this.report)
        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.sending = false

        this.$router.go(-1)
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
      console.log(this.report)
    },
    async discard () {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
