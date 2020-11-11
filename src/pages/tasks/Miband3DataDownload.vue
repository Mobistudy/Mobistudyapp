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

// holder of all the stored data, this is kept outside of Vue for efficiency
let storedData = []

// pie chart configuration
let pieChartConfig = {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  },
  options: {
    animation: {
      animateScale: true
    }
  },
  // additional properties used internally
  indexes: [],
  maxIndex: -1,
  reset () {
    this.data.datasets.data = []
    this.data.datasets.backgroundColor = []
    this.data.labels = []
    this.indexes = []
    this.maxIndex = -1
  }
}

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
      this.showDownloading = true

      // reset the charts stuff in case it has been parially filled
      pieChartConfig.reset()
      lineChart.reset()

      // Route parameters
      const studyKey = this.$route.params.studyKey
      const taskID = this.$route.params.taskID
      const studyDescription = await db.getStudyDescription(studyKey)
      console.log('Study description:', studyDescription)
      this.taskDescription = this.getTaskDescription(studyDescription, taskID)
      console.log('Task description 2:', this.taskDescription, 'Scheduling:', this.taskDescription.scheduling)

      let lastCompleted = await this.getLastCompletedTaskMoment(studyKey, taskID)
      console.log('Last completed:', lastCompleted)
      let startDate = moment()
      if (typeof lastCompleted === 'undefined') {
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
        startDate = lastCompleted
      }
      startDate = startDate.toDate()
      try {
        await miband3.getStoredData(startDate, this.dataCallback)
        try {
          await miband3.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect miband3', err)
          this.showErrorDialog()
        }
        this.createPieChart()
        this.showDownloading = false

        this.renderCharts(this.currentStartHour, this.currentEndHour) // Can be used to render the same intervals for both pie chart and linechart
        // this.create()
        this.graphsCreated = true
      } catch (err) {
        console.error('cannot download data', err)
        this.showErrorDialog()
      }
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
      for (let i = startIndexInMinutes; i <= endIndexInMinutes; i++) {
        let data = storedData[i]
        this.addToLineChart(data.hr, data.intensity, data.steps, data.date)
      }
      this.updateCharts()
    },

    updateCharts () {
      this.updateLineChartReferences()
    },

    async getLastCompletedTaskMoment (studyKey, taskID) {
      let taskItemConsent = await db.getStudyParticipationTaskItemConsent(studyKey)
      let lastCompleted = taskItemConsent.find(x => x.taskId === Number(taskID)).lastExecuted
      return moment(lastCompleted)
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
        this.cancelTask()
      })
    },

    async cancelTask () {
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
      storedData.push(data)
    },

    addToLineChart (hr, intensity, steps, date) {
      lineChart.hrs.push({ x: date, y: hr })
      lineChart.intensities.push({ x: date, y: intensity })
      lineChart.steps.push({ x: date, y: steps })
      lineChart.labels.push(date)
    },

    createPieChart () {
      // create the configuration object
      for (const datapoint of storedData) {
        let activityType = datapoint.activityType
        let name = getStringIdentifier(activityType)
        if (pieChartConfig.indexes[name] === undefined) {
          pieChartConfig.maxIndex++
          let index = pieChartConfig.maxIndex
          pieChartConfig.indexes[name] = index
          pieChartConfig.data.datasets[0].data[index] = 1
          pieChartConfig.data.datasets[0].backgroundColor[index] = chartColors[index]
          pieChartConfig.data.labels.push(this.$t('studies.tasks.miband3.activityTypes.' + name))
        } else {
          let index = pieChartConfig.indexes[name]
          pieChartConfig.data.datasets[0].data[index]++
        }
      }
      // create the chart
      let pieCtx = this.$refs.pieChart
      new Chart(pieCtx, pieChartConfig)
    },

    updateLineChartReferences () {
      this.lineChart.data.datasets[0].data = lineChart.hrs
      this.lineChart.data.datasets[1].data = lineChart.intensities
      this.lineChart.data.datasets[2].data = lineChart.steps
      this.lineChart.data.labels = lineChart.labels
      this.lineChart.update()
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
    this.createActivityLineChart()
    this.downloadData()
  }
}
</script>
