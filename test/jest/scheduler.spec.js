import { isTaskIntervalDue } from '../../src/modules/scheduler.js'

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
})
