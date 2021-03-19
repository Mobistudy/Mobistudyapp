'use strict'
export default {
  title: 'Queens College Step Test',
  shortTitle: 'QCST',
  description: 'Uppgiften är att du ska utföra ett Queens College Step Test. Appen kan skicka testresultaten till en server som Malmö Universitet ansvarar för. Datan är tillgänglig för personal på Skånes Universitetssjukhus så att läkare och sjuksköterskor kan granska dem.',
  OSpermissioniOS: 'Denna uppgift kräver att appen har tillgång till stegräknaren i din telefon, om den har sådan. Detta behövs för att räkna ut hur många steg du gjort under uppgiften. Rapporterade steg delas med forskningsgruppen för analysis. Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  OSpermissionAndroid: 'Denna uppgift kräver att appen har tillgång till stegräknaren i din telefon, om den har sådan. Detta behövs för att räkna ut hur många steg du gjort under uppgiften. Rapporterade steg delas med forskningsgruppen för analysis. Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  shortDescription: 'Utför ett Queens College Step Test',
  introductionSlides: [
    {
      title: 'Krav',
      img: 'instructions/qcst_1.jpg',
      description: 'Inför det här testet behöver du ett stabilt trappsteg, ungefär 40cm högt. Det är ungefär höjden på en liten pall.'
    },
    {
      title: 'Krav',
      img: 'instructions/qcst_2.jpg',
      description: 'En pulsmätare: du kan använda ett aktivitetsarmband, en fitnessklocka, eller försöka med en app (sök efter "Heart Rate" på app store).'
    },
    {
      title: 'Krav',
      img: 'instructions/qcst_3.jpg',
      description: 'Alternativt, för att mäta din puls manuellt kan du räkna antalet hjärtslag i 15 sekunder och multiplicera det antalet med 4.'
    },
    {
      title: 'Instructions',
      img: 'instructions/qcst_4.jpg',
      description: 'Det här är ett test med ett specifikt tempo i fyrtakt: fot 1 upp, fot 2 upp, fot 1 ner, fot 2 ner.'
    },
    {
      img: 'instructions/qcst_5.jpg',
      description: 'Stig upp och ned i takt med metronomen du kommer höra från mobilen. Se till så att ljudet på din mobil är påslaget samt höj gärna volymen.'
    },
    {
      img: 'instructions/qcst_6.jpg',
      description: 'Testet kommer automatiskt att avslutas efter 3 minuter. Om du behöver avsluta testet tidigare kan du trycka på "Slutför".'
    },
    {
      img: 'instructions/qcst_3.jpg',
      description: 'I slutet av testet kommer du bli ombedd att mäta din hjärtfrekvens och skriva in informationen i appen. Var god mät din hjärtfrekvens inom 5-20 sekunder efter att du avslutat testet.'
    },
    {
      title: 'Viktigt!',
      description: 'Försök att inte prata under testets gång eftersom detta kan påverka din prestation. Sluta omedelbart om du känner smärta i bröstet eller är yr.'
    }
  ],
  begin: 'börja',
  oneMin: 'en minut',
  twoMin: 'två minuter',
  enterHR: 'Skriv in din hjärtfrekvens',
  enterHRInstructions: 'Notera: För att mäta din puls manuellt, kan du räkna antalet hjärtslag i 15 sekunder och multiplicera det antalet med 4 och skriv in värdet nedan.',
  time: 'Tid',
  steps: 'Steg'
}
