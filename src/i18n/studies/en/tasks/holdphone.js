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
  instructions: 'Hold your phone with your right hand and press start to begin.',
  afterStartRightH: 'Continue holding the phone steadily with your right hand.',
  leftHand: 'Now hold your phone with your left hand and press start',
  afterStartLeftH: 'Continue holding the phone steadily with your left hand.',
  completed: 'Task completed',
  time: 'Time',
  summary: 'Summary bla bla'
}
