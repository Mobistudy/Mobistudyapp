<template>
  <q-page padding>
    <!-- content -->
    <q-tabs underline-color="secondary" align="center" class="">
      <q-tab name="heart_rate" @click="changeTab('heart_rate')" default slot="title" icon="favorite_border" label="Heart Rate" />
      <q-tab name="steps" @click="changeTab('steps')" slot="title" icon="directions_walk" label="Steps" />
      <q-tab name="calories" @click="changeTab('calories')" slot="title" icon="whatshot" label="Calories" />

      <!--<q-tab-pane name="heart_rate">-->
        <!--<div class="chart-container" style="position: relative; height:66vh; width:80vw; margin-left: auto; margin-right: auto">-->
          <!--<canvas id="chart_heart_rate"></canvas>-->
        <!--</div>-->
      <!--</q-tab-pane>-->
      <!--<q-tab-pane name="steps">-->
        <!--<div class="chart-container" style="position: relative; height:66vh; width:80vw; margin-left: auto; margin-right: auto">-->
          <!--<canvas id="chart_steps"></canvas>-->
        <!--</div>-->
      <!--</q-tab-pane>-->
      <!--<q-tab-pane name="calories">-->
        <!--<div class="chart-container" style="position: relative; height:66vh; width:80vw; margin-left: auto; margin-right: auto">-->
          <!--<canvas id="chart_calories"></canvas>-->
        <!--</div>-->
      <!--</q-tab-pane>-->
    </q-tabs>

    <br />
    <div class="chart-container" id="div_heart_rate" style="position: relative; height:66vh; width:80vw; margin-left: auto; margin-right: auto">
      <canvas id="chart_heart_rate"></canvas>
    </div>
    <div class="chart-container" id="div_steps" style="position: relative; height:66vh; width:80vw; margin-left: auto; margin-right: auto">
      <canvas id="chart_steps"></canvas>
    </div>
    <div class="chart-container" id="div_calories" style="position: relative; height:66vh; width:80vw; margin-left: auto; margin-right: auto">
      <canvas id="chart_calories"></canvas>
    </div>
  </q-page>
</template>

<script>
// let science = require('science')
let chartjs = require('chart.js')
let Thresholding = require('../modules/thresholding').Thresholding
let moment = require('moment')
let tabs = ['heart_rate', 'steps', 'calories']

