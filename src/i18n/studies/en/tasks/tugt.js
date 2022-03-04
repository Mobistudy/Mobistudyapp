export default {
  title: 'Timed Up & Go test',
  shortTitle: 'TU&G test',
  shortDescription: 'Perform a Timed Up and Go Test',
  description: 'This task is a simple test used to assess a person\'s mobility and requires both static and dynamic balance. ',
  OSpermissioniOS: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'instructions/TUGtask-01.svg',
      description: 'In this test you will stand up from a chair, walk 3 meters, come back and seat again.'
    },
    {
      title: 'Instruction',
      img: 'instructions/TUGtask-02.svg',
      description: 'Choose a regular chair and place it in front of a 3-meter long walkable space. Make sure to mark a point at 3 meters from the chair.'
    },
    {
      title: 'Instruction',
      img: 'instructions/TUGtask-03.svg',
      description: 'Once you have sat down, extract your phone and press “completed”'
    },
    {
      title: 'Instruction',
      img: 'instructions/TUGtask-04.svg',
      description: 'When ready, press the start button, place the phone in the waist band keeping its screen switched on, stand up, walk 3 meters, turn around, come back and sit down.'
    },
    {
      title: 'Instruction',
      img: 'instructions/TUGtask-05.svg',
      description: 'Use regular footwear and walking aids if needed. Make sure you wear your phone with you during the test, preferably in a waist band'
    }
  ],
  time: 'Time'
}
