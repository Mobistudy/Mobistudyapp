'use strict'
export default {
  title: 'Queens College Step Test',
  shortTitle: 'QCST',
  description: 'Uppgiften är att du ska utföra ett Queens College Step Test. Den här appen kan skicka testresultaten till en server vars värd är Malmö Universitet. Datan är tillgänglig för personal på Skånes Universitetssjukhus så att läkare och sjuksköterskor kan granska dem.',
  shortDescription: 'Urför ett Queens College Step Test',
  introductionSlides: [
    {
      title: 'Krav',
      img: '/statics/instructions/qcst_1.jpg',
      description: 'Inför det här testet behöver du ett hållfast trappsteg, ungefär 40cm högt. Det är ungefär höjden på en liten pall.'
    },
    {
      title: 'Krav',
      img: '/statics/instructions/qcst_2.jpg',
      description: 'En hjärtfrekvensmätare: du kan använda ett aktivitetsarmband eller en fitnessklocka eller så kan du försöka med en app (sök efter "Heart Rate" på app store).'
    },
    {
      title: 'Krav',
      img: '/statics/instructions/qcst_3.jpg',
      description: 'Alternativt, för att mäta din hjärtfrekvens manuellt, kan du räkna antalet hjärtslag i 15 sekunder och multiplicera det antalet med 4.'
    },
    {
      title: 'Instructions',
      img: '/statics/instructions/qcst_4.jpg',
      description: 'Det här är ett test med ett specifikt tempo, fyrtakt: fot 1 upp, fot 2 upp, fot 1 ner, fot 2 ner.'
    },
    {
      img: '/statics/instructions/qcst_5.jpg',
      description: 'Stega upp och ner enligt metronomen du kommer höra från mobilen. Var god och se till att ljudet på din mobil är påslaget samt höj gärna volymen.'
    },
    {
      img: '/statics/instructions/qcst_6.jpg',
      description: 'Testet kommer automatiskt att stoppas efter 3 minuter. Om du behöver avsluta testet tidigare kan du trycka på "Slutför"-knappen.'
    },
    {
      img: '/statics/instructions/qcst_3.jpg',
      description: 'I slutet av testet kommer du att bli ombedd att mäta din hjärtfrekvens och skriva in informationen i appen. Var god och se till att du mäter din hjärtfrekvens inom 5-20 sekunder efter att du avslutat testet.'
    },
    {
      title: 'Viktigt!',
      description: 'Försök att inte prata under testets gång, detta kan påverka din prestation. Sluta omedelbart om du känner smärta i bröstet eller är yr.'
    }
  ],
  begin: 'Börja',
  oneMin: 'En minut',
  twoMin: 'Två minuter',
  enterHR: 'Skriv in din hjärtfrekvens',
  enterHRInstructions: 'PS: För att mäta din hjärtfrekvens manuellt, kan du räkna antalet hjärtslag i 15 sekunder och multiplicera det antalet med 4 och skriv in värdet nedan.',
  time: 'Tid',
  steps: 'Steg'
}
