import { isTaskIntervalDue, generateTasker } from '../../../src/modules/scheduler.js'

jest.mock('quasar')

describe('When testing the scheduler', () => {
  test('an always on task is due when between start and end time', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400,
      untilSecs: 100000000
    }
    let due = isTaskIntervalDue(acceptTime, scheduling)

    expect(due).toBe(true)
  })

  test('an always on task is due when after start and no end untilSec is specified', () => {
    let acceptTime = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400
    }
    let due = isTaskIntervalDue(acceptTime, scheduling)

    expect(due).toBe(true)
  })

  test('an always on task is not due before start', () => {
    let acceptTime = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()
    let scheduling = {
      alwaysOn: true,
      startEvent: 'consent',
      startDelaySecs: 86400
    }
    let due = isTaskIntervalDue(acceptTime, scheduling)

    expect(due).toBe(false)
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

  test('an ended study is marked as completed', () => {
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

  // todo test that second task in a day appears
})
