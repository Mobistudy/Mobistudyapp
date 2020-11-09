<template>
  <q-page id="main">
    <div v-show="graphsCreated">
      <div class="text-center q-pa-md text-h6">
        {{ $t('studies.tasks.miband3.lineChart') }}
      </div>
      <div class="q-pa-md">
        <canvas
          ref="lineChart"
          height="270"
        ></canvas>
      </div>
      <q-separator></q-separator>
      <div class="text-center q-pa-md text-h6">
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
          @click="deny()"
        ></q-btn>
        <q-btn
          :label="$t('common.send')"
          color="primary"
          @click="accept()"
        ></q-btn>
      </div>
    </div>

    <div
      v-if="dataNotDownloaded"
      id="buttonContainer"
      class="row justify-center items-center fixed-bottom"
    >
      <q-btn
        v-ripple
        @click="downloadData"
        icon="get_app"
      >Download
      </q-btn>
    </div>
    <q-dialog
      v-model="successDownloadDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card
        class="bg-teal text-white"
        style="width: 300px"
      >
        <q-card-section>
          <div class="text-h6 text-center">Download successful</div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
  '#000000',
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

var pieChart = {
  backgroundColors: [],
  data: [],
  labels: [],
  indexes: [],
  maxIndex: -1
}
var lineChart = {
  lineChartData: [],
  lineChartLabels: []
}

export default {

  data () {
    return {
      showDownloading: false,
      successDownloadDialog: false,
      dataNotDownloaded: true,
      graphsCreated: false
    }
  },
  methods: {
    async downloadData () {
      let currDate = new Date()
      this.showDownloading = true
      await miband3.getStoredData(currDate, this.callback)
      this.showDownloading = false
      await this.animateSuccessDialog()
      this.dataNotDownloaded = false
      this.createActivityPieChart()
      this.createActivityLineChart()
      this.graphsCreated = true
    },
    callback (error, data) {
      if (!error) {
        this.addToPieChart(data.activityType)
        this.addToLineChart(data.hr, data.date)
      }
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
    addToLineChart (hr, date) {
      lineChart.lineChartData.push({ x: date, y: hr })
      lineChart.lineChartLabels.push(date)
    },
    async animateSuccessDialog () {
      return new Promise((resolve, reject) => {
        this.successDownloadDialog = true
        setTimeout(() => {
          this.successDownloadDialog = false
          resolve()
        }, 1000)
      })
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
      console.log('LC data:', lineChart.lineChartData)
      let myCtx = this.$refs.lineChart
      let myChart = new Chart.Scatter(myCtx, {
        type: 'scatter',
        data: {
          labels: lineChart.lineChartLabels,
          datasets: [
            {
              label: 'Scatter plot',
              data: lineChart.lineChartData,
              backgroundColor: 'rgba(255,99,132,05)',
              borderColor: 'rgba(255,99,132,05)',
              borderWidth: 1,
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
    delay (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, ms)
      })
    }
  }
}
</script>
