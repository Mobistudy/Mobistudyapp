'use strict'

export default {
  studies: {
    tasks: {
      miband3: {
        title: 'Miband3',
        shortDescription: 'Download your activity data',
        shortTitle: 'Getting your activity data, son',
        description: 'Activity monitoring for a specified frequency during a set amount of time',
        searching: 'Searching for nearby Miband',
        searchFailed: 'There was a problem while searching for your MiBand, do you want to retry?',
        noDeviceTitle: 'No MiBand found',
        noDevice: 'Could not find any MiBand. Please make sure your bluetooth is on. Would you like to search again?',
        moreDevices: 'More than one MiBand device was found. The nearest in proximity is the first device in the list. Please tap on one to connect to it.',
        connectionFail: 'Cannot connect to the device, would you like to retry?',
        connecting: 'Connecting to the Miband',
        connected: 'Connection succesful',
        activityTypes: {
          walk: 'Walking',
          unknown: 'Unknown'
        },
        dataDownload: 'Downloading data',
        dataDownloadError: 'Could not retrieve data from the band, please retry or cancel.',
        chartsIntro: 'The following charts summarize the data that have been retrieved from the band. Tap on "Send" to share these data with the research team or tap on "Skip" to avoid sending these data.',
        lineChart: 'Activity over time',
        hrs: 'heart rate',
        intensities: 'intensity',
        steps: 'steps',
        pieChart: 'Time spent in each activity'
      }
    }
  }
}
