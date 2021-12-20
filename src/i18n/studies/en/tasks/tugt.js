export default {
  title: 'Timed up and go test (TUG Test)',
  shortDescription: 'Perform a Timed Up & Go Test',
  shortTitle: 'TUGT',
  description: 'This task is a simple test used to assess a person\'s mobility and requires both static and dynamic balance. ',
  OSpermissioniOS: 'This task requires the app to access the positioning system of your phone (like the GPS), the orientation (gyroscope) and the step counter if available. Both your location, orientation data and the walked steps with the time will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the positioning system of your phone (like the GPS), the orientation (gyroscope) and the step counter if available. Both your location, orientation data and the walked steps with the time will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'instructions/fingertapping1.svg',
      description: 'In this task you will have to tap the screen of your phone with your index and middle fingers as fast as you can.'
    },
    {
      title: 'Setup',
      img: 'instructions/fingertapping2.svg',
      description: `Make sure your phone is flat on a surface before the test begins.
      Then use the index and middle fingers of the dominant hand to alternately tap the buttons with numbers 1 and 2.
      Keep tapping for 20 seconds and try to be as regular as possible.`
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
