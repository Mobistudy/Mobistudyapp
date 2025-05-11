export default {
  title: 'Misurazione con pulsossimetro',
  shortTitle: 'Pulsossimetro',
  shortDescription: 'Effettua una misurazione della saturazione di ossigeno nel sangue',
  OSpermissioniOS: `Questa attività richiede che l’app acceda al Bluetooth del tuo telefono.
  Questo è necessario per connettere l’app al pulsossimetro PO60 e raccogliere i dati sulla saturazione
  di ossigeno nel sangue. I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.\n
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  OSpermissionAndroid: `Questa attività richiede che l’app acceda al Bluetooth del tuo telefono.
  Questo è necessario per connettere l’app al pulsossimetro PO60 e raccogliere i dati sulla saturazione
  di ossigeno nel sangue. I dati raccolti saranno condivisi con il team di ricerca di questo studio per l’analisi.\n
  Tocca "Avanti" se desideri procedere con il processo di autorizzazione.`,
  introductionSlidesAndroid: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'In questa attività misurerai la saturazione di ossigeno nel sangue utilizzando il pulsossimetro Beurer PO60.'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Inserisci il dito nel pulsossimetro, attendi che i valori di frequenza cardiaca e saturazione di ossigeno siano visibili e poi rimuovi il dito.'
    },
    {
      img: 'instructions/po60_3_android.jpg',
      description: `Assicurati che il Bluetooth sia attivo sul tuo telefono.
      Se è la prima volta che connetti il pulsossimetro, riceverai una notifica che ti chiederà se desideri
      associare il dispositivo. Dopo aver accettato la notifica, devi copiare il codice mostrato sul pulsossimetro
      nel telefono per completare il processo di associazione.`
    }
  ],
  introductionSlidesiOS: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'In questa attività misurerai la saturazione di ossigeno nel sangue utilizzando il pulsossimetro Beurer PO60.'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Inserisci il dito nel pulsossimetro, attendi che i valori di frequenza cardiaca e saturazione di ossigeno siano visibili e poi rimuovi il dito.'
    },
    {
      img: 'instructions/po60_3_ios.jpg',
      description: `Assicurati che il Bluetooth sia attivo sul tuo telefono.
      Se è la prima volta che connetti il pulsossimetro, il telefono ti chiederà di confermare
      la connessione inserendo il codice mostrato sul pulsossimetro.`
    }
  ],
  connect: 'Connetti',
  scanning: 'Ricerca del pulsossimetro in corso.',
  scanFailed: 'Si è verificato un problema durante la ricerca del pulsossimetro. Vuoi riprovare?',
  noDeviceTitle: 'Nessun pulsossimetro trovato.',
  noDevice: 'Impossibile trovare un pulsossimetro. Assicurati che il Bluetooth sia attivo sul telefono. Vuoi provare di nuovo?',
  moreDevices: 'Sono stati trovati più pulsossimetri. Il dispositivo più vicino è il primo della lista. Tocca il dispositivo nell’elenco a cui desideri connetterti.',
  takeMeasurement: 'Inserisci il dito nel dispositivo, premi il suo pulsante e rimuovi il dito quando vedi il valore misurato sullo schermo.',
  connectionFail: 'Impossibile connettersi al pulsossimetro. Vuoi riprovare?',
  connecting: 'Connessione al pulsossimetro in corso',
  dataSending: 'Invio dei dati',
  dataDownloadError: 'Impossibile recuperare i dati dal pulsossimetro.',
  healthData: {
    hr: 'Frequenza cardiaca',
    spo2: 'Saturazione di ossigeno'
  },
  dataHRTitle: 'Battiti al minuto',
  dataSPO2Title: 'Saturazione di ossigeno nel sangue'
}
