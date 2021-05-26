'use strict'
import { i18n } from '../boot/i18n.js'
import * as moment from 'moment'
import { RRule } from 'rrule'
import notifications from 'modules/notifications/notifications'
import { Platform } from 'quasar'
import HealthDataEnum from './healthDataTypesEnum'

function toUTC (d) {
  if (!d) return null
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()))
}

function fromUTC (d) {
  if (!d) return null
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds())
}

// Returns an array of tasks that need to be done today.
// These are tasks that were "missed" between the last execution and the end of
// today and those that are to be done by the end of today.
// Params:
// studiesParts: the participation to studies
// studiesDescr: description of the studies, at least those that have been consented
// returns an object with:
// upcoming: an array of {type: 'form', studyKey: '2121', taskId: 1, missed: false, due: '2019-04-02'}
// missed: an array of {type: 'form', studyKey: '2121', taskId: 1, missed: true, due: '2019-04-02'}
// alwaysOn: an array of {type: 'form', studyKey: '2121', taskId: 1, alwaysOn: true, due: '2019-04-02'}
// if there is a study that has been completed because no tasks are to be done
// then the returned object also contains:
// completedStudyAlert: an object like { studyTitle: { en: 'Mystudy' }, studyPart: participation object for that study }
export function generateTasker (studiesParts, studiesDescr) {
  let taskerItems = {
    upcoming: [],
    missed: [],
    alwaysOn: []
  }
  for (const studyPart of studiesParts) {
    if (studyPart.currentStatus === 'accepted') {
      let studyDescr = studiesDescr.find(sd => {
        return sd._key === studyPart.studyKey
      })
      // if we are beyond end date of the study, study should be marked as completed
      if (new Date().toISOString() > studyDescr.generalities.endDate + 'T23:59:59') {
        taskerItems.completedStudyAlert = {
          studyTitle: studyDescr.generalities.title,
          studyPart: studyPart
        }
        // no need to analyse this study further
        continue // to the next study
      }

      const consentedTasks = studyDescr.tasks.filter((tdescr) => {
        const taskPart = studyPart.taskItemsConsent.find(x => x.taskId === tdescr.id)
        return taskPart.consented
      })

      // if studyCompleted is true, then there are no more tasks to be executed within this study
      // it means that the study is completed for this user
      // if this happens an extra property is added to the returned object
      let studyCompleted = true

      for (const taskDescription of consentedTasks) {
        // filter out tasks that are not relevant for this operating system
        if (taskDescription.type === 'dataQuery') {
          if (Platform.is.ios && HealthDataEnum.isAndroidOnly(taskDescription.dataType)) continue
          if (Platform.is.android && HealthDataEnum.isIOSOnly(taskDescription.dataType)) continue
        }
        // manage alwaysOn tasks here:
        if (taskDescription.scheduling.alwaysOn) {
          if (isTaskIntervalDue(studyPart.acceptedTS, taskDescription.scheduling)) {
            studyCompleted = false
            let task = {
              type: taskDescription.type,
              studyKey: studyDescr._key,
              taskId: taskDescription.id,
              alwaysOn: true
            }
            if (taskDescription.type === 'form') {
              task.formName = taskDescription.formName
              task.formKey = taskDescription.formKey
            }
            taskerItems.alwaysOn.push(task)
          }
        } else {
          // manage non-always on tasks:

          let startOfToday = new Date()
          startOfToday.setHours(0, 0, 0, 0)
          let endOfToday = new Date()
          endOfToday.setHours(23, 59, 59, 999)

          // RRrule will not show any instances.between if todays date is the same as end date. By adding one day this problem is solved.
          let studyEndDate = new Date(new Date(studyDescr.generalities.endDate).getTime() + 1000 * 60 * 60 * 24)
          let startEvent = new Date(studyPart.acceptedTS)
          startEvent.setHours(0, 0, 1) // add 1s to start so that it's not as midnight
          let rrule = generateRRule(startEvent, studyEndDate, taskDescription.scheduling)
          let instancesToEnd = rrule.between(toUTC(startOfToday), toUTC(studyEndDate))
          if (instancesToEnd.length > 0) {
            studyCompleted = false
          }

          // the time this task was completed last time is stored into the studyParticipation
          // example: "taskItemsConsent": [ { "taskId": 1, "consented": true, "lastExecuted": "ISO string" } ]
          let lastCompletionTS
          if (studyPart.taskItemsConsent) {
            const taskStatus = studyPart.taskItemsConsent.find(x => x.taskId === taskDescription.id)
            if (taskStatus && taskStatus.lastExecuted) {
              // Task has been completed before
              lastCompletionTS = new Date(taskStatus.lastExecuted)
            }
          }

          let missed
          if (lastCompletionTS) {
            missed = rrule.between(toUTC(lastCompletionTS), toUTC(startOfToday))
            if (missed.length > 0) {
              missed = fromUTC(missed[missed.length - 1])
            } else {
              missed = null
            }
          } else {
            // Task has never been completed
            // get the last occurrence of the rrule before today
            missed = fromUTC(rrule.before(toUTC(startOfToday)))
          }
          // Get next task within the day
          let upcoming
          if (lastCompletionTS && (lastCompletionTS > startOfToday)) {
            upcoming = rrule.between(toUTC(lastCompletionTS), toUTC(new Date()))
          } else {
            upcoming = rrule.between(toUTC(startOfToday), toUTC(new Date()))
          }
          if (upcoming.length > 0) {
            // convert from UTC to local time
            upcoming = fromUTC(upcoming[0])
          } else {
            upcoming = null
          }
          let templateObj = {
            type: taskDescription.type,
            studyKey: studyDescr._key,
            taskId: taskDescription.id
          }
          if (taskDescription.type === 'form') {
            templateObj.formName = taskDescription.formName
            templateObj.formKey = taskDescription.formKey
          }
          if (upcoming !== null) {
            // upcoming executions of the task go into the upcoming array
            taskerItems.upcoming.push(Object.assign({ missed: false, due: upcoming }, templateObj))
          } else if (missed !== null) {
            // missed executions of the task go into the missed array
            taskerItems.missed.push(Object.assign({ missed: true, due: missed }, templateObj))
          }
        }
      }
      if (studyCompleted) {
        taskerItems.completedStudyAlert = {
          studyTitle: studyDescr.generalities.title,
          studyPart: studyPart
        }
      }
    }
  }
  return taskerItems
}

