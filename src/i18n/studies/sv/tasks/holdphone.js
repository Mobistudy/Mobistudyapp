export default {
  title: 'Hålla telefonen testet',
  shortTitle: 'Hålla telefonen',
  shortDescription: 'Mät tremor genom att hålla i telefonen',
  OSpermissioniOS: 'Den här uppgiften kräver att appen kommer åt rörelsesensorerna i din telefon. Detta behövs för att mäta mängden tremor i dina händer och övre extremiteter. Dessa data delas med forskargruppen för studien för analys. Tryck på Nästa för att fortsätta med auktoriseringsprocessen.',
  OSpermissionAndroid: 'Den här uppgiften kräver att appen kommer åt rörelsesensorerna i din telefon. Detta behövs för att mäta mängden tremor i dina händer och övre extremiteter. Dessa data delas med forskargruppen för studien för analys. Tryck på Nästa för att fortsätta med auktoriseringsprocessen.',
  introductionSlides: [
    {
      title: 'Introduktion',
      img: 'instructions/HoldYourPhone_task-01.svg',
      description: 'I den här uppgiften måste du hålla telefonen stadigt i 1 minut med varje hand. Målet är att mäta eventuell tremor i dina händer'
    },
    {
      title: 'Step 1',
      img: 'instructions/HoldYourPhone_task-02.svg',
      description: `Du kommer att utföra testet på 3 sätt: 1) Håll telefonen i knät när du sitter bekvämt.`
    },
    {
      title: 'Step 2',
      img: 'instructions/HoldYourPhone_task-03.svg',
      description: `2) Håll telefonen med armen utsträckt i axelhöjd.`
    },
    {
      title: 'Step 3',
      img: 'instructions/HoldYourPhone_task-04.svg',
      description: `3) Håll i telefonen medan du flyttar armen från utsträckt till att röra vid näsan upprepade gånger.`
    },
    {
      title: 'Important!',
      img: 'instructions/HoldYourPhone_task-05.svg',
      description: `När 1 minut har gått vibrerar din telefon. Du kommer att bli ombedd att upprepa testet för både höger och vänster arm. Om du känner att du inte kan hålla telefonen under hela testet, slappna helt enkelt av i armen.`
    }
  ],
  instructions: {
    preRestingLeft: 'Håll din telefon med din VÄNSTER hand liggande i ditt knä. Tryck på start för att börja.',
    preRestingRight: 'Håll din telefon med din HÖGER hand liggande i ditt knä. Tryck på start för att börja.',
    prePosturalLeft: 'Håll armen utsträckt i axelhöjd medan du håller telefonen med VÄNSTER hand. Tryck på start för att börja.',
    prePosturalRight: 'Håll armen utsträckt i axelhöjd medan du håller telefonen med HÖGER hand. Tryck på start för att börja.',
    preKineticLeft: 'Flytta din telefon från utsträckt till att röra vid näsan medan du håller telefonen med din VÄNSTER hand. Tryck på start för att börja.',
    preKineticRight: 'Flytta din telefon från utsträckt till att röra vid näsan medan du håller telefonen med HÖGER hand. Tryck på start för att börja.',
    afterStart: 'Fortsätt att hålla telefonen stadigt i handen.'
  },
  completed: 'Uppgiften slutförd',
  time: 'Tid',
  summaryRestingLeft: 'Tremor i vila, vänster',
  summaryRestingRight: 'Tremor i vila, högre',
  summaryPosturalLeft: 'Postural tremor, vänster',
  summaryPosturalRight: 'Postural tremor, högre',
  summaryKineticLeft: 'Kinetisk tremor, vänster',
  summaryKineticRight: 'Kinetisk tremor, högre'
}
