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
      img: 'instructions/vocalization_1.svg',
      description: 'In this test, we will record your voice during a simple vocalization exercise.'
    },
    {
      title: 'Instruction',
      img: 'instructions/vocalization_2.svg',
      description: 'Ait up straight, increase the volume of the phone to the maximum and press start when ready.'
    },
    {
      title: 'Instruction',
      img: 'instructions/vocalization_3.svg',
      description: 'After hearing the sound from the phone, take a deep breath and pronounce the vocal shown on the screen (first "A", then "I" and "U") for as long and as steadily as possible.'
    },
    {
      title: 'Instruction',
      img: 'instructions/vocalization_4.svg',
      description: 'Ait up straight, increase the volume of the phone to the maximum and press start when ready.'
    }
  ],
  instructions: {
    AAA: 'Take a deep breath, press start and after the sweeping sound please say \'Aaaaah\' for as long as you can. When you are done, press next to continue or redo to repeat the current step. ',
    III: 'Take a deep breath, press start and after the sweeping sound please say \'Iiiiih\' for as long as you can. When you are done, press next to continue or redo to repeat the current step.',
    UUU: 'Take a deep breath, press start and after the sweeping sound please say \'Uuuuuh\' for as long as you can. When you are done, press complete to complete or redo to repeat the current step.'
  },
  completed: 'Task completed',
  time: 'Time'
}
