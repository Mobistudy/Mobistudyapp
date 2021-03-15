'use strict'

export default {
  title: 'Activity tracker download',
  shortTitle: 'Activity tracker',
  shortDescription: 'Extract data from your activity tracker',
  OSpermissioniOS: `This task requires the app to access Bluetooth on your phone. 
  This is needed to connect the app with the MiBand3 fitness tracker and collect the data from it.
  The collected data will be shared with the research team of this study for analysis.
  Tap on Next if you want to proceed with the authorization process.`,
  OSpermissionAndroid: `This task requires the app to access Bluetooth on your phone. 
  This is needed to connect the app with the MiBand3 fitness tracker and collect the data from it.
  The collected data will be shared with the research team of this study for analysis.
  Tap on Next if you want to proceed with the authorization process.`,
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/miband3_1.png',
      description: 'In this task you will connect to your MiBand smart bracelet and download your activity data, including steps, heart rate, activity and sleep.'
    },
    {
      title: 'Setup',
      img: 'instructions/miband3_2.png',
      description: 'In order for the phone to connect to the MiBand, please, make sure that Blueetooth is activated on the phone, that the Miband is charged, and is near the phone.'
    },
    {
      title: 'Important!',
      img: 'instructions/miband3_tap.png',
      description: 'If it is the first time you connect to the MiBand, the MiBand will ask you to confirm the connection to the phone by tapping on it. Please tap on the bracelet when you feel the vibration on the wrist.'
    }
  ],
  connect: 'Connect',
  searching: 'Searching for nearby Miband',
  searchFailed: 'There was a problem while searching for your MiBand, do you want to retry?',
  noDeviceTitle: 'No MiBand found',
  noDevice: 'Could not find any MiBand. Please make sure Bluetooth is activated on your phone. Would you like to search again?',
  notEnoughData: 'There was no recent data to be retrieved from MiBand. You can retry next time this task is due.',
  moreDevices: 'More than one MiBand device was found. The nearest in proximity is the first device in the list. Tap on the device in the list you wish to connect to.',
  tap: 'Tap the activity tracker.',
  connectionFail: 'Cannot connect to the device. Would you like to retry?',
  connecting: 'Connecting to the Miband',
  activityTypes: {
    walk: 'Walking',
    charging: 'Charging',
    not_worn: 'Not worn',
    sedentary: 'Sedentary',
    running: 'Running',
    activity_high: 'Intense activity',
    activity_low: 'Low activity',
    sleep: 'Sleeping',
    unknown: 'Unknown'
  },
  dataDownload: 'Downloading data',
  dataDownloadError: 'Could not retrieve data from the band, please retry or cancel.',
  dataSending: 'Sending data',
  chartsIntro: 'The following charts summarize the data that have been retrieved from the band. Tap on "Send" to share these data with the research team or tap on "Discard" to avoid sending these data.',
  lineChart: 'Activity over time',
  hrs: 'heart rate',
  intensities: 'intensity',
  steps: 'steps',
  pieChart: 'Time spent in each activity',
  hours: 'hours'
}
