export default {
  title: 'Smartwatch download',
  shortTitle: 'Smartwatch',
  shortDescription: 'Extract data from your smartwatch',
  OSpermissioniOS: `This task requires the app to access Bluetooth on your phone.
  This is needed to connect the app with the smartwatch tracker and collect the data from it.
  The collected data will be shared with the research team of this study for analysis.
  Tap on Next if you want to proceed with the authorization process.`,
  OSpermissionAndroid: `This task requires the app to access Bluetooth on your phone.
  This is needed to connect the app with the smartwatch tracker and collect the data from it.
  The collected data will be shared with the research team of this study for analysis.
  Tap on Next if you want to proceed with the authorization process.`,
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'tasks/jstyle/jstyle_1.svg',
      description: 'In this task you will connect to your JStyle smartwatch and download your data, including steps, heart rate, activity, pulseoximetry, temperature and sleep.'
    },
    {
      title: 'Setup',
      img: 'tasks/jstyle/jstyle_2.svg',
      description: 'Make sure that Bluetooth and Location (or Bluetooth scanning) are enabled on the phone, that the JStyle smartwatch is charged, and is near the phone.'
    }
  ],
  connect: 'Connect',
  searching: 'Searching for nearby smartwatches',
  searchFailed: 'There was a problem while searching for your smartwatch, do you want to retry?',
  noDeviceTitle: 'No smartwatch found',
  noDevice: 'Could not find any compatible smartwatch. Please make sure Bluetooth is activated on your phone. Would you like to search again?',
  notEnoughData: 'There was no recent data to be retrieved from the smartwatch. You can retry next time this task is due.',
  moreDevices: 'More than one smartwatch device was found. The nearest in proximity is the first device in the list. Tap on the device in the list you wish to connect to.',
  connectionFail: 'Cannot connect to the device. Would you like to retry?',
  connectionRepair: 'Forget current device and connect again',
  connecting: 'Connecting to the smartwatch',
  dataDownload: 'Downloading data',
  dataDownloadError: 'Could not retrieve data from the smartwatch, please retry or cancel.',
  dataSending: 'Sending data',
  chartsIntro: 'The following charts summarize the data that have been retrieved from the smartwatch. Tap on "Send" to share these data with the research team or tap on "Discard" to avoid sending these data.',
  lineChart: 'Activity over time',
  hrs: 'heart rate',
  temperatures: 'temperature',
  steps: 'steps',
  hours: 'hours',
  sleepQuality: 'sleep quality'
}
