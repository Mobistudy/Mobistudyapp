export default {
  title: 'Vocalization test',
  shortTitle: 'Voice test',
  shortDescription: 'Perform a Vocalization Test',
  description: 'This task is a simple test used to assess a person\'s voice and requires to record audio voice from the person. ',
  OSpermissioniOS: 'This task requires the app to access the microphone in your phone. This is needed to record your sound during the test. This sound will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the microphone in your phone. This is needed to record your sound during the test. This sound will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'instructions/vocalizationtask-01.svg',
      description: 'task description.'
    },
    {
      title: 'Instruction',
      img: 'instructions/vocalizationtask-02.svg',
      description: 'task description.'
    }
  ],
  instructions: {
    AAA: 'Please say AAAAH for as long as you can.',
    III: 'Please say IIIIH for as long as you can.',
    UUU: 'Please say UUUUH for as long as you can.'
  },
  completed: 'Task completed',
  time: 'Time'
}
