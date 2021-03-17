'use strict'
export default {
  title: 'Smart Peak Flow Meter Recording',
  shortTitle: 'Peak Flow',
  description: 'This task is to record peak flow measurements using the SRP smart peak flow meter.',
  shortDescription: 'Record peak flow with smart peak flow meter',
  introductionSlides: [
    {
      title: 'Requirements',
      // img: '/statics/instructions/qcst_1.jpg',
      description: 'For this task you will need to connect the smart peak flow meter to your phone, either with the Bluetooth adpater or with the audio jack.'
    },
    {
      title: 'Requirements',
      // img: '/statics/instructions/qcst_1.jpg',
      description: 'You will need a light source for the peak flow meter, either a desk lamp or the window would suffice.'
    }
  ],
  pef: 'Peak Flow',
  weeks: 'Weeks',
  calibrate: 'Calibrate Smart Peak Flow Meter',
  calibrating: 'Calibrating...',
  calibrateSuccess: 'Calibration finished',
  calibrateError: 'There was an error is calibration. Please check the top of the device is not covered, the connection between the peak flow meter and your phone/Bluetooth adapter is secure, and there is sufficient light above the peak flow meter.',
  measure: 'Measure',
  todayResults: `Today's Readings:`,
  todayBest: `Today's Best Peak Flow:`,
  results: 'Past Peak Flow Readings'
}
