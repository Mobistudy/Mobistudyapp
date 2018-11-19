/* eslint-disable no-unused-vars */
let db = require('src/modules/db.js')
let api = require('src/modules/mobistudyAPI')
let moment = require('moment')
import { RRule } from 'rrule'

// returns an array of tasks that need to be done today
// these are tasks  that were "missed" between the last execution and the end of today
export async function generateTasker () {
  let res = await db.getStudies()
  if (res.length === 0) {
    return Promise.resolve([])
  }
  // console.log(res)
  let taskerItems = {
    upcoming: [],
    missed: []
  }
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[i].config.tasks.length; j++) {
      let startTime
      if (res[i].config.tasks[j].startEvent === 'consent') {
        startTime = moment(res[i].start)
      } else {
        startTime = moment(res[i].start)
      }
      if (typeof res[i].config.tasks[j].scheduling.startDelaySecs !== 'undefined') {
        startTime = startTime.clone().add(res[i].config.tasks[j].scheduling.startDelaySecs, 's') // Add seconds
      }
      let rrule = generateRRule(startTime, res[i].config.tasks[j].scheduling)
      let pastNotDone
      if (typeof res[i].config.tasks[j].lastCompleted !== 'undefined') {
        // Task has been completed before
        pastNotDone = rrule.between(moment(res[i].config.tasks[j].lastCompleted).toDate(), moment().startOf('day').utc().toDate())
        // Handle weird rrule behaviour
        if (pastNotDone.length > 0) {
          pastNotDone = pastNotDone[pastNotDone.length - 1]
        } else {
          pastNotDone = null
        }
      } else {
        // Task has never been completed
        pastNotDone = rrule.before(moment().startOf('day').utc().toDate())
      }
      // Get next task within the day
      let upcoming = rrule.between(moment().startOf('day').utc().toDate(), moment().endOf('day').utc().toDate())
      if (upcoming.length > 0) {
        upcoming = upcoming[0]
      } else {
        upcoming = null
      }
      // console.log(res[i].config.tasks[j])
      // console.log(upcoming)
      // console.log(pastNotDone)
      // console.log(rrule.all())
      // Construct tasker objects
      // {
      //   id: 2,
      //     title: 'Pedometer Data',
      //   main: 'We\'d like to analyse how many steps you\'ve taken over the past week',
      //   submitText: 'Send Data',
      //   icon: 'directions_walk',
      //   future: true,
      //   due: 1540612283000
      // }
      let templateObj = {}
      switch (res[i].config.tasks[j].type) {
        case 'dataQuery':
          templateObj = {
            title: 'Data Query',
            main: 'We\'d like to request some data from you',
            submitText: 'Send Data',
            icon: 'directions_walk'
          }
          break
        case 'form':
          templateObj = {
            title: res[i].config.tasks[j].formName,
            main: 'We\'d like to ask you a few questions',
            submitText: 'Take Questionnaire',
            icon: 'ballot',
            formKey: res[i].config.tasks[j].formKey
          }
          break
      }
      if (pastNotDone !== null && upcoming === null) {
        taskerItems.missed.push(Object.assign({}, templateObj, {
          missed: true,
          due: moment(pastNotDone).valueOf()
        }))
      }
      if (upcoming !== null) {
        taskerItems.upcoming.push(Object.assign({}, templateObj, {
          missed: false,
          // due: moment(upcoming).valueOf()
          due: moment().endOf('day').utc().valueOf()
        }))
      }
    }
  }
  return Promise.resolve(taskerItems)
}

