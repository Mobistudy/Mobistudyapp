export default {
  title: 'Drawing test',
  shortTitle: 'Drawing test',
  shortDescription: 'Perform a Drawing Test',
  description: 'This task is a simple test used to assess a person\'s tremor. ',
  OSpermissioniOS: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'instructions/Drawing_task-01.svg',
      description: 'In this task you are going to be asked to draw a simple shape on your phone with your index finger from your dominant hand.'
    },
    {
      title: 'Instruction',
      img: 'instructions/Drawing_task-02.svg',
      description: 'Try to follow the lines of the shape visualized in your phones screen as precisely as you can. The guiding template with temporarily disappear or flash'
    },
    {
      title: 'Instruction',
      img: 'instructions/Drawing_task-03.svg',
      description: 'You may be asked to draw several shapes.'
    }
  ],
  instructions: {
    start: 'Start drawing the figure you see on the screen by trying to follow the exact same lines.'
  },
  completed: 'Task completed',
  time: 'Time'
}