/**
 * Tells if the current time is included in the task scheduling interval
 * @param {String} acceptTime when the task was accepted
 * @param {Object} scheduling scheudling information from study description
 */
export function isTaskIntervalDue (acceptTime, scheduling) {
  if (!acceptTime || !scheduling) throw new Error('both arguments must be specified in isAlwaysOnTaskDue')
  let now = new Date()
  let startTimeD = new Date(acceptTime)
  if (scheduling.startEvent === 'consent') {
    if (scheduling.startDelaySecs) {
      // add start delay
      startTimeD = new Date(startTimeD.getTime() + scheduling.startDelaySecs * 1000) // Add seconds
    }
  } else {
    throw new Error('The only start event recognised is consent')
  }
  if (scheduling.untilSecs) {
    let untilTimeD = new Date(startTimeD.getTime() + scheduling.untilSecs * 1000)
    // check if today is between start and until time
    if (now > startTimeD && now < untilTimeD) return true
  } else {
    // only check if today is > start time
    if (now > startTimeD) return true
  }
  return false
}

/**
* generates an instance of RRule
* startDate - when the task was accepted
* studyEnd - when the study ends
* scheduling - as from the study description
*/
export function generateRRule (startDate, studyEnd, scheduling) {
  // dates in RRULE must be provided in UTC
  let startDateUTC = startDate
  if (scheduling.startEvent === 'consent') {
    if (scheduling.startDelaySecs) {
      // add start delay
      startDateUTC = new Date(startDate.getTime() + 1000 * scheduling.startDelaySecs) // Add seconds
    }
  } else {
    throw new Error('The only start event recognised is consent')
  }
  let endDateUTC = studyEnd
  if (scheduling.untilSecs) {
    let untilTime = new Date(startDateUTC.getTime() + 1000 * scheduling.untilSecs)
    if (untilTime < endDateUTC) endDateUTC = new Date(untilTime)
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
      throw new Error('No Frequency Specified')
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
  rruleObj.dtstart = toUTC(startDateUTC) // here needs to be converted to UTC to make things coherent
  rruleObj.until = endDateUTC
  rruleObj.freq = freq
  if (scheduling.interval && scheduling.interval.length) rruleObj.interval = scheduling.interval
  if (scheduling.months && scheduling.months.length) rruleObj.bymonth = scheduling.months
  if (scheduling.monthDays && scheduling.monthDays.length) rruleObj.bymonthday = scheduling.monthDays
  if (byweekday && byweekday.length) rruleObj.byweekday = byweekday
  if (scheduling.hours && scheduling.hours.length) rruleObj.byhour = scheduling.hours
  if (scheduling.occurrences) rruleObj.count = scheduling.occurrences

  try {
    return new RRule(rruleObj)
  } catch (er) {
    console.error('Error while parsing scheduling object', rruleObj)
    console.error('Scheduling information: ', scheduling)
    console.error('Star time, study end:', startDate, studyEnd)

    throw er
  }
}

export function scheduleNotificationsAllStudies (studiesParts, studiesDescr) {
  for (const studyPart of studiesParts) {
    let acceptedTS = studyPart.acceptedTS
    let studyDescr = studiesDescr.find(sd => {
      return sd._key === studyPart.studyKey
    })
    scheduleNotificationsSingleStudy(acceptedTS, studyDescr, studyPart)
  }
}

export async function cancelNotifications () {
  return notifications.cancelAll()
}

export async function scheduleNotificationsSingleStudy (acceptedTS, studyDescr, studyPart) {
  let notificationStack = []
  let timeStack = []
  for (const task of studyDescr.tasks) {
    if (task.type === 'dataQuery') {
      if (Platform.is.ios && HealthDataEnum.isAndroidOnly(task.dataType)) continue
      if (Platform.is.android && HealthDataEnum.isIOSOnly(task.dataType)) continue
    }
    if (task.scheduling.alwaysOn) continue // skip always ON tasks
    let rrule = generateRRule(acceptedTS, studyDescr.generalities.endDate, task.scheduling)
    let taskTimes = rrule.between(toUTC(new Date()), toUTC(new Date(studyDescr.generalities.endDate)), true)
    for (let scheduleI = 0; scheduleI < taskTimes.length && scheduleI < 1000; scheduleI++) {
      let taskTime = taskTimes[scheduleI]
      let executionDate = moment(taskTime).startOf('minute').toDate()
      // we could use the unix timestamp of the execution date as id, but we
      // don't know how internally the ids are stored, so it's better to keep
      // their length to less than 9 digits
      // we generate the id by combining the study id, the task id and the single schedule

      let id = ''
      // study ids can be quite long, let's use only the final 4 digits
      // hoping that a participant doesn't have 2 active studies with the same final 4 digits
      if (studyDescr._key) {
        let keyStr = studyDescr._key.toString()
        id += keyStr.slice(-4)
      }
      id += task.id // tasks will rarely be more than 2 decimals
      id += scheduleI // this is capped to 999 anyway

      // Check if tasks was completed within the last day:
      let lastCompletionTS
      if (studyPart.taskItemsConsent) {
        const taskStatus = studyPart.taskItemsConsent.find(x => x.taskId === task.id)
        if (taskStatus && taskStatus.lastExecuted) {
          // Task has been completed before
          lastCompletionTS = moment(new Date(taskStatus.lastExecuted))
        }
      }

      let taskCompletedWithinDay = false
      // Checks if the task was completed before and the notification to be scheduled is today
      if (lastCompletionTS && moment(executionDate).isBetween(moment().startOf('day'), moment().endOf('day')) && lastCompletionTS.isBetween(moment().startOf('day'), moment(executionDate))) {
        taskCompletedWithinDay = true
      }

      if (timeStack.indexOf(moment(executionDate).unix()) === -1 && !taskCompletedWithinDay) {
        timeStack.push(moment(executionDate).unix())
        notificationStack.push({
          id: parseInt(id),
          title: i18n.t('studies.scheduling.due'),
          text: i18n.t('studies.scheduling.start'),
          foreground: true,
          trigger: { at: executionDate }
        })
      }
    }
  }
  await notifications.schedule(notificationStack)
}
