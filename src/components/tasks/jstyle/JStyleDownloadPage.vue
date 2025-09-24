<template>
  <q-page padding id="main">
    <div v-show="!isDownloading">
      <p class="q-pa-md mobitxt1">{{ $t('tasks.jstyle.chartsIntro') }}</p>
      <div class="text-center text-h6">
        {{ $t('tasks.jstyle.lineChart') }}
      </div>
      <div class="q-pa-md">
        <canvas style="margin: 0 auto; padding-right: 2rem;" height="320" ref="lineChart" />
        <div class="row justify-around">
          <q-btn :label="'-12 ' + $t('tasks.jstyle.hours')" color="secondary" :disable="disableMinus"
            @click="lineChartAddHours((-12))" />
          <q-btn :label="'+12 ' + $t('tasks.jstyle.hours')" color="secondary" :disable="disablePlus"
            @click="lineChartAddHours((12))" />
        </div>
      </div>
      <q-separator></q-separator>
      <div class="row justify-around q-my-lg">
        <q-btn class="mobibtn" color="negative" :loading="sending" :label="$t('common.discard')" @click="discard()" />
        <q-btn class="mobibtn" color="primary" :loading="sending" :label="$t('common.send')" @click="send()" />
      </div>
    </div>

    <q-inner-loading :showing="isDownloading">
      <div class="mobitxt2">{{ $t('tasks.jstyle.dataDownload') }}</div>
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
const DEBUG = process.env.DEBUG

import i18nCommon from '@i18n/common'
import i18nJStyle from '@i18n/tasks/jstyle'
import { mergeDeep } from '@shared/tools'

import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'

import DB from '@shared/db'
import session from '@shared/session'
import API from '@shared/API'
import phone from '@shared/phone'

import { DateTime } from 'luxon'

const jstyle = session.getConnectedDevice()

// holders of all the stored data, this is kept outside of Vue for efficiency
let activitySummary = []
let activity = []
let hr = []
let hrv = []
let temperature = []
let spo2 = []
let sleep = []
let firstSampleDate = null
let lastSampleDate = null

// holder of the line chart data
const lineChartData = {
  hrs: [],
  steps: [],
  temperatures: [],
  reset () {
    this.hrs = []
    this.steps = []
    this.temperatures = []
  }
}
// holder of the chart instance
let lineChart

