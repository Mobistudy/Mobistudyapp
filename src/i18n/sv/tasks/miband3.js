'use strict'

export default {
  title: 'Nedladdning av aktivitetsdata',
  shortTitle: 'Aktivitetsarmband',
  shortDescription: 'Hämta data från ditt aktivitetsarmband',
  introductionSlides: [
    {
      title: 'Introduction',
      img: '/statics/instructions/miband3_1.png',
      description: 'I den här uppgiften kommer du att ansluta till ditt Mibandarmband och ladda ner aktivitetsdata, inklusive stegräkning, hjärtfrekvens, aktivitet och sömninformation.'
    },
    {
      title: 'Inställning',
      img: '/statics/instructions/miband3_2.png',
      description: 'För att du ska kunna ansluta till Mibandarmbandet med mobilen, var god att försäkra dig om att blåtanden är aktiverad på din mobil, att armbandet är laddat och är i närheten av mobilen.'
    },
    {
      title: 'Viktigt!',
      img: '/statics/instructions/miband3_tap.png',
      description: 'Om det är första gången du ansluter till mibandarmbandet, då kommer armbandet att be dig att konfirmera anslutningen till mobilen genom att trycka på armbandet. Var god och tryck på armbandet när du känner att den vibrerar på din handled.'
    }
  ],
  connect: 'Anslut',
  searching: 'Letar efter närmaste MiBand',
  searchFailed: 'Ett problem uppstod med sökningen efter MiBand, vill du försöka igen?',
  noDeviceTitle: 'Inget MiBand hittat',
  noDevice: 'Kunde inte hitta ett MiBand armband. var god och se till att blåtanden är aktiverad på din mobil. Vill du söka efter armbandet igen?',
  notEnoughData: 'Det fanns inga nya data att hämta från enheten, du måste försöka igen nästa gång den här uppgiften ska utföras.',
  moreDevices: 'Fler än en MiBand enhet hittades. Det närmaste armbandet hittar du längst upp i listan. Tryck på den enheten du vill ansluta till.',
  tap: 'Tryck på aktivitetsarmbandet!',
  connectionFail: 'Kan inte ansluta till armbandet, vill du försöka igen?',
  connecting: 'Ansluter till MiBand armbandet',
  activityTypes: {
    walk: 'Går',
    charging: 'Laddar',
    activity_high: 'Intensiv aktivitet',
    sleep: 'Sover',
    unknown: 'Okänd'
  },
  dataDownload: 'Laddar ner data',
  dataDownloadError: 'Kunde inte ladda ner data från armbandet, var god försök igen eller avbryt.',
  dataSending: 'Skickar data',
  chartsIntro: 'Följande diagram sammanfattar den insamlade datan från ditt aktivitetsarmband. Tryck på "Skicka" för att dela datan med forskningslaget eller tryck på "Kassera" för att inte skicka datan.',
  lineChart: 'Aktivitet över tid',
  hrs: 'Hjärtfrekvens',
  intensities: 'Intensitet',
  steps: 'Steg',
  pieChart: 'Tid spenderad i varje aktivitet',
  hours: 'Timmar'
}
