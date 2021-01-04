'use strict'

/**
 * The form task can consist of several different introductions, specified by the researcher when creating the study.
 * It means that the API has to be used to request the data to be displayed. This object is used as a template for the
 * Intro.vue object to know how many slides are going to be used. Slots are then used in FormIntro.vue to request the information
 * from the API. Aka, enter the amount of introduction slides you'd like here but the information won't be used.
 */

export default {
  studies: {
    tasks: {
      form: {
        title: '',
        shortDescription: '',
        shortTitle: '',
        description: '',
        slides: [
          { title: '',
            img: '',
            i: '' }
        ]
      }
    }
  }
}
