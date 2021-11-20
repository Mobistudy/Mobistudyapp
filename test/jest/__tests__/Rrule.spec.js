import { RRule } from 'rrule'

function toUTC (d) {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()))
}

function fromUTC (d) {
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds())
}

describe('When testing RRules', () => {
  test('a daily sch is not available before start and available after start', () => {
    let startDate = new Date(2020, 1, 10, 12, 30, 0, 0)
    let rr = new RRule({
      freq: RRule.DAILY,
      interval: 1,
      dtstart: toUTC(startDate)
    })
    let before = rr.before(toUTC(new Date(2020, 1, 10, 12, 29, 0, 0)))
    let after = rr.after(toUTC(new Date(2020, 1, 10, 12, 31, 0, 0)))

    expect(before).toBeNull()
    expect(after).not.toBeNull()
    after = fromUTC(after)
    expect(after.getHours()).toBe(12)
    expect(after.getMinutes()).toBe(30)
    expect(after.getSeconds()).toBe(0)
  })

  test('a daily schedule starts at the beginning of the day', () => {
    let startEvent = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 15)
    startEvent.setHours(0, 0, 1)
    let rr = new RRule({
      freq: RRule.DAILY,
      interval: 1,
      dtstart: toUTC(startEvent)
    })

    let startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    let instances = rr.between(toUTC(startOfToday), toUTC(new Date()))
    expect(instances.length).toBe(1)
    let dd = fromUTC(instances[0])
    expect(dd.getHours()).toBe(0)
  })

  test('a daily schedule with hours starts at that hour', () => {
    let startEvent = new Date(2020, 1, 10, 12, 0, 0, 0, 1)
    let rr = new RRule({
      freq: RRule.DAILY,
      interval: 1,
      dtstart: toUTC(startEvent),
      byhour: [ 19 ]
    })

    let before = new Date(2020, 1, 15, 18, 59, 59, 59, 999)
    let after = new Date(2020, 1, 15, 19, 1, 1, 1, 1)

    let instances = rr.between(toUTC(before), toUTC(after))
    expect(instances.length).toBe(1)
    let dd = fromUTC(instances[0])
    expect(dd.getHours()).toBe(19)
  })

  test('a daily schedule with 2 hours starts at those hour', () => {
    let startEvent = new Date(2020, 1, 10, 12, 0, 0, 0, 1)
    startEvent.setHours(0, 0, 0, 1)
    let rr = new RRule({
      freq: RRule.DAILY,
      interval: 1,
      dtstart: toUTC(startEvent),
      byhour: [ 10, 18 ]
    })

    let after = new Date(2020, 1, 15, 0, 0, 0, 0, 1)
    let before = new Date(2020, 1, 16, 23, 59, 59, 59, 999)

    let instances = rr.between(toUTC(after), toUTC(before))
    expect(instances.length).toBe(4)
    let dd = fromUTC(instances[0])
    expect(dd.getHours()).toBe(10)
    dd = fromUTC(instances[1])
    expect(dd.getHours()).toBe(18)
    dd = fromUTC(instances[2])
    expect(dd.getHours()).toBe(10)
    dd = fromUTC(instances[3])
    expect(dd.getHours()).toBe(18)
  })
})
