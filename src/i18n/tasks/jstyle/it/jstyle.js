export default {
  title: 'Download dall’orologio intelligente',
  shortTitle: 'Orologio intelligente',
  shortDescription: 'Estrai i dati dal tuo orologio intelligente',
  OSpermissioniOS: `Questa attività richiede che l’app acceda al Bluetooth del tuo telefono.
  Questo è necessario per connettere l’app all'orologio intelligente e raccogliere i dati da esso.
  I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  OSpermissionAndroid: `Questa attività richiede che l’app acceda al Bluetooth del tuo telefono.
  Questo è necessario per connettere l’app all'orologio intelligente e raccogliere i dati da esso.
  I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  introductionSlides: [
    {
      title: 'Introduzione',
      img: 'tasks/miband3/miband3_1.svg',
      description: 'In questa attività ti connetterai al tuo smartwatch e scaricherai i dati, inclusi passi, frequenza cardiaca, attività e sonno.'
    },
    {
      title: 'Configurazione',
      img: 'tasks/miband3/miband3_2.svg',
      description: 'Assicurati che Bluetooth e Localizzazione (o la scansione Bluetooth) siano attivati sul telefono, che il MiBand sia carico e vicino al telefono.'
    }
  ],
  connect: 'Connetti',
  searching: 'Ricerca dell’orologio intelligente nelle vicinanze',
  searchFailed: 'Si è verificato un problema durante la ricerca dell’orologio intelligente, vuoi riprovare?',
  noDeviceTitle: 'Nessun orologio intelligente trovato',
  noDevice: 'Impossibile trovare uno smartwatch compatibile. Assicurati che il Bluetooth sia attivo sul telefono. Vuoi provare a cercare di nuovo?',
  notEnoughData: 'Non sono stati trovati dati recenti da recuperare dall’orologio intelligente. Potrai riprovare la prossima volta che l\'attività sarà disponibile.',
  moreDevices: 'Sono stati trovati più dispositivi dello stesso tipo. Il più vicino è il primo della lista. Tocca il dispositivo nell’elenco a cui desideri connetterti.',
  connectionFail: 'Impossibile connettersi al dispositivo. Vuoi riprovare?',
  connectionRepair: 'Dimentica il dispositivo attuale e connettiti nuovamente',
  connecting: 'Connessione all’orologio intelligente in corso',
  dataDownload: 'Download dei dati in corso',
  dataDownloadError: 'Impossibile recuperare i dati dallo smartwatch, riprova o annulla.',
  dataSending: 'Invio dei dati in corso',
  chartsIntro: 'I seguenti grafici riassumono i dati recuperati dallo smartwatch. Tocca "Invia" per condividere questi dati con il team di ricerca oppure "Scarta" per non inviarli.',
  lineChart: 'Attività nel tempo',
  hrs: 'frequenza cardiaca',
  temperatures: 'temperatura',
  steps: 'passi',
  hours: 'ore',
  sleepQuality: 'qualità del sonno'
}
