<template>
  <q-page id="main">
    <div v-show="!isDownloading">
      <p class="q-pa-md mobitxt1">{{ $t('tasks.miband3.chartsIntro') }}</p>
      <div class="text-center text-h6">
        {{ $t('tasks.miband3.lineChart') }}
      </div>
      <div class="q-pa-md">
        <canvas style="margin: 0 auto; padding-right: 2rem;" height="320" ref="lineChart" />
        <div class="row justify-around">
          <q-btn :label="'-12 ' + $t('tasks.miband3.hours')" color="secondary" :disable="disableMinus"
            @click="lineChartAdd((-12))" />
          <q-btn :label="'+12 ' + $t('tasks.miband3.hours')" color="secondary" :disable="disablePlus"
            @click="lineChartAdd((12))" />
        </div>
      </div>
      <q-separator></q-separator>
      <div class="text-center text-h6">
        {{ $t('tasks.miband3.pieChart') }}
      </div>
      <div class="q-pa-md">
        <canvas ref="pieChart" height="270"></canvas>
      </div>
      <q-separator></q-separator>
      <div class="row justify-around q-my-lg">
        <q-btn class="mobibtn" color="negative" :loading="sending" :label="$t('common.discard')" @click="discard()" />
        <q-btn class="mobibtn" color="primary" :loading="sending" :label="$t('common.send')" @click="send()" />
      </div>
    </div>

    <q-inner-loading :showing="isDownloading">
      <div class="mobitxt2">{{ $t('tasks.miband3.dataDownload') }}</div>
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import i18nCommon from '@i18n/common'
import i18nMiband3 from '@i18n/tasks/miband3'
import { mergeDeep } from '@shared/tools'

import miband3 from '@shared/devices/miband3'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'

import { getStringIdentifier } from '@shared/devices/miband3/miband3ActivityTypeEnum.js'
import db from '@shared/db'
import session from '@shared/session'
import API from '@shared/API'
import phone from '@shared/phone'

import { DateTime } from 'luxon'

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
const minimumDataRequired = 30 // 30 minutes of data is required at a minimum to upload the data

