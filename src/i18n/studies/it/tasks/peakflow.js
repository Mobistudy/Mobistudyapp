export default {
  title: 'Misurazione con Smart Peak Flow Meter',
  shortTitle: 'Peak Flow',
  shortDescription: 'Registra il peak flow con lo Smart Peak Flow Meter',
  OSpermissioniOS: `Questo compito richiede che l’app acceda al microfono del tuo telefono.
  Questo è necessario per misurare il peak flow utilizzando lo Smart Peak Flow Meter.
  Il suono registrato non sarà condiviso con il team di ricerca, ma solo i valori di peak flow.
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  OSpermissionAndroid: `Questo compito richiede che l’app acceda al microfono del tuo telefono.
  Questo è necessario per misurare il peak flow utilizzando lo Smart Peak Flow Meter.
  Il suono registrato non sarà condiviso con il team di ricerca, ma solo i valori di peak flow.
  I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  introductionSlides: [
    {
      // title: 'Requisiti',
      img: 'instructions/peakflow_1.svg',
      description: 'In questo compito misurerai il tuo peak flow, che indica la velocità con cui riesci a espellere l’aria dai polmoni.'
    },
    {
      title: 'Requisiti',
      img: 'instructions/peakflow_2.svg',
      description: 'Per questo compito, devi collegare lo Smart Peak Flow meter al jack audio del telefono. Se il tuo telefono non ha un ingresso audio, utilizza l’adattatore Bluetooth.'
    },
    {
      title: 'Configurazione',
      img: 'instructions/peakflow_3.svg',
      description: 'Il peak flow meter necessita di luce dall’alto, come la luce del sole o una lampadina. Assicurati di non coprire la parte superiore del dispositivo.'
    },
    {
      title: 'Istruzioni',
      img: 'instructions/peakflow_4.svg',
      description: 'Quando sei pronto, stai in piedi e tocca "Inizia". Poi 1) inspira profondamente, 2) copri completamente il dispositivo con la bocca, 3) espira il più forte possibile. Ripeti questa operazione 3 volte.'
    }
  ],
  calibration: 'Calibrazione',
  calibrationStart: 'Collega il tuo Smart Peak Flow meter al telefono e posiziona il telefono sotto una fonte di luce. Premi "Inizia" quando sei pronto.',
  calibrating: 'Calibrazione in corso...',
  calibrationError: 'Si è verificato un errore durante la calibrazione. Controlla che la parte superiore del dispositivo non sia coperta, che la connessione tra il peak flow meter e il telefono/adattatore Bluetooth sia sicura e che ci sia sufficiente luce sopra il dispositivo.',
  measurement: 'Misurazione',
  summary: 'Riepilogo',
  measurementStart: 'Rimani fermo e assicurati di essere sotto una fonte di luce. Quando sei pronto, premi "Inizia".',
  measurementInstructions: 'Inspira profondamente, copri il dispositivo con la bocca ed espira il più forte possibile.',
  measurementCompleted1: 'Prima misurazione completata. Premi "Inizia" quando sei pronto per una nuova misurazione.',
  measurementCompleted2: 'Seconda misurazione completata. Premi "Inizia" quando sei pronto per una nuova misurazione.',
  measurementCompleted3: 'Terza e ultima misurazione completata. Premi "Avanti" per continuare.',
  measurementError: 'Qualcosa è andato storto, riprova',
  measurementErrorMaxRetries: 'L’app non riesce a misurare correttamente il tuo peak flow. Assicurati che il dispositivo sia ben collegato al jack audio e posizionato sotto una fonte di luce. Se il problema persiste, utilizza l’adattatore Bluetooth. Segui le istruzioni fornite con il dispositivo.',
  todayBest: 'Miglior Peak Flow di oggi:',
  results: 'Letture precedenti di Peak Flow',
  pef: 'Peak Flow',
  weeks: 'Settimane'
}
