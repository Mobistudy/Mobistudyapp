export default {
  title: 'Smart toppflödesmätning',
  shortTitle: 'Toppflöde',
  shortDescription: 'Mät toppflöde på din utandning med den smarta PEF-mätaren',
  OSpermissioniOS: `Denna uppgift kräver att appen har behörighet att använda mikrofonen på din telefon.
  Detta behövs för att kunna mäta toppflödet med den smarta PEF-mätaren.
  För analys delas insamlad data med forskningsgruppen för denna studie.
  Klicka på Nästa om du vill fortsätta med behörighetsprocessen.`,
  OSpermissionAndroid: `Denna uppgift kräver att appen har behörighet att använda mikrofonen på din telefon.
  Detta behövs för att kunna mäta toppflödet med den smarta PEF-mätaren.
  För analys delas insamlad data med forskningsgruppen för denna studie.
  Klicka på Nästa om du vill fortsätta med behörighetsprocessen.`,
  introductionSlides: [
    {
      // title: 'Requirements',
      img: 'instructions/peakflow_1.svg',
      description: 'I denna uppgift mäts ditt toppflöde, dvs hur fort du kan blåsa ut luften ur dina lungor.'
    },
    {
      title: 'Krav',
      img: 'instructions/peakflow_2.svg',
      description: 'För att göra denna uppgift måste du koppla in din smarta PEF-mätare till ljuduttaget på din telefon. Om din telefon saknar en sådan kontakt, använd Bluetooth-adaptern istället.'
    },
    {
      title: 'Förberedelser',
      img: 'instructions/peakflow_3.svg',
      description: 'Toppflödesmätaren behöver ljus uppifrån, såsom solljus eller från en lampa. Försäkra dig om att du inte täcker för ovansidan av toppflödesmätaren.'
    },
    {
      title: 'Instruktioner',
      img: 'instructions/peakflow_4.svg',
      description: 'När du är redo, ställ dig upp och tryck på Starta. Därefter, (1) andas in så mycket du kan, (2) täck flödesmätaren med din mun, samt (3) andas ut så fort du kan. Gör om dessa steg tre gånger.'
    }
  ],
  calibration: 'Kalibrering',
  calibrationStart: 'Anslut din smarta PEF-mätare till din telefon och håll din telefon under en ljuskälla. Tryck på Starta när du är redo.',
  calibrating: 'Kalibrerar...',
  calibrationError: 'Ett fel uppstod under kalibreringen. Vänligen kontrollera så att ovansidan av din PEF-mätare inte är täckt, att anslutningen mellan PEF-mätaren och din telefon/Bluetooth-adapter är stabil, samt att det finns tillräckligt med ljus ovanför mätaren.',
  measurement: 'Mätning',
  summary: 'Översikt',
  measurementStart: 'Var stilla och försäkra dig om att du är under en ljuskälla. När du är redo, tryck på Starta.',
  measurementInstructions: 'Andas in så mycket du kan, täck mätaren med din mun, samt andas ut så fort du kan.',
  measurementCompleted1: 'Första mätningen är klar. Tryck på Starta när du är redo att göra en till mätning.',
  measurementCompleted2: 'Andra mätningen är klar. Tryck på Starta när du är redo att göra en till mätning.',
  measurementCompleted3: 'Tredje och sista mätningen är klar. Tryck på Nästa för att fortsätta.',
  measurementError: 'Något gick fel, försök igen.',
  measurementErrorMaxRetries: 'Appen kan inte mäta ditt toppflöde korrekt. Se till att enheten är ordentligt ansluten till ljuduttaget och under en ljuskälla. Om problemet kvarstår, använd Bluetooth-adaptern. Följ instruktionerna som medföljer enheten för detta.',
  todayBest: 'Dagens bästa toppflödesmätning:',
  results: 'Tidigare toppflödesmätningar',
  pef: 'Toppflöde',
  weeks: 'Veckor'
}
