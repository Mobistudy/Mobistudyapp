/* eslint-disable no-unused-vars */
import moment from 'moment'
import { RRule } from 'rrule'
import notifications from './notifications'
import { Platform } from 'quasar'
import HealthDataEnum from './healthDataTypesEnum'

// Returns an array of tasks that need to be done today.
// These are tasks that were "missed" between the last execution and the end of
// today and those that are to be done by the end of today.
// Params:
// studiesParts: the participation to studies
// studiesDescr: description of the studies, at least those that have been consented
// returns an object with:
// upcoming: an array of {type: 'form', studyKey: '2121', taskID: 1, missed: false, due: '2019-04-02'}
// missed: an array of {type: 'form', studyKey: '2121', taskID: 1, missed: true, due: '2019-04-02'}
// if there is a study that has been completed because no tasks are to be done
// then the returned object also contains:
// completedStudyAlert: an object like { studyTitle: 'MyStudy', studyPart: participation object for that study }
export function generateTasker (studiesParts, studiesDescr) {
  let taskerItems = {
    upcoming: [],
    missed: []
  }
  for (const studyPart of studiesParts) {
    if (studyPart.currentStatus === 'accepted') {
      let studyDescr = studiesDescr.find(sd => {
        return sd._key === studyPart.studyKey
      })
      const consentedTasks = studyDescr.tasks.filter((tdescr) => {
        const taskPart = studyPart.taskItemsConsent.find(x => x.taskId === tdescr.id)
        return taskPart.consented
      })
      let allTasksCompleted = true
      for (const task of consentedTasks) {
        let studyEndDate = new Date(studyDescr.generalities.endDate)
        let rrule = generateRRule(studyPart.acceptedTS, studyEndDate, task.scheduling)
        let instancesToEnd = rrule.between(moment().startOf('day').toDate(), studyEndDate)
        if (instancesToEnd.length > 0) {
          allTasksCompleted = false
        } else continue

        if (task.type === 'dataQuery') {
          if (Platform.is.ios && HealthDataEnum.isAndroidOnly(task.dataType)) continue
          if (Platform.is.android && HealthDataEnum.isIOSOnly(task.dataType)) continue
        }
        let missed
        // the time this task was completed last time is stored into the studyParticipation
        // example: "taskItemsConsent": [ { "taskId": 1, "consented": true, "lastExecuted": "ISO string" } ]
        let lastCompletionTS
        if (studyPart.taskItemsConsent) {
          const taskStatus = studyPart.taskItemsConsent.find(x => x.taskId === task.id)
          if (taskStatus && taskStatus.lastExecuted) {
            // console.log('TASK WAS COMPLETED ON ', taskStatus.lastExecuted)
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
          type: task.type,
          studyKey: studyDescr._key,
          taskID: task.id
        }
        if (task.type === 'form') {
          templateObj.formTitle = task.formName
          templateObj.formKey = task.formKey
        }
        if (upcoming !== null) {
          // upcoming executions of the task go into the upcoming array
          taskerItems.upcoming.push(Object.assign({ missed: false, due: upcoming }, templateObj))
        } else if (missed !== null) {
          // missed executions of the task go into the missed array
          taskerItems.missed.push(Object.assign({ missed: true, due: missed }, templateObj))
        }
      }
      if (allTasksCompleted) {
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
  if (scheduling.interval) rruleObj.interval = scheduling.interval
  if (scheduling.months) rruleObj.bymonth = scheduling.months
  if (scheduling.monthDays) rruleObj.bymonthday = scheduling.monthDays
  rruleObj.byweekday = byweekday
  if (scheduling.occurrences) rruleObj.count = scheduling.occurrences

  return new RRule(rruleObj)
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
          // console.log('TASK WAS COMPLETED ON ', taskStatus.lastExecuted)
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
          title: 'Mobistudy task due!',
          // TODO: change the text according to the type of task
          text: 'Tap here to open the app',
          foreground: true,
          trigger: { at: executionDate }
        })
      }
    }
  }
  // console.log(notificationStack)
  await notifications.schedule(notificationStack)
}