export function generateRRule (startTime, scheduling) {
  let endTime = -1
  if (typeof scheduling.untilSecs !== 'undefined') {
    endTime = startTime.clone().add(scheduling.untilSecs, 's')
  }
  // Frequency
  let freq
  switch (scheduling.intervalType) {
    case 'y':
      freq = RRule.YEARLY
      break
    case 'm':
      freq = RRule.MONTHLY
      break
    case 'w':
      freq = RRule.WEEKLY
      break
    case 'd':
      freq = RRule.DAILY
      break
    default:
      return Promise.reject(new Error('No Frequency Specified'))
  }
  // byweekday
  let byweekday = []
  if (scheduling.weekDays) {
    for (let k = 0; k < scheduling.weekDays.length; k++) {
      switch (scheduling.weekDays[k]) {
        case 'mo':
          byweekday.push(RRule.MO)
          break
        case 'tu':
          byweekday.push(RRule.TU)
          break
        case 'we':
          byweekday.push(RRule.WE)
          break
        case 'th':
          byweekday.push(RRule.TH)
          break
        case 'fr':
          byweekday.push(RRule.FR)
          break
        case 'sa':
          byweekday.push(RRule.SA)
          break
        case 'su':
          byweekday.push(RRule.SU)
          break
      }
    }
  }
  // Put into rrule config
  let rruleObj = {}
  rruleObj.dtstart = startTime.utc().toDate()
  if (endTime !== -1) rruleObj.until = endTime.utc().toDate()
  rruleObj.freq = freq
  if (typeof scheduling.interval !== 'undefined') rruleObj.interval = scheduling.interval
  if (typeof scheduling.months !== 'undefined') rruleObj.bymonth = scheduling.months
  if (typeof scheduling.monthDays !== 'undefined') rruleObj.bymonthday = scheduling.monthDays
  rruleObj.byweekday = byweekday
  if (typeof scheduling.occurrences !== 'undefined') rruleObj.count = scheduling.occurrences

  return new RRule(rruleObj)
}

/* export function generateStudiesRRules () {
return db.getStudies().then(function (res) {
if (res.length === 0) return Promise.resolve([])
for (let i = 0; i < res.length; i++) {
for (let j = 0; j < res[i].config.tasks.length; j++) {
// Declare rrule object
let rruleObj = {}
// Compute start time
let startTime
if (res[i].config.tasks[j].startEvent === 'consent') {
startTime = moment(res[i].start)
} else {
startTime = moment(res[i].start)
}
if (typeof res[i].config.tasks[j].scheduling.startDelaySecs !== 'undefined') {
startTime = startTime.clone().add(res[i].config.tasks[j].scheduling.startDelaySecs, 's') // Add seconds
}
// Compute end time
let endTime = -1
if (typeof res[i].config.tasks[j].scheduling.untilSecs !== 'undefined') {
endTime = startTime.clone().add(res[i].config.tasks[j].scheduling.untilSecs, 's')
}
// Frequency
let freq
switch (res[i].config.tasks[j].scheduling.intervalType) {
case 'y':
freq = RRule.YEARLY
break
case 'm':
freq = RRule.MONTHLY
break
case 'w':
freq = RRule.WEEKLY
break
case 'd':
freq = RRule.DAILY
break
default:
return Promise.reject(new Error('No Frequency Specified'))
}
// byweekday
let byweekday = []
for (let k = 0; k < res[i].config.tasks[j].scheduling.weekDays.length; k++) {
switch (res[i].config.tasks[j].scheduling.weekDays[k]) {
case 'mo':
byweekday.push(RRule.MO)
break
case 'tu':
byweekday.push(RRule.TU)
break
case 'we':
byweekday.push(RRule.WE)
break
case 'th':
byweekday.push(RRule.TH)
break
case 'fr':
byweekday.push(RRule.FR)
break
case 'sa':
byweekday.push(RRule.SA)
break
case 'su':
byweekday.push(RRule.SU)
break
}
}
// Put into rrule config
rruleObj.dtstart = startTime.utc().toDate()
if (endTime !== -1) rruleObj.until = endTime.utc().toDate()
rruleObj.freq = freq
if (typeof res[i].config.tasks[j].scheduling.interval !== 'undefined') rruleObj.interval = res[i].config.tasks[j].scheduling.interval
if (typeof res[i].config.tasks[j].scheduling.months !== 'undefined') rruleObj.bymonth = res[i].config.tasks[j].scheduling.months
if (typeof res[i].config.tasks[j].scheduling.monthDays !== 'undefined') rruleObj.bymonthday = res[i].config.tasks[j].scheduling.monthDays
rruleObj.byweekday = byweekday
if (typeof res[i].config.tasks[j].scheduling.occurrences !== 'undefined') rruleObj.count = res[i].config.tasks[j].scheduling.occurrences

res[i].config.tasks[j].rrule = new RRule(rruleObj)
}
}
return Promise.resolve(res)
})
} */

export function updateStudiesList (userKey) {

}

export function updateTasksList (studyKey) {

}

export function scheduleNotification (message, date) {

}
