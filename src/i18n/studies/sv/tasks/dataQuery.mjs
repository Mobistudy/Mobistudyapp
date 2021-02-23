'use strict'

export default {
  title: 'Databegäran',
  shortDescription: 'Laddar ned hälso- och aktivitetsdata från din telefon',
  shortTitle: 'Databegäran',
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
