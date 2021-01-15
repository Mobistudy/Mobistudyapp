'use strict'

export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Perform a Six Minute Walk Test',
  shortTitle: '6MWT',
  description: 'This task is about measuring how far you can walk in 6 minutes (6-minute walk test). Your smartphone will monitor your position while you walk and compute the total walked distance. This distance can provide indications about your exercise capacity and your general health.',
  introductionSlides: [
    {
      title: 'Instructions',
      img: '/statics/instructions/6mwt_1.jpg',
      description: 'The aim of this test is to walk as far as possible for 6 minutes.'
    },
    {
      title: 'Instructions',
      img: '/statics/instructions/6mwt_2.jpg',
      description: 'It is important that you try to walk as straight as possible. Try to avoid stairs and/or walking up/downhill.'
    },
    {
      title: 'Instructions',
      img: '/statics/instructions/6mwt_3.jpg',
      description: 'If possible, try to avoid areas with many tall buildings and / or trees as these can affect how the phone localises you.'
    },
    {
      title: 'Important!',
      img: '/statics/instructions/6mwt_4.jpg',
      description: 'You may slow down and stop if necessary. Stop immediately if you have any chest pain or dizziness.'
    },
    {
      img: '/statics/instructions/6mwt_1.jpg',
      description: 'The test will automaticly stop after 6 minutes, and you will be asked to send the collected data. If you need to complete the test earlier, press the "Complete"-button.'
    },
    {
      title: 'Setup',
      img: '/statics/instructions/6mwt_6.jpg',
      description: 'Make sure the positioning is ON on your phone before starting.'
    },
    {
      title: 'Setup',
      img: '/statics/instructions/6mwt_7.jpg',
      description: 'Hold your phone still in one hand, avoid shaking or twisting it until the test is finished.'
    },
    {
      title: 'Setup',
      img: '/statics/instructions/6mwt_8.jpg',
      description: 'You can place your phone in a pocket or use an arm band if needed, but do not switch off the screen!'
    }
  ],
  signalCheck: 'Waiting for the GPS signal.',
  time: 'Time',
  steps: 'Steps',
  distance: 'Distance',
  borgScale: {
    intro: 'Please rate your level of exertion:',
    l0: 'No exertion',
    l05: 'Very very slight',
    l1: 'Very slight',
    l2: 'Slight',
    l3: 'Moderate',
    l4: 'Somewhat strong',
    l5: 'Strong',
    l7: 'Very strong',
    l9: 'Very very strong',
    l10: 'Maximal',
    result: 'Your selection is:'
  }
}
