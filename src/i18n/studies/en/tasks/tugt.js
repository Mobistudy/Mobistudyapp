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
      img: 'instructions/tug_1.png',
      description: 'In this task you will perform the TUG test. After you have been seated in a chair, press start, put the phone in the pocket and follow these instructions: ' +
        '1. Stand up and walk 3 meters, ' +
        '2. Turn around and walk to the chair, ' +
        '3. Sit on the chair and press the stop button. '
    }
  ],
  time: 'Time',
  steps: 'Steps',
  distance: 'Distance'
}
