export default {
  title: 'Smart Peak Flow Meter measurement',
  shortTitle: 'Peak Flow',
  shortDescription: 'Record peak flow with the smart peak flow meter',
  OSpermissioniOS: `This task requires the app to access the microphone on your phone.
  This is needed to measure peak flow using the Smart Peak Flow Meter.
  The recorded sound will not be share with the research team, but only the peak flow values.
  Tap on Next if you want to proceed with the authorization process.`,
  OSpermissionAndroid: `This task requires the app to access the microphone on your phone.
  This is needed to measure peak flow using the Smart Peak Flow Meter.
  The recorded sound will not be share with the research team, but only the peak flow values.
  The collected data will be shared with the research team of this study for analysis.
  Tap on Next if you want to proceed with the authorization process.`,
  introductionSlides: [
    {
      // title: 'Requirements',
      img: 'instructions/peakflow_1.svg',
      description: 'In this task you are going to measure your peak flow, which is a measure of how quickly you can blow air out of your lungs.'
    },
    {
      title: 'Requirements',
      img: 'instructions/peakflow_2.svg',
      description: 'For this task, you need to plug the “Smart Peak Flow” meter into the audio socket of your phone. If your phone does not have an audio jack, use the Bluetooth adapter instead.'
    },
    {
      title: 'Setup',
      img: 'instructions/peakflow_3.svg',
      description: `The peak flow meter requires light from above, like sunlight or an electric bulb. Make sure you are not covering the top of the device.`
    },
    {
      title: 'Instructions',
      img: 'instructions/peakflow_4.svg',
      description: 'When ready, stand up and tap on “Start”. Then 1) inhale as much as you can, 2) cover the whole device with your mouth, 3) exhale as hard as you can. This is repeated 3 times.'
    }
  ],
  calibration: 'Calibration',
  calibrationStart: 'Connect your Smart Peak Flow meter to the phone and hold your phone under a light source. Press "Start" when ready.',
  calibrating: 'Calibrating...',
  calibrationError: 'There was an error during calibration. Please check the top of the device is not covered, the connection between the peak flow meter and your phone/Bluetooth adapter is secure, and that there is sufficient light above the peak flow meter.',
  measurement: 'Measurement',
  measurementStart: 'Stay still and make sure you are under a light source. When ready, press "Start".',
  measurementInstructions: 'Inhale as much as you can, cover the device with your mouth and exhale as hard as you can.',
  measurementCompleted1: 'First measurement completed. Please press "Start" when ready to start another measurement.',
  measurementCompleted2: 'Second measurement completed. Please press "Start" when ready to start another measurement.',
  measurementCompleted3: 'Third and last measurement completed. Press "Next" to proceed.',
  measurementError: 'Something went wrong, please retry',
  todayBest: `Today's Best Peak Flow:`,
  results: 'Past Peak Flow Readings',
  pef: 'Peak Flow',
  weeks: 'Weeks'
}
