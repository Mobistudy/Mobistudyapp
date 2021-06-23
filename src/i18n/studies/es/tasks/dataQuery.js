'use strict'

export default {
  title: 'Consulta de datos',
  shortDescription: 'Descarga los datos de salud y de actividad desde tu teléfono',
  shortTitle: 'Consulta de datos',
  OSpermissioniOS: 'Esta tarea requiere que la app acceda a parte de los datos recopilados por HealthKit en tu teléfono. El equipo de investigación necesita estos datos para su análisis.\n Seleccione Siguiente si deseas continuar con el proceso de autorización',
  OSpermissionAndroid: 'Esta tarea requiere que la app acceda a parte de los datos recopilados por Google Fit en tu teléfono. El equipo de investigación necesita estos datos para su análisis.\n Selecione Siguiente si deseas continuar con el proceso de autorización',
  introductionSlidesAndroid: [
    {
      title: 'Introducción',
      img: 'instructions/data_query_android_1.png',
      description: 'En esta tarea, la app recuperará los datos recopilados por la app Google Fit si la tienes instalada en su teléfono'
    },
    {
      img: 'instructions/data_query_2.png',
      description: 'La app Mobistudy solo recuperará los datos solicitados para este estudio. Se mostrará un resumen de los datos en forma de gráficos. Después de revisar la información, puedes enviarla o descartarla'
    }
  ],
  introductionSlidesiOS: [
    {
      title: 'Introducción',
      img: 'instructions/data_query_ios_1.png',
      description: 'En esta tarea, la app recuperará los datos recopilados por la app Salud.'
    },
    {
      img: 'instructions/data_query_2.png',
      description: 'La app Mobistudy solo recuperará los datos solicitados para este estudio. Se mostrará un resumen de los datos en forma de gráficos. Después de revisar la información, puedes enviarla o descartarla'
    }
  ],
  dataQueryExplanationiOS: 'Este es un resumen de los datos que se han recuperado de HealthKit. Selecciona "Enviar" para compartir estos datos con el equipo de investigación o selecciona "Borrar" para evitar enviar estos datos.',
  dataQueryExplanationAndroid: 'Este es un resumen de los datos que se han recuperado de Google Fit. Selecciona "Enviar" para compartir estos datos con el equipo de investigación o selecciona "Borrar" para evitar enviar estos datos. '
}
