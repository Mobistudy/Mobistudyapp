export default {
  title: 'Posizione',
  shortDescription: 'Invia la tua posizione attuale',
  shortTitle: 'Posizione',
  OSpermissioniOS: 'Questo compito richiede che l’app acceda al sistema di localizzazione del tuo telefono (come il GPS). La tua posizione sarà condivisa con il team di ricerca di questo studio per l’analisi. Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  OSpermissionAndroid: 'Questo compito richiede che l’app acceda al sistema di localizzazione del tuo telefono (come il GPS). La tua posizione sarà condivisa con il team di ricerca di questo studio per l’analisi. Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  introductionSlides: [
    {
      title: 'Introduzione',
      img: 'instructions/position-01.svg',
      description: 'Questo compito consiste nell’inviare la tua posizione attuale utilizzando il telefono. Verranno inoltre raccolte informazioni sull’ambiente in cui ti trovi, come il meteo o i livelli di inquinamento.'
    },
    {
      title: 'Configurazione',
      img: 'instructions/position-02.svg',
      description: 'Assicurati che la localizzazione (GPS) sul tuo telefono sia attivata prima di iniziare questo compito.'
    }
  ],
  connecting: 'Recupero della tua posizione e dei dati ambientali',
  approxLocation: 'Posizione approssimativa',
  weather: 'Meteo',
  temperature: 'Temperatura',
  humidity: 'Umidità',
  clouds: 'Nuvolosità',
  wind: 'Vento',
  airQuality: 'Qualità dell’aria',
  aqiscale: {
    l1: 'Buona',
    l2: 'Accettabile',
    l3: 'Moderata',
    l4: 'Scarsa',
    l5: 'Molto scarsa'
  },
  allergens: {
    riskOfGrass: 'Rischio di polline di graminacee',
    riskOfTree: 'Rischio di polline di alberi',
    riskOfWeed: 'Rischio di polline di erbacce'
  }
}
