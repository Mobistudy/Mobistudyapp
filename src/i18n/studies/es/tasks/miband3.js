export default {
  title: 'Baja los datos del monitor de actividad',
  shortTitle: 'Monitor de actividad',
  shortDescription: 'Extrae los datos de tu monitor de actividad',
  OSpermissioniOS: `Esta tarea requiere que la aplicación acceda a Bluetooth en su teléfono. 
  Esto es necesario para conectar la aplicación con el monitor de actividad física MiBand3 y recopilar los datos de él.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.
  Seleccione Siguiente si desea continuar con el proceso de autorización.`,
  OSpermissionAndroid: `Esta tarea requiere que la aplicación acceda a Bluetooth en su teléfono. 
  Esto es necesario para conectar la aplicación con el monitor de actividad física MiBand3 y recopilar los datos de él.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.
  Seleccione Siguiente si desea continuar con el proceso de autorización.`,
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'instructions/miband3_1.png',
      description: 'En esta tarea, se conectará a su monitor de actividad MiBand y descargará los datos de su actividad, incluidos los pasos, la frecuencia cardíaca, la actividad y el sueño.'
    },
    {
      title: 'Configuración',
      img: 'instructions/miband3_2.png',
      description: 'Para que el teléfono se conecte a MiBand, asegúrese de que el Bluetooth esté activado en el teléfono, que el Miband esté cargado y cerca del teléfono.'
    },
    {
      title: 'Importante!',
      img: 'instructions/miband3_tap.png',
      description: 'Si es la primera vez que se conecta a MiBand, la pulsera le pedirá que confirme la conexión con el teléfono tocándolo. Por favor, toque la pulsera cuando sienta la vibración en la muñeca.'
    }
  ],
  connect: 'Conexión',
  searching: 'Buscando Miband cercano',
  searchFailed: 'Hubo un problema al buscar su MiBand, ¿quieres volver a intentarlo?',
  noDeviceTitle: 'No se encontró MiBand ',
  noDevice: 'No se pudo encontrar ningún MiBand. Asegúrese de que Bluetooth esté activado en su teléfono. ¿Te gustaría buscar otra vez?',
  notEnoughData: 'No hubo datos recientes para recuperar de MiBand. Puede volver a intentarlo la próxima vez que termine esta tarea.',
  moreDevices: 'Se encontró más de un dispositivo MiBand. El más cercano en proximidad es el primer dispositivo de la lista. Seleccione el dispositivo en la lista a la que desea conectarse.',
  tap: 'Pulse el botón!',
  connectionFail: 'No se puede conectar al dispositivo. ¿Quiere volver a intentarlo?',
  connecting: 'Conentando a la pulsera',
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
  dataDownloadError: 'No se pudieron recuperar los datos del monitor de actividad, vuelva a intentarlo o cancele.',
  dataSending: 'Enviando Datos',
  chartsIntro: 'Los siguientes gráficos resumen los datos que se han recuperado del monitor de actividad. Seleccione "Enviar" para compartir estos datos con el equipo de investigación o Selecione "Borrar" para evitar enviar estos datos.',
  lineChart: 'Actividad a lo largo del tiempo',
  hrs: 'frecuencia cardiaca',
  intensities: 'intensidad',
  steps: 'pasos',
  pieChart: 'Tiempo dedicado a cada actividad',
  hours: 'horas'
}
