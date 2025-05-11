export default {
  title: 'Test di vocalizzazione',
  shortTitle: 'Test vocale',
  shortDescription: 'Metti alla prova la tua voce',
  OSpermissioniOS: 'Questa attività richiede che l’app acceda al microfono del tuo telefono. È necessario per registrare la tua voce durante il test. La registrazione sarà condivisa con il team di ricerca di questo studio per l’analisi. Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  OSpermissionAndroid: 'Questa attività richiede che l’app acceda al microfono del tuo telefono. È necessario per registrare la tua voce durante il test. La registrazione sarà condivisa con il team di ricerca di questo studio per l’analisi. Tocca "Avanti" se desideri procedere con il processo di autorizzazione.',
  introductionSlides: [
    {
      title: 'Introduzione',
      img: 'instructions/vocalization_1.svg',
      description: 'In questo test la tua voce verrà registrata durante un semplice esercizio di vocalizzazione.'
    },
    {
      title: 'Configurazione',
      img: 'instructions/vocalization_2.svg',
      description: 'Posiziona il telefono su un tavolo di fronte a te. Siediti dritto e alza il volume del telefono al massimo.'
    },
    {
      title: 'Istruzioni',
      img: 'instructions/vocalization_3.svg',
      description: 'Dopo aver sentito il suono dal telefono, fai un respiro profondo e pronuncia la vocale mostrata sullo schermo (prima "A", poi "I" e "U") il più a lungo e in modo stabile possibile.'
    },
    {
      title: 'Importante!',
      img: 'instructions/vocalization_4.svg',
      description: 'È importante scegliere un luogo silenzioso con il minor rumore possibile. Premi "Inizia" quando sei pronto.'
    }
  ],
  instructions: {
    AAA: 'Fai un respiro profondo, premi "Inizia" e, dopo il suono, <b>pronuncia "AAAAA"</b> il più a lungo possibile. <br>Quando hai finito, premi "Avanti" per continuare o "Ripeti" per rifare il passaggio corrente.',
    III: 'Fai un respiro profondo, premi "Inizia" e, dopo il suono, <b>pronuncia "IIIII"</b> il più a lungo possibile. <br>Quando hai finito, premi "Avanti" per continuare o "Ripeti" per rifare il passaggio corrente.',
    UUU: 'Fai un respiro profondo, premi "Inizia" e, dopo il suono, <b>pronuncia "UUUUU"</b> il più a lungo possibile. <br>Quando hai finito, premi "Completa" per terminare o "Ripeti" per rifare il passaggio corrente.'
  },
  audioError: 'Impossibile accedere al microfono del telefono.',
  completed: 'Attività completata',
  time: 'Tempo'
}
