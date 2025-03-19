export default {
  title: 'Test del Cammino di Sei Minuti (6MWT)',
  shortDescription: 'Esegui il Test del Cammino di Sei Minuti',
  shortTitle: '6MWT',
  OSpermissioniOS: 'Questo compito richiede che l’app acceda al sistema di localizzazione del tuo telefono (come il GPS) e al contapassi, se disponibile. Queste funzionalità sono necessarie per calcolare la distanza percorsa durante il test. Sia la tua posizione che i passi percorsi saranno condivisi con il team di ricerca di questo studio per l’analisi. Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  OSpermissionAndroid: 'Questo compito richiede che l’app acceda al sistema di localizzazione del tuo telefono (come il GPS) e al contapassi, se disponibile. Queste funzionalità sono necessarie per calcolare la distanza percorsa durante il test. Sia la tua posizione che i passi percorsi saranno condivisi con il team di ricerca di questo studio per l’analisi. Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  introductionSlides: [
    {
      title: 'Introduzione',
      img: 'instructions/6mwt1.svg',
      description: 'L’obiettivo di questo test è camminare il più lontano possibile in 6 minuti.'
    },
    {
      title: 'Istruzioni',
      img: 'instructions/6mwt2.svg',
      description: 'È importante che cerchi di camminare in linea retta il più possibile. Evita scale e percorsi in salita o discesa. Se possibile, cerca di evitare aree con molti edifici alti o alberi vicini.'
    },
    {
      title: 'Importante!',
      img: 'instructions/6mwt3.svg',
      description: 'Puoi rallentare o fermarti se necessario. Fermati immediatamente se avverti dolore al petto o vertigini.'
    },
    {
      img: 'instructions/6mwt4.svg',
      description: 'Il test si interromperà automaticamente dopo 6 minuti. Se hai bisogno di terminare il test prima, premi il pulsante "Completa".'
    },
    {
      title: 'Configurazione',
      img: 'instructions/6mwt5.svg',
      description: 'Assicurati che la localizzazione (GPS) sul tuo telefono sia attivata prima di iniziare il test.'
    },
    {
      title: 'Configurazione',
      img: 'instructions/6mwt6.svg',
      description: 'Tieni il telefono fermo in una mano e cerca di evitare movimenti bruschi o torsioni fino al termine del test.'
    },
    {
      title: 'Configurazione',
      img: 'instructions/6mwt7.svg',
      description: 'Puoi mettere il telefono in tasca o usare una fascia da braccio se necessario, ma non spegnere lo schermo!'
    }
  ],
  signalCheck: 'In attesa del segnale GPS.',
  time: 'Tempo',
  steps: 'Passi',
  distance: 'Distanza',
  borgScale: {
    intro: 'Valuta il tuo livello di sforzo:',
    l0: 'Nessuno sforzo',
    l05: 'Minimo minimo',
    l1: 'Molto lieve',
    l2: 'Lieve',
    l3: 'Moderato',
    l4: 'Abbastanza intenso',
    l5: 'Intenso',
    l7: 'Molto intenso',
    l9: 'Estremamente intenso',
    l10: 'Massimo',
    result: 'Hai selezionato:'
  }
}
