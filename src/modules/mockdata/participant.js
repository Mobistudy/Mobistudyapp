export default {
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
  // studies: []
  studies: [
    // {
    //   studyKey: '9999',
    //   currentStatus: 'accepted',
    //   acceptedTS: new Date(new Date().getTime() - 604800000).toISOString(), // 7 days ago
    //   reminders: true,
    //   criteriaAnswers: ['yes'],
    //   taskItemsConsent: [
    //     { taskId: 1, consented: true, lastExecuted: new Date(new Date().getTime() - 86400000).toISOString() }, // 1 day ago
    //     { taskId: 2, consented: true, lastExecuted: new Date(new Date().getTime() - 172800000).toISOString() }, // 2 day ago
    //     { taskId: 3, consented: true, lastExecuted: new Date(new Date().getTime() - 691200000).toISOString() }, // 8 days ago
    //     { taskId: 4, consented: true, lastExecuted: new Date(new Date().getTime() - 691200000).toISOString() }, // 8 days ago
    //     { taskId: 5, consented: true, lastExecuted: new Date(new Date().getTime() - 691200000).toISOString() } // 8 days ago
    //   ]
    // }
    {
      studyKey: '3333',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 604800000).toISOString(), // 7 days ago
      reminders: true,
      criteriaAnswers: ['yes'],
      taskItemsConsent: [
        { taskId: 1, consented: true, lastExecuted: new Date(new Date().getTime() - 86400000).toISOString() }, // 1 day ago
        { taskId: 2, consented: true, lastExecuted: new Date(new Date().getTime() - 691200000).toISOString() }, // 8 day ago
        { taskId: 3, consented: true, lastExecuted: new Date(new Date().getTime() - 691200000).toISOString() }, // 8 days ago
        { taskId: 4, consented: true, lastExecuted: new Date(new Date().getTime() - 86400000).toISOString() } // 1 days ago
      ]
    }
  ]
}
