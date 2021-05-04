'use strict'

export default {
  title: 'Consulta de datos',
  shortDescription: 'Descarga los datos de salud y de actividad desde su teléfono',
  shortTitle: 'Consulta de datos',
  OSpermissioniOS: 'Esta tarea requiere que la aplicación acceda a parte de los datos recopilados por HealthKit en su teléfono. El equipo de investigación necesita estos datos para su análisis.\n Seleccione Siguiente si desea continuar con el proceso de autorización.',
  OSpermissionAndroid: 'Esta tarea requiere que la aplicación acceda a parte de los datos recopilados por Google Fit en su teléfono. El equipo de investigación necesita estos datos para su análisis.\n Selecione Siguiente si desea continuar con el proceso de autorización.',
  introductionSlidesAndroid: [
    {
      title: 'Introducción',
      img: 'instructions/data_query_android_1.png',
      description: 'En esta tarea, la aplicación recuperará los datos recopilados por la aplicación Google Fit si la tiene instalada en su teléfono.'
    },
    {
      img: 'instructions/data_query_2.png',
      description: 'La aplicación Mobistudy solo recuperará los datos solicitados para este estudio. Se mostrará un resumen de los datos en forma de gráficos. Después de revisar la información, puede enviarla o descartarla.'
    }
  ],
  introductionSlidesiOS: [
    {
      title: 'Introducción',
      img: 'instructions/data_query_ios_1.png',
      description: 'En esta tarea, la aplicación recuperará los datos recopilados por la aplicación Salud.'
    },
    {
      img: 'instructions/data_query_2.png',
      description: 'La aplicación Mobistudy solo recuperará los datos solicitados para este estudio. Se mostrará un resumen de los datos en forma de gráficos. Después de revisar la información, puede enviarla o descartarla.'
    }
  ],
  dataQueryExplanationiOS: 'Este es un resumen de los datos que se han recuperado de HealthKit. Seleccione "Enviar" para compartir estos datos con el equipo de investigación o seleccione "Borrar" para evitar enviar estos datos.',
  dataQueryExplanationAndroid: 'Este es un resumen de los datos que se han recuperado de Google Fit. Seleccione "Enviar" para compartir estos datos con el equipo de investigación o seleecione "Borrar" para evitar enviar estos datos. '
}
