export default {
  title: 'Test di stabilità del telefono',
  shortTitle: 'Tieni il telefono',
  shortDescription: 'Misura il tremore tenendo in mano il telefono',
  OSpermissioniOS: 'Questa attività richiede che l’app acceda ai sensori di movimento del tuo telefono. Questo è necessario per misurare l’entità del tremore nelle tue mani e negli arti superiori. Questi dati saranno condivisi con il team di ricerca dello studio per l’analisi. Tocca "Avanti" per procedere con il processo di autorizzazione.',
  OSpermissionAndroid: 'Questa attività richiede che l’app acceda ai sensori di movimento del tuo telefono. Questo è necessario per misurare l’entità del tremore nelle tue mani e negli arti superiori. Questi dati saranno condivisi con il team di ricerca dello studio per l’analisi. Tocca "Avanti" per procedere con il processo di autorizzazione.',
  introductionSlides: [
    {
      title: 'Introduzione',
      img: 'instructions/HoldYourPhone_task-01.svg',
      description: 'In questa attività dovrai mantenere il telefono fermo per 1 minuto con ciascuna mano. L’obiettivo è misurare eventuali tremori nelle tue mani.'
    },
    {
      title: 'Fase 1',
      img: 'instructions/HoldYourPhone_task-02.svg',
      description: 'Eseguirai il test in 3 modalità: 1) Tenendo il telefono in grembo, da seduto in posizione comoda.'
    },
    {
      title: 'Fase 2',
      img: 'instructions/HoldYourPhone_task-03.svg',
      description: '2) Tenendo il telefono con il braccio teso all’altezza della spalla.'
    },
    {
      title: 'Fase 3',
      img: 'instructions/HoldYourPhone_task-04.svg',
      description: '3) Muovendo il telefono dal braccio teso fino a toccare ripetutamente il naso.'
    },
    {
      title: 'Importante!',
      img: 'instructions/HoldYourPhone_task-05.svg',
      description: 'Quando sarà passato 1 minuto, il telefono vibrerà. Ti verrà chiesto di ripetere il test sia per il braccio destro che per quello sinistro. Se senti di non riuscire a tenere il telefono per tutta la durata del test, rilassa semplicemente il braccio.'
    }
  ],
  instructions: {
    preRestingLeft: 'Tieni il telefono con la MANO SINISTRA appoggiata in grembo. Premi "Inizia" per cominciare.',
    preRestingRight: 'Tieni il telefono con la MANO DESTRA appoggiata in grembo. Premi "Inizia" per cominciare.',
    prePosturalLeft: 'Tieni il braccio teso all’altezza della spalla mentre tieni il telefono con la MANO SINISTRA. Premi "Inizia" per cominciare.',
    prePosturalRight: 'Tieni il braccio teso all’altezza della spalla mentre tieni il telefono con la MANO DESTRA. Premi "Inizia" per cominciare.',
    preKineticLeft: 'Muovi il telefono dal braccio teso fino a toccarti il naso mentre lo tieni con la MANO SINISTRA. Premi "Inizia" per cominciare.',
    preKineticRight: 'Muovi il telefono dal braccio teso fino a toccarti il naso mentre lo tieni con la MANO DESTRA. Premi "Inizia" per cominciare.',
    afterStart: 'Continua a tenere il telefono fermo nella tua mano.'
  },
  completed: 'Attività completata',
  time: 'Tempo',
  summaryRestingLeft: 'Tremore a riposo, sinistra',
  summaryRestingRight: 'Tremore a riposo, destra',
  summaryPosturalLeft: 'Tremore posturale, sinistra',
  summaryPosturalRight: 'Tremore posturale, destra',
  summaryKineticLeft: 'Tremore cinetico, sinistra',
  summaryKineticRight: 'Tremore cinetico, destra'
}
