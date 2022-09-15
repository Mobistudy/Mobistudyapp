export default {
  title: 'Vocalization test',
  shortTitle: 'Voice test',
  shortDescription: 'Pon a prueba tu voz',
  OSpermissioniOS: 'Esta tarea requiere que la aplicación acceda al micrófono de su teléfono. Esto es necesario para grabar su sonido durante la prueba. Este sonido se compartirá con el equipo de investigación de este estudio para su análisis. Toque Siguiente si desea continuar con el proceso de autorización.',
  OSpermissionAndroid: 'Esta tarea requiere que la aplicación acceda al micrófono de su teléfono. Esto es necesario para grabar su sonido durante la prueba. Este sonido se compartirá con el equipo de investigación de este estudio para su análisis. Toque Siguiente si desea continuar con el proceso de autorización.',
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'instructions/vocalization_1.svg',
      description: 'En esta prueba se grabará tu voz durante un simple ejercicio de vocalización.'
    },
    {
      title: 'Configuración',
      img: 'instructions/vocalization_2.svg',
      description: 'Coloca tu teléfono en una mesa frente a ti. Siéntate recto y sube el volumen del teléfono al máximo.'
    },
    {
      title: 'Instrucciones',
      img: 'instructions/vocalization_3.svg',
      description: 'Después de escuchar el sonido del teléfono, inspira profundamente y pronuncia la vocal que se muestra en la pantalla (primero "A", luego "I" y "U") durante el mayor tiempo y de la manera más constante posible.'
    },
    {
      title: 'Importante!',
      img: 'instructions/vocalization_4.svg',
      description: 'Es importante elegir un lugar tranquilo con el menor ruido posible. Presione iniciar cuando esté listo.'
    }
  ],
  instructions: {
    AAA: 'Inspira profundamente, pulsa iniciar y, después de escuchar el sonido, <b>di \'AAAAA\'</b> todo el tiempo que puedes. <br>Cuando hayas terminado, pulsa "siguiente" para continuar o "rehacer" para repetir.',
    III: 'Inspira profundamente, pulsa iniciar y, después de escuchar el sonido, <b>di \'IIIII\'</b> todo el tiempo que puedes. <br>Cuando hayas terminado, pulsa "siguiente" para continuar o "rehacer" para repetir.',
    UUU: 'Inspira profundamente, pulsa iniciar y, después de escuchar el sonido, <b>di \'UUUUU\'</b> todo el tiempo que puedes. <br>Cuando hayas terminado, pulsa "siguiente" para continuar o "rehacer" para repetir.'
  },
  audioError: 'No se pudo adquirir el micrófono del teléfono.',
  completed: 'Tarea completada',
  time: 'Tiempo'
}
