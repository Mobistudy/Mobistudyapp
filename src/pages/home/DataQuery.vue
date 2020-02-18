<template>
  <q-page padding>
    <!-- content -->
    <div v-if="chartData">
      <p style="margin-top: 0">This is what is going to be sent</p>
      <bar-chart v-if="plotBar" :chart-data="chartData" :options="chartOptions"></bar-chart>
      <line-chart v-if="plotLine" :chart-data="chartData" :options="chartOptions"></line-chart>
      <div class="row">
        <q-btn color="primary" :loading="loading" class="col" label="Send" @click="submit()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import healthstore from '../../modules/healthstore.js'
import BarChart from 'components/BarChart.js'
import LineChart from 'components/LineChart.js'
import userinfo from '../../modules/userinfo.js'
import DB from '../../modules/db.js'
import API from '../../modules/API.js'
import HealthDataEnum from '../../modules/healthDataTypesEnum.js'
import moment from 'moment'

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

export default {
  name: 'DataQueryPage',
  components: { BarChart, LineChart },
  data: function () {
    return {
      task: {},
      taskDescr: {},
      chartData: null,
      chartOptions: null,
      healthData: null,
      plotLine: false,
      plotBar: false,
      loading: false
    }
  },
  async mounted () {
    this.$q.loading.show()
    const studyKey = this.$route.params.studyKey
    const taskID = this.$route.params.taskID

    const studyDescr = await DB.getStudyDescription(studyKey)
    this.taskDescr = studyDescr.tasks.find(x => x.id === Number(taskID))

    let studyParticipation = await DB.getStudyParticipation(studyKey)
    let lastCompleted = studyParticipation.taskItemsConsent.find(x => x.taskId === Number(taskID)).lastExecuted

    let startDate = moment()

    if (typeof lastCompleted !== 'undefined') {
      startDate = moment(lastCompleted)
    } else {
      if (this.taskDescr.scheduling.intervalType === 'd') {
        startDate.subtract(this.taskDescr.scheduling.interval, 'days')
      } else if (this.taskDescr.scheduling.intervalType === 'w') {
        startDate.subtract(this.taskDescr.scheduling.interval, 'weeks')
      } else if (this.taskDescr.scheduling.intervalType === 'm') {
        startDate.subtract(this.taskDescr.scheduling.interval, 'months')
      } else if (this.taskDescr.scheduling.intervalType === 'y') {
        startDate.subtract(this.taskDescr.scheduling.interval, 'years')
      }
    }
    console.log(`Retrieving ${this.taskDescr.dataType}, aggregated: ${this.taskDescr.aggregated}, bucket: ${this.taskDescr.bucket}`)
    console.log('Start Date: ' + startDate.toDate())

    try {
      if (this.taskDescr.aggregated) {
        if (this.taskDescr.bucket && this.taskDescr.bucket !== 'none') {
          this.healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: HealthDataEnum.toNativeType(this.taskDescr.dataType),
            bucket: this.taskDescr.bucket
          })
        } else {
          this.healthData = await healthstore.queryAggregated({
            startDate: startDate.toDate(),
            endDate: new Date(),
            dataType: HealthDataEnum.toNativeType(this.taskDescr.dataType)
          })
        }
      } else {
        this.healthData = await healthstore.query({
          startDate: startDate.toDate(),
          endDate: new Date(),
          dataType: HealthDataEnum.toNativeType(this.taskDescr.dataType)
        })
      }
      console.log('raw health data', this.healthData)

      // now plot the data
      let unit = ''
      if (this.taskDescr.bucket && this.taskDescr.bucket !== 'none') unit = this.taskDescr.bucket
      else if (this.healthData.unit) unit = this.healthData.unit
      else if (this.healthData.length) unit = this.healthData[0].unit

      // TODO: NEED TO SPLIT CODE HERE FOR DEPENDING ON DATA TYPE AND IF AGGREGATED OR NOT
      let tempData = { labels: [], datasets: [] }

      if (this.taskDescr.aggregated) {
        if (this.taskDescr.bucket && this.taskDescr.bucket !== 'none') {
          // AGGREGATED and BUCKETED
          if (this.taskDescr.dataType === 'activity') {
            // activity is treated differently
            let activityTypes = []
            for (let i = 0; i < this.healthData.length; i++) {
              tempData.labels.push(this.healthData[i].endDate)
              for (let activityType in this.healthData[i].value) {
                let dataSetIndex = activityTypes.indexOf(activityType)
                if (dataSetIndex < 0) {
                  dataSetIndex = tempData.datasets.length
                  activityTypes.push(activityType)
                  tempData.datasets.push({
                    label: activityType,
                    data: [],
                    backgroundColor: chartColors[dataSetIndex]
                  })
                }
                let duration = parseInt(this.healthData[i].value[activityType].duration / 3600000)
                tempData.datasets[dataSetIndex].data.push(duration)
              }
            }

            this.chartOptions = {
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  stacked: true,
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                  stacked: true,
                  type: 'time',
                  bounds: 'data',
                  time: { unit: unit }
                }]
              }
            }
          } else {
            tempData.datasets.push({
              label: this.$i18n.t('healthDataTypes.' + this.taskDescr.dataType),
              data: [],
              backgroundColor: '#800000'
            })
            for (let i = 0; i < this.healthData.length; i++) {
              tempData.labels.push(this.healthData[i].endDate)
              tempData.datasets[0].data.push(this.healthData[i].value)
            }

            this.chartOptions = {
              maintainAspectRatio: false,
              scales: {
                yAxes: [{ ticks: { beginAtZero: true } }],
                xAxes: [{
                  type: 'time',
                  bounds: 'data',
                  time: { unit: unit }
                }]
              }
            }
          }
        } else {
          // AGGREGATED but not BUCKETED
          if (this.taskDescr.dataType === 'activity') {
            // activity is treated differently
            let activityTypes = []
            tempData.labels.push(moment(this.healthData.startDate).format('D/M/YY HH:mm') + ' to ' + moment(this.healthData.endDate).format('D/M/YY HH:mm'))
            for (let activityType in this.healthData.value) {
              let dataSetIndex = activityTypes.indexOf(activityType)
              if (dataSetIndex < 0) {
                dataSetIndex = tempData.datasets.length
                activityTypes.push(activityType)
                tempData.datasets.push({
                  label: activityType,
                  data: [],
                  backgroundColor: chartColors[dataSetIndex]
                })
              }
              let duration = parseInt(this.healthData.value[activityType].duration / 3600000)
              tempData.datasets[dataSetIndex].data.push(duration)
            }

            this.chartOptions = {
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  stacked: true,
                  ticks: { beginAtZero: true }
                }],
                xAxes: [{
                  stacked: true
                }]
              }
            }
          } else {
            tempData.datasets.push({
              label: this.$i18n.t('healthDataTypes.' + this.taskDescr.dataType),
              data: [],
              backgroundColor: '#800000'
            })
            tempData.labels.push(moment(this.healthData.startDate).format('D/M/YY HH:mm') + ' to ' + moment(this.healthData.endDate).format('D/M/YY HH:mm'))
            tempData.datasets[0].data.push(this.healthData.value)

            this.chartOptions = {
              maintainAspectRatio: false,
              scales: {
                yAxes: [{ ticks: { beginAtZero: true } }]
              }
            }
          }
        }

        this.plotBar = true
      } else {
        // NOT AGGREGATED
        tempData.datasets.push({
          label: this.$i18n.t('healthDataTypes.' + this.taskDescr.dataType),
          data: [],
          fill: false,
          pointRadius: 0,
          lineTension: 0,
          backgroundColor: '#800000',
          borderColor: 'rgba(128,0,0,0.66)'
        })
        for (let i = 0; i < this.healthData.length; i++) {
          tempData.labels.push(this.healthData[i].endDate)
          tempData.datasets[0].data.push(this.healthData[i].value)
        }

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
              bounds: 'data'
              // time: {
              //   unit: unit
              // }
            }]
          }
        }

        this.plotLine = true
        // TODO: not aggregated activity: stepped line with activities instead of numbers on the y axis
      }

      this.chartData = tempData
      this.$q.loading.hide()
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
      this.loading = true
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
        // this.$q.notify({
        //   color: 'positive',
        //   message: 'Data sent successfully!',
        //   icon: 'check'
        // })
        // let _this = this
        this.$router.push('/home', function () {
          // _this.$router.go() // I think this refreshes /home so that notifications are rescheduled appropriately
          window.location.reload(true)
        })
      } catch (error) {
        this.loading = false
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
