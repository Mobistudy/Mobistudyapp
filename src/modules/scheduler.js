'use strict'
import { i18n } from '../boot/i18n.js'
import * as moment from 'moment'
import { RRule } from 'rrule'
import notifications from 'modules/notifications/notifications'
import { Platform } from 'quasar'
import HealthDataEnum from './healthDataTypesEnum'

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
// completedStudyAlert: an object like { studyTitle: 'MyStudy', studyPart: participation object for that study }
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

          let studyEndDate = moment(new Date(studyDescr.generalities.endDate)).add(1, 'days').toDate() // RRrule will not show any instances.between if todays date is the same as end date. By adding one day this problem is solved.
          let rrule = generateRRule(studyPart.acceptedTS, studyEndDate, taskDescription.scheduling)
          let instancesToEnd = rrule.between(moment().startOf('day').toDate(), moment(studyEndDate).endOf('day').toDate())
          if (instancesToEnd.length > 0) {
            studyCompleted = false
          }

          // filter out tasks that are not relevant for this operating system
          if (taskDescription.type === 'dataQuery') {
            if (Platform.is.ios && HealthDataEnum.isAndroidOnly(taskDescription.dataType)) continue
            if (Platform.is.android && HealthDataEnum.isIOSOnly(taskDescription.dataType)) continue
          }
          let missed
          // the time this task was completed last time is stored into the studyParticipation
          // example: "taskItemsConsent": [ { "taskId": 1, "consented": true, "lastExecuted": "ISO string" } ]
          let lastCompletionTS
          if (studyPart.taskItemsConsent) {
            const taskStatus = studyPart.taskItemsConsent.find(x => x.taskId === taskDescription.id)
            if (taskStatus && taskStatus.lastExecuted) {
              // Task has been completed before
              lastCompletionTS = moment(new Date(taskStatus.lastExecuted))
            }
          }

          if (lastCompletionTS) {
            missed = rrule.between(lastCompletionTS.toDate(), moment().startOf('day').toDate())
            if (missed.length > 0) {
              missed = missed[missed.length - 1]
            } else {
              missed = null
            }
          } else {
            // Task has never been completed
            // get the last occurrence of the rrule before today
            missed = rrule.before(moment().startOf('day').toDate())
          }
          // Get next task within the day
          let upcoming
          if (lastCompletionTS && lastCompletionTS.isAfter(moment().startOf('day'))) {
            upcoming = null
          } else {
            upcoming = rrule.between(moment().startOf('day').toDate(), moment().endOf('day').toDate())
            if (upcoming.length > 0) {
              upcoming = upcoming[0]
            } else {
              upcoming = null
            }
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
    // TODO!!!
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
* startTime - when the task was accepted
* studyEnd - when the study ends
* scheduling - as from the study description
*/
export function generateRRule (startTime, studyEnd, scheduling) {
  let startTimeM = moment(startTime)
  if (scheduling.startEvent === 'consent') {
    if (scheduling.startDelaySecs) {
      // add start delay
      startTimeM = startTimeM.clone().add(scheduling.startDelaySecs, 's') // Add seconds
    }
  } else {
    // TODO!!!
    throw new Error('The only start event recognised is consent')
  }
  let endTime = moment(studyEnd)
  if (scheduling.untilSecs) {
    let untilTime = startTimeM.clone().add(scheduling.untilSecs, 's')
    if (untilTime.isBefore(endTime)) endTime = untilTime.clone()
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
  rruleObj.dtstart = startTimeM.toDate()
  rruleObj.until = endTime.toDate()
  rruleObj.freq = freq
  if (scheduling.interval && scheduling.interval.length) rruleObj.interval = scheduling.interval
  if (scheduling.months && scheduling.months.length) rruleObj.bymonth = scheduling.months
  if (scheduling.monthDays && scheduling.monthDays.length) rruleObj.bymonthday = scheduling.monthDays
  if (scheduling.weekDays && scheduling.weekDays.length) rruleObj.byweekday = byweekday
  if (scheduling.occurrences) rruleObj.count = scheduling.occurrences

  try {
    return new RRule(rruleObj)
  } catch (er) {
    console.error('Error while parsing scheduling object', rruleObj)
    console.error('Scheduling information: ', scheduling)
    console.error('Star time, study end:', startTime, studyEnd)

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
    let rrule = generateRRule(acceptedTS, new Date(studyDescr.generalities.endDate), task.scheduling)
    let taskTimes = rrule.between(new Date(), new Date(studyDescr.generalities.endDate), true)
    for (let scheduleI = 0; scheduleI < taskTimes.length && scheduleI < 1000; scheduleI++) {
      let taskTime = taskTimes[scheduleI]
      let executionDate = moment(taskTime).startOf('minute').toDate()
      // we could use the unix timestamp of the execution date as id, but we
      // don't knwo how internally the ids are stored, so it's better to keep
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
