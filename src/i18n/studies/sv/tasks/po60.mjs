'use strict'

export default {
  title: 'Mätning av syremättnadsnivå',
  shortTitle: 'Pulsoximeter',
  shortDescription: 'Mät din syremättnadsnivå',
  OSpermissioniOS: 'This task requires the app to access Bluetooth on your phone. This is needed to connect the app with the PO60 pulseoximeter and collect the measured blood oxygen saturation. The collected data will be shared with the research team of this study for analysis.\n Tap on Next if you want to proceed with the authorization process.',
  OSpermissionAndroid: 'This task requires the app to access Bluetooth on your phone. This is needed to connect the app with the PO60 pulseoximeter and collect the measured blood oxygen saturation. The collected data will be shared with the research team of this study for analysis.\n Tap on Next if you want to proceed with the authorization process.',
  introductionSlides: [
    {
      title: 'Inställning',
      img: 'instructions/po60_1.jpg',
      description: 'I den här uppgiften kommer du att mäta din syremättnadsnivå med hjälp av beurer PO60 pulsoximetern.'
    },
    {
      title: 'Instruktion',
      img: 'instructions/po60_2.jpg',
      description: 'Placera ditt finger i pulsoximetern, vänta tills hjärtfrekvens och syremättnadsnivån visas på skärmen och ta sedan ut ditt finger.'
    },
    {
      title: 'Viktigt!',
      img: 'instructions/po60_3.jpg',
      description: 'Säkerställ att blåtanden är aktiverad på din telefon. Om det är första gången du ansluter till pulsoximeter, kommer mobilen att be dig konfirmera anslutningen genom att skriva in koden du ser på pulsoximeterns skärm i mobilen.'
    }
  ],
  connect: 'Anslut',
  scanning: 'Söker efter pulsoximetern.',
  scanFailed: 'Ett problem uppstod vid sökning efter pulsoximetern, vill du försöka igen?',
  noDeviceTitle: 'Ingen pulsoximeter hittades.',
  noDevice: 'Kunde inte hitta en pulsoximeter. Var god och se till att blåtanden är aktiverad på din mobil. Vill du försöka igen?',
  moreDevices: 'Mer än en pulsoximeter hittades. Den närmsta enheten är längst upp i listan. Var god tryck på den enheten du vill ansluta till.',
  takeMeasurement: 'Var god och sätt in fingret i pulsoximetern, tryck på dess knapp och ta ut ditt finger när du ser ett mätvärde på skärmen.',
  connectionFail: 'Kan inte ansluta till pulsoximetern. Vill du försöka igen?',
  connecting: 'Ansluter till pulsoximetern',
  dataSending: 'Skickar data',
  dataDownloadError: 'Det går inte att hämta data från pulsoximetern.',
  healthData: {
    hr: 'Hjärtfrekvens',
    spo2: 'Syremättnadsnivå'
  },
  dataHRTitle: 'Hjärtslag per minut',
  dataSPO2Title: 'Syremättnadsnivå'
}
