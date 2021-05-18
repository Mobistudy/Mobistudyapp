'use strict'
export default {
  title: 'Smart Peak Flow Meter Recording',
  shortTitle: 'Peak Flow',
  description: 'This task is to record peak flow measurements using the SRP smart peak flow meter.',
  shortDescription: 'Record peak flow with smart peak flow meter',
  OSpermissioniOS: `This task requires the app to access the Microphone on your phone.
  This is needed to measure peak flow using the Smart Peak Flow Meter.
  The collected data will be shared with the research team of this study for analysis.
  Tap on Next if you want to proceed with the authorization process.`,
  OSpermissionAndroid: `This task requires the app to access the Microphone on your phone.
  This is needed to measure peak flow using the Smart Peak Flow Meter.
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
      description: 'For this task, you need the “Smart Peak Flow” meter. Plug it into the phone audio socket. If you phone does not have an audio jack, use the Bluetooth adapter instead.'
    },
    {
      title: 'Setup',
      img: 'instructions/peakflow_3.svg',
      description: `Your device requires light form above, like sunlight or an electric bulb. Make sure you are not covering the top of the device.`
    },
    {
      title: 'Instruction',
      img: 'instructions/peakflow_4.svg',
      description: 'Stand up and tap on “Start”. Then 1) inhale as much as you can, 2) cover the whole device with your mouth, 3) exhale as hard as you can. This is repeated 3 times.'
    }
  ],
  pef: 'Peak Flow',
  weeks: 'Weeks',
  calibrate: 'Calibrate Smart Peak Flow Meter',
  calibrating: 'Calibrating...',
  calibrateSuccess: 'Calibration finished',
  calibrateError: 'There was an error is calibration. Please check the top of the device is not covered, the connection between the peak flow meter and your phone/Bluetooth adapter is secure, and there is sufficient light above the peak flow meter.',
  measure: 'Measure',
  measuring: 'Blow when ready',
  todayResults: `Today's Readings:`,
  todayBest: `Today's Best Peak Flow:`,
  results: 'Past Peak Flow Readings'
}
