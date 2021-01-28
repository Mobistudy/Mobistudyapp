'use strict'

export default {
  title: 'Pulse-oximeter measurement',
  shortTitle: 'Pulse oximeter',
  shortDescription: 'Take a blood oxygen saturation measurement',
  introductionSlides: [
    {
      title: 'Setup',
      img: '/statics/instructions/po60_1.jpg',
      description: 'In this task you will measure your blood oxygen saturation using the Beurer PO60 pulse-oximeter.'
    },
    {
      title: 'Instruction',
      img: '/statics/instructions/po60_2.jpg',
      description: 'Place your finger in the pulse-oximeter, wait until the heart rate and the oxygen saturation values are visible and remove your finger.'
    },
    {
      title: 'Important!',
      img: '/statics/instructions/po60_3.jpg',
      description: 'Make sure the Bluetooth is switched on on your phone. If it is the first time you connect the pulse-oximeter, the phone will ask you to confirm the connection by entering the code shown on the pulse-oximeter.'
    }
  ],
  connect: 'Connect',
  scanning: 'Searching for the pulse-oximeter.',
  scanFailed: 'There was a problem while searching for the pule-oximeter, do you want to retry?',
  noDeviceTitle: 'No pulse-oximeter found',
  noDevice: 'Could not find any pulse-oximeter. Please make sure Bluetooth is activated on your phone. Would you like to try again?',
  moreDevices: 'More than one pulse-oximeter was found. The nearest in proximity is the first device in the list. Please tap on one to connect to it.',
  takeMeasurement: 'Please put your finger in the device, press its button and remove your finger once you see a measurement on the screen',
  connectionFail: 'Cannot connect to the pulse-oximeter. Would you like to retry?',
  connecting: 'Connecting to the pulse-oximeter',
  dataSending: 'Sending data',
  healthData: {
    hr: 'Heart rate',
    spo2: 'Oxygen saturation'
  },
  dataHRTitle: 'Heart beats per minute',
  dataSPO2Title: 'Blood oxygen saturation'
}
