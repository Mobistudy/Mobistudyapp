export default {
  title: 'Queens College Step Test',
  shortTitle: 'QCST',
  description: 'Esta tarea consiste en realizar la prueba Queens College Step Test. Esta aplicación puede enviar los resultados de sus pruebas a un servidor alojado por la Universidad de Malmö. Los datos se ponen a disposición del personal de Skånes Universitetssjukhus para que los médicos y enfermeras puedan revisarlos..',
  shortDescription: 'Realizar el Queens College Step Test',
  OSpermissioniOS: 'Esta tarea requiere que la aplicación acceda al contador de pasos en su teléfono, si está disponible. Esto es necesario para calcular cuántos pasos ha realizado durante la prueba. Los pasos detectados se compartirán con el equipo de investigación de este estudio para su análisis. Seleccione Siguiente si desea continuar con el proceso de autorización..',
  OSpermissionAndroid: 'Esta tarea requiere que la aplicación acceda al contador de pasos en su teléfono, si está disponible. Esto es necesario para calcular cuántos pasos ha realizado durante la prueba. Los pasos detectados se compartirán con el equipo de investigación de este estudio para su análisis. Seleccione Siguiente si desea continuar con el proceso de autorización..',
  introductionSlides: [
    {
      title: 'Requisitos',
      img: 'instructions/qcst_1.jpg',
      description: 'Para esta prueba, necesita un escalón resistente de unos 40 cm (16 pulgadas) de altura. Esta es aproximadamente la altura de un taburete para los pies.'
    },
    {
      title: 'Requisitos',
      img: 'instructions/qcst_2.jpg',
      description: 'Un monitor de frecuencia cardíaca: puede usar un rastreador de actividad física, un reloj inteligente o puede intentar usar una aplicación (busque "Frecuencia cardíaca" en la tienda de aplicaciones).'
    },
    {
      title: 'Requisitos',
      img: 'instructions/qcst_3.jpg',
      description: 'Alternativamente, para medir su pulso manualmente, puede contar el número de latidos del corazón durante 15 segundos y multiplicar el recuento por cuatro.'
    },
    {
      title: 'Instrucción',
      img: 'instructions/qcst_4.jpg',
      description: 'Esta es una prueba de ritmo con una cadencia de cuatro pasos: pie 1 arriba, pie 2 arriba, pie 1 abajo, pie 2 abajo.'
    },
    {
      img: 'instructions/qcst_5.jpg',
      description: 'Sube y baja siguiendo el sonido del metrónomo que escucharás en la aplicación. Asegúrese de encender el sonido en su dispositivo y subir el volumen.'
    },
    {
      img: 'instructions/qcst_6.jpg',
      description: 'La prueba se detendrá automáticamente después de 3 minutos. Si necesita completar la prueba antes, presione el botón "Completar".'
    },
    {
      img: 'instructions/qcst_3.jpg',
      description: 'Al final de la prueba, se le pedirá que mida su frecuencia cardíaca y se la proporcione a la aplicación. Mida su frecuencia cardíaca en un plazo de 5 a 20 segundos después de completar la prueba.'
    },
    {
      title: 'Importante!',
      description: 'Trate de no hablar durante la prueba, ya que esto puede afectar su desempeño. Deténgase inmediatamente si tiene dolor en el pecho o mareos.'
    }
  ],
  begin: 'empezar',
  oneMin: 'un minuto',
  twoMin: 'dos minutos',
  enterHR: 'Introduce su frecuencia cardica',
  enterHRInstructions: 'Nota: Para medir su frecuencia cardíaca manualmente, cuente la cantidad de latidos cardíacos durante 15 segundos. Multiplique la cuenta por cuatro e ingrese el valor a continuación.',
  time: 'Tiempo',
  steps: 'Pasos'
}
