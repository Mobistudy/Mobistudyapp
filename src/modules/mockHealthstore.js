'use strict'

import moment from 'moment'

export async function isAvailable () {
  return Promise.resolve()
}

export async function promptInstallFit () {
  return Promise.resolve()
}

export async function requestAuthorization (datatypes) {
  return Promise.resolve()
}

export async function isAuthorized (datatypes) {
  return Promise.resolve()
}

export async function disconnect () {
  return Promise.resolve()
}

export async function query (queryOpts) {
  if (queryOpts.dataType === 'steps') {
    const days = Math.round((queryOpts.endDate.getTime() - queryOpts.startDate.getTime()) / 1000 * 60 * 60 * 24)
    let retval = []
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
    return retval
  }
}

export async function queryAggregated (queryOpts) {
  let retval = []
  let startDate = moment(queryOpts.startDate)
  startDate.subtract(1, queryOpts.bucket + 's')

  while (startDate.isBefore(moment(queryOpts.endDate))) {
    startDate.add(1, queryOpts.bucket + 's')
    let endDate = startDate.clone()
    endDate.add(1, queryOpts.bucket + 's')
    if (queryOpts.dataType === 'steps') {
      retval.push({
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
        unit: 'count',
        value: Math.floor((Math.random() * 5000) + 500)
      })
    }
  }

  return retval
}
