<template>
  <q-page id="main" class="window-height window-width">
    <div v-show="graphsCreated" id="feed">
      <div id="feedItem" class="row justify-center items-center">
        <div class="itemPage">
          <div class="title text-center q-pa-md"><h6>Title</h6></div>
          <div id="lineChartContainer">
            <canvas ref="lineChart" height="200" width="200"></canvas>
          </div>
          <div class="textDescription q-pa-md text-center"><p>Some text goes here to describe the chart.</p></div>
        </div>
      </div>
      <div id="feedItem" class="row justify-center items-center">
        <div class="itemPage">
          <div class="title text-center q-pa-md"><h6>Title</h6></div>
          <div id="pieChartContainer">
            <canvas ref="pieChart" height="200" width="200"></canvas>
          </div>
          <div class="textDescription q-pa-md text-center"><p>Some text goes here to describe the chart.</p></div>
        </div>
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
<style scoped>
h6 {
  margin: 0;
  padding: 0;
}
html,body,#q-app,.q-pa-md {
  height: 100%;
  width: 100%;
}
#main {
  border: 1px solid black;
}
#feed {
  height: 75%;
  width: 90%;
  margin: 0 auto;
  border: 1px solid red;
}
#feedItem {
  min-height: 100%;
  border: 2px solid blue;
}
.itemPage {
  min-width: 70%;
  height: 80%;
}
#lineChartContainer {
  width: 90% !important;
}
#pieChartContainer {
  height: 50%;
  min-width: 70%;
}
#buttonContainer {
  height: 10%;
  width: 90%;
  margin: 0 auto;
  border: 1px solid black;
}
</style>
<script>
/* eslint-disable no-new */
import miband3 from 'modules/miband3/miband3.mock.js'
import Chart from 'chart.js'

var pieChart = {
  pieChartBackgroundColors: [
    'Red',
    'Yellow',
    'Blue',
    'Green',
    'Aqua'
  ],
  pieChartDataMap: new Map(),
  pieChartData: [0, 0, 0, 0, 0],
  pieChartLabels: ['Swimming', 'Walking', 'Jacking off', 'Sex', 'Sleep'],
  pieChartActivities: [1, 2, 3, 4, 5]
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
      showLineChart: false,
      showPieChart: false,
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
    addToPieChart (activity) {
      let indexToAdd = pieChart.pieChartDataMap.get(activity)
      pieChart.pieChartData[indexToAdd] = pieChart.pieChartData[indexToAdd] + 1
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
          labels: pieChart.pieChartLabels,
          datasets: [{
            data: pieChart.pieChartData,
            backgroundColor: pieChart.pieChartBackgroundColors
          }]
        },
        options: {
          animation: {
            animateScale: true
          }
        }
      })
      this.showPieChart = true
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
      this.showLineChart = true
    },
    // Defines the indices that the activities should be added to in the pieChartData array.
    setupActivityMap () {
      for (let i = 0; i < pieChart.pieChartActivities.length; i++) {
        pieChart.pieChartDataMap.set(pieChart.pieChartActivities[i], i)
      }
    },
    delay (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, ms)
      })
    }
  },
  mounted () {
    this.setupActivityMap()
  }
}
</script>