export default {
  // name: 'PageName',
  mounted () {
    let _this = this

    this.$q.loading.show()

    let i = 0

    function getPerms () {
      return new Promise(function (resolve, reject) {
        navigator.health.requestAuthorization([{read: tabs}], function () {
          resolve()
        }, function (err) {
          reject(err)
        })
      })
    }

    function getTabChart (iter) {
      console.log(iter)
      let dataType = tabs[iter]
      return getHealthData(this, dataType)
        .then(function (res) {
          return plotChart(res, dataType)
        })
        .then(function (res) {
          if (i < tabs.length) {
            i++
            return getTabChart(i)
          }
        })
        .then(function () {
          _this.$q.loading.hide()
        })
        .catch(function (err) {
          console.log(err)
          if (i < tabs.length) {
            i++
            return getTabChart(i)
          }
        })
    }

    getPerms()
      .then(getTabChart(0))
      .catch(function (err) {
        _this.$q.loading.hide()
        console.log(err)
        _this.$q.notify({
          color: 'negative',
          message: 'Charting failed: ' + err,
          icon: 'report_problem'
        })
      })

    this.changeTab('heart_rate')

    // this.changeTab('heart_rate')
    // Generate random uniform data
    // let data = [...Array.from({length: 20000}, () => Math.floor(Math.random() * 10)), ...Array.from({length: 10000}, () => Math.floor(Math.random() * 10 + 30))]
    // Sample HR data
    // let data = [60, 61, 60, 64, 62, 57, 59, 58, 59, 58, 57, 58, 59, 60, 59, 60, 61, 58, 57, 61, 63, 62, 59, 69, 62, 60, 61, 62, 63, 60, 62, 63, 64, 65, 55, 57, 56, 58, 57, 58, 62, 58, 60, 56, 57, 58, 59, 60, 58, 57, 60, 74, 81, 82, 64, 62, 67, 68, 70, 68, 67, 73, 78, 72, 69, 71, 72, 64, 63, 62, 66, 63, 64, 63, 68, 65, 68, 67, 69, 77, 69, 68, 64, 67, 63, 65, 69, 63, 61, 60, 62, 64, 68, 62, 61, 67, 60, 62, 63, 59, 60, 59, 61, 60, 61, 59, 58, 60, 58, 61, 59, 57, 61, 59, 62, 59, 57, 60, 59, 61, 60, 58, 59, 62, 68, 60, 57, 59, 67, 58, 56, 58, 60, 61, 65, 60, 59, 60, 61, 60, 64, 63, 60, 59, 65, 63, 64, 63, 62, 63, 65, 64, 62, 63, 64, 60, 59, 60, 61, 62, 61, 62, 61, 62, 60, 62, 63, 62, 63, 65, 66, 65, 68, 60, 59, 62, 69, 73, 60, 58, 61, 67, 61, 62, 61, 59, 61, 59, 58, 59, 57, 61, 64, 60, 58, 59, 56, 61, 62, 65, 60, 59, 61, 60, 58, 57, 58, 63, 61, 56, 57, 55, 58, 56, 53, 56, 59, 60, 59, 63, 60, 58, 57, 59, 60, 61, 63, 62, 60, 57, 59, 60, 63, 61, 58, 61, 59, 60, 61, 60, 59, 63, 57, 56, 57, 56, 57, 56, 58, 57, 58, 57, 58, 57, 58, 60, 64, 56, 57, 59, 69, 57, 58, 57, 59, 63, 71, 60, 62, 60, 59, 67, 64, 62, 65, 62, 67, 66, 69, 75, 67, 66, 69, 64, 62, 63, 60, 58, 68, 73, 66, 62, 61, 66, 69, 68, 69, 68, 67, 77, 83, 91, 82, 74, 72, 74, 78, 97, 91, 70, 61, 57, 67, 80, 89, 87, 95, 87, 73, 71, 63, 62, 73, 74, 75, 76, 73, 68, 78, 72, 69, 72, 73, 76, 72, 70, 68, 75, 82, 77, 73, 74, 79, 80, 83, 77, 81, 84, 83, 89, 87, 88, 89, 87, 90, 100, 97, 88, 84, 85, 84, 81, 82, 111, 125, 109, 103, 98, 94, 92, 93, 96, 103, 94, 96, 104, 109, 106, 101, 104, 109, 112, 110, 106, 107, 101, 91, 94, 88, 86, 88, 85, 87, 88, 90, 94, 90, 87, 86, 85, 84, 86, 83, 80, 84, 118, 124, 122, 109, 84, 97, 93, 91, 84, 75, 74, 83, 84, 83, 86, 83, 80, 84, 89, 84, 87, 83, 88, 89, 86, 83, 92, 94, 93, 95, 96, 89, 87, 88, 119, 103, 87, 83, 90, 86, 80, 82, 80, 82, 79, 84, 97, 105, 110, 132, 120, 103, 94, 96, 108, 114, 113, 115, 123, 114, 111, 109, 108, 112, 108, 114, 112, 114, 108, 103, 101, 111, 103, 102, 100, 99, 97, 93, 99, 106, 100, 105, 112, 108, 117, 115, 108, 104, 108, 107, 103, 109, 110, 114, 107, 95, 111, 116, 110, 107, 112, 110, 104, 108, 103, 105, 106, 99, 98, 107, 103, 105, 110, 116, 114, 111, 108, 101, 100, 99, 107, 104, 103, 104, 106, 113, 102, 112, 113, 108, 104, 101, 99, 60, 61, 60, 64, 62, 57, 59, 58, 59, 58, 57, 58, 59, 60, 59, 60, 61, 58, 57, 61, 63, 62, 59, 69, 62, 60, 61, 62, 63, 60, 62, 63, 64, 65, 55, 57, 56, 58, 57, 58, 62, 58, 60, 56, 57, 58, 59, 60, 58, 57, 60, 74, 81, 82, 64, 62, 67, 68, 70, 68, 67, 73, 78, 72, 69, 71, 72, 64, 63, 62, 66, 63, 64, 63, 68, 65, 68, 67, 69, 77, 69, 68, 64, 67, 63, 65, 69, 63, 61, 60, 62, 64, 68, 62, 61, 67, 60, 62, 63, 59, 60, 59, 61, 60, 61, 59, 58, 60, 58, 61, 59, 57, 61, 59, 62, 59, 57, 60, 59, 61, 60, 58, 59, 62, 68, 60, 57, 59, 67, 58, 56, 58, 60, 61, 65, 60, 59, 60, 61, 60, 64, 63, 60, 59, 65, 63, 64, 63, 62, 63, 65, 64, 62, 63, 64, 60, 59, 60, 61, 62, 61, 62, 61, 62, 60, 62, 63, 62, 63, 65, 66, 65, 68, 60, 59, 62, 69, 73, 60, 58, 61, 67, 61, 62, 61, 59, 61, 59, 58, 59, 57, 61, 64, 60, 58, 59, 56, 61, 62, 65, 60, 59, 61, 60, 58, 57, 58, 63, 61, 56, 57, 55, 58, 56, 53, 56, 59, 60, 59, 63, 60, 58, 57, 59, 60, 61, 63, 62, 60, 57, 59, 60, 63, 61, 58, 61, 59, 60, 61, 60, 59, 63, 57, 56, 57, 56, 57, 56, 58, 57, 58, 57, 58, 57, 58, 60, 64, 56, 57, 59, 69, 57, 58, 57, 59, 63, 71, 60, 62, 60, 59, 67, 64, 62, 65, 62, 67, 66, 69, 75, 67, 66, 69, 64, 62, 63, 60, 58, 68, 73, 66, 62, 61, 66, 69, 68, 69, 68, 67, 77, 83, 91, 82, 74, 72, 74, 78, 97, 91, 70, 61, 57, 67, 80, 89, 87, 95, 87, 73, 71, 63, 62, 73, 74, 75, 76, 73, 68, 78, 72, 69, 72, 73, 76, 72, 70, 68, 75, 82, 77, 73, 74, 79, 80, 83, 77, 81, 84, 83, 89, 87, 88, 89, 87, 90, 100, 97, 88, 84, 85, 84, 81, 82, 111, 125, 109, 103, 98, 94, 92, 93, 96, 103, 94, 96, 104, 109, 106, 101, 104, 109, 112, 110, 106, 107, 101, 91, 94, 88, 86, 88, 85, 87, 88, 90, 94, 90, 87, 86, 85, 84, 86, 83, 80, 84, 118, 124, 122, 109, 84, 97, 93, 91, 84, 75, 74, 83, 84, 83, 86, 83, 80, 84, 89, 84, 87, 83, 88, 89, 86, 83, 92, 94, 93, 95, 96, 89, 87, 88, 119, 103, 87, 83, 90, 86, 80, 82, 80, 82, 79, 84, 97, 105, 110, 132, 120, 103, 94, 96, 108, 114, 113, 115, 123, 114, 111, 109, 108, 112, 108, 114, 112, 114, 108, 103, 101, 111, 103, 102, 100, 99, 97, 93, 99, 106, 100, 105, 112, 108, 117, 115, 108, 104, 108, 107, 103, 109, 110, 114, 107, 95, 111, 116, 110, 107, 112, 110, 104, 108, 103, 105, 106, 99, 98, 107, 103, 105, 110, 116, 114, 111, 108, 101, 100, 99, 107, 104, 103, 104, 106, 113, 102, 112, 113, 108, 104, 101, 99, 114, 110, 99, 98, 93, 92, 77, 89, 73, 64, 68, 85, 88, 95, 103, 98, 99, 109, 114, 92, 88, 91, 73, 80, 82, 71, 88, 91, 104, 103, 84, 70, 65, 68, 79, 96, 105, 96, 93, 81, 79, 77, 78, 82, 84, 83, 82, 81, 82, 85, 83, 82, 81, 95, 87, 79, 72, 71, 77, 83, 77, 79, 77, 74, 81, 78, 81, 75, 85, 90, 83, 85, 112, 111, 105, 84, 76, 73, 72, 93, 99, 107, 84, 71, 65, 64, 71, 79, 96, 105, 91, 77, 79, 80, 79, 92, 82, 90, 101, 98, 128, 110, 96, 79, 72, 69, 67, 65, 73, 75, 77, 110, 112, 111, 113, 114, 111, 114, 112, 107, 103, 96, 102, 109, 106, 108, 132, 138, 127, 105, 104, 112, 121, 99, 86, 79, 93, 79, 78, 77, 95, 97, 83, 77, 93, 98, 94, 85, 76, 69, 78, 85, 82, 79, 89, 81, 76, 74, 76, 78, 83, 81, 78, 77, 76, 72, 73, 99, 103, 108, 100, 99, 103, 101, 106, 95, 82, 77, 76, 75, 74, 73, 72, 73, 76, 75, 76, 77, 78, 86, 85, 81, 84, 79, 87, 83, 78, 77, 78, 79, 81, 82, 81, 80, 81, 84, 86, 85, 83, 82, 81, 82, 83, 80, 81, 80, 82, 101, 88, 96, 102, 114, 105, 88, 82, 84, 94, 99, 83, 87, 77, 63, 67, 80, 79, 76, 86, 92, 89, 75, 71, 70, 76, 79, 94, 75, 71, 74, 76, 75, 76, 84, 94]
    // let timeData = []
    // let now = new Date()
    // for (let i = 0; i < data.length; i++) {
    //   let date = new Date(now.getTime() + i * 60000)
    //   timeData.push(date)
    // }

    // let labels = Array.apply(null, {length: data.length}).map(Number.call, Number)
  },
  methods: {
    changeTab (dataType) {
      for (let i = 0; i < tabs.length; i++) {
        document.getElementById('div_' + tabs[i]).style.setProperty('display', 'none')
      }
      document.getElementById('div_' + dataType).style.setProperty('display', 'block')
    }
    // changeTab (dataType) {
    //   getHealthData(this, dataType)
    //     .then(function (res) {
    //       console.log(res)
    //       let x = []
    //       let y = []
    //       for (let i = 0; i < res.length; i++) {
    //         // if (res[i].value !== 0) {
    //         x.push(res[i].startDate)
    //         y.push(res[i].value)
    //         // }
    //       }
    //       let ctx = document.getElementById('chart')
    //       let thresholding = new Thresholding(y)
    //       // let lineData = thresholding.pdf().y
    //       // let cdf = thresholding.cdf().y
    //       // let labels = thresholding.range
    //       // let barData = thresholding.condenseData().y
    //
    //       console.log(thresholding)
    //
    //       // eslint-disable-next-line no-unused-vars
    //       let chartJSOptions = {
    //         maintainAspectRatio: false,
    //         scales: {
    //           // yAxes: [{
    //           //   ticks: {
    //           //     beginAtZero: true
    //           //   }
    //           // }]
    //           yAxes: [{
    //             id: 'A',
    //             type: 'linear',
    //             position: 'left'
    //           }],
    //           xAxes: [{
    //             type: 'time'
    //           }]
    //         }
    //       }
    //
    //       let upperPercent = 95
    //       let lowerPercent = 5
    //
    //       let upper = new Array(y.length).fill(thresholding.percentile(upperPercent))
    //       let lower = new Array(y.length).fill(thresholding.percentile(lowerPercent))
    //
    //       console.log(thresholding.percentile(upperPercent))
    //       console.log(thresholding.percentile(lowerPercent))
    //
    //       // Sums PDF as a check to ensure that it adds up to 1
    //       // console.log(lineData.reduce((a, b) => a + b, 0))
    //
    //       if (dataType === 'heart_rate') {
    //         // eslint-disable-next-line no-unused-vars,new-cap
    //         let chart = new chartjs(ctx, {
    //           type: 'line',
    //           options: chartJSOptions,
    //           data: {
    //             datasets: [{
    //               label: 'Raw Data',
    //               yAxisID: 'A',
    //               data: y,
    //               fill: false,
    //               pointRadius: 0,
    //               lineTension: 0
    //             }, {
    //               label: upperPercent + ' Percent',
    //               data: upper,
    //               fill: 'end',
    //               pointRadius: 0,
    //               backgroundColor: 'rgba(153,0,0,0.3)'
    //             }, {
    //               label: lowerPercent + ' Percent',
    //               data: lower,
    //               fill: 'start',
    //               pointRadius: 0,
    //               backgroundColor: 'rgba(153,0,0,0.3)'
    //             }],
    //             labels: x
    //           }
    //         })
    //       } else if (dataType === 'calories' || dataType === 'steps') {
    //         // eslint-disable-next-line no-unused-vars,new-cap
    //         let chart = new chartjs(ctx, {
    //           type: 'bar',
    //           options: chartJSOptions,
    //           data: {
    //             datasets: [{
    //               label: 'Raw Data',
    //               yAxisID: 'A',
    //               data: y,
    //               fill: false,
    //               pointRadius: 0,
    //               lineTension: 0
    //             }, {
    //               label: upperPercent + ' Percent',
    //               data: upper,
    //               fill: 'end',
    //               pointRadius: 0,
    //               backgroundColor: 'rgba(153,0,0,0.3)',
    //               type: 'line'
    //             }, {
    //               label: lowerPercent + ' Percent',
    //               data: lower,
    //               fill: 'start',
    //               pointRadius: 0,
    //               backgroundColor: 'rgba(153,0,0,0.3)',
    //               type: 'line'
    //             }],
    //             labels: x
    //           }
    //         })
    //       }
    //     })
    // }
  }
}

