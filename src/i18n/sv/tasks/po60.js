'use strict'

export default {
  title: 'Pulse oximeter download',
  shortTitle: 'Pulse oximeter',
  shortDescription: 'Extract data from your pulse oximeter',
  introductionSlides: [
    { title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'In this task you will connect to your Beurer PO60 Pulse Oximeter device and download your health data from it including heart rate and oxygen saturation levels.'
    },
    { title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'In order for the phone to connect to the pulse oximeter, please, make sure that Blueetooth is activated on the phone, that the pulse oximeter is charged and nearby the phone.'
    },
    { title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'If it is the first time you connect to the pulse oximeter, the pulse oximeter will ask you to confirm the connection to the phone by entering the code shown on the pulse oximeter devices screen into a popup dialog on your phone. To proceed, tap on "Connect" below.'
    }
  ],
  connect: 'Connect',
  scanning: 'Scanning for nearby pulse oximeter',
  scanFailed: 'There was a problem while scanning for your pule oximeter, do you want to retry?',
  noDeviceTitle: 'No pulse oximeter found',
  noDevice: 'Could not find any pulse oximeter. Please make sure Bluetooth is activated on your phone. Would you like to search again?',
  moreDevices: 'More than one pulse oximeter device was found. The nearest in proximity is the first device in the list. Please tap on one to connect to it.',
  tap: 'Tap the activity tracker!',
  connectionFail: 'Cannot connect to the device, would you like to retry?',
  connecting: 'Connecting to the pulse oximeter',
  healthData: {
    hr: 'Heart rate',
    spo2: 'Oxygen saturation'
  },
  dataDownload: 'Downloading data',
  dataDownloadError: 'Could not retrieve data from the pulse oximeter, please retry or cancel.',
  dataSending: 'Sending data',
  pieChart: 'Time spent in each activity',
  hours: 'hours'
}
