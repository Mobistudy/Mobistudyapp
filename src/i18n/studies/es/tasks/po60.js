export default {
  title: 'Saturación de oxígeno',
  shortTitle: 'Pulsioxímetro',
  shortDescription: 'Realice una medición de la saturación de oxígeno en sangre',
  OSpermissioniOS: `Esta tarea requiere que la app acceda a Bluetooth en tu teléfono.
  Esto es necesario para conectar la app con el oxímetro de pulso PO60 y recopilar la saturación de oxígeno en sangre medida. Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.\n
  Seleciona "Siguiente" si desea continuar con el proceso de autorización`,
  OSpermissionAndroid: `Esta tarea requiere que la app acceda a Bluetooth en tu teléfono.
  Esto es necesario para conectar la app con el oxímetro de pulso PO60 y recopilar la saturación de oxígeno en sangre medida.
  Los datos recopilados se compartirán con el equipo de investigación de este estudio para su análisis.\n
  Seleccione "Siguiente" si desea continuar con el proceso de autorización`,
  introductionSlidesAndroid: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'En esta tarea, se medirá la saturación de oxígeno en sangre con el pulsioxímetro Beurer PO60'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Coloca tu dedo en el oxímetro de pulso, espera hasta que la frecuencia cardíaca y los valores de saturación de oxígeno sean visibles y retira el dedo'
    },
    {
      img: 'instructions/po60_3_android.jpg',
      description: `Asegúrate de que Bluetooth esté activado en tu teléfono.
       Si es la primera vez que conectas el pulsioxímetro, recibirás una notificación preguntándote si deseas emparejar el dispositivo. 
       Después de aceptar la notificación, debes copiar el código que se muestra en el oxímetro de pulso a tu teléfono para completar el proceso de emparejamiento`
    }
  ],
  introductionSlidesiOS: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'En esta tarea, se medirá la saturación de oxígeno en sangre con el pulsioxímetro Beurer PO60'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Coloca tu dedo en el oxímetro de pulso, espera hasta que la frecuencia cardíaca y los valores de saturación de oxígeno sean visibles y retira el dedo'
    },
    {
      img: 'instructions/po60_3_ios.jpg',
      description: `Asegúrate de que Bluetooth está activado en tu teléfono.
       Si es la primera vez que conectas el pulso oxímetro, el teléfono te pedirá que confirmes
       la conexión ingresando el código que se muestra en el oxímetro de pulso`
    }
  ],
  connect: 'Conectado',
  scanning: 'Buscando el oxímetro de pulso',
  scanFailed: 'Hubo un problema al buscar el oxímetro de pulso. ¿Quieres volver a intentarlo?',
  noDeviceTitle: 'No se encontró oxímetro de pulso',
  noDevice: 'No se pudo encontrar ningún oxímetro de pulso. Asegúrate de que Bluetooth está activado en su teléfono. ¿Te gustaría volver a intentarlo?',
  moreDevices: 'Se encontró más de un oxímetro de pulso. El más cercano en proximidad es el primer dispositivo de la lista. Selecciona el dispositivo en la lista a la que desea conectarse',
  takeMeasurement: 'Coloca el dedo en el dispositivo, presiona el botón y retira el dedo una vez que vea una medida en la pantalla',
  connectionFail: 'No se puede conectar al oxímetro de pulso. ¿Quieres volver a intentarlo?',
  connecting: 'Conectando al oxímetro de pulso',
  dataSending: 'Enviando Datos',
  dataDownloadError: 'No se pueden recuperar los datos del oxímetro de pulso',
  healthData: {
    hr: 'Ritmo cardiaco',
    spo2: 'Saturación de Oxígeno'
  },
  dataHRTitle: 'Pulsaciones por minuto',
  dataSPO2Title: 'Saturación de oxígeno en sangre'
}
