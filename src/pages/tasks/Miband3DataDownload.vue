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
            disable
            @click="chartMinus()"
          />
          <q-btn
            label="+12 hpurs"
            color="secondary"
            @click="chartPlus()"
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
      graphsCreated: false
    }
  },
  methods: {
    async downloadData () {
      // reset the charts stuff in case it has been parially filled
      pieChart.reset()
      lineChart.reset()
      // TODO: should get the last date the data was retrieved from DB
      // if absent, use the same logic as in DataQuery.vue
      let currDate = new Date()
      this.showDownloading = true
      try {
        await miband3.getStoredData(currDate, this.dataCallback)
        try {
          await miband3.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect miband3', err)
          this.showErrorDialog()
        }
        this.showDownloading = false
        this.createActivityPieChart()
        this.createActivityLineChart()
        this.graphsCreated = true
      } catch (err) {
        console.error('cannot download data', err)
      }
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
      this.addToPieChart(data.activityType)
      this.addToLineChart(data.hr, data.intensity, data.steps, data.date)
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
      let myCtx = this.$refs.pieChart
      new Chart(myCtx, {
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
    createActivityLineChart () {
      let myCtx = this.$refs.lineChart
      let myChart = new Chart.Scatter(myCtx, {
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
      myChart.update()
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
    this.downloadData()
  }
}
</script>
