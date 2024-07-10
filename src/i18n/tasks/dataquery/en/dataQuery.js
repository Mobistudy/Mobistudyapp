export default {
  title: 'Data Query',
  shortDescription: 'Download health and activity data from your phone',
  shortTitle: 'Data Query',
  OSpermissioniOS: 'This task requires the app to access part of the data collected by HealthKit on your phone. These data are needed by the research team for analysis.\n Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access part of the data collected by Google Fit on your phone. These data are needed by the research team for analysis.\n Tap on Next if you want to proceed with the authorization process.',
  introductionSlidesAndroid: [
    {
      title: 'Introduction',
      img: 'instructions/dataquery1.svg',
      description: 'In this task, the app will retrieve data gathered by the Google Fit app if you have it installed on your phone.'
    },
    {
      img: 'instructions/dataquery2.svg',
      description: 'The Mobistudy app will only retrieve the data that is requested for this study. A summary of the data will be shown in the form of charts. After reviewing the information, you are free to send it or discard it.'
    }
  ],
  introductionSlidesiOS: [
    {
      title: 'Introduction',
      img: 'instructions/dataquery1.svg',
      description: 'In this task, the app will retrieve data gathered by the Health app.'
    },
    {
      img: 'instructions/dataquery2.svg',
      description: 'The Mobistudy app will only retrieve the data that is requested for this study. A summary of the data will be shown in the form of charts. After reviewing the information, you are free to send it or discard it.'
    }
  ],
  dataQueryExplanationiOS: 'This is a summary of the data that has been retrieved from HealthKit. Tap on "Send" to share these data with the research team or tap on "Discard" to avoid sending these data.',
  dataQueryExplanationAndroid: 'This is a summary of the data that has been retrieved from Google Fit. Tap on "Send" to share these data with the research team or tap on "Discard" to avoid sending these data.'
}
