'use strict'
export default {
  title: 'Queens College Step Test',
  shortTitle: 'QCST',
  description: 'This task is to perform the Queens College Step Test. This app is able to send the results of your tests to a server hosted by the University of Malmö. The data is made available to the personnel of the Skånes Universitetssjukhus so that doctors and nurses are able to review them.',
  shortDescription: 'Perform a Queens College Step Test',
  OSpermissioniOS: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access the step counter in your phone if available. This is needed to compute how many steps you have done during the test. Detected steps will be shared with the research team of this study for analysis. Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Requirements',
      img: 'instructions/qcst_1.jpg',
      description: 'For this test, you need a sturdy step, about 40 cm (16 inches) high. This is about the height of a foot stool.'
    },
    {
      title: 'Requirements',
      img: 'instructions/qcst_2.jpg',
      description: 'A heart rate monitor: you can use a fitness tracker, smartwatch, or you can try using an app (search for "Heart Rate" on the app store).'
    },
    {
      title: 'Requirements',
      img: 'instructions/qcst_3.jpg',
      description: 'Alternatively, to measure your pulse manually, you can count the number of heart beats for 15 seconds and multiply the count by four.'
    },
    {
      title: 'Instruction',
      img: 'instructions/qcst_4.jpg',
      description: 'This is a paced test with a four-step cadence: foot 1 up, foot 2 up, foot 1 down, foot 2 down.'
    },
    {
      img: 'instructions/qcst_5.jpg',
      description: 'Step up and down following the metronome sound you will hear from the app. Make sure to turn on the sound on your device and turn up the volume.'
    },
    {
      img: 'instructions/qcst_6.jpg',
      description: 'The test will automaticly stop after 3 minutes. If you need to complete the test earlier, press the "Complete" button.'
    },
    {
      img: 'instructions/qcst_3.jpg',
      description: 'At the end of the test you will be asked to measure your heart rate and provide it to the app. Please measure your heart rate within 5-20 seconds after completing the test.'
    },
    {
      title: 'Important!',
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
