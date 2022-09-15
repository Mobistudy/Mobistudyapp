export default {
  title: 'Hålla telefonen test',
  shortTitle: 'Hålla telefonen',
  shortDescription: 'Measure tremor by holding your phone',
  OSpermissioniOS: 'This task requires the app to access the motion sensors in your phone. This is needed to measure the amount of tremor in your hands and upper limbs. These data be shared with the research team of the study for analysis. Tap on Next to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the motion sensors in your phone. This is needed to measure the amount of tremor in your hands and upper limbs. These data be shared with the research team of the study for analysis. Tap on Next to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/HoldYourPhone_task-01.svg',
      description: 'In this task you will have to keep your phone steady for 1 minute with each hand. The goal is to measure any tremor in your hands.'
    },
    {
      title: 'Step 1',
      img: 'instructions/HoldYourPhone_task-02.svg',
      description: `You will perform the test in 3 ways: 1) Holding your phone in your lap, when seated comfortably.`
    },
    {
      title: 'Step 2',
      img: 'instructions/HoldYourPhone_task-03.svg',
      description: `2) Holding your phone with your arm outstretched at shoulder level.`
    },
    {
      title: 'Step 3',
      img: 'instructions/HoldYourPhone_task-04.svg',
      description: `3) Holding the phone while you move the arm from outstretched to touching your nose repeatedly.`
    },
    {
      title: 'Important!',
      img: 'instructions/HoldYourPhone_task-05.svg',
      description: `When the 1 minute has passed, your phone will vibrate. You will be asked to repeat the test for both the right and left arm. If you feel like you cannot hold the phone for the whole duration of the test, simply relax your arm.`
    }
  ],
  instructions: {
    preRestingLeft: 'Hold your phone with your LEFT hand lying on your lap. Press start to begin.',
    preRestingRight: 'Hold your phone with your RIGHT hand lying on your lap. Press start to begin.',
    prePosturalLeft: 'Keep your arm outstretched at shoulder level while holding your phone with your LEFT hand. Press start to begin.',
    prePosturalRight: 'Keep your arm outstretched at shoulder level while holding your phone with your RIGHT hand. Press start to begin.',
    preKineticLeft: 'Move your phone from outstretched to touching your nose while holding your phone with your LEFT hand. Press start to begin.',
    preKineticRight: 'Move your phone from outstretched to touching your nose while holding your phone with your RIGHT hand. Press start to begin.',
    afterStart: 'Continue holding the phone steadily in your hand.'
  },
  completed: 'Task completed',
  time: 'Time',
  summaryRestingLeft: 'At rest tremor, left',
  summaryRestingRight: 'At rest tremor, right',
  summaryPosturalLeft: 'Postural tremor, left',
  summaryPosturalRight: 'Postural tremor, right',
  summaryKineticLeft: 'Kinetic tremor, left',
  summaryKineticRight: 'Kinetic tremor, right'
}
