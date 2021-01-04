'use strict'
export default {
  studies: {
    tasks: {
      qcst: {
        title: 'Queens College Step Test',
        shortTitle: 'QCST',
        description: 'This task is to perform the Queens College Step Test. This app is able to send the results of your tests to a server hosted by the University of Malmö. The data is made available to the personnel of the Skånes Universitetssjukhus so that doctors and nurses are able to review them.',
        shortDescription: 'Perform a Queens College Step Test',
        qcstExplanation: 'QCST Explanation',
        slides: [
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'A sturdy step, about 40 cm (16 inches) high. This is about the height of a short chair.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'A heart rate monitor: you can use a fitness tracker or smartwatch or you can try with an app (search for "Heart Rate" on the app store).' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'Alternatively, to measure your pulse manually, you can count the number of heart beats for 15 seconds and multiply the count by four.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'This is a paced test with a four-step cadence: foot 1 up, foot 2 up, foot 1 down, foot 2 down.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'Step up and down according to the metronome/pacer. Make sure to turn on the sound on your device and turn up the volume.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'The test will automaticly stop after 3 minutes. If you need to complete the test earlier, press the "Complete"-button.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'At the end of the test you will be asked to measure your heart rate and provide it to the app. Please measure your heart rate within 5-20 seconds after completing the test.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'Try not to talk during the test, as this may affect your performance.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'Stop immediately if you have any chest pain or dizziness.' },
          { title: 'Instruction',
            img: 'https://picsum.photos/200',
            i: 'When you are ready to start the test, press the "Start"-button.' }
        ],
        begin: 'begin',
        oneMin: 'one minute',
        twoMin: 'two minutes',
        enterHR: 'Enter your heart rate',
        enterHRInstructions: 'Note: To measure your heart rate manually, please count the number of heart beats for 15 seconds. Multiply the count by four and enter the value below.',
        time: 'Time',
        steps: 'Steps'
      }
    }
  }
}
