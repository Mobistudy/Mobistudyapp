export default {
  title: 'Queens College Step Test',
  shortTitle: 'QCST',
  description: 'Esta tarea consiste en realizar la prueba Queens College Step Test. Esta app puede enviar los resultados de sus pruebas a un servidor alojado por la Universidad de Malmö. Los datos se ponen a disposición del personal de Skånes Universitetssjukhus para que los médicos y enfermeras puedan revisarlos',
  shortDescription: 'Realizar el Queens College Step Test',
  OSpermissioniOS: 'Esta tarea requiere que la app acceda al contador de pasos en tu teléfono, si está disponible. Esto es necesario para calcular cuántos pasos ha realizado durante la prueba. Los pasos detectados se compartirán con el equipo de investigación de este estudio para su análisis. Selecciona "Siguiente" si deseas continuar con el proceso de autorización',
  OSpermissionAndroid: 'Esta tarea requiere que la app acceda al contador de pasos en tu teléfono, si está disponible. Esto es necesario para calcular cuántos pasos ha realizado durante la prueba. Los pasos detectados se compartirán con el equipo de investigación de este estudio para su análisis. Selecciona "Siguiente" si deseas continuar con el proceso de autorización',
  introductionSlides: [
    {
      title: 'Requisitos',
      img: 'instructions/QCST-01.svg',
      description: 'Para esta prueba, se necesita un escalón resistente de unos 40 cm (16 pulgadas) de altura. Esta es aproximadamente la altura de un taburete para los pies'
    },
    {
      title: 'Requisitos',
      img: 'instructions/QCST-02.svg',
      description: 'Un monitor de frecuencia cardíaca: puedes usar un rastreador de actividad física, un reloj inteligente o puedes intentar usar una app (busque "Frecuencia cardíaca" en la tienda de aplicaciones)'
    },
    {
      title: 'Requisitos',
      img: 'instructions/QCST-03.svg',
      description: 'Alternativamente, para medir tu pulso manualmente, puedes contar el número de latidos del corazón durante 15 segundos y multiplicar el recuento por cuatro'
    },
    {
      title: 'Instrucción',
      img: 'instructions/QCST-04.svg',
      description: 'Esta es una prueba de ritmo con una cadencia de cuatro pasos: pie 1 arriba, pie 2 arriba, pie 1 abajo, pie 2 abajo'
    },
    {
      img: 'instructions/QCST-05.svg',
      description: 'Sube y baja siguiendo el sonido del metrónomo que escucharás en la app. Asegúrate de encender el sonido en tu dispositivo y subir el volumen'
    },
    {
      img: 'instructions/QCST-06.svg',
      description: 'La prueba se detendrá automáticamente después de 3 minutos. Si necesitas completar la prueba antes, presione el botón "Completar"'
    },
    {
      img: 'instructions/QCST-07.svg',
      description: 'Al final de la prueba, se te pedirá que midas tu frecuencia cardíaca y que se la proporciones a la app. Mide tu frecuencia cardíaca en un plazo de 5 a 20 segundos después de completar la prueba'
    },
    {
      title: '¡Importante!',
      img: 'instructions/QCST-08.svg',
      description: 'Por favor, trata de no hablar durante la prueba, ya que esto puede afectar a su desempeño. Detente inmediatamente si tienes dolor en el pecho o mareos'
    }
  ],
  begin: 'Empezar',
  oneMin: 'Un minuto',
  twoMin: 'Dos minutos',
  enterHR: 'Introduce tu frecuencia cardica',
  enterHRInstructions: 'Nota: Para medir tu frecuencia cardíaca manualmente, cuenta la cantidad de latidos cardíacos durante 15 segundos. Multiplica la cuenta por cuatro e ingresa el valor a continuación',
  time: 'Tiempo',
  steps: 'Pasos'
}