function getHealthData (_this, dataType) {
  let checkHealthAvailibility = new Promise(function (resolve, reject) {
    navigator.health.isAvailable(function (available) {
      if (available) {
        resolve()
      } else {
        if (_this.$q.platform.is.android) {
          navigator.health.promptInstallFit(function () {
            reject(new Error('Please install Google Fit and relaunch'))
          }, function (err) {
            reject(err)
          })
        } else {
          reject(new Error('Apple HealthKit or Google Fit is unavailable'))
        }
      }
    })
  })

  // function getHealthAuthorisation () {
  //   return new Promise(function (resolve, reject) {
  //     navigator.health.requestAuthorization([{read: [dataType]}], function () {
  //       resolve()
  //     }, function (err) {
  //       reject(err)
  //     })
  //   })
  // }
  //
  // function checkHealthAuthroisation () {
  //   return new Promise(function (resolve, reject) {
  //     navigator.health.isAuthorized([{read: [dataType]}], function (authorised) {
  //       if (authorised) {
  //         resolve()
  //       } else {
  //         reject(new Error('App is not authorised'))
  //       }
  //     }, function (err) {
  //       reject(err)
  //     })
  //   })
  // }

  function queryHealth () {
    return new Promise(function (resolve, reject) {
      // Generate Start Date
      let startDate = moment().subtract(31, 'days').toDate()

      let aggregated
      let bucket
      if (dataType === 'heart_rate') {
        aggregated = false
      } else if (dataType === 'calories' || dataType === 'steps') {
        aggregated = true
        bucket = 'day'
      }

      if (aggregated) {
        navigator.health.queryAggregated({
          startDate: startDate,
          endDate: new Date(),
          dataType: dataType,
          bucket: bucket // Optional
        }, (data) => resolve(data), (err) => reject(err))
      } else {
        navigator.health.query({
          startDate: startDate,
          endDate: new Date(),
          dataType: dataType
        }, (data) => resolve(data), (err) => reject(err))
      }
    })
  }

  return checkHealthAvailibility
    .then(queryHealth)
}

