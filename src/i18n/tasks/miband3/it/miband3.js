export default {
  title: 'Download dal tracker di attività',
  shortTitle: 'Tracker di attività',
  shortDescription: 'Estrai i dati dal tuo tracker di attività',
  OSpermissioniOS: `Questa attività richiede che l’app acceda al Bluetooth del tuo telefono.
  Questo è necessario per connettere l’app al fitness tracker MiBand3 e raccogliere i dati da esso.
  I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  OSpermissionAndroid: `Questa attività richiede che l’app acceda al Bluetooth del tuo telefono.
  Questo è necessario per connettere l’app al fitness tracker MiBand3 e raccogliere i dati da esso.
  I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  introductionSlides: [
    {
      title: 'Introduzione',
      img: 'tasks/miband3/miband3_1.svg',
      description: 'In questa attività ti connetterai al tuo braccialetto smart MiBand e scaricherai i dati di attività, inclusi passi, frequenza cardiaca, attività e sonno.'
    },
    {
      title: 'Configurazione',
      img: 'tasks/miband3/miband3_2.svg',
      description: 'Per permettere al telefono di connettersi al MiBand, assicurati che Bluetooth e Localizzazione (o la scansione Bluetooth) siano attivati sul telefono, che il MiBand sia carico e vicino al telefono.'
    },
    {
      title: 'Importante!',
      img: 'tasks/miband3/miband3_tap.svg',
      description: 'Se è la prima volta che ti connetti al MiBand, il braccialetto ti chiederà di confermare la connessione toccandolo. Tocca il braccialetto quando senti la vibrazione al polso.'
    }
  ],
  connect: 'Connetti',
  searching: 'Ricerca del MiBand nelle vicinanze',
  searchFailed: 'Si è verificato un problema durante la ricerca del MiBand, vuoi riprovare?',
  noDeviceTitle: 'Nessun MiBand trovato',
  noDevice: 'Impossibile trovare un MiBand. Assicurati che il Bluetooth sia attivo sul telefono. Vuoi provare a cercare di nuovo?',
  notEnoughData: 'Non sono stati trovati dati recenti da recuperare dal MiBand. Potrai riprovare la prossima volta che l\'attività sarà disponibile.',
  moreDevices: 'Sono stati trovati più dispositivi MiBand. Il più vicino è il primo della lista. Tocca il dispositivo nell’elenco a cui desideri connetterti.',
  tap: 'Tocca il tracker di attività.',
  connectionFail: 'Impossibile connettersi al dispositivo. Vuoi riprovare?',
  connectionRepair: 'Dimentica il dispositivo attuale e connettiti nuovamente',
  connecting: 'Connessione al MiBand in corso',
  activityTypes: {
    walk: 'Camminata',
    charging: 'In carica',
    not_worn: 'Non indossato',
    sedentary: 'Sedentario',
    running: 'Corsa',
    activity_high: 'Attività intensa',
    activity_low: 'Attività leggera',
    sleep: 'Sonno',
    unknown: 'Sconosciuto'
  },
  dataDownload: 'Download dei dati in corso',
  dataDownloadError: 'Impossibile recuperare i dati dal braccialetto, riprova o annulla.',
  dataSending: 'Invio dei dati in corso',
  chartsIntro: 'I seguenti grafici riassumono i dati recuperati dal braccialetto. Tocca "Invia" per condividere questi dati con il team di ricerca oppure "Scarta" per non inviarli.',
  lineChart: 'Attività nel tempo',
  hrs: 'frequenza cardiaca',
  intensities: 'intensità',
  steps: 'passi',
  pieChart: 'Tempo trascorso in ogni attività',
  hours: 'ore'
}
