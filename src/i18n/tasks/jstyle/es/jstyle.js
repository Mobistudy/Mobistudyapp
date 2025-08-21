export default {
  title: 'Baja los datos del reloj inteligente',
  shortTitle: 'Reloj inteligente',
  shortDescription: 'Extrae los datos de tu reloj inteligente',
  OSpermissioniOS: `Esta tarea requiere que la app acceda a Bluetooth en tu teléfono.
  Esto es necesario para conectar la app con el reloj inteligente y recopilar los datos de él.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.
  Selecciona "Siguiente" si desea continuar con el proceso de autorización.`,
  OSpermissionAndroid: `Esta tarea requiere que la app acceda a Bluetooth de tu teléfono.
  Esto es necesario para conectar la app con el reloj inteligente y recopilar los datos de éste.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.
  Selecciona "Siguiente" si desea continuar con el proceso de autorización`,
  introductionSlides: [
    {
      title: 'Introducción',
      img: 'tasks/miband3/jstyle_1.png',
      description: 'En esta tarea, se conectará al reloj inteligente y descargará los datos, incluidos los pasos, la frecuencia cardíaca, la actividad, la oximetría, la temperatura y el sueño'
    },
    {
      title: 'Configuración',
      img: 'tasks/miband3/jstyle_2.png',
      description: 'Asegúrate de que el Bluetooth está activado en el teléfono, que el reloj inteligente esté cargado y cerca del teléfono'
    }
  ],
  connect: 'Conexión',
  searching: 'Buscando el reloj inteligente cercano',
  searchFailed: 'Hubo un problema al buscar el reloj inteligente, ¿quieres volver a intentarlo?',
  noDeviceTitle: 'No se encontró ningún reloj inteligente',
  noDevice: 'No se pudo encontrar ningún smartwatch compatible. Asegúrate de que Bluetooth esté activado en el teléfono. ¿Te gustaría buscar otra vez?',
  notEnoughData: 'No hubo datos recientes para recuperar del reloj inteligente. Puedes volver a intentarlo la próxima vez que termines esta tarea',
  moreDevices: 'Se encontró más de un reloj inteligente. El más cercano en proximidad es el primer dispositivo de la lista. Selecciona el dispositivo en la lista a la que deseas conectarte',
  connectionFail: 'No se puede conectar al dispositivo. ¿Quieres volver a intentarlo?',
  connectionRepair: 'Olvidar el dispositivo actual y volver a conectar',
  connecting: 'Conectando al reloj inteligente',
  dataDownload: 'Bajando datos',
  dataDownloadError: 'No se pudieron recuperar los datos del reloj inteligente, vuelve a intentarlo o cancela',
  dataSending: 'Enviando Datos',
  chartsIntro: 'Los siguientes gráficos resumen los datos que se han recuperado del reloj inteligente. Selecciona "Enviar" para compartir estos datos con el equipo de investigación o seleciona "Borrar" para evitar enviar estos datos',
  lineChart: 'Actividad a lo largo del tiempo',
  hrs: 'frecuencia cardiaca',
  temperatures: 'temperatura',
  steps: 'pasos',
  hours: 'horas',
  sleepQuality: 'calidad del sueño'
}
