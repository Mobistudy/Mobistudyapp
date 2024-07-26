import { DateTime } from 'luxon'
import { Dialog } from 'quasar'

export default {
  isAvailable: async function () {
    return Promise.resolve()
  },

  promptInstallFit: async function () {
    return Promise.resolve()
  },

  requestAuthorization: async function (datatypes) {
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: 'Confirm',
        message: 'Would you like to give access to ' + datatypes[0].read[0] + '?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        resolve()
      }).onCancel(() => {
        reject()
      }).onDismiss(() => {
        reject()
      })
    })
  },

  isAuthorized: async function (datatypes) {
    return Promise.resolve()
  },

  disconnect: async function () {
    return Promise.resolve()
  },

  query: async function (queryOpts) {
    const retval = []
    let date = queryOpts.startDate.getTime()
    do {
      let value, unit, timeDur
      if (queryOpts.dataType === 'steps') {
        timeDur = (Math.random() * 60000) + 120000 // 2 to 3m
        value = Math.floor((Math.random() * 100) + 1)
        unit = 'count'
      } else if (queryOpts.dataType === 'weight') {
        const dayms = 24 * 60 * 60 * 1000
        timeDur = (Math.random() * dayms) + dayms // 1 to 2d
        value = Math.floor((Math.random() * 2) + 79)
        unit = 'kg'
      } else if (queryOpts.dataType === 'heart_rate') {
        timeDur = (Math.random() * 120000) + 180000 // 3 to 5h
        value = Math.floor((Math.random() * 20) + 60)
        unit = 'bpm'
      } else if (queryOpts.dataType === 'distance') {
        timeDur = (Math.random() * 10800000) + 3600000 // 1 to 4h
        value = Math.floor(Math.random() * 1000)
        unit = 'm'
      }
      retval.push({
        startDate: new Date(date),
        endDate: new Date(date + timeDur),
        unit,
        value
      })
      date = date + timeDur
    }
    while (date < queryOpts.endDate.getTime())
    return retval
  },

  queryAggregated: async function (queryOpts) {
    let retval
    let startDate = DateTime.fromJSDate(queryOpts.startDate)
    let endDate = DateTime.fromJSDate(queryOpts.endDate)
    const endEnd = DateTime.fromJSDate(queryOpts.endDate)
    if (queryOpts.bucket && queryOpts.bucket !== 'none') {
      // aggregated with bucket
      retval = []
      const offset = {}
      offset[queryOpts.bucket + 's'] = 1
      startDate = startDate.minus(offset)

      while (startDate < endEnd) {
        startDate = startDate.plus(offset)
        endDate = startDate
        endDate = endDate.plus(offset)
        if (queryOpts.dataType === 'steps') {
          retval.push({
            startDate: startDate.toJSDate(),
            endDate: endDate.toJSDate(),
            unit: 'count',
            value: Math.floor((Math.random() * 5000) + 500)
          })
        } if (queryOpts.dataType === 'distancee') {
          retval.push({
            startDate: startDate.toJSDate(),
            endDate: endDate.toJSDate(),
            unit: 'm',
            value: Math.floor((Math.random() * 5000) + 100)
          })
        } else if (queryOpts.dataType === 'activity') {
          retval.push({
            startDate: startDate.toJSDate(),
            endDate: endDate.toJSDate(),
            unit: 'activitySummary',
            value: {
              still: {
                duration: Math.floor((Math.random() * 64800000) + 28800000),
                calories: 1500,
                distance: 0
              },
              walking: {
                duration: Math.floor((Math.random() * 10800000) + 1800000),
                calories: 20,
                distance: 1250
              },
              in_vehicle: {
                duration: Math.floor((Math.random() * 10800000) + 1800000),
                calories: 20,
                distance: 3520
              }
            }
          })
        }
      }
    } else {
      // aggregated no bucket
      if (queryOpts.dataType === 'activity') {
        retval = {
          startDate: startDate.toJSDate(),
          endDate: endDate.toJSDate(),
          unit: 'activitySummary',
          value: {
            still: {
              duration: Math.floor((Math.random() * 64800000) + 28800000),
              calories: 1500,
              distance: 0
            },
            walking: {
              duration: Math.floor((Math.random() * 10800000) + 1800000),
              calories: 20,
              distance: 1250
            },
            in_vehicle: {
              duration: Math.floor((Math.random() * 10800000) + 1800000),
              calories: 20,
              distance: 3520
            }
          }
        }
      }
    }
    return retval
  }
}
