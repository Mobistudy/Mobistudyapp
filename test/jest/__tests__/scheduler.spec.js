import { isTaskIntervalDue, generateTasker, scheduleNotificationsSingleStudy } from '../../../src/modules/scheduler.js'
import notifications from '../../../src/modules/notifications/notifications.js'

jest.mock('quasar')
jest.mock('modules/notifications/notifications')

describe('When testing the scheduler', () => {
  test('an always on task is due when between start and end time', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400,
      untilSecs: 100000000
    }
    let due = isTaskIntervalDue(scheduling, acceptTime)

    expect(due).toBe(true)
  })

  test('an always on task is due when after start and no end untilSec is specified', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400
    }
    let due = isTaskIntervalDue(scheduling, acceptTime)

    expect(due).toBe(true)
  })

  test('an always on task is not due before start', () => {
    let acceptTime = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400
    }
    let due = isTaskIntervalDue(scheduling, acceptTime)

    expect(due).toBe(false)
  })

  test('a task depending on another task is not due before the other task', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: false,
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 0,
      untilSecs: 3600
    }
    let due = isTaskIntervalDue(scheduling, acceptTime, [{ taskId: 1, consented: true }])

    expect(due).toBe(false)
  })

  test('a task depending on another task is not due if other task is not consented', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 0,
      untilSecs: 3600
    }
    let due = isTaskIntervalDue(scheduling, acceptTime, [{ taskId: 1, consented: false }])

    expect(due).toBe(false)
  })

  test('a task depending on another task and that was executed long ago and has expired is not due', () => {
    let acceptTime = new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    let scheduling = {
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 0,
      untilSecs: 3600,
      intervalType: 'd',
      interval: 1,
      occurrences: 1
    }
    let due = isTaskIntervalDue(scheduling, acceptTime, [{
      taskId: 1,
      consented: true,
      lastExecuted: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    }])

    expect(due).toBe(false)
  })

  test('a task depending on another task and that has not expired is due', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 900, // 15 m
      untilSecs: 7200 // 2 hours
    }
    let due = isTaskIntervalDue(scheduling, acceptTime, [{
      taskId: 1,
      consented: true,
      lastExecuted: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString() // 30 m ago
    }])

    expect(due).toBe(true)
  })

  test('a rejected study is not scheduled', () => {
    let studyDescr = [{
      _key: '1234'
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'rejected'
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('an ended study is not scheduled', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      }
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString()
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
    expect(tasks.completedStudyAlert).not.toBeUndefined()
  })

  test('a non consented task is not scheduled', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: false,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task appears at the beginning of today', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)

    expect(tasks.upcoming[0].type).toBe('smwt')
    expect(tasks.upcoming[0].studyKey).toBe('1234')
    expect(tasks.upcoming[0].taskId).toBe(1)

    expect(tasks.upcoming[0].due.getDate()).toBe(new Date().getDate())
    expect(tasks.upcoming[0].due.getMonth()).toBe(new Date().getMonth())
    expect(tasks.upcoming[0].due.getYear()).toBe(new Date().getYear())
    expect(tasks.upcoming[0].due.getHours()).toBe(0)
    expect(tasks.upcoming[0].due.getMinutes()).toBe(0)
  })

  test('a weekly task is not available 4 days after being executed', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'tugt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          untilSecs: 5184000, // 60 days
          interval: 7,
          occurrences: 8
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      // tasks expected to be executed 18 days ago and 11 days ago and 4 days ago
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 18).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // 4 days ago
        lastExecuted: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 4 - 1000 * 60 * 60)).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)

    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a weekly task is available 7 days after being executed', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 120).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'tugt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          untilSecs: 5184000, // 60 days validity
          interval: 7,
          occurrences: 8
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      // tasks expected to be executed 14 days (and 1h) ago and 7 days ago and today
      acceptedTS: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 14 - 1000 * 60 * 60)).toISOString(), // started 15 days ago
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // executed 7 days ago, so due today
        lastExecuted: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 11)).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task is not available after all occurrences have finished', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 120).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'tugt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          untilSecs: 5184000, // 60 days validity
          interval: 7,
          occurrences: 4 // only 4 occurrences
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      // tasks expected to be executed 32 days (and 1h) ago, then 25, then 18, then 11
      acceptedTS: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 32 - 1000 * 60 * 60)).toISOString(), // started 15 days ago
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // executed 11 days ago, nothing due today
        lastExecuted: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 11)).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a study beyond end date is marked as completed', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        title: {
          en: 'study'
        },
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
    expect(tasks.completedStudyAlert).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyTitle).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyTitle.en).toBe('study')
    expect(tasks.completedStudyAlert.studyPart).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyPart.studyKey).toBe('1234')
  })

  test('a study with an ended task is marked as completed', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        title: {
          en: 'study'
        },
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24 // 1 day
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
    expect(tasks.completedStudyAlert).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyTitle).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyTitle.en).toBe('study')
    expect(tasks.completedStudyAlert.studyPart).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyPart.studyKey).toBe('1234')
  })

  test('a study with no more occurrences is marked as completed', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        title: {
          en: 'study'
        },
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          occurrences: 5
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
    expect(tasks.completedStudyAlert).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyTitle).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyTitle.en).toBe('study')
    expect(tasks.completedStudyAlert.studyPart).not.toBeFalsy()
    expect(tasks.completedStudyAlert.studyPart.studyKey).toBe('1234')
  })

  test('a daily task that starts 2 days after consent doesnt appear before', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          startDelaySecs: 60 * 60 * 24 * 2 // 2 days after consent
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString(), // yesterday
      taskItemsConsent: [{
        taskId: 1,
        consented: true }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
  })

  test('a daily task that ends 2 days after consent disappears after', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24 * 2 // 2 days after consent
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString() // yesterday
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
  })

  test('a task with occurrence 1 never executed is missed on the day of consent', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          occurrences: 1
        }
      }]
    }]
    let consent = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: consent.toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(1)
    expect(tasks.alwaysOn.length).toBe(0)

    expect(tasks.missed[0].type).toBe('smwt')
    expect(tasks.missed[0].studyKey).toBe('1234')
    expect(tasks.missed[0].taskId).toBe(1)

    expect(tasks.missed[0].due.getDate()).toBe(consent.getDate())
    expect(tasks.missed[0].due.getMonth()).toBe(consent.getMonth())
    expect(tasks.missed[0].due.getYear()).toBe(consent.getYear())

    expect(tasks.missed[0].due.getHours()).toBe(0)
    expect(tasks.missed[0].due.getMinutes()).toBe(0)
  })

  test('a weekly task that was not executed this week is put into missed', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'w',
          interval: 1,
          months: [],
          monthDays: [],
          weekDays: []
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(1)
    expect(tasks.alwaysOn.length).toBe(0)

    expect(tasks.missed[0].type).toBe('smwt')
    expect(tasks.missed[0].studyKey).toBe('1234')
    expect(tasks.missed[0].taskId).toBe(1)
  })

  test('a daily task at a given hour time is scheduled at that hour', () => {
    let hour = new Date(new Date().getTime() - 1000).getHours()
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          hours: [hour] // the hour of now
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString() // one day ago
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)

    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)

    expect(tasks.upcoming[0].type).toBe('smwt')
    expect(tasks.upcoming[0].studyKey).toBe('1234')
    expect(tasks.upcoming[0].taskId).toBe(1)
    expect(tasks.upcoming[0].due.getHours()).toBe(hour)
  })

  test('a daily task at given hours that was missed appears as missed', () => {
    // the hour of 4 and 1 hour ago
    let h1 = new Date(new Date().getTime() - 1000 * 60 * 60 * 4).getHours()
    let h2 = new Date(new Date().getTime() - 1000 * 60 * 60 * 1).getHours()
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          occurrences: 2,
          hours: [ h1, h2 ]
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 28).toISOString(), // accepted yesterday
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 26).toISOString() // yesterday, but before the last one
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(1)
    expect(tasks.missed[0].type).toBe('smwt')
    expect(tasks.missed[0].studyKey).toBe('1234')
    expect(tasks.missed[0].taskId).toBe(1)
    expect(tasks.missed[0].due.getHours()).toBe(h2)
  })

  test('a daily task at given hours appears also the second time', () => {
    let h1 = new Date(new Date().getTime() - 1000 * 60 * 60 * 4).getHours()
    let h2 = new Date(new Date().getTime() - 1000 * 60 * 60 * 1).getHours()
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          hours: [ h1, h2 ]
        }
      }]
    }]
    let today = new Date()
    today.setHours(0, 1, 1)
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: today.toISOString(), // accepted today
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 3).toISOString() // today after 1st but before 2nd
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.upcoming[0].type).toBe('smwt')
    expect(tasks.upcoming[0].studyKey).toBe('1234')
    expect(tasks.upcoming[0].taskId).toBe(1)
    expect(tasks.upcoming[0].due.getHours()).toBe(h2)
  })

  test('a daily task at given hour doesnt appear before that hour', () => {
    let h1 = new Date(new Date().getTime() + 1000 * 60 * 60 * 1).getHours() // hour in the future
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          hours: [ h1 ]
        }
      }]
    }]
    let today = new Date()
    today.setHours(0, 1, 1)
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: today.toISOString(), // accepted today
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
  })

  test('a task due 15 minutes another task is scheduled', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1
        }
      }, {
        id: 2,
        type: 'form',
        scheduling: {
          startEvent: 'taskExecution',
          eventTaskId: 1,
          intervalType: 'd',
          interval: 1,
          startDelaySecs: 900, // 15 m
          untilSecs: 7200 // 2 hours
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString() // 30 m ago
      }, {
        taskId: 2,
        consented: true
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(2)

    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a task due after another task and that has already been performed is not scheduled', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1
        }
      }, {
        id: 2,
        type: 'form',
        scheduling: {
          startEvent: 'taskExecution',
          eventTaskId: 1,
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24 * 5 // 5 days
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString() // 30 m ago
      }, {
        taskId: 2,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString() // 30 m ago
      }]
    }]
    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task started after another task, performed the day before, is scheduled', () => {
    let studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10)
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24 * 1 // 1 day
        }
      }, {
        id: 2,
        type: 'form',
        scheduling: {
          startEvent: 'taskExecution',
          eventTaskId: 1,
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24 * 5 // 5 days
        }
      }]
    }]
    let studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 25 * 60 * 60 * 1000).toISOString() // 2 d and 1 h ago
      }, {
        taskId: 2,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 d ago
      }]
    }]

    let tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(2)

    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task due multiple times a day sends notifications when the task is due', async () => {
    let h1 = new Date(new Date().getTime() - 1000 * 60 * 60 * 1).getHours() // hour in the past
    let h2 = new Date(new Date().getTime() + 1000 * 60 * 60 * 2).getHours() // 2 hours in the future
    let studyDescr = {
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10), // 2 months ago
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().substring(0, 10) // in a month
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24, // 24 hours
          hours: [h1, h2]
        }
      }]
    }

    let today = new Date()
    today.setHours(0, 1, 1) // remove minutes and seconds
    let studiesPart = {
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: today.toISOString(), // accepted today
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 30).toISOString() // 30 minutes ago
      }]
    }

    await scheduleNotificationsSingleStudy(studyDescr, studiesPart)

    expect(notifications.schedule.mock.calls.length).toBe(1)
    expect(notifications.schedule.mock.calls[0][0].length).toBe(1)
    expect(notifications.schedule.mock.calls[0][0][0].trigger.at.getHours()).toBe(h2)
  })
})
