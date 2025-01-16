export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Perform a Six Minute Walk Test',
  shortTitle: '6MWT',
  OSpermissioniOS: 'This task requires the app to access the positioning system of your phone (like the GPS) and the step counter if available. These are needed to compute the distance walked during the test. Both your location and the walked steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the positioning system of your phone (like the GPS) and the step counter if available. These are needed to compute the distance walked during the test. Both your location and the walked steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'tasks/smwt/6mwt1.svg',
      description: 'The aim of this test is to walk as far as possible in 6 minutes.'
    },
    {
      title: 'Instructions',
      img: 'tasks/smwt/6mwt2.svg',
      description: 'It is important that you try to walk as straight as possible. Try to avoid stairs and walking up or downhill. If possible, try to avoid areas with many tall buildings or trees close to you.'
    },
    {
      title: 'Important!',
      img: 'tasks/smwt/6mwt3.svg',
      description: 'You may slow down and stop if necessary. Stop immediately if you have any chest pain or dizziness.'
    },
    {
      img: 'tasks/smwt/6mwt4.svg',
      description: 'The test will automaticly stop after 6 minutes. If you need to complete the test earlier, press the "Complete" button.'
    },
    {
      title: 'Setup',
      img: 'tasks/smwt/6mwt5.svg',
      description: 'Make sure the positioning (GPS) on your phone is turned ON before starting the test.'
    },
    {
      title: 'Setup',
      img: 'tasks/smwt/6mwt6.svg',
      description: 'Hold your phone still in one hand, and try to avoid shaking or twisting it until the test is finished.'
    },
    {
      title: 'Setup',
      img: 'tasks/smwt/6mwt7.svg',
      description: 'You can place your phone in a pocket or use an armband if needed, but do not switch off the screen!'
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
