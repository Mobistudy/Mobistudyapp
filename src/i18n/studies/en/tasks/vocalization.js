export default {
  title: 'Vocalization test',
  shortTitle: 'Voice test',
  shortDescription: 'Test your voice',
  OSpermissioniOS: 'This task requires the app to access the microphone in your phone. This is needed to record your sound during the test. This sound will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the microphone in your phone. This is needed to record your sound during the test. This sound will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/vocalization_1.svg',
      description: 'In this test your voice will be recorded during a simple vocalization exercise.'
    },
    {
      title: 'Setup',
      img: 'instructions/vocalization_2.svg',
      description: 'Place your phone on a table in front of you. Sit up straight and increase the volume of the phone to the maximum.'
    },
    {
      title: 'Instructions',
      img: 'instructions/vocalization_3.svg',
      description: 'After hearing the sound from the phone, take a deep breath and pronounce the vocal shown on the screen (first "A", then "I" and "U") for as long and as steadily as possible.'
    },
    {
      title: 'Important!',
      img: 'instructions/vocalization_4.svg',
      description: 'It is important to choose a quiet place with as little noise as possible. Press start when ready.'
    }
  ],
  instructions: {
    AAA: 'Take a deep breath, press start and, after the sweeping sound, <b>please say \'AAAAA\'</b> for as long as you can. <br>When finished, press "next" to continue or "redo" to repeat the current step.',
    III: 'Take a deep breath, press start and after the sweeping sound <b>please say \'IIIII\'</b> for as long as you can. <br>When finished, press "next" to continue or "redo" to repeat the current step.',
    UUU: 'Take a deep breath, press start and after the sweeping sound <b>please say \'UUUUU\'</b> for as long as you can. <br>When finished, press "complete" to complete or "redo" to repeat the current step.'
  },
  audioError: 'Could not acquire microphone from the phone.',
  completed: 'Task completed',
  time: 'Time'
}
