export default {
  title: 'Nedladdning av smartklockdata',
  shortTitle: 'Smartklocka',
  shortDescription: 'Hämta data från din smartklocka',
  OSpermissioniOS: 'Den här uppgiften kräver att appen kan använda Bluetooth på din telefon. Detta behövs för att koppla appen till smartklockan och samla in data från den. Insamlad data delas med forskningsgruppen för analys. Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  OSpermissionAndroid: 'Den här uppgiften kräver att appen kan använda Bluetooth på din telefon. Detta behövs för att koppla appen till smartklockan och samla in data från den. Insamlad data delas med forskningsgruppen för analys. Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  introductionSlides: [
    {
      title: 'Introduktion',
      img: 'tasks/miband3/miband3_1.svg',
      description: 'I den här uppgiften kommer du att ansluta till din smartklocka och ladda ner data, inklusive stegräkning, hjärtfrekvens, aktivitet och sömninformation.'
    },
    {
      title: 'Inställning',
      img: 'tasks/miband3/miband3_2.svg',
      description: 'Var god att försäkra dig om att Bluetooth och Positionering (eller Bluetooth-skanning) är aktiverade på telefonen, samt att klockan är laddad och i närheten av mobilen.'
    }
  ],
  connect: 'Anslut',
  searching: 'Letar efter smartklockan i närheten',
  searchFailed: 'Ett problem uppstod med sökningen efter smartklockan, vill du försöka igen?',
  noDeviceTitle: 'Inget smartklocka hittat.',
  noDevice: 'Kunde inte hitta en smartklocka. Var god och se till att Bluetooth är aktiverat på din mobil. Vill du söka efter klockan igen?',
  notEnoughData: 'Det fanns ingen ny data att hämta från smartklockan. Du kan försöka igen nästa gång den här uppgiften ska utföras.',
  moreDevices: 'Fler än en smartklocka hittades. Det närmaste klockan hittar du längst upp i listan. Välj den enhet från listan du vill ansluta till.',
  connectionFail: 'Kan inte ansluta till smartklockan. Vill du försöka igen?',
  connectionRepair: 'Glöm den nuvarande enheten och anslut igen',
  connecting: 'Ansluter till smartklockan',
  dataDownload: 'Laddar ned data',
  dataDownloadError: 'Kunde inte ladda ner data från smartklockan, var god försök igen eller avbryt.',
  dataSending: 'Skickar data',
  chartsIntro: 'Följande diagram sammanfattar den insamlade datan från din smartklocka. Tryck på "Skicka" för att dela datan med forskningsgruppen eller tryck på "Kasta bort" om du inte vill skicka datan.',
  lineChart: 'Aktivitet över tid',
  hrs: 'hjärtfrekvens',
  temperatures: 'temperatur',
  steps: 'steg',
  hours: 'timmar',
  sleepQuality: 'sömnkvalitet'
}
