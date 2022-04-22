export default {
  title: 'Sostén el teléfono',
  shortDescription: 'Measure tremor by holding your phone',
  shortTitle: 'Mide tu temblor sosteniendo el teléfono',
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'instructions/HoldYourPhone_task-01.svg',
      description: 'En esta tarea tendrás que sujetar tu teléfono firme durante 10 segundos con cada mano. El objetivo es medir cualquier temblor en tus manos.'
    },
    {
      title: 'Paso 1',
      img: 'instructions/HoldYourPhone_task-02.svg',
      description: `Realizarás la prueba de 3 maneras: 1) Sosteniendo tu teléfono con la mano apoyada al muslo, estando sentado cómodamente.`
    },
    {
      title: 'Paso 2',
      img: 'instructions/HoldYourPhone_task-03.svg',
      description: `2) Sosteniendo tu teléfono con el brazo extendido al nivel del hombro.`
    },
    {
      title: 'Paso 3',
      img: 'instructions/HoldYourPhone_task-04.svg',
      description: `3) Sosteniendo el teléfono mientras mueves el brazo desde extendido hasta tocarte la nariz repetidamente.`
    },
    {
      title: 'Importante!',
      img: 'instructions/HoldYourPhone_task-05.svg',
      description: `Cuando hayan pasado 10 segundos el teléfono vibrará. Entonces te pedirá que repitas la prueba tanto para el brazo derecho como para el izquierdo. Si sientes que no puedes sostener el teléfono durante toda la prueba, simplemente relaja el brazo.`
    }
  ],
  instructions: {
    preRestingLeft: 'Sujeta el teléfono con la mano IZQUIERDA sobre el muslo izquierdo. Pulsa inicio para comenzar.',
    preRestingRight: 'Sujeta el teléfono con la mano DERECHA sobre el muslo derecho. Pulsa inicio para comenzar.',
    prePosturalLeft: 'Manten el brazo extendido a la altura de los hombros mientras sostienes el teléfono con la mano IZQUIERDA. Presiona inicio para comenzar.',
    prePosturalRight: 'Manten el brazo extendido a la altura de los hombros mientras sostienes el teléfono con la mano DERECHA. Presiona inicio para comenzar.',
    preKineticLeft: 'Mueve el teléfono de brazo extendido a tocar la nariz mientras sostienes el teléfono con la mano IZQUIERDA. Presiona inicio para comenzar.',
    preKineticRight: 'Mueve el teléfono de brazo extendido a tocar la nariz mientras sostienes el teléfono con la mano DERECHA. Presiona inicio para comenzar.',
    afterStart: 'Susten el teléfono firmemente en la mano.'
  },
  completed: 'Tarea completada',
  time: 'Duración',
  summaryRestingLeft: 'Temblor en reposo, mano izquierda',
  summaryRestingRight: 'Temblor en reposo, mano derecha',
  summaryPosturalLeft: 'Temblor postural, mano izquierda',
  summaryPosturalRight: 'Temblor postural, mano derecha',
  summaryKineticLeft: 'Temblor cinético, mano izquierda',
  summaryKineticRight: 'Temblor cinético, mano derecha'
}
