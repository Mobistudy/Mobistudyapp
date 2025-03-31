export default {
  title: 'Baja los datos del monitor de actividad',
  shortTitle: 'Monitor de actividad',
  shortDescription: 'Extrae los datos de tu monitor de actividad',
  OSpermissioniOS: `Esta tarea requiere que la app acceda a Bluetooth en tu teléfono.
  Esto es necesario para conectar la app con el monitor de actividad física y recopilar los datos de él.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.
  Selecciona "Siguiente" si desea continuar con el proceso de autorización.`,
  OSpermissionAndroid: `Esta tarea requiere que la app acceda a Bluetooth de tu teléfono.
  Esto es necesario para conectar la app con el monitor de actividad física y recopilar los datos de ésta.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.
  Selecciona "Siguiente" si desea continuar con el proceso de autorización`,
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'tasks/miband3/miband3_1.png',
      description: 'En esta tarea, se conectará al monitor de actividad y descargará los datos de tu actividad, incluidos los pasos, la frecuencia cardíaca, la actividad y el sueño'
    },
    {
      title: 'Configuración',
      img: 'tasks/miband3/miband3_2.png',
      description: 'Para que el teléfono se conecte al monitor de actividad, asegúrate de que el Bluetooth está activado en el teléfono, que el monitor de actividad esté cargado y cerca del teléfono'
    },
    {
      title: '¡Importante!',
      img: 'tasks/miband3/miband3_tap.png',
      description: 'Si es la primera vez que se conecta al monitor de actividad, ésta le pedirá que confirme la conexión con el teléfono tocándolo. Por favor, toca el monitor de actividad cuando sienta la vibración en la muñeca'
    }
  ],
  connect: 'Conexión',
  searching: 'Buscando el monitor de actividad cercano',
  searchFailed: 'Hubo un problema al buscar el monitor de actividad, ¿quieres volver a intentarlo?',
  noDeviceTitle: 'No se encontró ningún monitor de actividad ',
  noDevice: 'No se pudo encontrar ningún  monitor de actividad. Asegúrate de que Bluetooth esté activado en el teléfono. ¿Te gustaría buscar otra vez?',
  notEnoughData: 'No hubo datos recientes para recuperar del monitor de actividad. Puedes volver a intentarlo la próxima vez que termines esta tarea',
  moreDevices: 'Se encontró más de un monitor de actividad. El más cercano en proximidad es el primer dispositivo de la lista. Selecciona el dispositivo en la lista a la que deseas conectarte',
  tap: '¡Pulse el botón!',
  connectionFail: 'No se puede conectar al dispositivo. ¿Quieres volver a intentarlo?',
  connectionRepair: 'Olvidar el dispositivo actual y volver a conectar',
  connecting: 'Conentando a al monitor de actividad',
  activityTypes: {
    walk: 'Caminando',
    charging: 'Cargando',
    not_worn: 'No usado',
    sedentary: 'Sedentario',
    running: 'Corriendo',
    activity_high: 'Actividad intensa',
    activity_low: 'Actividad baja',
    sleep: 'Durmiendo',
    unknown: 'Desconocido'
  },
  dataDownload: 'Bajando datos',
  dataDownloadError: 'No se pudieron recuperar los datos del monitor de actividad, vuelve a intentarlo o cancela',
  dataSending: 'Enviando Datos',
  chartsIntro: 'Los siguientes gráficos resumen los datos que se han recuperado del monitor de actividad. Selecciona "Enviar" para compartir estos datos con el equipo de investigación o seleciona "Borrar" para evitar enviar estos datos',
  lineChart: 'Actividad a lo largo del tiempo',
  hrs: 'Frecuencia cardiaca',
  intensities: 'Intensidad',
  steps: 'Pasos',
  pieChart: 'Tiempo dedicado a cada actividad',
  hours: 'Horas'
}
