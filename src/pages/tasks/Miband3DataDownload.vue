<template>
  <div class="q-pa-md">
    <div
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

    <canvas ref="lineChart" width="400" height="400"></canvas>
    <canvas ref="pieChart" width="400" height="400"></canvas>

    <q-inner-loading :showing="downloading">
      <q-spinner-oval
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>
<style scoped>
#buttonContainer {
  height: 10vh;
}
</style>
<script>
import miband3 from 'modules/miband3/miband3.mock.js'
import Chart from 'chart.js'

export default {
  data () {
    return {
      showDownloading: false,
      successDownloadDialog: false,
      showFinish: false,
      myChart: undefined,
      myCtx: undefined,
      lineChartData: [],
      lineChartLabels: [],
      pieChartColors: [],
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
  },
  methods: {
    async downloadData () {
      let currDate = new Date()
      this.showDownloading = true
      await miband3.getStoredData(currDate, this.callback)
      this.showDownloading = false
      await this.animateSuccessDialog()
      this.createActivityPieChart()
    },
    callback (error, data) {
      if (!error) {
        this.addToPieChart(data.activityType)
        this.addToLineChart(data.hr, data.date)
      }
    },
    addToPieChart (activity) {
      let indexToAdd = this.pieChartDataMap.get(activity)
      this.pieChartData[indexToAdd] = this.pieChartData[indexToAdd] + 1
    },
    addToLineChart (hr, date) {
      this.lineChartData.push({ x: date, y: hr })
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
      this.myCtx = this.$refs.pieChart
      this.myChart = new Chart(this.myCtx, {
        type: 'doughnut',
        data: {
          lineChartLabels: this.pieChartlineChartLabels,
          lineChartDatas: [{
            data: this.pieChartData,
            backgroundColor: this.pieChartBackgroundColors
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
      this.myCtx = this.$refs.lineChart
      this.myChart = new Chart.Scatter(this.myCtx, {
        type: 'line',
        data: {
          lineChartLabels: this.lineChartLabels,
          lineChartDatas: [
            {
              label: 'Heart rate',
              data: this.lineChartData,
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
            display: true,
            text: 'Chart.js Time Scale'
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
    },
    // Defines the indices that the activities should be added to in the pieChartData array.
    setupActivityMap () {
      for (let i = 0; i < this.pieChartActivities.length; i++) {
        this.pieChartDataMap.set(this.pieChartActivities[i], i)
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
