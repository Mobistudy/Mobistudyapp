'use strict'

export default {
  title: 'Databegäran',
  shortDescription: 'Laddar ned hälso- och aktivitetsdata från din telefon',
  shortTitle: 'Databegäran',
  OSpermissioniOS: 'Den här uppgiften kräver tillgång till delar av data insamlad av HealthKit på din telefon. Datan behövs av forskningsgruppen för analys.\n Klicka på Nästa om du vill fortsätta auktoriseringsprocessen för detta.',
  OSpermissionAndroid: 'Den här uppgiften kräver tillgång till delar av data insamlad av Google Fit på din telefon. Datan behövs av forskningsgruppen för analys.\n Klicka på Nästa om du vill fortsätta auktoriseringsprocessen för detta.',
  instructionSlidesAndroid: [
    {
      title: 'Introduktion',
      img: 'instructions/data_query_android_1.png',
      description: 'I den här uppgiften kommer appen hämta data från Google Fit om du har det intallerat på din mobil.'
    },
    {
      img: 'instructions/data_query_2.png',
      description: 'Mobistudy-appen kommer endast hämta data som är efterfrågad av denna studien. En sammanfattning av datan kommer visas i form av diagram. Efter att du har granskat informationen så kan du skicka informationen eller kasta bort den.'
    }
  ],
  instructionSlidesiOS: [
    {
      title: 'Introduktion',
      img: 'instructions/data_query_ios_1.png',
      description: 'I den här uppgiften kommer appen hämta data som har samlats av Health appen.'
    },
    {
      img: 'instructions/data_query_2.png',
      description: 'Mobistudy-appen kommer endast hämta data som är efterfrågad av denna studien. En sammanfattning av datan kommer visas i form av diagram. Efter att du har granskat informationen så kan du skicka informationen eller kasta bort den.'
    }
  ],
  dataQueryExplanation: 'Detta är en sammanfattning av den data som hämtats från din mobil. Skicka iväg informationen eller kasta bort den.'
}
