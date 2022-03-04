export default {
  title: 'Hold Your Phone Exercise',
  shortDescription: 'Hold your phone steadily for 10 seconds. Repeat it for both hands, right and left hand',
  shortTitle: 'Hold Phone',
  introductionSlides: [
    {
      title: 'Instruction',
      img: 'instructions/holdphone.svg',
      description: 'In this task you will have to keep your phone steady for a couple of seconds.'
    },
    {
      title: 'Setup',
      img: 'instructions/holdphone.svg',
      description: `First, hold your phone steady with your right hand and press start to start the measurement. Keep holding your phone steadily until you hear a sound and a vibration from the phone.
      Next, repeat the same with your left hand. Once the exercise is finished you will be redirected to another page showing the time it took for the whole exercise.`
    }
    // we can have another image holding the phone with the left hand.
  ],
  instructions: {
    preRestingLeft: 'Hold your phone with your LEFT hand lying on your lap. Press start to begin.',
    preRestingRight: 'Hold your phone with your RIGHT hand lying on your lap. Press start to begin.',
    prePosturalLeft: 'keep your arm outstretched at shoulder level while holding your phone with your LEFT hand. Press start to begin.',
    prePosturalRight: 'keep your arm outstretched at shoulder level while holding your phone with your RIGHT hand. Press start to begin.',
    preKineticLeft: 'Move your phone from outstretched to touching your nose while holding your phone with your LEFT hand. Press start to begin.',
    preKineticRight: 'Move your phone from outstretched to touching your nose while holding your phone with your RIGHT hand. Press start to begin.',
    afterStart: 'Continue holding the phone steadily in your hand.'
  },
  completed: 'Task completed',
  time: 'Time',
  summary: 'Summary bla bla'
}
