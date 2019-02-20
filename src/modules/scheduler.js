/* eslint-disable no-unused-vars */
import moment from 'moment'
import { RRule } from 'rrule'
import notifications from './notifications'
import { Platform } from 'quasar'
import HealthDataEnum from './healthstoreDataTypesEnum'

// returns an array of tasks that need to be done today
// these are tasks that were "missed" between the last execution and the end of today
// studiesParts: the participation to studies
// description of the studies, at least those that have been consented
// if there is a study that has been completed because no tasks are to be done
// until the end of the study, and currentStatus is accepted, then
// completedStudyAlert will contain the _key of the study
export function generateTasker (studiesParts, studiesDescr) {
  let taskerItems = {
    upcoming: [],
    missed: []
  }
  // completedStudyAlert
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
          if (Platform.is.iphone && HealthDataEnum.isAndroidOnly(task.dataType)) continue
          if (Platform.is.android && HealthDataEnum.isIOSOnly(task.dataType)) continue
        }
        let missed
        // the time this task was completed last time is stored into the studyParticipation
        // example: "taskItemsConsent": [ { "taskId": 1, "consented": true, "lastExecuted": "ISO string" } ]
        let lastCompletionTS
        if (studyPart.taskItemsConsent) {
          const taskStatus = studyPart.taskItemsConsent.find(x => x.taskId === task.id)
          if (taskStatus && taskStatus.lastExecuted) {
            console.log('TASK WAS COMPLETED ON ', taskStatus.lastExecuted)
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
          taskerItems.upcoming.push(Object.assign({missed: false, due: upcoming}, templateObj))
        } else if (missed !== null) {
          // missed executions of the task go into the missed array
          taskerItems.missed.push(Object.assign({missed: true, due: missed}, templateObj))
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
    scheduleNotificationsSingleStudy(acceptedTS, studyDescr)
  }
}

export async function cancelNotifications () {
  return notifications.cancelAll()
}

export async function scheduleNotificationsSingleStudy (acceptedTS, studyDescr) {
  for (const task of studyDescr.tasks) {
    for (const task of studyDescr.tasks) {
      if (task.type === 'dataQuery') {
        if (Platform.is.iphone && HealthDataEnum.isAndroidOnly(task.dataType)) continue
        if (Platform.is.android && HealthDataEnum.isIOSOnly(task.dataType)) continue
      }
      let rrule = generateRRule(acceptedTS, new Date(studyDescr.generalities.endDate), task.scheduling)
      let taskTimes = rrule.between(new Date(), new Date(studyDescr.generalities.endDate), true)
      for (const taskTime of taskTimes) {
        await notifications.schedule({
          text: 'You have a new study task pending!',
          trigger: { at: moment(taskTime).toDate() }
        })
      }
    }
  }
}
