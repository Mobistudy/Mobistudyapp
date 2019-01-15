'use strict'

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
  if (queryOpts.dataType === 'steps') {
    const days = Math.round((queryOpts.endDate.getTime() - queryOpts.startDate.getTime()) / 1000 * 60 * 60 * 24)
    let retval = []
    let daysBucket = 1
    if (queryOpts.bucket === 'day') daysBucket = 1
    else if (queryOpts.bucket === 'week') daysBucket = 7
    else if (queryOpts.bucket === 'month') daysBucket = 30
    for (let day = 0; day < days; day += daysBucket) {
      let startDate = queryOpts.startDate
      startDate.setDate(startDate.getDate() + day)
      let endDate = startDate
      endDate.setDate(endDate + daysBucket)
      retval.push({
        startDate: startDate,
        endDate: endDate,
        unit: 'count',
        value: Math.floor((Math.random() * 5000) + 500)
      })
    }
    return retval
  }
}
