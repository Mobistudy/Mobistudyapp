<template>
  <q-page padding>
    <!-- content -->
    <div class="chart-container" style="position: relative; height:50vh; width:80vw; margin-left: auto; margin-right: auto">
      <canvas id="chart"></canvas>
    </div>
  </q-page>
</template>

<script>
// let science = require('science')
let chartjs = require('chart.js')
let Thresholding = require('src/modules/thresholding').Thresholding

export default {
  // name: 'PageName',
  mounted () {
    let data = [...Array.from({length: 20000}, () => Math.floor(Math.random() * 10)), ...Array.from({length: 10000}, () => Math.floor(Math.random() * 10 + 50))]

    let ctx = document.getElementById('chart')

    let thresholding = new Thresholding(data)
    let lineData = thresholding.pdf().y
    let cdf = thresholding.cdf().y
    let labels = thresholding.range
    let barData = thresholding.condenseData().y

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
        }, {
          id: 'B',
          type: 'linear',
          position: 'right'
        }, {
          id: 'C',
          type: 'linear',
          position: 'right'
        }]
      }
    }

    console.log(lineData.reduce((a, b) => a + b, 0))

    // eslint-disable-next-line no-unused-vars,new-cap
    let chart = new chartjs(ctx, {
      type: 'bar',
      options: chartJSOptions,
      data: {
        datasets: [{
          label: 'Raw Data',
          yAxisID: 'A',
          data: barData
        }, {
          label: 'PDF',
          yAxisID: 'B',
          data: lineData,
          type: 'line'
        }, {
          label: 'CDF',
          yAxisID: 'C',
          data: cdf,
          type: 'line'
        }],
        labels: labels
      }
    })
  }
}
</script>

<style>
</style>
