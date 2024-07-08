export default {
  title: 'Prueba de sostener el teléfono',
  shortTitle: 'Sosten el teléfono',
  shortDescription: 'Mide tu temblor sosteniendo el teléfono',
  OSpermissioniOS: 'Esta tarea requiere que la aplicación acceda a los sensores de movimiento en su teléfono. Esto es necesario para medir la cantidad de temblor en las manos y las extremidades superiores. Estos datos serán compartidos con el equipo de investigación del estudio para su análisis. Pulsa "Siguiente" para continuar con el proceso de autorización.',
  OSpermissionAndroid: 'Esta tarea requiere que la aplicación acceda a los sensores de movimiento en su teléfono. Esto es necesario para medir la cantidad de temblor en las manos y las extremidades superiores. Estos datos serán compartidos con el equipo de investigación del estudio para su análisis. Pulsa "Siguiente" para continuar con el proceso de autorización.',
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'instructions/HoldYourPhone_task-01.svg',
      description: 'En esta tarea tendrás que mantener firme tu teléfono durante un minuto con cada mano. El objetivo es medir cualquier temblor en tus manos.'
    },
    {
      title: 'Paso 1',
      img: 'instructions/HoldYourPhone_task-02.svg',
      description: 'Realizarás la prueba de 3 maneras: 1) Sosteniendo tu teléfono en su regazo, estando sentado cómodamente.'
    },
    {
      title: 'Paso 2',
      img: 'instructions/HoldYourPhone_task-03.svg',
      description: '2) Sosteniendo tu teléfono con el brazo extendido al nivel del hombro.'
    },
    {
      title: 'Paso 3',
      img: 'instructions/HoldYourPhone_task-04.svg',
      description: '3) Sosteniendo el teléfono mientras mueves el brazo desde extendido hasta tocarte la nariz repetidamente.'
    },
    {
      title: 'Importante!',
      img: 'instructions/HoldYourPhone_task-05.svg',
      description: 'Cuando haya pasado el minuto 1, tu teléfono vibrará. Se te pedirá que repitas la prueba tanto para el brazo derecho como para el izquierdo. Si sientes que no puedes sostener el teléfono durante toda la prueba, simplemente relaja el brazo.'
    }
  ],
  instructions: {
    preRestingLeft: 'Sosten tu teléfono con la mano IZQUIERDA sobre el regazo. Presiona inicio para comenzar.',
    preRestingRight: 'Sosten tu teléfono con la mano DERECHA sobre su regazo. Presiona inicio para comenzar.',
    prePosturalLeft: 'Manten el brazo extendido a la altura de los hombros mientras sostienes el teléfono con la mano IZQUIERDA. Presiona inicio para comenzar.',
    prePosturalRight: 'Manten el brazo extendido a la altura de los hombros mientras sostienes el teléfono con la mano DERECHA. Presiona inicio para comenzar.',
    preKineticLeft: 'Mueve tu teléfono de extendido a tocar la nariz mientras sostienes el teléfono con la mano IZQUIERDA. Presiona inicio para comenzar.',
    preKineticRight: 'Mueve tu teléfono de extendido a tocar la nariz mientras sostienes el teléfono con la mano DERECHA. Presiona inicio para comenzar.',
    afterStart: 'Continua sosteniendo el teléfono firmemente en la mano.'
  },
  completed: 'Tarea completada',
  time: 'Tiempo',
  summaryRestingLeft: 'Temblor en reposo, izquierda',
  summaryRestingRight: 'Temblor en reposo, derecha',
  summaryPosturalLeft: 'Temblor postural, izquierda',
  summaryPosturalRight: 'Temblor postural, derecha',
  summaryKineticLeft: 'Temblor cinético, izquierda',
  summaryKineticRight: 'Temblor cinético, derecha'
}
