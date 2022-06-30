export default {
  title: 'Queen\'s College Step Test',
  shortTitle: 'QCST',
  shortDescription: 'Perform a Queen\'s College Step Test',
  OSpermissioniOS: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Requirements',
      img: 'instructions/QCST-01.svg',
      description: 'For this test, you need a sturdy step, about 40 cm (16 inches) high. This is about the height of a foot stool.'
    },
    {
      title: 'Requirements',
      img: 'instructions/QCST-02.svg',
      description: 'A heart rate monitor: you can use a fitness tracker, smartwatch, or you can try using an app (search for "Heart Rate" on the app store).'
    },
    {
      title: 'Requirements',
      img: 'instructions/QCST-03.svg',
      description: 'Alternatively, to measure your pulse manually, you can count the number of heart beats for 15 seconds and multiply the count by four.'
    },
    {
      title: 'Instruction',
      img: 'instructions/QCST-04.svg',
      description: 'This is a paced test with a four-step cadence: foot 1 up, foot 2 up, foot 1 down, foot 2 down.'
    },
    {
      img: 'instructions/QCST-05.svg',
      description: 'Step up and down following the metronome sound you will hear from the app. Make sure to turn on the sound on your device and turn up the volume.'
    },
    {
      img: 'instructions/QCST-06.svg',
      description: 'The test will automaticly stop after 3 minutes. If you need to complete the test earlier, press the "Complete" button.'
    },
    {
      img: 'instructions/QCST-07.svg',
      description: 'At the end of the test you will be asked to measure your heart rate and provide it to the app. Please measure your heart rate within 5-20 seconds after completing the test.'
    },
    {
      title: 'Important!',
      img: 'instructions/QCST-08.svg',
      description: 'Try not to talk during the test, as this may affect your performance. Stop immediately if you have any chest pain or dizziness.'
    }
  ],
  begin: 'begin',
  oneMin: 'one minute',
  twoMin: 'two minutes',
  enterHR: 'Enter your heart rate',
  enterHRInstructions: 'Note: To measure your heart rate manually, please count the number of heart beats for 15 seconds. Multiply the count by four and enter the value below.',
  time: 'Time',
  steps: 'Steps'
}
