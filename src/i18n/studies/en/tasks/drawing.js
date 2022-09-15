export default {
  title: 'Drawing test',
  shortTitle: 'Draw',
  shortDescription: 'Draw shapes on your phone',
  introductionSlides: [
    {
      title: 'Introduction',
      img: 'instructions/Drawing_task-01.svg',
      description: 'In this task you are going to be asked to draw a simple shape on your phone using the index finger of your dominant hand.'
    },
    {
      title: 'Instructions',
      img: 'instructions/Drawing_task-02.svg',
      description: 'Try to follow the lines of the shape shown on the screen as precisely as you can.'
    },
    {
      title: 'Instructions',
      img: 'instructions/Drawing_task-03.svg',
      description: 'You will be asked to draw 2 shapes. Do not lift your finger from the phone until you have completed the shape.'
    }
  ],
  instructions: {
    start: 'Draw the figure on the screen by moving your finger following the lines.'
  },
  results: 'Deviation for ',
  shapeSquare: 'square',
  shapeSpiral: 'spiral',
  completed: 'Task completed',
  time: 'Time'
}
