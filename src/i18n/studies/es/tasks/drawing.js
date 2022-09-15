export default {
  title: 'Prueba de dibujo',
  shortTitle: 'Dibujo',
  shortDescription: 'Dibuja formas con tu telefono',
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'instructions/Drawing_task-01.svg',
      description: 'En esta tarea, se te pedirá que dibujes una forma simple en tu teléfono usando el dedo índice de tu mano dominante.'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/Drawing_task-02.svg',
      description: 'Intenta seguir las líneas de la forma que se muestra en la pantalla con la mayor precisión posible.'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/Drawing_task-03.svg',
      description: 'Se te pedirá que dibujes 2 formas. No levantes el dedo del teléfono hasta que no hayas completado la forma.'
    }
  ],
  instructions: {
    start: 'Dibuja la figura en la pantalla moviendo tu dedo siguiendo las líneas.'
  },
  results: 'Desviación para ',
  shapeSquare: 'cuadrado',
  shapeSpiral: 'espiral',
  completed: 'Tarea completada',
  time: 'Tiempo'
}
