'use strict'

export default {
  title: 'Mätning av syremättnadsnivå',
  shortTitle: 'Pulsoximeter',
  shortDescription: 'Mät din syremättnadsnivå',
  OSpermissioniOS: 'Denna uppgift kräver att appen har tillgång till Bluetooth på din telefon. Detta behövs för att koppla appen till pulseoximeter (PO60) och samla in uppmätt syremättnadsnivå i blodet. Insamlad data delas med forskningsgruppen för analys.\n Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  OSpermissionAndroid: 'Denna uppgift kräver att appen har tillgång till Bluetooth på din telefon. Detta behövs för att koppla appen till pulseoximeter (PO60) och samla in uppmätt syremättnadsnivå i blodet. Insamlad data delas med forskningsgruppen för analys.\n Klicka på Nästa om du vill fortsätt autentiseringsprocessen.',
  introductionSlides: [
    {
      img: 'instructions/po60_1.jpg',
      description: 'I den här uppgiften kommer du mäta din syremättnadsnivå med hjälp av en Beurer PO60 pulsoximeter.'
    },
    {
      img: 'instructions/po60_2.jpg',
      description: 'Placera ditt finger i pulsoximetern, vänta tills hjärtfrekvens och syremättnadsnivån visas på skärmen och ta sedan ut ditt finger.'
    },
    {
      img: 'instructions/po60_3.jpg',
      description: 'Säkerställ att Bluetooth är aktiverad på din telefon. Om det är första gången du ansluter till pulsoximeter kommer mobilen att be dig bekräfta anslutningen genom att skriva in koden du ser på pulsoximeterns skärm.'
    }
  ],
  connect: 'Anslut',
  scanning: 'Söker efter pulsoximetern.',
  scanFailed: 'Ett problem uppstod vid sökning efter pulsoximetern. Vill du försöka igen?',
  noDeviceTitle: 'Ingen pulsoximeter hittades.',
  noDevice: 'Kunde inte hitta en pulsoximeter. Var god att bekräfta att Bluetooth är aktiverat på din mobil. Vill du försöka igen?',
  moreDevices: 'Mer än en pulsoximeter hittades. Den närmaste enheten är längst upp i listan. Var god tryck på den enhet i listan du vill ansluta till.',
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
  dataSPO2Title: 'Syremättnadsnivå i blodet'
}
