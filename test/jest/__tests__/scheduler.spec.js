import { isTaskIntervalDue, generateTasker, scheduleNotificationsSingleStudy } from '../../../src/shared/scheduler.js'
import notifications from '../../../src/shared/notifications/index.js'

jest.mock('quasar')
jest.mock('../../../src/shared/notifications/index.js')

describe('When testing the scheduler', () => {
  test('an always on task is due when between start and end time', () => {
    const acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    const scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400,
      untilSecs: 100000000
    }
    const due = isTaskIntervalDue(scheduling, acceptTime)

    expect(due).toBe(true)
  })

  test('an always on task is due when after start and no end untilSec is specified', () => {
    const acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    const scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400
    }
    const due = isTaskIntervalDue(scheduling, acceptTime)

    expect(due).toBe(true)
  })

  test('an always on task is not due before start', () => {
    const acceptTime = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()
    const scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400
    }
    const due = isTaskIntervalDue(scheduling, acceptTime)

    expect(due).toBe(false)
  })

  test('a task depending on another task is not due before the other task', () => {
    const acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    const scheduling = {
      alwaysOn: false,
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 0,
      untilSecs: 3600
    }
    const due = isTaskIntervalDue(scheduling, acceptTime, [{ taskId: 1, consented: true }])

    expect(due).toBe(false)
  })

  test('a task depending on another task is not due if other task is not consented', () => {
    const acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    const scheduling = {
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 0,
      untilSecs: 3600
    }
    const due = isTaskIntervalDue(scheduling, acceptTime, [{ taskId: 1, consented: false }])

    expect(due).toBe(false)
  })

  test('a task depending on another task and that was executed long ago and has expired is not due', () => {
    const acceptTime = new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    const scheduling = {
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 0,
      untilSecs: 3600,
      intervalType: 'd',
      interval: 1,
      occurrences: 1
    }
    const due = isTaskIntervalDue(scheduling, acceptTime, [{
      taskId: 1,
      consented: true,
      lastExecuted: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    }])

    expect(due).toBe(false)
  })

  test('a task depending on another task and that has not expired is due', () => {
    const acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    const scheduling = {
      startEvent: 'taskExecution',
      eventTaskId: 1,
      startDelaySecs: 900, // 15 m
      untilSecs: 7200 // 2 hours
    }
    const due = isTaskIntervalDue(scheduling, acceptTime, [{
      taskId: 1,
      consented: true,
      lastExecuted: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString() // 30 m ago
    }])

    expect(due).toBe(true)
  })

  test('a rejected study is not scheduled', () => {
    const studyDescr = [{
      _key: '1234'
    }]
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'rejected'
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('an ended study is not scheduled', () => {
    const studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10),
        endDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 10).toISOString().substring(0, 10)
      }
    }]
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString()
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
    expect(tasks.completedStudyAlert).not.toBeUndefined()
  })

  test('a non consented task is not scheduled', () => {
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: false,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task appears at the beginning of today', () => {
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr)
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
    const studyDescr = [{
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
    const studiesPart = [{
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

    const tasks = generateTasker(studiesPart, studyDescr)

    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a weekly task is available 7 days after being executed', () => {
    const studyDescr = [{
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
    const studiesPart = [{
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

    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task is not available after all occurrences have finished', () => {
    const studyDescr = [{
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
    const studiesPart = [{
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

    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task with validity of 1 h is not missed nor upcoming if more than 1h has passed', () => {
    const studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: '2020-01-01',
        endDate: '2022-12-31'
      },
      tasks: [{
        id: 1,
        type: 'tugt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          untilSecs: 5184000, // 60 days
          validitySecs: 3600, // 1 hour
          interval: 1 // daily
        }
      }]
    }]
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: '2020-01-10T08:00:00.000Z', // study accepted on the 10th at 8AM
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // executed yesterday at 1AM
        lastExecuted: '2020-01-20T01:00:00.000Z'
      }]
    }]
    // the current time is 5AM on the 21st, so 4 hours after the validity of the task
    const now = new Date('2020-01-21T05:00:00.000Z')

    const tasks = generateTasker(studiesPart, studyDescr, now)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
    expect(tasks.completedStudyAlert).toBeFalsy()
  })

  test('a daily task with validity of 1 h is upcoming if less than 1h has passed', () => {
    const studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: '2020-01-01',
        endDate: '2022-12-31'
      },
      tasks: [{
        id: 1,
        type: 'tugt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          untilSecs: 5184000, // 60 days
          validitySecs: 3600, // 1 hour
          interval: 1 // daily
        }
      }]
    }]
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: '2020-01-10T08:00:00.000Z', // study accepted on the 10th at 8AM
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // executed yesterday
        lastExecuted: '2020-01-20T00:15:00.000Z'
      }]
    }]
    // the current time is 00:30 on the 21st, so within the validity of the task
    const now = new Date('2020-01-21T00:30:00')

    const tasks = generateTasker(studiesPart, studyDescr, now)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task with hourly schedule and validity of 1 h is upcoming if <1h has passed', () => {
    const studyDescr = [{
      _key: '1234',
      generalities: {
        startDate: '2020-01-01',
        endDate: '2022-12-31'
      },
      tasks: [{
        id: 1,
        type: 'tugt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          untilSecs: 5184000, // 60 days
          validitySecs: 3600, // 1 hour
          interval: 1, // daily
          hours: [12, 14] // at 12 and 14
        }
      }]
    }]
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: '2020-01-10T08:00:00.000Z', // study accepted on the 10th at 8AM
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // last executed on the 20th at 14:15
        lastExecuted: '2020-01-20T14:15:00.000Z'
      }]
    }]
    // the current time is 14:10 on the 21st, so within the validity of the task
    const now = new Date('2020-01-21T14:10:00')

    const tasks = generateTasker(studiesPart, studyDescr, now)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a study beyond end date is marked as completed', () => {
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr)
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
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr)
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
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString()
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr)
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
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString(), // yesterday
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
  })

  test('a daily task that ends 2 days after consent disappears after', () => {
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString() // yesterday
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
  })

  test('a task with occurrence 1 never executed is missed on the day of consent', () => {
    const studyDescr = [{
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
    const consent = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: consent.toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
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
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(1)
    expect(tasks.alwaysOn.length).toBe(0)

    expect(tasks.missed[0].type).toBe('smwt')
    expect(tasks.missed[0].studyKey).toBe('1234')
    expect(tasks.missed[0].taskId).toBe(1)
  })

  test('a daily task at a given hour time is scheduled at that hour', () => {
    const hour = new Date(new Date().getTime() - 1000).getHours()
    const studyDescr = [{
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
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(),
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toISOString() // one day ago
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)

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
    const h1 = new Date(new Date().getTime() - 1000 * 60 * 60 * 4).getHours()
    const h2 = new Date(new Date().getTime() - 1000 * 60 * 60 * 1).getHours()
    const studyDescr = [{
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
          hours: [h1, h2]
        }
      }]
    }]
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 28).toISOString(), // accepted yesterday
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 26).toISOString() // yesterday, but before the last one
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(1)
    expect(tasks.missed[0].type).toBe('smwt')
    expect(tasks.missed[0].studyKey).toBe('1234')
    expect(tasks.missed[0].taskId).toBe(1)
    expect(tasks.missed[0].due.getHours()).toBe(h2)
  })

  test('a daily task at given hours appears also the second time', () => {
    const h1 = new Date(new Date().getTime() - 1000 * 60 * 60 * 4).getHours()
    const h2 = new Date(new Date().getTime() - 1000 * 60 * 60 * 1).getHours()
    const studyDescr = [{
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
          hours: [h1, h2]
        }
      }]
    }]
    const today = new Date()
    today.setHours(0, 1, 1)
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: today.toISOString(), // accepted today
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 3).toISOString() // today after 1st but before 2nd
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.upcoming[0].type).toBe('smwt')
    expect(tasks.upcoming[0].studyKey).toBe('1234')
    expect(tasks.upcoming[0].taskId).toBe(1)
    expect(tasks.upcoming[0].due.getHours()).toBe(h2)
  })

  test('a daily task at given hour doesnt appear before that hour', () => {
    const h1 = new Date(new Date().getTime() + 1000 * 60 * 60 * 1).getHours() // hour in the future
    const studyDescr = [{
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
          hours: [h1]
        }
      }]
    }]
    const today = new Date()
    today.setHours(0, 1, 1)
    const studiesPart = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: today.toISOString(), // accepted today
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
  })

  test('a task due 15 minutes another task is scheduled', () => {
    const studyDescr = [{
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
    const studiesPart = [{
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
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(2)

    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a task due after another task and that has already been performed is not scheduled', () => {
    const studyDescr = [{
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
    const studiesPart = [{
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
    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task started after another task, performed the day before, is scheduled', () => {
    const studyDescr = [{
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
    const studiesPart = [{
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

    const tasks = generateTasker(studiesPart, studyDescr)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(2)

    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task due multiple times a day sends notifications when the task is due', async () => {
    const h1 = 8 // 8 AM
    const h2 = 11 // 11 AM
    const studyDescr = {
      _key: '1234',
      generalities: {
        startDate: '2020-01-01',
        endDate: '2022-12-31'
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          intervalType: 'd',
          interval: 1,
          untilSecs: 60 * 60 * 24, // only 24 hours
          hours: [h1, h2]
        }
      }]
    }

    const studiesPart = {
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: '2020-02-01T05:00:00', // accepted today at 5AM
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        lastExecuted: '2020-02-01T08:30:00' // already executed at 8:30
      }]
    }

    // schedule tasks at 10AM
    const now = new Date('2020-02-01T10:00:00') // 10AM the same day

    await scheduleNotificationsSingleStudy(studyDescr, studiesPart, now)

    expect(notifications.schedule.mock.calls.length).toBe(1)
    expect(notifications.schedule.mock.calls[0][0].length).toBe(1)
    expect(notifications.schedule.mock.calls[0][0][0].trigger.at.getHours()).toBe(h2)
  })

  test('a daily task delayed 1 day is available next day', async () => {
    const studyDescrs = [{
      _key: '1234',
      generalities: {
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-12-30')
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          untilSecs: 5184000,
          startDelaySecs: 86400, // 1 day delay
          intervalType: 'd',
          interval: 7,
          occurrences: 8
        }
      }]
    }]

    const studiesParts = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: '2020-02-01T09:00:00', // accepted at 9AM
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]

    const today = new Date('2020-02-02T10:00:00') // 10AM the next day

    const tasks = generateTasker(studiesParts, studyDescrs, today)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(1)

    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('a daily task delayed 1 day is not available the same day', async () => {
    const studyDescrs = [{
      _key: '1234',
      generalities: {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10), // 2 months ago
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 60).toISOString().substring(0, 10) // in 2 months
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          untilSecs: 5184000,
          startDelaySecs: 86400,
          intervalType: 'd',
          interval: 7,
          occurrences: 8
        }
      }]
    }]

    const today = new Date(new Date().getTime() - 1000 * 60 * 60 * 1) // 1 hour ago
    const studiesParts = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: today.toISOString(), // accepted today
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }]
    }]

    const tasks = generateTasker(studiesParts, studyDescrs)
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('tasks that start sequentially do not overlap the same day', async () => {
    const studyDescrs = [{
      _key: '1234',
      generalities: {
        startDate: new Date('2025-05-20'),
        endDate: new Date('2028-05-20')
      },
      tasks: [{
        id: 1,
        type: 'smwt',
        scheduling: {
          startEvent: 'consent',
          startDelaySecs: 0,
          untilSecs: 259200, // 3 days
          intervalType: 'd',
          interval: 1
        }
      },
      {
        id: 2,
        type: 'tug',
        scheduling: {
          startEvent: 'consent',
          untilSecs: 5184000,
          startDelaySecs: 259200, // 3 days
          intervalType: 'd',
          interval: 1
        }
      }]
    }]

    const startDay = new Date('2025-06-01T09:00:00') // the consent day at 9AM
    const studiesParts = [{
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: startDay,
      taskItemsConsent: [{
        taskId: 1,
        consented: true
      }, {
        taskId: 2,
        consented: true
      }]
    }]

    let today = new Date('2025-06-03T13:00:00') // 3 days after, at 13
    let tasks = generateTasker(studiesParts, studyDescrs, today)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(1) // the first task
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)

    today = new Date('2025-06-04T11:00:00') // 4 days after, at 11 AM
    tasks = generateTasker(studiesParts, studyDescrs, today)
    expect(tasks.upcoming.length).toBe(1)
    expect(tasks.upcoming[0].taskId).toBe(2) // the second task, which starts after the first one
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })
})
