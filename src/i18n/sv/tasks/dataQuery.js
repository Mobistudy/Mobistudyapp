'use strict'

export default {
  title: 'Data Query',
  shortDescription: 'Queries HealthKit and GoogleFit for activity data',
  shortTitle: 'Data Query',
  description: 'This task downloads your activity data from either GoogleFit or HealthKit.',
  instructionSlidesAndroid: [
    {
      title: 'Introduction',
      img: 'statics/instructions/data_query_android_1.png',
      i: 'In this task, the app will retrieve data gathered by the Google Fit app if you have it installed on your phone.'
    },
    {
      img: 'statics/instructions/data_query_2.png',
      i: 'The Mobistudy app will only retrieve the data that is requested for this study. A summary of the data will be shown in the form of charts. After reviewing the information, you are free to send it or discard it.'
    }
  ],
  instructionSlidesiOS: [
    {
      title: 'Introduction',
      img: 'statics/instructions/data_query_ios_1.png',
      i: 'In this task, the app will retrieve data gathered by the Health app.'
    },
    {
      img: 'statics/instructions/data_query_2.png',
      i: 'The Mobistudy app will only retrieve the data that is requested for this study. A summary of the data will be shown in the form of charts. After reviewing the information, you are free to send it or discard it.'
    }
  ],
  dataQueryExplanation: 'This is a summary of the data that has been retrieved from your phone. Feel free to send it or discard it.'
}
