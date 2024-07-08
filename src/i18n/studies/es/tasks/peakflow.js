export default {
  title: 'Medición del flujo espiratorio máximo',
  shortTitle: 'Flujo máximo',
  shortDescription: 'Registra el flujo espiratorio máximo con el medidor de flujo máximo inteligente',
  OSpermissioniOS: `Esta tarea requiere que la app acceda al micrófono de tu teléfono.
  Esto es necesario para medir el flujo máximo con el medidor de flujo máximo inteligente.
  El sonido grabado no se compartirá con el equipo de investigación, solo los valores de flujo máximo.
  Selecciona "Siguiente" si deseas continuar con el proceso de autorización`,
  OSpermissionAndroid: `Esta tarea requiere que la app acceda al micrófono de tu teléfono.
  Esto es necesario para medir el flujo máximo con el medidor de flujo máximo inteligente.
  El sonido grabado no se compartirá con el equipo de investigación, solo los valores de flujo máximo.
  Selecciona "Siguiente" si deseas continuar con el proceso de autorización`,
  introductionSlides: [
    {
      // title: 'Requirements',
      img: 'instructions/peakflow_1.svg',
      description: 'En esta tarea, vas a medir tu flujo espiratorio máximo, que es una medida de la rapidez con la que puedes expulsar aire de los pulmones'
    },
    {
      title: 'Requisitos',
      img: 'instructions/peakflow_2.svg',
      description: 'Para esta tarea, debes conectar el medidor "Smart Peak Flow" en la toma de audio de tu teléfono. Si el teléfono no tiene un conector de audio, usa el adaptador Bluetooth en su lugar'
    },
    {
      title: 'Preparación',
      img: 'instructions/peakflow_3.svg',
      description: 'El medidor de flujo máximo requiere luz de arriba, como la luz del sol o de una bombilla eléctrica. Asegúrate de no cubrir la parte superior del dispositivo'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/peakflow_4.svg',
      description: 'Cuando estés listo, levántate y selecciona "Iniciar". Luego 1) inhala tanto como pueda, 2) cubre todo el dispositivo con la boca, 3) exhala tan fuerte como puedas. Repitelo 3 veces'
    }
  ],
  calibration: 'Calibración',
  calibrationStart: 'Conecta tu medidor de flujo máximo inteligente al teléfono y sostén el teléfono debajo de una fuente de luz. Presiona "Iniciar" cuando estés listo',
  calibrating: 'Calibrando...',
  calibrationError: 'Hubo un error durante la calibración. Verifica que la parte superior del dispositivo no esté cubierta, que la conexión entre el medidor de flujo máximo y el teléfono/adaptador Bluetooth sea segura y que haya suficiente luz por encima del medidor de flujos',
  measurement: 'Medida',
  summary: 'Resumen',
  measurementStart: 'Quédate quieto y asegúrate de estar bajo una fuente de luz. Cuando estés listo, presiona "Iniciar"',
  measurementInstructions: 'Inhala tanto como puedas, cubra el dispositivo con la boca y exhala lo más fuerte que puedas',
  measurementCompleted1: 'Primera medición completada. Selecciona "Iniciar" cuando estés listo para iniciar otra medición',
  measurementCompleted2: 'Segunda medición completada. Selecciona "Iniciar" cuando estés listo para iniciar otra medición',
  measurementCompleted3: 'Tercera y última medición completada. Selecciona "Siguiente" para continuar',
  measurementError: 'Algo salió mal, vuelve a intentarlo',
  measurementErrorMaxRetries: 'La aplicación no puede medir tu flujo máximo correctamente. Asegúrate de que el dispositivo esté bien conectado al conector de audio y debajo de una fuente de luz. Si el problema persiste, utiliza el adaptador Bluetooth. Sigue las instrucciones proporcionadas con el dispositivo para eso.',
  todayBest: 'El mejor flujo máximo de hoy:',
  results: 'Lecturas de flujo máximo pasadas',
  pef: 'Flujo máximo',
  weeks: 'Semanas'
}
