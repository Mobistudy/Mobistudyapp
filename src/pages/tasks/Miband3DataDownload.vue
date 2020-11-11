<template>
  <q-page id="main">
    <div v-show="graphsCreated">
      <p class="q-pa-md">{{ $t('studies.tasks.miband3.chartsIntro') }}</p>
      <div class="text-center text-h6">
        {{ $t('studies.tasks.miband3.lineChart') }}
      </div>
      <div class="q-pa-md">
        <canvas
          ref="lineChart"
          height="270"
        />
        <div class="row justify-around">
          <q-btn
            label="-12 hours"
            color="secondary"
            :disable="disableMinus"
            @click="chartAdd((-12))"
          />
          <q-btn
            label="+12 hours"
            color="secondary"
            :disable="disablePlus"
            @click="chartAdd((12))"
          />
        </div>
      </div>
      <q-separator></q-separator>
      <div class="text-center text-h6">
        {{ $t('studies.tasks.miband3.pieChart') }}
      </div>
      <div class="q-pa-md">
        <canvas
          ref="pieChart"
          height="270"
        ></canvas>
      </div>
      <q-separator></q-separator>
      <div class="q-my-md row justify-around">
        <q-btn
          :label="$t('common.skip')"
          flat
          color="negative"
          @click="skipSend()"
        ></q-btn>
        <q-btn
          :label="$t('common.send')"
          color="primary"
          @click="sendData()"
        ></q-btn>
      </div>
    </div>

    <q-inner-loading :showing="showDownloading">
      <q-spinner-oval
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
/* eslint-disable no-new */
import miband3 from 'modules/miband3/miband3.mock.js'
import Chart from 'chart.js'
import { getStringIdentifier } from 'modules/miband3/miband3ActivityTypeEnum.js'
import db from 'modules/db'
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

// holder of the pie chart data
var pieChart = {
  backgroundColors: [],
  data: [],
  labels: [],
  indexes: [],
  maxIndex: -1,
  reset () {
    this.backgroundColors = []
    this.data = []
    this.labels = []
    this.indexes = []
    this.maxIndex = -1
  }
}

var storedData = []

// holder of the line chart data
var lineChart = {
  hrs: [],
  steps: [],
  intensities: [],
  labels: [],
  reset () {
    this.hrs = []
    this.steps = []
    this.intensities = []
    this.labels = []
  }
}

