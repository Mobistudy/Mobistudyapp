import { generateTasker } from '../../../src/shared/scheduler.js'
import epropp53 from '../../../src/shared/API/mockdata/ePROPP/epropp5.3.json'

jest.mock('quasar')
jest.mock('../../../src/shared/notifications/index.js')

describe('When testing the ePropp5.3', () => {
  test('study is not completed when phase 2 is completed', () => {
    const now = new Date('2023-08-20T15:00:00.000Z') // 20th of August 2023

    const studyDescr = [epropp53]
    const studiesPart = [{
      studyKey: '81172231',
      currentStatus: 'accepted',
      // tasks expected to be executed 18 days ago and 11 days ago and 4 days ago
      acceptedTS: '2026-08-01T10:00:00.000Z', // 1st of August 2026
      taskItemsConsent: [{
        taskId: 1,
        consented: true,
        // first task lasts 3 days, so last executed on 3rd August 2026
        lastExecuted: '2026-08-03T11:00:00.000Z'
      }, {
        taskId: 2,
        consented: true,
        // second task lasts 7 days, so last executed on 10th August 2026
        lastExecuted: '2026-08-10T09:00:00.000Z'
      },
      {
        // 3rd task starts after 30 days from acceptance, thus not yet started
        taskId: 3,
        consented: true
      },
      {
        taskId: 4,
        consented: true
      }, {
        taskId: 5,
        consented: true
      }]
    }]

    const tasks = generateTasker(studiesPart, studyDescr, now)

    expect(tasks.completedStudyAlert).toBeFalsy()
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })

  test('task 3 ends after it was completed', () => {
    const now = new Date('2025-12-15T15:00:00.000Z')

    const studyDescr = [epropp53]
    const studiesPart = [
      {
        studyKey: '81172231',
        currentStatus: 'accepted',
        acceptedTS: '2025-11-01T07:44:43.436Z',
        reminders: true,
        taskItemsConsent: [
          {
            taskId: 1,
            consented: true,
            lastExecuted: '2025-11-03T17:47:56.687Z'
          },
          {
            taskId: 2,
            consented: true,
            lastExecuted: '2025-11-10T05:00:47.294Z'
          },
          {
            taskId: 3,
            consented: true,
            lastExecuted: '2025-12-09T08:45:03.583Z'
          },
          {
            taskId: 4,
            consented: true
          },
          {
            taskId: 5,
            consented: true
          }
        ],
        extraItemsConsent: []
      }
    ]

    const tasks = generateTasker(studiesPart, studyDescr, now)

    expect(tasks.completedStudyAlert).toBeFalsy()
    expect(tasks.upcoming.length).toBe(0)
    expect(tasks.missed.length).toBe(0)
    expect(tasks.alwaysOn.length).toBe(0)
  })
})
