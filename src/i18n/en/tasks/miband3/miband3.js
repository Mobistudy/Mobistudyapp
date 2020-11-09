'use strict'

export default {
  studies: {
    tasks: {
      miband3: {
        title: 'Miband3',
        shortDescription: 'Download your activity data',
        shortTitle: 'Getting your activity data, son',
        description: 'Activity monitoring for a specified frequency during a set amount of time',
        activityTypes: {
          walk: 'Walking',
          unknown: 'Unknown'
        },
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
