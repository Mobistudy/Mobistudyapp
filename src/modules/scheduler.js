import { i18n } from '../boot/i18n.js'
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

/**
 * Generates an array of tasks that need to be done today.
 * These are tasks that were "missed" between the last execution and the end of
 * today and those that are to be done by the end of today.
 * Params:
 * @param { Object } studiesParts - the participation to studies
 * @param { Object } studiesDescr - description of the studies, at least those that have been consented
 * @return returns an object with:
 * upcoming: an array of {type: 'form', studyKey: '2121', taskId: 1, missed: false, due: '2019-04-02'}
 * missed: an array of {type: 'form', studyKey: '2121', taskId: 1, missed: true, due: '2019-04-02'}
 * alwaysOn: an array of {type: 'form', studyKey: '2121', taskId: 1, alwaysOn: true, due: '2019-04-02'}
 * if there is a study that has been completed because no tasks are to be done
 * then the returned object also contains:
 * completedStudyAlert: an object like { studyTitle: { en: 'Mystudy' }, studyPart: participation object for that study }
**/
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
        const taskPart = studyPart.taskItemsConsent.find(x => (x.taskId === tdescr.id))
        if (taskPart) return taskPart.consented
        else return false
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
        let due = isTaskIntervalDue(taskDescription.scheduling, studyPart.acceptedTS, studyPart.taskItemsConsent)
        if (!due) continue // task outside of time boundaries, do not include
        if (taskDescription.scheduling.alwaysOn) {
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
          if (taskDescription.customTitle) {
            task.customTitle = taskDescription.customTitle
          }
          taskerItems.alwaysOn.push(task)
        } else {
          // manage non-always on tasks:

          let now = new Date()
          let startOfToday = new Date()
          startOfToday.setHours(0, 0, 0, 0)
          let endOfToday = new Date()
          endOfToday.setHours(23, 59, 59, 999)

          // RRrule will not show any instances.between if today's date is the same as end date. By adding one day this problem is solved.
          let studyEndDate = new Date(new Date(studyDescr.generalities.endDate).getTime() + 1000 * 60 * 60 * 24)
          let rrule = generateRRule(taskDescription.scheduling, studyPart, studyEndDate)
          if (!rrule) continue // if the task should not start at all, go to the next task

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
          // tasks are marked as "missed" only the day after
          // all tasks that need to be executed today, even if the time has passed, as marked as upcomig
          // therefore, they are executions between last time it was executed and start of today
          // or between start of the study and start of today
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
          // Upcoming tasks are those that are scheduled from last time they were executed today and now
          // or between the start of the day and now
          let upcoming
          if (lastCompletionTS && (lastCompletionTS > startOfToday)) {
            upcoming = rrule.between(toUTC(lastCompletionTS), toUTC(now))
          } else {
            upcoming = rrule.between(toUTC(startOfToday), toUTC(now))
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
          if (taskDescription.customTitle) {
            templateObj.customTitle = taskDescription.customTitle
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
 * @param {Object} scheduling - scheudling information from study description
 * @param {String} acceptTime - when the task was accepted
 * @param {Array} tasksParticipation - array containing information about the participation into the tasks, similar to taskItemsConsent
 * example: { taskId: 1, consented: true, lastExecuted: "2019-02-27T12:46:07.294Z" }
 */
export function isTaskIntervalDue (scheduling, acceptTime, tasksParticipation) {
  if (!acceptTime || !scheduling) throw new Error('both arguments must be specified in isAlwaysOnTaskDue')
  let now = new Date()
  let startTimeD
  if (scheduling.startEvent === 'consent') {
    startTimeD = new Date(acceptTime)
  } else if (scheduling.startEvent === 'taskExecution') {
    // find the last time the task was performed
    if (scheduling.eventTaskId === undefined) throw new Error('scheduling with taskExecution event must specify a taskId')
    let taskPart = tasksParticipation.find(t => t.taskId === scheduling.eventTaskId)
    if (taskPart && taskPart.consented && taskPart.lastExecuted) {
      startTimeD = new Date(taskPart.lastExecuted)
    } else {
      return false
    }
  } else {
    throw new Error('The only start event recognised is consent')
  }
  if (scheduling.startDelaySecs) {
    // add start delay
    startTimeD = new Date(startTimeD.getTime() + (scheduling.startDelaySecs * 1000)) // Add seconds
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
* @param {Object} scheduling - scheudling information from study description
* @param {Date} studyPart - study participation object
* @param {Date} studyEnd - when the study ends
* @returns an RRULE or null if the task is not supposed to be scheduled
*/
export function generateRRule (scheduling, studyPart, studyEnd) {
  let startEventDate

  if (scheduling.startEvent === 'consent') {
    startEventDate = new Date(studyPart.acceptedTS)
    startEventDate.setHours(0, 0, 1) // add 1s to start so that it's not at midnight
  } else if (scheduling.startEvent === 'taskExecution') {
    // find the last time the task was performed
    if (scheduling.eventTaskId === undefined) throw new Error('Scheduling with taskExecution event must specify a taskId')
    let taskPart = studyPart.taskItemsConsent.find(t => t.taskId === scheduling.eventTaskId)
    if (!taskPart) throw new Error('Scheduling with taskExecution with unused taskId ' + scheduling.eventTaskId)
    if (!taskPart.lastExecuted) {
      // the task should not start at all! return null
      return null
    }
    startEventDate = new Date(taskPart.lastExecuted)
  } else {
    throw new Error('Start event ' + scheduling.startEvent + ' not recognsed')
  }

  if (scheduling.startDelaySecs) {
    // add start delay
    startEventDate = new Date(startEventDate.getTime() + (1000 * scheduling.startDelaySecs)) // Add seconds
  }

  let endDate = new Date(studyEnd)
  if (scheduling.untilSecs) {
    let untilTime = new Date(startEventDate.getTime() + (1000 * scheduling.untilSecs))
    if (untilTime < endDate) endDate = new Date(untilTime)
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
  rruleObj.dtstart = toUTC(startEventDate) // here needs to be converted to UTC to make things coherent
  rruleObj.until = endDate
  rruleObj.freq = freq
  if (scheduling.interval && scheduling.interval) rruleObj.interval = scheduling.interval
  if (scheduling.months && scheduling.months.length) rruleObj.bymonth = scheduling.months
  if (scheduling.monthDays && scheduling.monthDays.length) rruleObj.bymonthday = scheduling.monthDays
  if (byweekday && byweekday.length) rruleObj.byweekday = byweekday
  if (scheduling.hours && scheduling.hours.length) rruleObj.byhour = scheduling.hours // .map(h => toUTCHours(h))
  if (scheduling.occurrences) rruleObj.count = scheduling.occurrences

  try {
    return new RRule(rruleObj)
  } catch (er) {
    console.error('Error while parsing scheduling object', rruleObj)
    console.error('Scheduling information: ', scheduling)
    console.error('Study part, study end:', studyPart, studyEnd)

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

// Scheduling notifications can be slow, this is the maximum number of notifications that
// will be scheduled in one go per task
const MAX_NOTIFICATIONS = 20

export async function scheduleNotificationsSingleStudy (studyDescr, studyPart) {
  let notificationStack = []
  let timeStack = []

  for (const task of studyDescr.tasks) {
    // find consented task
    let consentedTask
    if (studyPart.taskItemsConsent) {
      consentedTask = studyPart.taskItemsConsent.find(x => x.taskId === task.id)
    }
    // skip tasks that have not been consented
    if (consentedTask && !consentedTask.consented) continue

    if (task.type === 'dataQuery') {
      if (Platform.is.ios && HealthDataEnum.isAndroidOnly(task.dataType)) continue
      if (Platform.is.android && HealthDataEnum.isIOSOnly(task.dataType)) continue
    }
    if (task.scheduling.alwaysOn) continue // skip always ON tasks

    let rrule = generateRRule(task.scheduling, studyPart, studyDescr.generalities.endDate)
    if (!rrule) continue

    // RRrule will not show any instances.between if today's date is the same as end date. By adding one day this problem is solved.
    let studyEndDate = new Date(new Date(studyDescr.generalities.endDate).getTime() + 1000 * 60 * 60 * 24)
    let now = new Date()
    let taskTimesUTC = rrule.between(toUTC(now), toUTC(studyEndDate))

    for (let scheduleI = 0; scheduleI < taskTimesUTC.length && scheduleI < MAX_NOTIFICATIONS; scheduleI++) {
      let taskTime = fromUTC(taskTimesUTC[scheduleI])

      // remove seconds from schedule
      taskTime.setSeconds(0)
      taskTime.setMilliseconds(0)

      // as for the schedule id, we could use the unix timestamp of the execution date as id, but we
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
      id += scheduleI // this is capped anyway

      // avoid pushing notifications exaclty at the same second
      if (timeStack.indexOf(taskTime.getTime()) === -1) {
        timeStack.push(taskTime.getTime())
        notificationStack.push({
          id: parseInt(id),
          title: i18n.t('studies.scheduling.due'),
          text: i18n.t('studies.scheduling.start'),
          foreground: true,
          trigger: { at: taskTime }
        })
      }
    }
  }
  await notifications.schedule(notificationStack)

  // use this to test notifications registration
  // notifications.schedule([{
  //   id: 100,
  //   text: 'test',
  //   title: 'testing',
  //   trigger: {
  //     at: new Date(Date.now() + 5000)
  //   }
  // }])
}
