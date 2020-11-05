<template>
    <div class="q-pa-md">
        <div id="buttonContainer" class="row justify-center items-center fixed-bottom">
            <q-btn v-ripple @click="downloadData" icon="get_app">Download</q-btn>
        </div>
        <q-dialog v-model="successDownloadDialog" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="width: 300px">
                <q-card-section>
                    <div class="text-h6 text-center">Download successful</div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-carousel
          v-model="slide"
          v-on:transition="handleSlide($event)"
          swipeable
          animated
          :navigation="navigation"
          :fullscreen="fullscreen"
          controlColor="primary"
          ref="carousel"
          class="row justify-center items-center"
          >
          <q-carousel-slide
            v-for="slide in slides"
            :key="slide.id"
            :name="slide.id"
          >
            <canvas ref="chart" width="400" height="400"></canvas>
            <q-btn @click="handleFinish" v-if="showFinish" flat class="fixed-bottom-right">Finish</q-btn>
          </q-carousel-slide>
        </q-carousel>
        <q-inner-loading :showing="downloading">
            <q-spinner-oval size="50px" color="primary" />
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
      downloading: false,
      successDownloadDialog: false,
      slide: 0,
      slides: [
        {
          id: 0,
          title: 'HR/Time',
          lineTitle: 'HR'
        },
        {
          id: 1,
          title: 'HR/Time',
          lineTitle: 'HR'
        }
      ],
      fullscreen: false,
      navigation: false,
      showFinish: false,
      myChart: undefined,
      myCtx: undefined,
      ctxs: [],
      charts: [],
      dataset: [],
      labels: [],
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
      console.log('Downloading data...')
      let currDate = new Date()
      this.showDownloading()
      await miband3.getStoredData(currDate, this.callback)
      this.hideDownloading()
      await this.animateSuccessDialog()
      this.showStats()
      this.createChart()
    },
    callback (error, data) {
      if (!error) {
        console.log(data)
        this.addToPieChart(data.activityType)
        this.addToHRChart(data.hr, data.date)
      }
    },
    addToPieChart (activity) {
      let indexToAdd = this.pieChartDataMap.get(activity)
      this.pieChartData[indexToAdd] = this.pieChartData[indexToAdd] + 1
    },
    addToHRChart (hr, date) {
      this.dataset.push({ x: date, y: hr })
    },
    showDownloading () {
      this.downloading = true
    },
    hideDownloading () {
      this.downloading = false
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
    showStats () {
      this.fullscreen = true
      this.navigation = true
    },
    handleSlide (currentSlideIndex) {
      console.log(currentSlideIndex)
      if (currentSlideIndex === 0) {
        this.createChart()
      } else if (currentSlideIndex === 1) {
        this.createPieChart()
      }

      if (currentSlideIndex === this.slides.length - 1) { // At last index of slides
        // Show finish button
        this.showFinish = true
      } else {
        this.showFinish = false
      }
    },
    handleFinish () {
      console.log('Finish button clicked')
      this.fullscreen = false
    },
    createPieChart () {
      this.myCtx = this.$refs.chart
      this.myChart = new Chart(this.myCtx, {
        type: 'doughnut',
        data: {
          labels: this.pieChartLabels,
          datasets: [{
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
    createChart () {
      this.myCtx = this.$refs.chart
      this.myChart = new Chart(this.myCtx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Heart rate',
              data: this.dataset,
              backgroundColor: 'rgba(255,99,132,05)',
              borderColor: 'rgba(255,99,132,05)',
              borderWidth: 1,
              pointRadius: 1,
              fill: false
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
                labelString: 'Date'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'value'
              }
            }]
          }
        }
      })
    },
    // Sets the index that the activity should add to once it is received.
    setupActivityMap () {
      console.log('Setting up map')
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
