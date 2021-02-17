'use strict'

import moment from 'moment'
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
    let retval = []
    if (queryOpts.dataType === 'steps') {
      const days = Math.round((queryOpts.endDate.getTime() - queryOpts.startDate.getTime()) / 1000 * 60 * 60 * 24)
      for (let day = 0; day < days; day++) {
        for (let hour = 0; hour < 4; hour++) {
          let startDate = queryOpts.startDate
          startDate.setDate(startDate.getDate() + day)
          startDate = startDate.getTime() + hour * (60 * 60 * 1000)
          let endDate = startDate.getTime() + (30 * 60 * 1000)
          retval.push({
            startDate: startDate,
            endDate: endDate,
            unit: 'count',
            value: Math.floor((Math.random() * 100) + 1)
          })
        }
      }
    }

    return retval
  },

  queryAggregated: async function (queryOpts) {
    let retval
    let startDate = moment(queryOpts.startDate)
    let endDate = moment(queryOpts.endDate)
    if (queryOpts.bucket && queryOpts.bucket !== 'none') {
      retval = []
      startDate.subtract(1, queryOpts.bucket + 's')

      while (startDate.isBefore(moment(queryOpts.endDate))) {
        startDate.add(1, queryOpts.bucket + 's')
        endDate = startDate.clone()
        endDate.add(1, queryOpts.bucket + 's')
        if (queryOpts.dataType === 'steps') {
          retval.push({
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            unit: 'count',
            value: Math.floor((Math.random() * 5000) + 500)
          })
        } else if (queryOpts.dataType === 'activity') {
          retval.push({
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
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
      retval = {
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
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
    return retval
  }
}
