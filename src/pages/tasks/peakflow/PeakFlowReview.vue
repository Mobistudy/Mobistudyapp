<template>
  <q-page padding>
    <div class="text-center">
      <div class="text-h5">{{ $t('studies.tasks.peakflow.results') }}</div>
    </div>
    <div class="q-pa-md">
        <canvas
          style="margin: 0 auto; padding-right: 2rem;"
          height="320"
          ref="lineChart"
        />
        <div class="row justify-around">
          <q-btn
            :label="'-2 ' + $t('studies.tasks.peakflow.weeks')"
            color="secondary"
            :disable="disableMinus"
            @click="lineChartAdd((-2))"
          />
          <q-btn
            :label="'+2 ' + $t('studies.tasks.peakflow.weeks')"
            color="secondary"
            :disable="disablePlus"
            @click="lineChartAdd((2))"
          />
        </div>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
          @click="completeTest"
          color="purple"
          :label="$t('common.complete')"
          padding="lg"
        />
    </div>
  </q-page>
</template>

<style>
.decoratedTable {
  background: #f8f8f8;
  padding: 4px;
  width: 70%;
  margin: 0px auto;
  font-size: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
// import API from 'modules/API'
// import DB from 'modules/db'
import Chart from 'chart.js'
// import fileSystem from 'modules/files'
import { format as Qformat } from 'quasar'

var lineChart = {
  hrs: [],
  pef: [],
  labels: [],
  reset () {
    this.hrs = []
    this.pef = []
    this.labels = []
  }
}

let storedData = []

export default {
  name: 'PeakFlowSummaryPage',
  props: {
    report: Object
  },
  data: function () {
    return {
      isDownloading: false,
      lineChart: undefined,
      currentStartWeek: 0,
      currentEndWeek: 4,
      disableMinus: true,
      disablePlus: false,
      pefMax: undefined
    }
  },
  methods: {
    async downloadData () {
      this.isDownloading = true

      storedData = []
      lineChart.reset()

      try {
        // await miband3.getStoredData(this.startDate, this.dataCallback)

        this.renderLineChart(this.currentStartHour, this.currentEndHour)
        this.isDownloading = false
      } catch (err) {
        console.error('cannot download data', err)
        this.showErrorDialog() // TODO: Retry if the device is disconnected? The retry won't accomplish anything in this case and is confusing from a user perspective.
      }
    },
    renderLineChart (startTime, endTime) {
      lineChart.reset()
      let startIndexInMinutes = startTime * 60
      let endIndexInMinutes = endTime * 60 - 1
      if (endIndexInMinutes > storedData.length) {
        endIndexInMinutes = storedData.length - 1
      }
      for (let i = startIndexInMinutes; i <= endIndexInMinutes; i++) {
        let data = storedData[i]
        this.addToLineChart(data.hr, data.pef, data.date)
      }
      this.updateLineChartReferences()
      this.updatePlusMinusButtons()
    },

    addToLineChart (hr, pef, date) {
      if (hr > 30 && hr < 210) {
        // filter out unreasonable HR
        lineChart.hrs.push({ x: date, y: hr })
      }
      lineChart.pef.push({ x: date, y: pef })
      lineChart.labels.push(date)
    },
    updateLineChartReferences () {
      this.lineChart.data.datasets[0].data = lineChart.hrs
      this.lineChart.data.datasets[1].data = lineChart.pef
      this.lineChart.data.labels = lineChart.labels
      this.lineChart.update()
    },
    createPeakFlowLineChart () {
      let lineCtx = this.$refs.lineChart
      this.lineChart = new Chart.Scatter(lineCtx, {
        type: 'scatter',
        data: {
          labels: lineChart.labels,
          datasets: [
            {
              label: this.$t('studies.tasks.peakflow.weeks'),
              data: lineChart.hrs,
              backgroundColor: '#C74038',
              borderColor: '#C74038',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('studies.tasks.peakflow.pef'),
              data: lineChart.pef,
              backgroundColor: '#4038C7',
              borderColor: '#4038C7',
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
    lineChartAdd (amount) {
      this.currentStartWeek += amount
      this.currentEndWeek += amount
      this.renderLineChart(this.currentStartWeek, this.currentEndWeek)
      this.updatePlusMinusButtons()
    },
    updatePlusMinusButtons () {
      if (this.currentStartWeek === 0) {
        this.disableMinus = true
      } else {
        this.disableMinus = false
      }
      if (this.currentEndWeek >= (storedData.length)) {
        this.disablePlus = true
      } else {
        this.disablePlus = false
      }
    },
    completeTest () {
      this.$router.push('/home')
    }
  },
  async mounted () {
    this.createActivityLineChart()
    await this.downloadData()
  },
  computed: {
    totalTime () {
      return Math.floor((this.report.completionTS - this.report.startedTS) / 1000)
    },
    minutes () {
      return Qformat.pad(Math.floor(this.totalTime / 60))
    },
    seconds () {
      return Math.floor(this.totalTime - (this.minutes * 60))
    }
  }
}
</script>