export default {
  data () {
    return {
      showDownloading: false,
      graphsCreated: false,
      taskDescription: {},
      pieChart: undefined,
      pieCtx: undefined,
      lineChart: undefined,
      lineCtx: undefined,
      currentStartHour: 0,
      currentEndHour: 12,
      disableMinus: true,
      disablePlus: false
    }
  },
  methods: {
    async downloadData () {
      // Route parameters
      const studyKey = this.$route.params.studyKey
      const taskID = this.$route.params.taskID
      const studyDescription = await db.getStudyDescription(studyKey)
      console.log('Study description:', studyDescription)
      this.taskDescription = this.getTaskDescription(studyDescription, taskID)
      console.log('Task description 2:', this.taskDescription, 'Scheduling:', this.taskDescription.scheduling)

      // reset the charts stuff in case it has been parially filled
      pieChart.reset()
      lineChart.reset()
      // TODO: should get the last date the data was retrieved from DB
      // if absent, use the same logic as in DataQuery.vue
      let lastCompleted = await this.getLastCompletedTaskMoment(studyKey, taskID)
      console.log('Last completed:', lastCompleted)
      let startDate = moment()
      if (this.isFirstTaskDownload()) {
        console.log('Task description 3:', this.taskDescription.scheduling)
        let intervalType = this.taskDescription.scheduling.interval
        let interval = this.taskDescription.scheduling.interval
        if (intervalType === 'd') {
          startDate.subtract(interval, 'days')
        } else if (intervalType === 'w') {
          startDate.subtract(interval, 'weeks')
        } else if (intervalType === 'm') {
          startDate.subtract(interval, 'months')
        } else if (intervalType === 'y') {
          startDate.subtract(interval, 'years')
        }
      } else {
        let device = await db.getDeviceMiBand3()
        startDate = new Date(device.lastDownload)
      }
      if (moment.isMoment(startDate)) {
        startDate = startDate.toDate()
      }
      console.log('Start date:', startDate)
      this.showDownloading = true
      try {
        await miband3.getStoredData(startDate, this.dataCallback)
        this.storeDownloadTimestamp()
        try {
          await miband3.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect miband3', err)
          this.showErrorDialog()
        }
        this.showDownloading = false
        this.renderCharts(this.currentStartHour, this.currentEndHour) // Can be used to render the same intervals for both pie chart and linechart
        this.renderWholeIntervalPieChart()
        this.graphsCreated = true
      } catch (err) {
        console.error('cannot download data', err)
      }
    },
    async storeDownloadTimestamp () {
      let oldestSampleTimeStamp = storedData[0].date
      let device = await db.getDeviceMiBand3()
      device.lastDownload = oldestSampleTimeStamp
      console.log('Stored device data', device)
      return db.setDeviceMiBand3(device)
    },
    /**
     * Renders the line chart data between the two specifiec parameters. Start time from 0 up to x amount of hours.
     * Can be extended to also render the pie chart the same interval as the line chart.
     */
    renderCharts (startTime, endTime) {
      lineChart.reset()
      console.log('start:', startTime, 'end:', endTime)
      let startIndexInMinutes = startTime * 60
      let endIndexInMinutes = endTime * 60 - 1
      console.log(storedData)
      for (let i = startIndexInMinutes; i <= endIndexInMinutes; i++) {
        let data = storedData[i]
        this.addToLineChart(data.hr, data.intensity, data.steps, data.date)
      }
      this.updateCharts()
    },
    renderWholeIntervalPieChart () {
      pieChart.reset()
      for (const sample of storedData) {
        this.addToPieChart(sample.activityType)
      }
      this.updateCharts()
    },
    updateCharts () {
      this.updateLineChartReferences()
      this.updatePieChartReferences()
    },
    async getLastCompletedTaskMoment (studyKey, taskID) {
      let taskItemConsent = await db.getStudyParticipationTaskItemConsent(studyKey)
      console.log('Consent', taskItemConsent)
      let lastCompleted = taskItemConsent.find(x => x.taskId === Number(taskID)).lastExecuted
      return moment(lastCompleted)
    },
    async isFirstTaskDownload (date) {
      return (typeof date === 'undefined')
    },

    getTaskDescription (studyDescription, taskID) {
      let taskDescription = studyDescription.tasks.find(x => x.id === Number(taskID))
      console.log('Task description 1:', taskDescription)
      return taskDescription
    },

    showErrorDialog () {
      this.$q.dialog({
        title: this.$t('errors.error'),
        message: this.$t('studies.tasks.miband3.dataDownloadError'),
        cancel: this.$t('common.cancel'),
        ok: this.$t('common.retry'),
        persistent: true
      }).onOk(() => {
        // retry
        this.downloadData()
      }).onCancel(() => {
        // cancel and go home
        this.cancel()
      })
    },
    async cancel () {
      // disconnects and go home
      try {
        await miband3.disconnect()
      } catch (err) {
        // doesn't matter if it fails here, but let's print out a message on console
        console.error('cannot disconnect miband3', err)
      }
      this.$router.push({ name: 'tasker' })
    },
    dataCallback (data) {
      // collects data from the miband and prepares the charts
      this.addStoredData(data)
    },
    addStoredData (data) {
      storedData.push(data)
    },
    addToPieChart (activityType) {
      let name = getStringIdentifier(activityType)
      if (pieChart.indexes[name] === undefined) {
        pieChart.maxIndex++
        let index = pieChart.maxIndex
        pieChart.indexes[name] = index
        pieChart.data[index] = 1
        pieChart.labels.push(this.$t('studies.tasks.miband3.activityTypes.' + name))
        pieChart.backgroundColors.push(chartColors[index])
      } else {
        let index = pieChart.indexes[name]
        pieChart.data[index]++
      }
    },
    addToLineChart (hr, intensity, steps, date) {
      lineChart.hrs.push({ x: date, y: hr })
      lineChart.intensities.push({ x: date, y: intensity })
      lineChart.steps.push({ x: date, y: steps })
      lineChart.labels.push(date)
    },
    createActivityPieChart () {
      this.pieCtx = this.$refs.pieChart
      this.pieChart = new Chart(this.pieCtx, {
        type: 'doughnut',
        data: {
          labels: pieChart.labels,
          datasets: [{
            data: pieChart.data,
            backgroundColor: pieChart.backgroundColors
          }]
        },
        options: {
          animation: {
            animateScale: true
          }
        }
      })
    },
    updateLineChartReferences () {
      this.lineChart.data.datasets[0].data = lineChart.hrs
      this.lineChart.data.datasets[1].data = lineChart.intensities
      this.lineChart.data.datasets[2].data = lineChart.steps
      this.lineChart.data.labels = lineChart.labels
      this.lineChart.update()
    },
    updatePieChartReferences () {
      this.pieChart.data.datasets[0].data = pieChart.data
      this.pieChart.data.labels = pieChart.labels
      this.pieChart.data.datasets[0].backgroundColor = pieChart.backgroundColors
      this.pieChart.update()
    },
    createActivityLineChart () {
      this.lineCtx = this.$refs.lineChart
      this.lineChart = new Chart.Scatter(this.lineCtx, {
        type: 'scatter',
        data: {
          labels: lineChart.labels,
          datasets: [
            {
              label: this.$t('studies.tasks.miband3.hrs'),
              data: lineChart.hrs,
              backgroundColor: '#C74038',
              borderColor: '#C74038',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('studies.tasks.miband3.intensities'),
              data: lineChart.intensities,
              backgroundColor: '#4038C7',
              borderColor: '#4038C7',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('studies.tasks.miband3.steps'),
              data: lineChart.steps,
              backgroundColor: '#38C740',
              borderColor: '#38C740',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: {
                  quarter: 'HH:MM:SS'
                }
              },
              scaleLabel: {
                display: true,
                lineChartLabelstring: 'Date'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                lineChartLabelstring: 'value'
              }
            }]
          }
        }
      })
      this.lineChart.update()
    },
    chartAdd (amount) {
      this.currentStartHour += amount
      this.currentEndHour += amount
      this.renderCharts(this.currentStartHour, this.currentEndHour)
      this.updateCharts()
      this.updatePlusMinusButtons()
    },
    updatePlusMinusButtons () {
      console.log('CurrMinusIndex:', this.currentStartHour)
      console.log('Stored data length:', (storedData.length / 60))
      if (this.currentStartHour === 0) {
        this.disableMinus = true
      } else {
        this.disableMinus = false
      }
      console.log('CurrEndIndex:', this.currentEndHour)
      if (this.currentEndHour === (storedData.length / 60)) {
        this.disablePlus = true
      } else {
        this.disablePlus = false
      }
    },
    skipSend () {
      // TODO should save the date up to which the data was retrieved and go back to home
      // could also add a popup for confirmation
    },
    sendData () {
      // sends the data to the server and goes back to Home
    }
  },
  mounted () {
    this.createActivityPieChart()
    this.createActivityLineChart()
    this.downloadData()
  }
}
</script>
