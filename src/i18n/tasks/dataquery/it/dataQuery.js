export default {
  title: 'Richiesta Dati',
  shortDescription: 'Scarica i dati sulla salute e sull’attività dal tuo telefono',
  shortTitle: 'Richiesta Dati',
  OSpermissioniOS: 'Questo compito richiede che l’app acceda a parte dei dati raccolti da HealthKit sul tuo telefono. Questi dati sono necessari al team di ricerca per l’analisi.\n Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  OSpermissionAndroid: 'Questo compito richiede che l’app acceda a parte dei dati raccolti da Google Fit sul tuo telefono. Questi dati sono necessari al team di ricerca per l’analisi.\n Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  introductionSlidesAndroid: [
    {
      title: 'Introduzione',
      img: 'tasks/dataQuery/dataquery1.svg',
      description: 'In questo compito, l’app recupererà i dati raccolti dall’app Google Fit, se installata sul tuo telefono.'
    },
    {
      img: 'tasks/dataQuery/dataquery2.svg',
      description: 'L’app Mobistudy recupererà solo i dati richiesti per questo studio. Un riepilogo dei dati sarà mostrato sotto forma di grafici. Dopo aver esaminato le informazioni, potrai decidere se inviarle o scartarle.'
    }
  ],
  introductionSlidesiOS: [
    {
      title: 'Introduzione',
      img: 'tasks/dataQuery/dataquery1.svg',
      description: 'In questo compito, l’app recupererà i dati raccolti dall’app Salute.'
    },
    {
      img: 'tasks/dataQuery/dataquery2.svg',
      description: 'L’app Mobistudy recupererà solo i dati richiesti per questo studio. Un riepilogo dei dati sarà mostrato sotto forma di grafici. Dopo aver esaminato le informazioni, potrai decidere se inviarle o scartarle.'
    }
  ],
  dataQueryExplanationiOS: 'Questo è un riepilogo dei dati recuperati da HealthKit. Tocca "Invia" per condividere questi dati con il team di ricerca oppure "Scarta" per non inviarli.',
  dataQueryExplanationAndroid: 'Questo è un riepilogo dei dati recuperati da Google Fit. Tocca "Invia" per condividere questi dati con il team di ricerca oppure "Scarta" per non inviarli.'
}
