export default {
  title: 'Finger tapping test',
  shortTitle: 'Finger tapping',
  shortDescription: 'Tap your fingers on the screen',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/fingertapping1.svg',
      description: 'In this task you will have to tap the screen of your phone with your index and middle fingers as fast as you can.'
    },
    {
      title: 'Setup',
      img: 'instructions/fingertapping2.svg',
      description: `Make sure your phone is flat on a surface before the test begins.
      Then use the index and middle fingers of the dominant hand to alternately tap the buttons with numbers 1 and 2.
      Keep tapping for 20 seconds and try to be as regular as possible.`
    }
  ],
  instructions: 'Press start to begin the exercise. Once started, tap with the index and middle fingers on the two buttons at the bottom of the screen as fast as you can.',
  completed: 'Task completed',
  summary: 'You tapped {count} times in {sec} seconds.'
}
