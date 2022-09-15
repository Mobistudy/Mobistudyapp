export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Prueba de caminar de 6 minutos',
  shortTitle: '6MWT',
  description: 'Esta tarea consiste en medir la distancia que puedes caminar en 6 minutos (prueba de caminar de 6 minutos). El teléfono inteligente controlará tu posición mientras caminas y calculará la distancia total caminada. Esta distancia puede proporcionar indicaciones sobre tu capacidad de ejercicio y tu salud en general',
  OSpermissioniOS: 'Esta tarea requiere que la app acceda al sistema de posicionamiento de su teléfono (como el GPS) y al contador de pasos, si está disponible. Estos son necesarios para calcular la distancia recorrida durante la prueba. Tanto tu ubicación como los pasos recorridos se compartirán con el equipo de investigación de este estudio para su análisis. Selecciona "Siguiente" si deseas continuar con el proceso de autorización',
  OSpermissionAndroid: 'Esta tarea requiere que la app acceda al sistema de posicionamiento de su teléfono (como el GPS) y al contador de pasos, si está disponible. Estos son necesarios para calcular la distancia recorrida durante la prueba. Tanto tu ubicación como los pasos recorridos se compartirán con el equipo de investigación de este estudio para su análisis. Selecciona "Siguiente" si deseas continuar con el proceso de autorización',
  introductionSlides: [
    {
      title: 'Instrucciones',
      img: 'instructions/6mwt1.svg',
      description: 'El objetivo de esta prueba es caminar lo más lejos posible en 6 minutos.'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/6mwt2.svg',
      description: 'Es importante que intentes caminar lo más recto posible. Trata de evitar las escaleras y caminar cuesta arriba o cuesta abajo. Si es posible, trata de evitar áreas con muchos edificios altos o árboles cerca de ti.'
    },
    {
      title: 'Importante!',
      img: 'instructions/6mwt3.svg',
      description: 'Puedes reducir la velocidad y detenerte si es necesario. Detente inmediatamente si tienes dolor en el pecho o mareos.'
    },
    {
      img: 'instructions/6mwt4.svg',
      description: 'La prueba se detendrá automáticamente después de 6 minutos. Si necesitas completar la prueba antes, presiona el botón "Completar".'
    },
    {
      title: 'Configuración',
      img: 'instructions/6mwt5.svg',
      description: 'Asegúrate de que el posicionamiento (GPS) en tu teléfono está encendido antes de comenzar la prueba.'
    },
    {
      title: 'Configuración',
      img: 'instructions/6mwt6.svg',
      description: 'Sostén tu teléfono quieto en una mano e intenta evitar sacudirlo o torcerlo hasta que termine la prueba.'
    },
    {
      title: 'Configuración',
      img: 'instructions/6mwt7.svg',
      description: 'Puedes colocar tu teléfono en un bolsillo o usar una banda para el brazo si es necesario, ¡pero no apagues la pantalla!'
    }
  ],
  signalCheck: 'Esperando la señal de GPS',
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
    result: 'Tu seleción es:'
  }
}
