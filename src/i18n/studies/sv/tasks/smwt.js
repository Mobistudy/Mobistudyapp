'use strict'

export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Utför ett 6-minuters gångtest',
  shortTitle: '6MWT',
  description: 'Den här uppgiften handlar om att mäta hur långt du kan gå inom 6 minuter (6-minuters gångtest). Din mobil kommer att observera din position medans du går och räkna ut den totala distansen som du gått. Avståndet kan ge en indikation på din träningsförmåga och allmänna hälsa.',
  OSpermissioniOS: 'Den här uppgiften behöver tillgång till din telefons positionering (GPS) och stegräknare ifall detta finns. Dessa behövs för att räkna ut avstånd som gåtts under uppgiften. Både platsdata och antal steg delas med forskningsgruppen för analys. Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  OSpermissionAndroid: 'Den här uppgiften behöver tillgång till din telefons positionering (GPS) och stegräknare ifall detta finns. Dessa behövs för att räkna ut avstånd som gåtts under uppgiften. Både platsdata och antal steg delas med forskningsgruppen för analys. Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  introductionSlides: [
    {
      title: 'Instruktion',
      img: 'instructions/6mwt_1.jpg',
      description: 'Målet för det här testet är att du ska gå så lång du kan på 6 minuter.'
    },
    {
      title: 'Instruktion',
      img: 'instructions/6mwt_2.jpg',
      description: 'Det är viktigt att du försöker gå så rakt så möjligt. Försök att undvika trappor samt backar.'
    },
    {
      title: 'Instruktion',
      img: 'instructions/6mwt_3.jpg',
      description: 'Om möjligt, försök att undvika platser med höga byggnare eller träd nära dig eftersom detta kan påverka din mobiltelefons förmåga att lokalisera dig.'
    },
    {
      title: 'Important!',
      img: 'instructions/6mwt_4.jpg',
      description: 'Du kan givetvis sakta ner och avsluta testet om du vill. Avsluta testet omedelbart om du har bröstsmärtor eller är yr.'
    },
    {
      img: 'instructions/6mwt_1.jpg',
      description: 'Testet kommer automatiskt avslutas efter 6 mimuter och du kommer bli ombedd att skicka den insamlade datan. Om du behöver avsluta testet tidigare, tryck på "Slutför".'
    },
    {
      title: 'Inställning',
      img: 'instructions/6mwt_6.jpg',
      description: 'Var god bekräfta att positionering (GPS) är påslagen på din mobil innan du börjar testet.'
    },
    {
      title: 'Inställning',
      img: 'instructions/6mwt_7.jpg',
      description: 'Håll din telefon i ena handen, samt försök att undvika att skaka eller vrida mobilen i din hand tills testet är avslutat.'
    },
    {
      title: 'Inställning',
      img: 'instructions/6mwt_8.jpg',
      description: 'Du kan placera mobilen i fickan och använda en telefonhållare på armen om det behövs, men släck inte skärmen!'
    }
  ],
  signalCheck: 'Väntar på GPS-signal.',
  time: 'Tid',
  steps: 'Steg',
  distance: 'Avstånd',
  borgScale: {
    intro: 'Vänligen uppskatta nivån av ansträngning:',
    l0: 'Ingen ansträngning',
    l05: 'Väldigt väldigt lite',
    l1: 'Väldigt lite',
    l2: 'Lite',
    l3: 'Medel',
    l4: 'Någorlunda stor',
    l5: 'Stor',
    l7: 'Väldigt stor',
    l9: 'Väldigt väldigt stor',
    l10: 'Maximal',
    result: 'Ditt val är:'
  }
}
