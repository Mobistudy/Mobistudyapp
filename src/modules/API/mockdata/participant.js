export default {
  _key: '098765',
  userKey: '1231232',
  createdTS: '2019-12-10T09:30:32.492Z',
  name: 'Jameson',
  surname: 'Lee',
  country: 'gb',
  language: 'en',
  sex: 'male',
  dateOfBirth: '1970-11-10',
  height: 172,
  weight: 67,
  diseases: [
    {
      term: 'COPD',
      conceptId: '13645005',
      vocabulary: 'SNOMED'
    }
  ],
  medications: [],
  studiesSuggestions: true,
  studies: [
    {
      studyKey: '1978',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      reminders: true,
      criteriaAnswers: ['yes'],
      taskItemsConsent: [
        { taskId: 1, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toISOString() },
        { taskId: 2, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 3, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 4, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 5, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 6, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 7, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 8, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 9, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 10, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 11, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() },
        { taskId: 12, consented: true, lastExecuted: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toISOString() }
      ]
    }

    // {
    //   studyKey: '4590699',
    //   currentStatus: 'accepted',
    //   acceptedTS: '2021-07-10T10:35:23.279Z',
    //   reminders: true,
    //   taskItemsConsent: [
    //     {
    //       taskId: 1,
    //       consented: true,
    //       lastExecuted: '2021-07-22T12:49:55.859Z'
    //     },
    //     {
    //       taskId: 2,
    //       consented: true
    //     },
    //     {
    //       taskId: 3,
    //       consented: true
    //     }
    //   ],
    //   extraItemsConsent: []
    // }

    // {
    //   studyKey: '5349389',
    //   currentStatus: 'accepted',
    //   acceptedTS: new Date(new Date().getTime() - 1000 * 60 * 60).toISOString(),
    //   reminders: true,
    //   criteriaAnswers: ['yes'],
    //   taskItemsConsent: [
    //     { taskId: 1, consented: true },
    //     { taskId: 2, consented: true },
    //     { taskId: 3, consented: true },
    //     { taskId: 4, consented: true },
    //     { taskId: 5, consented: true }
    //   ]
    // }
  ]
}