export default {
  name: 'JStyleDataDownloadPage',
  i18n: {
    messages: mergeDeep(i18nCommon, i18nJStyle)
  },
  props: ['studyKey', 'taskId'],
  data () {
    return {
      isDownloading: false,
      lineChartStartTS: null,
      lineChartEndTS: null,
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
        taskType: 'jstyle',
        phone: phone.device,
        summary: {
          startedTS: new Date(),
          completedTS: new Date()
        },
        data: {}
      }

      // reset the charts stuff in case it has been partially filled
      activitySummary = []
      activity = []
      hr = []
      hrv = []
      temperature = []
      spo2 = []
      sleep = []

      lineChartData.reset()

      const startDate = await this.getDateToUseForDownload()

      let downloadCompleted = false
      try {
        // get device info
        const name = await jstyle.getName()
        const mac = await jstyle.getMACAddress()
        const version = await jstyle.getDeviceVersion()
        const batt = await jstyle.getBatteryLevel()
        const autoHR = await jstyle.getAutoMode(1)
        const autoSPO2 = await jstyle.getAutoMode(2)
        const autoTemp = await jstyle.getAutoMode(3)
        const autoHRV = await jstyle.getAutoMode(4)

        this.report.data.device = {
          id: jstyle.id,
          name,
          mac,
          version,
          battery: batt,
          config: {
            autoHR,
            autoSPO2,
            autoTemp,
            autoHRV
          }
        }

        // get the activity summary
        activitySummary = await jstyle.getDailyActivitySummaryHistory(startDate)

        // get detailed activity data
        activity = await jstyle.getDetailedActivityHistory(startDate)

        // get HR
        hr = await jstyle.getHRHistory(startDate)

        // get HRV
        hrv = await jstyle.getHRVHistory(startDate)

        // get temperature
        temperature = await jstyle.getTemperatureHistory(startDate)

        // get SPO2
        spo2 = await jstyle.getSPO2History(startDate)

        // get sleep data
        sleep = await jstyle.getSleepHistory(startDate)

        if (DEBUG) console.log('Downloaded data', { activitySummary, activity, hr, hrv, temperature, spo2, sleep })
        downloadCompleted = true

        // delete the data from the watch to avoid downloading it again
        await jstyle.deleteDailyActivitySummaryHistory(startDate)
        await jstyle.deleteDetailedActivityHistory(startDate)
        await jstyle.deleteHRHistory(startDate)
        await jstyle.deleteHRVHistory(startDate)
        await jstyle.deleteTemperatureHistory(startDate)
        await jstyle.deleteSPO2History(startDate)
        await jstyle.deleteSleepHistory(startDate)

        try {
          if (DEBUG) console.log('Data fetch completed, disconnecting smartwatch')
          await jstyle.disconnect()
        } catch (err) {
          // doesn't matter if it fails here, but let's print out a message on console
          console.error('Cannot disconnect smartwatch but OK', err)
        }
      } catch (err) {
        if (!downloadCompleted) { // if data has been retrieved there is no need to show the error dialog
          console.error('Error while downloading data', err)
          this.showErrorDialog()
          return
        } else {
          console.error('Error while downloading data, but OK', err)
        }
      }

      // convert the timestamps to Date objects and find the start and end times
      const startDay = new Date(startDate.getTime())
      startDay.setHours(0, 0, 0, 0)
      for (let i = 0; i < activitySummary.length; i++) {
        const item = activitySummary[i]
        const date = `${item.year}-${item.month}-${item.day}`
        item.date = date
        // delete item.year
        // delete item.month
        // delete item.day
      }

      activity = this.processSamples(activity, startDate)
      hr = this.processSamples(hr, startDate)
      hrv = this.processSamples(hrv, startDate)
      temperature = this.processSamples(temperature, startDate)
      spo2 = this.processSamples(spo2, startDate)
      sleep = this.processSamples(sleep, startDate)

      this.lineChartStartTS = firstSampleDate
      this.lineChartEndTS = new Date(firstSampleDate.getTime() + (12 * 60 * 60 * 1000)) // 12 hours later

      this.renderLineChart()

      if (activitySummary) this.report.summary.activitySummary = activitySummary
      this.report.summary.completedTS = new Date()
      this.report.summary.firstTS = firstSampleDate
      this.report.summary.lastTS = lastSampleDate
      this.report.data.activity = activity
      this.report.data.hr = hr
      this.report.data.hrv = hrv
      this.report.data.temperature = temperature
      this.report.data.spo2 = spo2
      this.report.data.sleep = sleep

      this.isDownloading = false
    },

    /**
     * Converts timestamps to Date objects and finds the start and end times.
     * @param data The data array to process.
     */
    processSamples (data, startDate) {
      const newData = []
      for (const item of data) {
        const date = new Date(item.year, item.month - 1, item.day, item.hour, item.minutes, item.seconds)
        if (date < startDate) {
          // console.warn('Skipping old date', item)
          continue
        }
        if (item.hr && (item.hr < 30 || item.hr > 230)) {
          // console.warn('Skipping invalid hr', item)
          continue
        }
        item.date = date
        // delete item.year
        // delete item.month
        // delete item.day
        // delete item.hour
        // delete item.minutes
        // delete item.seconds

        if (!firstSampleDate || date < firstSampleDate) {
          firstSampleDate = date
        }
        if (!lastSampleDate || date > lastSampleDate) {
          lastSampleDate = date
        }
        newData.push(item)
      }
      return newData
    },

    /**
     * Stores the date of the last downloaded sample.
     * This is used to determine the next download date.
     * @param {Date} date
     */
    async storeDownloadDate (date) {
      // Update task
      const consentedTask = await DB.getStudyParticipationTaskItemConsent(this.studyKey, this.taskId)
      consentedTask.lastJStyleSampleTS = date
      return DB.setStudyParticipationTaskItemConsent(this.studyKey, this.taskId, consentedTask)
    },

    /**
     * Retreives the latest date the data was downloaded
     * or if it's the first time, it uses the current date.
     */
    async getDateToUseForDownload () {
      let startDate
      const consentedTask = await DB.getStudyParticipationTaskItemConsent(this.studyKey, this.taskId)
      const latestSampleTS = consentedTask.lastJStyleSampleTS
      if (latestSampleTS) {
        startDate = new Date(latestSampleTS)
      } else {
        const taskDescription = await DB.getTaskDescription(this.studyKey, this.taskId)
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
          } else {
            console.warn('Unknown interval type, default to 1 day', intervalType)
            dt = dt.minus({ days: 1 })
          }
          startDate = dt.toJSDate()
        }
      }

      return startDate
    },

    /**
    * Renders the line chart data between the two specific parameters, end and start in hours.
    */
    renderLineChart () {
      lineChartData.reset()

      for (const item of hr) {
        const date = item.date
        // remove the seconds from the date, this is because the smartwatch takes data every minute or multiple of minutes
        date.setSeconds(0, 0)
        if (date >= this.lineChartStartTS && date <= this.lineChartEndTS) {
          lineChartData.hrs.push({ x: date, y: item.hr })
        }
      }
      for (const item of activity) {
        const date = item.date
        if (date >= this.lineChartStartTS && date <= this.lineChartEndTS) {
          if (item.detailSteps && item.detailSteps.length > 0) {
            for (let i = 0; i < item.detailSteps.length; i++) {
              const step = item.detailSteps[i]
              if (step > 0) {
                const date = new Date(item.date - (60000 * i)) // each step record is 1 minute apart
                lineChartData.steps.push({ x: date, y: step })
              }
            }
          } else {
            lineChartData.steps.push({ x: date, y: item.steps })
          }
        }
      }

      for (const item of temperature) {
        const date = item.date
        if (date >= this.lineChartStartTS && date <= this.lineChartEndTS) {
          lineChartData.temperatures.push({ x: date, y: item.temperature })
        }
      }

      this.updateLineChartReferences()
      this.updatePlusMinusButtons() // Could be placed somewhere else but is needed at start in case data size < 12 hours worth
    },

    showErrorDialog () {
      this.$q.dialog({
        title: this.$t('errors.error'),
        message: this.$t('tasks.jstyle.dataDownloadError'),
        cancel: this.$t('common.cancel'),
        ok: this.$t('common.retry'),
        persistent: true,
        options: {
          type: 'toggle',
          model: [],
          // inline: true,
          items: [
            { label: this.$t('tasks.jstyle.connectionRepair'), value: 'forget', color: 'secondary' }
          ]
        }
      }).onOk(async (options) => {
        if (options && options.includes('forget')) {
          // repair requested, remove the device from DB and go back to connect page
          try {
            if (DEBUG) console.log('Repairing requested, disconnecting jstyle')
            await jstyle.disconnect()
          } catch (err) {
            console.error('Cannot disconnect but OK', err)
          }
          await DB.removeDeviceJStyle()
          this.$router.replace({ name: 'jstyleConnect', params: { studyKey: this.studyKey, taskId: this.taskId } })
          this.isDownloading = false
        } else {
          this.downloadData()
        }
      }).onCancel(() => {
        // cancel and go home
        this.cancelTask()
      })
    },

    async cancelTask () {
      // disconnects and go home
      try {
        console.log('Task cancelled, disconnecting jstyle')
        await jstyle.disconnect()
      } catch (err) {
        // doesn't matter if it fails here, but let's print out a message on console
        console.error('cannot disconnect jstyle, but OK', err)
      }
      this.$router.go(-1)
    },

    updateLineChartReferences () {
      lineChart.data.datasets[0].data = lineChartData.hrs
      lineChart.data.datasets[1].data = lineChartData.steps
      lineChart.data.datasets[2].data = lineChartData.temperatures
      lineChart.update()
    },

    createActivityLineChart () {
      const lineCtx = this.$refs.lineChart
      lineChart = new Chart(lineCtx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: this.$t('tasks.jstyle.hrs'),
              data: lineChartData.hrs,
              backgroundColor: '#C74038',
              borderColor: '#C74038',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('tasks.jstyle.steps'),
              data: lineChartData.steps,
              backgroundColor: '#4038C7',
              borderColor: '#4038C7',
              borderWidth: 0,
              pointRadius: 1,
              fill: false,
              lineTension: 0
            },
            {
              label: this.$t('tasks.jstyle.temperatures'),
              data: lineChartData.temperatures,
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

    lineChartAddHours (amount) {
      this.lineChartStartTS = new Date(this.lineChartStartTS.getTime() + (amount * 60 * 60 * 1000))
      this.lineChartEndTS = new Date(this.lineChartEndTS.getTime() + (amount * 60 * 60 * 1000))
      this.renderLineChart()
      this.updatePlusMinusButtons()
    },

    updatePlusMinusButtons () {
      if (this.lineChartStartTS <= firstSampleDate) {
        this.disableMinus = true
      } else {
        this.disableMinus = false
      }
      if (this.lineChartEndTS >= lastSampleDate) {
        this.disablePlus = true
      } else {
        this.disablePlus = false
      }
    },

    /**
     * Sends the report to the API and stores the last sample date.
     * If the sending fails, it shows an error notification.
     */
    async send () {
      this.sending = true

      try {
        if (DEBUG) console.log(this.report)
        await API.sendTasksResults(this.report)
        // store the last sample date
        await this.storeDownloadDate(lastSampleDate)
        // update it on API too
        const userKey = session.getUserSession().user.userKey
        await API.updateTaskItemConsent(userKey, this.report.studyKey, this.report.taskId, { lastJStyleSampleTS: lastSampleDate })

        await DB.setTaskCompletion(
          this.report.studyKey,
          this.report.taskId,
          new Date()
        )
        this.$router.go(-1)
      } catch (error) {
        this.sending = false
        console.error('Error sending report', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('errors.connectionError') + ' ' + error.message,
          icon: 'report_problem'
        })
      }
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
      if (DEBUG) console.log('Unmounting component, disconnecting jstyle')
      await jstyle.disconnect()
    } catch (err) {
      // doesn't matter if it fails here, but let's print out a message on console
      console.error('cannot disconnect jstyle', err)
    }
  }
}
</script>
