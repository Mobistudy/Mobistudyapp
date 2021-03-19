'use strict'

export default {
  title: 'Pulse oximeter measurement',
  shortTitle: 'Pulse oximeter',
  shortDescription: 'Take a blood oxygen saturation measurement',
  OSpermissioniOS: `This task requires the app to access Bluetooth on your phone. 
  This is needed to connect the app with the PO60 pulseoximeter and collect the measured blood oxygen
  saturation. The collected data will be shared with the research team of this study for analysis.\n
  Tap on Next if you want to proceed with the authorization process.`,
  OSpermissionAndroid: 'This task requires the app to access Bluetooth on your phone. This is needed to connect the app with the PO60 pulseoximeter and collect the measured blood oxygen saturation. The collected data will be shared with the research team of this study for analysis.\n Tap on Next if you want to proceed with the authorization process.',
  introductionSlidesAndroid: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'In this task you will measure your blood oxygen saturation using the Beurer PO60 pulse oximeter.'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Place your finger in the pulse-oximeter, wait until the heart rate and the oxygen saturation values are visible and remove your finger.'
    },
    {
      img: 'instructions/po60_3_android.jpg',
      description: `Make sure the Bluetooth is activated on your phone.
      If it is the first time you connect the pulse-oximeter, you will receive a notification 
      asking if you want to pair the device.
      After accepting the notification, you need to copy the code shown on the pulse-oximeter to your phone
      to complete the pairing process.`
    }
  ],
  introductionSlidesiOS: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'In this task you will measure your blood oxygen saturation using the Beurer PO60 pulse oximeter.'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Place your finger in the pulse-oximeter, wait until the heart rate and the oxygen saturation values are visible and remove your finger.'
    },
    {
      img: 'instructions/po60_3_ios.jpg',
      description: `Make sure the Bluetooth is activated on your phone. 
      If it is the first time you connect the pulse-oximeter, the phone will ask you to confirm 
      the connection by entering the code shown on the pulse-oximeter.`
    }
  ],
  connect: 'Connect',
  scanning: 'Searching for the pulse-oximeter.',
  scanFailed: 'There was a problem while searching for the pule-oximeter. Do you want to retry?',
  noDeviceTitle: 'No pulse oximeter found.',
  noDevice: 'Could not find any pulse oximeter. Please make sure Bluetooth is activated on your phone. Would you like to try again?',
  moreDevices: 'More than one pulse oximeter was found. The nearest in proximity is the first device in the list. Please tap on the device in the list you want to connect to.',
  takeMeasurement: 'Please put your finger in the device, press its button and remove your finger once you see a measurement on the screen.',
  connectionFail: 'Cannot connect to the pulse oximeter. Would you like to retry?',
  connecting: 'Connecting to the pulse-oximeter',
  dataSending: 'Sending data',
  dataDownloadError: 'Cannot retrieve data from the pulseoximeter.',
  healthData: {
    hr: 'Heart rate',
    spo2: 'Oxygen saturation'
  },
  dataHRTitle: 'Heart beats per minute',
  dataSPO2Title: 'Blood oxygen saturation'
}
