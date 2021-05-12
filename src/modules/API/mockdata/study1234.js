export default {
  _key: '1234',
  publishedTS: '2019-11-09T11:09:20.498Z',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: 'COPD study',
      sv: 'KOL-forskningsstudie'
    },
    shortDescription: {
      en: 'Assessment of the relevance of physical activity indicators in COPD',
      sv: 'Detta är en provstudie för KOLS-patienter.'
    },
    longDescription: {
      en: 'In this study we want to link physical activity indicators gathered from mobile phones and wearable devices to symptoms, gathered through questionnaires.',
      sv: 'Denna studie handlar om KOL, vi vill utvärdera din KOL-nivå.'
    },
    startDate: new Date(new Date().getTime() - 1296000000).toISOString(), // 15 days ago
    endDate: new Date(new Date().getTime() + 5184000000).toISOString(), // 60 days from now
    principalInvestigators: [
      {
        name: 'Dario Salvi',
        contact: 'dario@mau.se',
        institution: 'Malmö University'
      },
      {
        name: 'Carmelo Velardo',
        contact: 'IBME Oxford',
        institution: 'University of Oxford'
      }
    ],
    institutions: [
      {
        name: 'University of Oxford, IBME',
        contact: 'Old Road Campus, Oxford',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'In order to analyse the physical activity data.',
          sv: 'För att analysera uppgifterna om fysisk aktivitet.'
        }
      },
      {
        name: 'Malmö University',
        contact: 'Nordenskiöldsgatan 1, 211 19 Malmö',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'To develop an algorithm to predict worsening of COPD symptoms based on physical activity data',
          sv: 'For att utveckla en algoritm för att förutsäga försämring av KOL-symtom baserat på uppgifter om fysisk aktivitet.'
        }
      }
    ]
  },
  inclusionCriteria: {
    minAge: 30,
    maxAge: 100,
    sex: [
      'male',
      'female',
      'other'
    ],
    criteriaQuestions: [
      {
        title: {
          en: 'Have you been diagnosed with COPD?',
          sv: 'Har du KOL?'
        },
        answer: 'yes'
      }
    ],
    diseases: [{ name: 'COPD', conceptId: '123123123' }],
    medications: []
  },
  tasks: [
    {
      id: 1,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 2592000, // 1 month
        interval: 1,
        months: [],
        monthDays: [],
        weekDays: []
      },
      formKey: '1234',
      formName: {
        en: 'COPD form',
        sv: 'KOL formulär'
      }
    },
    {
      id: 2,
      type: 'dataQuery',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        interval: 1,
        occurrences: 20,
        months: [],
        monthDays: [],
        weekDays: []
      },
      dataType: 'steps',
      aggregated: true,
      bucket: 'hour'
    },
    {
      id: 3,
      type: 'smwt',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        interval: 7,
        untilSecs: 2592000 // 1 month
      },
      dataType: 'distance'
    },
    {
      id: 4,
      type: 'qcst',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        interval: 7,
        untilSecs: 2592000 // 1 month
      },
      dataType: 'steps'
    },
    {
      id: 5,
      type: 'miband3',
      hrInterval: 5,
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 2592000, // 1 month
        interval: 1
      }
    },
    {
      id: 6,
      type: 'po60',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 2592000, // 1 month
        interval: 1
      }
    }
  ],
  consent: {
    invitation: {
      en: 'You are invited to participate to a research study about physical activity indicators in Chronic obstructive pulmonary disease (COPD) . If you have received this invitation is because you have been diagnosed with COPD and you are a user of a mobile phone. In this study, you will perform some physical activity tests every week and answer a questionnaire daily. You will also collect data about physical activity through a fitness tracker and your phone. Thank you for your interest!',
      sv: 'Du är inbjuden att delta i en forskningsstudie om indikatorer för fysisk aktivitet vid kronisk obstruktiv lungsjukdom (KOL). Om du har fått denna inbjudan beror på att du har fått diagnosen KOL och att du är en användare av en mobiltelefon. I denna studie kommer du att utföra några fysiska aktivitetstester varje vecka och svara på ett frågeformulär dagligen. Du kommer också att samla in data om fysisk aktivitet via en fitnessspårare och din telefon. Tack för ditt intresse!'
    },
    privacyPolicy: {
      en: `To conduct this study, we need to collect some data from you using the Mobistudy app.

      What personal data will be collected?
      
      - Your general profile information like email address, name, surname, date of birth, sex, country, language, main health conditions, long-term treatments, weight and height. These are needed to identify you and to create statistics about those who participate in this study.
      - Your participation in the study and the times you complete a task. These are needed to assess your level of involvement into the study.
      - Technical information about access to the server (like logins). These are needed for security and auditing.
      
      Data collected within the tasks assigned in this study, concretely: 
      - Answers given to the Clinical COPD Questionnaire form.
      - Steps measured from your phone through Google Fit.
      - Heart rate and steps collected during a Queens College Step Test.
      - Your geographical position, distance and steps during the Six-minute Walk Test.
      - Your heart rate, activity level, steps and activity type collected by the MiBand3 fitness tracker.
      - Your blood oxygen saturation and heart rate measured by a pulseoximeter.
      
      These data are needed to fulfil the aims of the research. Specifically, we want to identify a link between physical activity data, as collected by your phone and wearable devices, with clinical symptoms, as collected by the questionnaire and the pulseoximeter.
      
      All these data will be stored on the Mobistudy servers, which are managed by the Malmö University in Sweden. Your phone will keep your profile and data about your participation in the studies only.
      
      
      For how long will this data be kept?
      
      Your profile and participation in the study will be kept for as long as you will keep an account on Mobistudy.
      Data collected within the tasks assigned in this study will be kept on the Mobistudy servers until the end of the study, on 2021-12-31.
      Technical logs will be deleted after 1 year they are produced.
      Researchers of Malmö University and the University of Oxford will keep the data for 5 years.
      
      
      Who will have access to this data?
      
      - Personnel from the Malmö University for technical maintenance and auditing (Malmö University is the processor of your personal information).
      - Malmö University, in order to analyse the physical activity data (Malmö University is also the controller of your personal information).
      - The University of Oxford, in order to develop an algorithm to predict worsening of COPD symptoms based on physical activity data (the University of Oxford is also the controller of your personal information).
      
      What are my rights?
      
      You can withdraw from this study whenever you want by accessing the “studies” section of this app. The data you have produced so far within the study will be kept, but if you want them to be removed contact mobistudy@mau.se.
      You can remove your account from Mobistudy by accessing the “profile” section of this app. This will remove all your data collected by Mobistudy except the technical logs, which will be deleted after 1 year. Be aware that data already downloaded by institutions involved in this or past studies may still keep your data after you have removed your account. If you want these data to be deleted, please contact mobistudy@mau.se.
      You can ask the processing of your data to be stopped or restricted (even without deleting your account). In this case contact mobistudy@mau.se.
      You can find out what has been registered about you and download the data in a machine-readable format by contacting mobistudy@mau.se.
      You can ask errors in your data to be corrected. In this case write to mobistudy@mau.se.
      If you have complaints that cannot be resolved with Malmö University you may submit these to Datainspektionen.
      
      For questions about how data is processed by each institution involved in the study please contact:
      - Malmö University, at: dataskyddsombud@mau.se
      - University of Oxford, IBME, at Old Road Campus, Oxford`,
      sv: `För att genomföra denna studie måste vi samla in data från dig med appen Mobistudy.

      Vilka personuppgifter kommer att samlas in?
      
      - Din allmänna profilinformation som e-postadress, namn, efternamn, födelsedatum, kön, land, språk, huvudsakliga hälsotillstånd, långvariga behandlingar, vikt och längd. Dessa behövs för att identifiera dig och skapa statistik om de som deltar i denna studie.
      - Ditt deltagande i studien och de gånger du slutför en uppgift. Dessa behövs för att bedöma din delaktighet i studien.
      - Teknisk information om åtkomst till servern (som inloggningar). Dessa behövs för säkerhet och revision.
      
      Uppgifter som samlats in inom de uppgifter som tilldelats i denna studie, konkret:
      - Svar ges till formuläret Klinisk KOL-frågeformulär.
      - Steg mätt från din telefon via Google Fit.
      - Hjärtfrekvens och steg som samlats under ett Queens College Step Test.
      - Din geografiska position, avstånd och steg under sex minuters promenadtest.
      - Din hjärtfrekvens, aktivitetsnivå, steg och aktivitetstyp som samlas in av MiBand3 fitnessspårare
      - Din blodsyremättnad och hjärtfrekvens mätt med en pulsoximeter.
      
      Dessa data behövs för att uppfylla forskningsmålen. Specifikt vill vi identifiera en länk mellan fysisk aktivitetsinformation, som samlas in av din telefon och bärbara enheter, med kliniska symtom, som samlats in i frågeformuläret och pulsoximetern.
      
      Alla dessa data kommer att lagras på Mobistudy-servrarna, som hanteras av Malmö universitet. Din telefon behåller endast din profil och data om ditt deltagande i studierna.
      
      
      Hur länge kommer dessa uppgifter att sparas?
      
      Din profil och ditt deltagande i studien kommer att behållas så länge du kommer att ha ett konto på Mobistudy.
      Data som samlas in inom de uppgifter som tilldelats i denna studie kommer att sparas på Mobistudy-servrarna till slutet av studien, 2021-12-31.
      Tekniska loggar raderas efter det att de har producerats ett år.
      Forskare vid Malmö universitet och universitetet i Oxford kommer att förvara uppgifterna i 5 år.
      
      
      Vem har tillgång till dessa uppgifter?
      
      - Personal från Malmö universitet för tekniskt underhåll och revision (Malmö universitet är databehandlaren av din personliga information).
      - Malmö universitet för att analysera fysiska aktivitetsdata (Malmö universitet ansvarar också för din personliga information).
      - University of Oxford, för att utveckla en algoritm för att förutsäga försämring av KOL-symtom baserat på fysiska aktivitetsdata (University of Oxford kontrollerar också din personliga information).
      
      Vilka är mina rättigheter?
      
      Du kan dra dig ur den här studien när du vill genom att gå till avsnittet "studier" i den här appen. De uppgifter du hittills har producerat inom studien kommer att sparas, men om du vill att de ska tas bort, kontakta mobistudy@mau.se.
      Du kan ta bort ditt konto från Mobistudy genom att öppna avsnittet "profil" i den här appen. Detta tar bort all din data som samlats in av Mobistudy utom de tekniska loggarna, som kommer att raderas efter ett år. Tänk på att data som redan hämtats av institutioner som är involverade i denna eller tidigare studier fortfarande kan behålla dina uppgifter efter att du har tagit bort ditt konto. Om du vill att dessa uppgifter ska raderas, kontakta mobistudy@mau.se.
      Du kan be behandlingen av dina uppgifter att stoppas eller begränsas (även utan att ta bort ditt konto). I så fall kontakta mobistudy@mau.se.
      Du kan ta reda på vad som har registrerats om dig och ladda ner data i ett maskinläsbart format genom att kontakta mobistudy@mau.se.
      Du kan be att fel i dina data ska korrigeras. Skriv i så fall till mobistudy@mau.se.
      Om du har klagomål som inte kan lösas med Malmö universitet kan du skicka dem till Datainspektionen.
      
      För frågor om hur data behandlas av varje institution som är inblandad i studien, vänligen kontakta:
      - Malmö universitet, på: dataskyddsombud@mau.se
      - University of Oxford, IBME, vid Old Road Campus, Oxford`
    },
    taskItems: [
      {
        description: {
          en: 'I agree to answer the Clinical COPD Questionnaire, every day.',
          sv: 'Jag accepterar att besvara Kliniska COPD-frågeformuläret varje dag.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to send my data about steps, every day.',
          sv: 'Jag accepterar att skicka min information om steg varje dag'
        },
        taskId: 2
      },
      {
        description: {
          en: 'I agree to perform the six-minute walk test once a week.',
          sv: 'Jag accepterar att utföra sex minuters promenadtest en gång i veckan.'
        },
        taskId: 3
      },
      {
        description: {
          en: 'I agree to perform the Queen\'s College Step Test once a week.',
          sv: 'Jag accepterar att utföra Queen\'s College Step Test en gång i veckan.'
        },
        taskId: 4
      },
      {
        description: {
          en: 'I agree to wear the fitness tracker and share the data it collects every day.',
          sv: 'Jag samtycker till att bära fitnessspåraren och dela informationen som samlas.'
        },
        taskId: 5
      },
      {
        description: {
          en: 'I agree to measure my blood oxygen saturation every day.',
          sv: 'Jag går med på att mäta min syremättnad i blodet varje dag.'
        },
        taskId: 6
      }
    ],
    extraItems: []
  }
}
