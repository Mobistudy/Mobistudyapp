'use strict'

export default {
  title: 'Six Minute Walk Test (6MWT)',
  shortDescription: 'Utför ett Six Minute Walk Test',
  shortTitle: '6MWT',
  description: 'Den här uppgiften handlar om att mäta hur långt du kan gå inom 6 minuter (6-minuters-gå-test). Din mobil kommer att observera din position medans du går och räkna ut den totala distansen som du gått. Den här distansen kan visa på indikationer gällande din träningsförmåga och generella hälsa.',
  introductionSlides: [
    {
      title: 'Instruktion',
      img: '/statics/instructions/6mwt_1.jpg',
      description: 'Målet för det här testet är att du ska gå så lång du kan inom 6 minuter.'
    },
    {
      title: 'Instruktion',
      img: '/statics/instructions/6mwt_2.jpg',
      description: 'Det är viktigt att du försöker gå så rakt så möjligt. Försök att undvika att gå i trapper och/eller i nedförs/uppförsbacke.'
    },
    {
      title: 'Instruktion',
      img: '/statics/instructions/6mwt_3.jpg',
      description: 'Om det är möjligt, försök att undvika platser med höga byggnare och/eller träd eftersom detta kan påverka din mobils förmåga att lokalisera dig.'
    },
    {
      title: 'Important!',
      img: '/statics/instructions/6mwt_4.jpg',
      description: 'Du kan givetvis sakta ner och avsluta testet om du vill. Avsluta testet omedelbart om du har bröstsmärtor eller är yr.'
    },
    {
      img: '/statics/instructions/6mwt_1.jpg',
      description: 'Testet kommer automatiskt att avslutas efter 6 mimuter och du kommer bli ombedd att skicka iväg den insamlade datan. Om du behöver avsluta testet tidigare, tryck på "Slutför" knappen.'
    },
    {
      title: 'Inställning',
      img: '/statics/instructions/6mwt_6.jpg',
      description: 'Var god och se till att positionering/GPS är påslagen på din mobil innan du börjar testet.'
    },
    {
      title: 'Inställning',
      img: '/statics/instructions/6mwt_7.jpg',
      description: 'Håll din telefon i ena handen, försök att undvika att skaka eller vrida mobilen i din hand tills testet är avslutat.'
    },
    {
      title: 'Inställning',
      img: '/statics/instructions/6mwt_8.jpg',
      description: 'Du kan placera mobilen i fickan och använda ett armbandsfäste om det behövs, men släck inte skärmen!'
    }
  ],
  signalCheck: 'Väntar på GPS signalen.',
  time: 'Tid',
  steps: 'Steg',
  distance: 'Distans',
  borgScale: {
    intro: 'Var god och uppskatta nivån av ansträngning:',
    l0: 'Ingen ansträngning',
    l05: 'Väldigt väldigt lite',
    l1: 'Väldigt lite',
    l2: 'Lite',
    l3: 'Lagom',
    l4: 'Någorlunda mycket',
    l5: 'Mycket',
    l7: 'Väldigt mycket',
    l9: 'Väldigt väldigt mycket',
    l10: 'Maximalt',
    result: 'Ditt val är:'
  }
}