// pie chart configuration
const pieChartConfig = {
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
const lineChartData = {
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
// holder of the chart instance
let lineChart

export default {
  name: 'MiBand3DownloadPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nMiband3)
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      startDate: new Date(),
      deviceInfo: {},
      isDownloading: false,
      currentStartHour: 0,
      currentEndHour: 12,
      disableMinus: true,
      disablePlus: false,
      sending: false,
      report: {}
    }
  },

  methods: {
    async downloadData () {
      this.isDownloading = true

      const userSession = session.getUserSession()

      this.report = {
        userKey: userSession.user.userKey,
        participantKey: userSession.user.participantKey,
        studyKey: this.studyKey,
        taskId: Number(this.taskId),
        createdTS: new Date(),
        taskType: 'miband3',
        phone: phone.device,
        summary: {
          startedTS: new Date(),
          completedTS: new Date()
        }
      }

      // reset the charts stuff in case it has been partially filled
      storedData = []
      pieChartConfig.reset()
      lineChartData.reset()

      this.startDate = await this.getDateToUseForDownload()
      try {
        this.deviceInfo = await miband3.getDeviceInfo()
        await miband3.getStoredData(this.startDate, this.dataCallback)

        try {
          await miband3.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('cannot disconnect miband3', err)
        }

        if (storedData.length < minimumDataRequired) { // If less than 30 minutes of data exists, show page which describes to little data is found, wait and come back next time.
          await this.storeDownloadDate(this.startDate) // by storing this, we make sure to retrieve the data from the time the data was not enough instead of from today - period (which depends on when the user performs the task)
          // TODO: should we also store that the task is completed?
          this.$router.replace({ name: 'miband3NoData' })
          return
        }

        this.createPieChart()
        this.renderLineChart(this.currentStartHour, this.currentEndHour)

        this.report.summary.length = storedData.length
        this.report.summary.completedTS = new Date()
        this.report.summary.firstTS = storedData[0].date
        this.report.summary.lastTS = storedData[storedData.length - 1].date
        this.report.data = {
          device: this.deviceInfo,
          activity: storedData
        }

        this.isDownloading = false
      } catch (err) {
        console.error('cannot download data', err)
        this.showErrorDialog() // TODO: Retry if the device is disconnected? The retry won't accomplish anything in this case and is confusing from a user perspective. ?? Retry moves to Connect page, make sure i am disconnected.
      }
    },
    async storeDownloadDate (date) {
      // Update task
      const consentedTask = await db.getStudyParticipationTaskItemConsent(this.studyKey, this.taskId)
      consentedTask.lastMiband3SampleTS = date
      await db.setStudyParticipationTaskItemConsent(this.studyKey, this.taskId, consentedTask)
      return consentedTask
    },
    getLatestDownloadedSampleDate () {
      return storedData[storedData.length - 1].date
    },
    /**
     * Retreives the latest date the data was downloaded
     * or if it's the first time it uses the scheduling information
     */
    async getDateToUseForDownload () {
      let startDate
      const consentedTask = await db.getStudyParticipationTaskItemConsent(this.studyKey, this.taskId)
      const latestSampleTS = consentedTask.lastMiband3SampleTS
      if (latestSampleTS) {
        startDate = new Date(latestSampleTS)
      } else {
        const taskDescription = await db.getTaskDescription(this.studyKey, this.taskId)
        const lastExecuted = taskDescription.lastExecuted
        if (lastExecuted) {
          startDate = new Date(lastExecuted)
        } else {
          // use the scheduling information
          let dt = DateTime.now()
          const intervalType = taskDescription.scheduling.intervalType
          const interval = taskDescription.scheduling.interval
          if (intervalType === 'd') {
            dt = dt.minus({ days: interval })
          } else if (intervalType === 'w') {
            dt = dt.minus({ weeks: interval })
          } else if (intervalType === 'm') {
            dt = dt.minus({ months: interval })
          } else if (intervalType === 'y') {
            dt = dt.minus({ years: interval })
          }
          startDate = dt.toJSDate()
        }
      }
      return startDate
    },
    /**
    * Renders the line chart data between the two specific parameters, end and start in hours.
    * The parameters are converted to minutes. And because there is a stored sample
    * minute by minute in the storedData, the start and end time are re-calculated in minutes
    * and this will be the indexes of the corresponding samples.
    */
    renderLineChart (startTime, endTime) {
      lineChartData.reset()
      const startIndexInMinutes = startTime * 60
      let endIndexInMinutes = endTime * 60 - 1
      if (endIndexInMinutes >= storedData.length) {
        endIndexInMinutes = storedData.length - 1
      }
      for (let i = startIndexInMinutes; i <= endIndexInMinutes; i++) {
        const data = storedData[i]
        this.addToLineChart(data.hr, data.intensity, data.steps, data.date)
      }
      this.updateLineChartReferences()
      this.updatePlusMinusButtons() // Could be placed somewhere else but is needed at start in case data size < 12 hours worth
    },

    showErrorDialog () {
      this.$q.dialog({
        title: this.$t('errors.error'),
        message: this.$t('tasks.miband3.dataDownloadError'),
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
      this.$router.go(-1)
    },
    dataCallback (data) {
      // collects data from the miband and prepares the charts
      storedData.push(data)
    },

    addToLineChart (hr, intensity, steps, date) {
      if (hr > 30 && hr < 210) {
        // filter out unreasonable HR
        lineChartData.hrs.push({ x: date, y: hr })
      }
      lineChartData.intensities.push({ x: date, y: intensity })
      lineChartData.steps.push({ x: date, y: steps })
      lineChartData.labels.push(date)
    },

    createPieChart () {
      // create the configuration object
      for (const datapoint of storedData) {
        const activityType = datapoint.activityType
        const name = getStringIdentifier(activityType)
        if (pieChartConfig.indexes[name] === undefined) {
          pieChartConfig.maxIndex++
          const index = pieChartConfig.maxIndex
          pieChartConfig.indexes[name] = index
          pieChartConfig.data.datasets[0].data[index] = 1
          pieChartConfig.data.datasets[0].backgroundColor[index] = chartColors[index]
          pieChartConfig.data.labels.push(this.$t('tasks.miband3.activityTypes.' + name))
        } else {
          const index = pieChartConfig.indexes[name]
          pieChartConfig.data.datasets[0].data[index]++
        }
      }
      // create the chart
      const pieCtx = this.$refs.pieChart
      // eslint-disable-next-line no-new
      new Chart(pieCtx, pieChartConfig)
    },

    updateLineChartReferences () {
      lineChart.data.datasets[0].data = lineChartData.hrs
      lineChart.data.datasets[1].data = lineChartData.intensities
      lineChart.data.datasets[2].data = lineChartData.steps
      lineChart.data.labels = lineChartData.labels
      lineChart.update()
    },

    createActivityLineChart () {
      // console.log(lineChartData)

      const lineCtx = this.$refs.lineChart
      lineChart = new Chart(lineCtx, {
        type: 'scatter',
        data: {
          labels: lineChartData.labels,
          datasets: [
            {
              label: this.$t('tasks.miband3.hrs'),
              data: lineChartData.hrs,
              backgroundColor: '#C74038',
              borderColor: '#C74038',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('tasks.miband3.intensities'),
              data: lineChartData.intensities,
              backgroundColor: '#4038C7',
              borderColor: '#4038C7',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('tasks.miband3.steps'),
              data: lineChartData.steps,
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
            x: {
              type: 'time',
              time: {
                // Luxon format string
                tooltipFormat: 'HH:mm:ss'
              },
              title: {
                display: true,
                text: 'time'
              }
            },
            y: {
              title: {
                display: true,
                text: 'value'
              }
            }
          }
        }
      })
      lineChart.update()
    },
    lineChartAdd (amount) {
      this.currentStartHour += amount
      this.currentEndHour += amount
      this.renderLineChart(this.currentStartHour, this.currentEndHour)
      this.updatePlusMinusButtons()
    },
    updatePlusMinusButtons () {
      if (this.currentStartHour === 0) {
        this.disableMinus = true
      } else {
        this.disableMinus = false
      }
      if (this.currentEndHour >= (storedData.length / 60)) {
        this.disablePlus = true
      } else {
        this.disablePlus = false
      }
    },
    async send () {
      this.sending = true

      try {
        await API.sendTasksResults(this.report)
        await this.storeDownloadDate(this.getLatestDownloadedSampleDate())
        const newTaskItemConsent = await this.storeDownloadDate(this.getLatestDownloadedSampleDate())
        await API.updateTaskItemConsent(this.user._key, this.report.studyKey, this.report.taskId, newTaskItemConsent)

        await db.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.$router.go(-1)
      } catch (error) {
        this.sending = false
        console.error(error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
      console.log(this.report)
    },
    async discard () {
      this.$router.go(-1)
    }
  },
  async mounted () {
    this.createActivityLineChart()
    await this.downloadData()
  },
  async beforeUnmount () {
    try {
      await miband3.disconnect()
    } catch (err) {
      // doesn't matter if it fails here, but let's print out a message on console
      console.error('cannot disconnect miband3', err)
    }
  }
}
</script>
