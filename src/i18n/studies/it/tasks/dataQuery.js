export default {
  title: 'Richiesta Dati',
  shortDescription: 'Scarica i dati sulla salute e l’attività fisica dal tuo telefono',
  shortTitle: 'Richiesta Dati',
  OSpermissioniOS: 'Questo compito richiede che l’app acceda ad alcuni dei dati raccolti da HealthKit sul tuo telefono. Questi dati sono necessari al team di ricerca per l’analisi.\n Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  OSpermissionAndroid: 'Questo compito richiede che l’app acceda ad alcuni dei dati raccolti da Google Fit sul tuo telefono. Questi dati sono necessari al team di ricerca per l’analisi.\n Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  introductionSlidesAndroid: [
    {
      title: 'Introduzione',
      img: 'instructions/dataquery1.svg',
      description: 'In questo compito, l’app recupererà i dati raccolti dall’app Google Fit se è installata sul tuo telefono.'
    },
    {
      img: 'instructions/dataquery2.svg',
      description: 'L’app Mobistudy recupererà solo i dati richiesti per questo studio. Un riepilogo dei dati sarà mostrato sotto forma di grafici. Dopo averli esaminati, sarai libero di inviarli o scartarli.'
    }
  ],
  introductionSlidesiOS: [
    {
      title: 'Introduzione',
      img: 'instructions/dataquery1.svg',
      description: 'In questo compito, l’app recupererà i dati raccolti dall’app Salute.'
    },
    {
      img: 'instructions/dataquery2.svg',
      description: 'L’app Mobistudy recupererà solo i dati richiesti per questo studio. Un riepilogo dei dati sarà mostrato sotto forma di grafici. Dopo averli esaminati, sarai libero di inviarli o scartarli.'
    }
  ],
  dataQueryExplanationiOS: 'Questo è un riepilogo dei dati recuperati da HealthKit. Tocca "Invia" per condividere questi dati con il team di ricerca oppure "Scarta" per non inviarli.',
  dataQueryExplanationAndroid: 'Questo è un riepilogo dei dati recuperati da Google Fit. Tocca "Invia" per condividere questi dati con il team di ricerca oppure "Scarta" per non inviarli.'
}
