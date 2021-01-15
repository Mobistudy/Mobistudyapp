'use strict'

export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Perform a Six Minute Walk Test',
  shortTitle: '6MWT',
  description: 'This task is about measuring how far you can walk in 6 minutes (6-minute walk test). Your smartphone will monitor your position while you walk and compute the total walked distance. This distance can provide indications about your exercise capacity and your general health.',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'The aim of this test is to walk as far as possible for 6 minutes.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'It is important that you try to walk as straight as possible. Try to avoid stairs and/or walking up/downhill.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'If possible, try to avoid areas with many tall buildings and / or trees as these can affect how the phone localises you.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'You may slow down and stop if necessary. Stop immediately if you have any chest pain or dizziness.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'The test will automaticly stop after 6 minutes, and you will be asked to send the collected data. If you need to complete the test earlier, press the "Complete"-button.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'Try not to talk during the test, as this may affect your performance.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'Hold your phone still in one hand, avoid shaking or twisting it until the test is finished.'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      description: 'You can place your phone in a pocket or use an arm band if needed, but do not switch off the screen!'
    },
    {
      title: 'Instruction',
      img: 'https://picsum.photos/200',
      i: 'When you are ready to start the test, press the "Start"-button.'
    }
  ],
  loadingMap: 'Loading map',
  loadingMapCannot: 'Could not load the map',
  signalCheck: 'Waiting for the GPS signal.',
  smwtExplanation: 'Computed distance walked during a Six Minute Walk Test. If you agree to send it, tap on Send.',
  smwtNote: 'Please read the instructions carefully. The accuracy of the test depends on the instructions being followed as closely as possible.',
  noteGPS: 'Note: This test uses the GPS of your phone and therefore requires internet connection. If you experience errors during the test, pleae make sure that your phone is connected to the internet.',
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
