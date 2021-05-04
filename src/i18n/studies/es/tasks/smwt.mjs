export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Prueba de caminata de 6 minutos',
  shortTitle: '6MWT',
  description: 'Esta tarea consiste en medir la distancia que puede caminar en 6 minutos (prueba de caminata de 6 minutos). Su teléfono inteligente controlará su posición mientras camina y calculará la distancia total caminada. Esta distancia puede proporcionar indicaciones sobre su capacidad de ejercicio y su salud en general.',
  OSpermissioniOS: 'Esta tarea requiere que la aplicación acceda al sistema de posicionamiento de su teléfono (como el GPS) y al contador de pasos, si está disponible. Estos son necesarios para calcular la distancia recorrida durante la prueba. Tanto su ubicación como los pasos recorridos se compartirán con el equipo de investigación de este estudio para su análisis. Seleccione Siguiente si desea continuar con el proceso de autorización..',
  OSpermissionAndroid: 'Esta tarea requiere que la aplicación acceda al sistema de posicionamiento de su teléfono (como el GPS) y al contador de pasos, si está disponible. Estos son necesarios para calcular la distancia recorrida durante la prueba. Tanto su ubicación como los pasos recorridos se compartirán con el equipo de investigación de este estudio para su análisis. Seleecione Siguiente si desea continuar con el proceso de autorización..',
  introductionSlides: [
    {
      title: 'Instrucciones',
      img: 'instructions/6mwt_1.jpg',
      description: 'El objetivo de esta prueba es caminar lo más lejos posible en 6 minutos.'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/6mwt_2.jpg',
      description: 'Es importante que intente caminar lo más recto posible. Trate de evitar las escaleras y caminar cuesta arriba o cuesta abajo.'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/6mwt_3.jpg',
      description: 'Si es posible, trate de evitar áreas con muchos edificios altos o árboles cerca de usted, ya que pueden afectar la forma en que el teléfono lo localiza.'
    },
    {
      title: 'Importante!',
      img: 'instructions/6mwt_4.jpg',
      description: 'Puede reducir la velocidad y detenerse si es necesario. Deténgase inmediatamente si tiene dolor en el pecho o mareos.'
    },
    {
      img: 'instructions/6mwt_1.jpg',
      description: 'La prueba se detendrá automáticamente después de 6 minutos y se le pedirá que envíe los datos recopilados. Si necesita completar la prueba antes, presione el botón "Completar".'
    },
    {
      title: 'Configuración',
      img: 'instructions/6mwt_6.jpg',
      description: 'Asegúrese de que el posicionamiento (GPS) en su teléfono esté encendido antes de comenzar la prueba.'
    },
    {
      title: 'Configuración',
      img: 'instructions/6mwt_7.jpg',
      description: 'Sostenga su teléfono quieto en una mano e intente evitar sacudirlo o torcerlo hasta que termine la prueba.'
    },
    {
      title: 'Configuración',
      img: 'instructions/6mwt_8.jpg',
      description: 'Puede colocar su teléfono en un bolsillo o usar una banda para el brazo si es necesario, ¡pero no apague la pantalla!'
    }
  ],
  signalCheck: 'Esperando la señal de GPS.',
  time: 'Tiempo',
  steps: 'Pasos',
  distance: 'Distancia',
  borgScale: {
    intro: 'Califique su nivel de esfuerzo:',
    l0: 'Sin esfuerzo',
    l05: 'Muy muy ligero',
    l1: 'Muy ligero',
    l2: 'Ligero',
    l3: 'Moderado',
    l4: 'Medio fuerte',
    l5: 'Fuerte',
    l7: 'Muy fuerte',
    l9: 'Muy muy fuerte',
    l10: 'Máximo',
    result: 'Su seleeción es:'
  }
}