function plotChart (res, dataType) {
  return new Promise(function (resolve, reject) {
    console.log(res)
    if (res.length === 0) {
      document.getElementById('div_' + dataType).innerHTML = 'No Data Available'
      return true
    }

    let x = []
    let y = []
    let xchart = []
    let ychart = []

    for (let i = 0; i < res.length; i++) {
      x.push(res[i].startDate)
      y.push(res[i].value)

      if (moment(res[i].startDate).isSameOrAfter(moment().subtract(8, 'days'))) {
        xchart.push(res[i].startDate)
        ychart.push(res[i].value)
      }
    }
    let ctx = document.getElementById('chart_' + dataType)
    let thresholding = new Thresholding(y)
    // let lineData = thresholding.pdf().y
    // let cdf = thresholding.cdf().y
    // let labels = thresholding.range
    // let barData = thresholding.condenseData().y

    console.log(thresholding)

    // eslint-disable-next-line no-unused-vars
    let chartJSOptions = {
      maintainAspectRatio: false,
      scales: {
        // yAxes: [{
        //   ticks: {
        //     beginAtZero: true
        //   }
        // }]
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left'
        }],
        xAxes: [{
          type: 'time',
          bounds: 'data'
        }]
      },
      legend: {
        display: false
      }
    }

    let upperPercent = 95
    let lowerPercent = 5

    let upper = new Array(ychart.length).fill(thresholding.percentile(upperPercent))
    let lower = new Array(ychart.length).fill(thresholding.percentile(lowerPercent))

    console.log(thresholding.percentile(upperPercent))
    console.log(thresholding.percentile(lowerPercent))

    // Sums PDF as a check to ensure that it adds up to 1
    // console.log(lineData.reduce((a, b) => a + b, 0))

    if (dataType === 'heart_rate') {
      // eslint-disable-next-line no-unused-vars,new-cap
      let chart = new chartjs(ctx, {
        type: 'line',
        options: chartJSOptions,
        data: {
          datasets: [{
            label: 'Raw Data',
            yAxisID: 'A',
            data: ychart,
            fill: false,
            pointRadius: 0,
            lineTension: 0
          }, {
            label: upperPercent + ' Percent',
            data: upper,
            fill: 'end',
            pointRadius: 0,
            backgroundColor: 'rgba(153,0,0,0.3)'
          }, {
            label: lowerPercent + ' Percent',
            data: lower,
            fill: 'start',
            pointRadius: 0,
            backgroundColor: 'rgba(153,0,0,0.3)'
          }],
          labels: xchart
        }
      })
    } else if (dataType === 'calories' || dataType === 'steps') {
      // eslint-disable-next-line no-unused-vars,new-cap
      let chart = new chartjs(ctx, {
        type: 'bar',
        options: chartJSOptions,
        data: {
          datasets: [{
            label: 'Raw Data',
            yAxisID: 'A',
            data: ychart,
            fill: false,
            pointRadius: 0,
            lineTension: 0
          }, {
            label: upperPercent + ' Percent',
            data: upper,
            fill: 'end',
            pointRadius: 0,
            backgroundColor: 'rgba(153,0,0,0.3)',
            type: 'line'
          }, {
            label: lowerPercent + ' Percent',
            data: lower,
            fill: 'start',
            pointRadius: 0,
            backgroundColor: 'rgba(153,0,0,0.3)',
            type: 'line'
          }],
          labels: xchart
        }
      })
    }
    resolve()
  })
}
</script>

<style>
</style>
