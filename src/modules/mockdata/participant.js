export default {
  userKey: '1231232',
  createdTS: '2019-12-10T09:30:32.492Z',
  name: 'Jameson',
  surname: 'Lee',
  country: 'gb',
  language: 'en',
  sex: 'male',
  dateOfBirth: '1986-11-10',
  diseases: [
    {
      term: 'asthma',
      conceptId: '987653',
      vocabulary: 'SNOMED'
    }
  ],
  medications: [],
  lifestyle: {
    active: false,
    smoker: true
  },
  studies: [
    {
      studyKey: 'SMWT',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 604800000).toISOString(), // 7 days ago
      reminders: true,
      criteriaAnswers: [ 'yes' ],
      taskItemsConsent: [
        { taskId: 1, consented: true, lastExecuted: new Date(new Date().getTime() - 86400000).toISOString() }, // 1 day ago
        { taskId: 2, consented: true, lastExecuted: new Date(new Date().getTime() - 172800000).toISOString() }
      ]
    },
    {
      studyKey: '1234',
      currentStatus: 'accepted',
      acceptedTS: new Date(new Date().getTime() - 604800000).toISOString(), // 7 days ago
      reminders: true,
      criteriaAnswers: [ 'yes' ],
      taskItemsConsent: [
        { taskId: 1, consented: true, lastExecuted: new Date(new Date().getTime() - 86400000).toISOString() }, // 1 day ago
        { taskId: 2, consented: true, lastExecuted: new Date(new Date().getTime() - 172800000).toISOString() }
      ]
    }
  ]
}
