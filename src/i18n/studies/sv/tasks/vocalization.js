export default {
  title: 'Vokaliseringstest',
  shortTitle: 'Vokalisering',
  shortDescription: 'Testa din röst',
  OSpermissioniOS: 'Den här uppgiften kräver att appen kommer åt mikrofonen i din telefon. Detta behövs för att spela in ditt ljud under testet. Detta ljud kommer att delas med forskargruppen i denna studie för analys. Klicka på Nästa om du vill fortsätta med auktoriseringsprocessen.',
  OSpermissionAndroid: 'Den här uppgiften kräver att appen kommer åt mikrofonen i din telefon. Detta behövs för att spela in ditt ljud under testet. Detta ljud kommer att delas med forskargruppen i denna studie för analys. Klicka på Nästa om du vill fortsätta med auktoriseringsprocessen.',
  introductionSlides: [
    {
      title: 'Introduktion',
      img: 'instructions/vocalization_1.svg',
      description: 'I detta test kommer din röst att spelas in under en enkel vokaliseringsövning.'
    },
    {
      title: 'Inställning',
      img: 'instructions/vocalization_2.svg',
      description: 'Placera din telefon på ett bord framför dig. Sitt upprätt och höj volymen på telefonen till max.'
    },
    {
      title: 'Instruktioner',
      img: 'instructions/vocalization_3.svg',
      description: 'Efter att ha hört ljudet från telefonen, ta ett djupt andetag och uttala sången som visas på skärmen (först "A", sedan "I" och "U") så länge och så stadigt som möjligt.'
    },
    {
      title: 'Important!',
      img: 'instructions/vocalization_4.svg',
      description: 'Det är viktigt att välja en lugn plats med så lite buller som möjligt. Tryck på start när du är klar.'
    }
  ],
  instructions: {
    AAA: 'Ta ett djupt andetag, tryck på start och efter det svepande ljudet <b>säg \'AAAAA\'</b> så länge du kan. <br>När du är klar trycker du på "nästa" för att fortsätta eller "gör om" för att upprepa det aktuella steget.',
    III: 'Ta ett djupt andetag, tryck på start och efter det svepande ljudet <b>säg \'IIIII\'</b> så länge du kan. <br>När du är klar trycker du på "nästa" för att fortsätta eller "gör om" för att upprepa det aktuella steget.',
    UUU: 'Ta ett djupt andetag, tryck på start och efter det svepande ljudet <b>säg \'UUUUU\'</b> så länge du kan. <br>När du är klar trycker du på "nästa" för att fortsätta eller "gör om" för att upprepa det aktuella steget.'
  },
  audioError: 'Det gick inte att hämta mikrofonen från telefonen.',
  completed: 'Uppgiften slutförd',
  time: 'Tid'
}
