export default {
  _key: '9999',
  publishedTS: '2021-01-09T09:30:32.492Z',
  invitationCode: '123456',
  generalities: {
    languages: ['en', 'sv'],
    title: {
      en: 'The Lindängen-COVID-19 tracking study',
      sv: 'Lindängens COVID-19-spårande studie'
    },
    shortDescription: {
      en: 'Symptoms tracking of COVID-19 symptoms in the Lindängen community.',
      sv: 'Symptom av COVID-19 som spåras i Lindängen'
    },
    longDescription: {
      en: `The aim of this study is to use your mobile phone to understand the spread of COVID-19
      within the Lindängen neighbourhood in Malmö.

      Participants are asked to report their symptoms using their mobile phone and to measure
      heart rate, activity level and blood oxygen saturation levels daily for a month.

      The collected data will be used to understand how COVID-19 spreads among the community,
      what are the typical symptoms reported by patients and what indicators can be used, among
      physical activity, heart rate, blood oxygen saturation and symptoms to detect the onset
      of COVID-19 before the worsening of symptoms.
      `,
      sv: `Målet med denna studie är att använda mobiltelefon för att förstå spridning av COVID-19 
      inom grannskapet Lindängen i Malmö.
      
      Deltagare frågas om deras symptom via deras mobiltelefoner och att de mäter puls, 
      aktivitetsnivå, samt syremättnad i blodet dagligen i en månad.
      
      Den insamlade datan kommer användas för att förstå hur COVID-19 spreds i grannskapet,
      vilka de typiska symptom som deltagare rapporterar och vilka indikatorer som kan användas,
      såsom fysisk aktivitet, puls, syremättnad i blodet, samt symptom för att identifiera
      COVID-19 tidigt före symptom blivit värre.`
    },
    startDate: '2021-01-01',
    endDate: '2021-12-31',
    principalInvestigators: [
      {
        name: 'Sergey Shleev',
        contact: 'sergey.shleev@mau.se',
        institution: 'University of Malmö'
      }
    ],
    institutions: [
      {
        name: 'University of Malmö',
        contact: 'Malmö, Sweden',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'The data will be used to identify indicators for early detection of COVID-19',
          sv: 'Datan kommer användas för att identifiera indikatorer för att tidigt upptäcka COVID-19'
        }
      }
    ]
  },
  inclusionCriteria: {
    minAge: 18,
    maxAge: 100,
    sex: [
      'female',
      'male',
      'other'
    ]
  },
  tasks: [
    {
      id: 1,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 1
      },
      formKey: '9999Health',
      formName: {
        en: 'Health questionnaire',
        sv: 'Hälsoenkät'
      }
    },
    {
      id: 2,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 1
      },
      formKey: '9999whoqol',
      formName: {
        en: 'WHO Quality of Life',
        sv: 'WHO Livskvalitet'
      }
    },
    {
      id: 3,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 1
      },
      formKey: '9999',
      formName: {
        en: 'COVID-19 Symptoms questionnaire',
        sv: 'Enkät för symptom av COVID-19'
      }
    },
    {
      id: 4,
      type: 'miband3',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'd',
        interval: 1
      },
      hrInterval: 5
    },
    {
      id: 5,
      type: 'dataQuery',
      scheduling: {
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000, // 1 month
        intervalType: 'w',
        interval: 1
      },
      dataType: 'activity',
      aggregated: true,
      bucket: 'day'
    },
    {
      id: 6,
      type: 'po60',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        startDelaySecs: 0,
        untilSecs: 2592000 // 1 month
      }
    }
  ],
  consent: {
    invitation: {
      en: `We would like to invite you to take part in this research study about understanding
      the spread of COVID-19 within the Lindängen neighbourhood.
      
      In order to participate, you will have to be referred to this study by a health promoter working
      in the area and you will need to own a smartphone (either Android or iPhone).

      If you decide to join the study, you will be asked to download the free Mobistudy app on your phone
      to wear a "activity tracker" as well as take measurements of the level of oxygen in your blood using 
      a "pulseoximeter" (no blood samples are needed for this). You will be able to borrow the activity 
      tracker and the pulseoximeter from the health promoter.
      Every day, for a month, you will be asked to report any COVID-19 related symptoms through the app,
      at the same time as your physical activity and heart beat is measured using the phone and activity 
      tracker, while the blood oxygen saturation using the pulseoximeter.

      The data collected by the app will be sent to the Malmö University for analysis and will not be shared
      with anyone else except the research team at the University.

      The participation to this study is voluntary and you can withdraw at any moment.`,
      sv: `Vi vill bjuda in dig att vara med i denna forskningsstudie för att förstå spridning av 
      COVID-19 inom Lindängens grannskap.
      
      För att delta krävs att du blivit inbjuden av en av de hälsofrämjare som arbetar i området och
      att du kan använda din egen smartphone (Android eller iPhone).
      
      Om du beslutar dig för att delta i studien så kommer du behöva ladda ned appen Mobistudy (gratis)
      till din telefon och använda ett "aktivitetsband", samt mäta hur mycket syre du har i blodet med 
      en "pulsoximeter" (kräver inget blodprov). Du kommer få låna aktivitetsbandet och pulsoximeter 
      från hälsofrämjaren.
      Varje dag under en månad frågas du om du har några COVID-19-symptom via appen på telefonen, 
      samtidigt som din telefon mäter din fysiska aktivitet och puls mäts av aktivitetsbandet. Din 
      syremängd i blodet mäts med hjälp av pulsoximetern.
      
      Data som samlas in av appen skickas till Malmö Universitet för analys och delas inte med någon
      annan utöver forskningsgruppen på universitetet.
      
      Deltagandet i denna studie är frivilligt och du kan avsluta deltagandet när du vill.`
    },
    privacyPolicy: {
      en: `To conduct this study, we need to collect some data from you using the Mobistudy app.

      What personal data will be collected?
      
      - Your general profile information like email address, name, surname, date of birth, sex, country, 
      language, main health conditions, long-term treatments, weight and height. 
      These are needed to identify you and to create statistics about those who participate in this study.
      - Your participation in the study and the times you complete a task. These are needed to assess 
      your level of involvement into the study.
      - Technical information about access to the server (like logins). These are needed for security and auditing.
      
      Data collected within the tasks assigned in this study, concretely: 
      - Answers given to the COVID-19 symptoms questionnaire.
      - Your heart rate, activity level, steps and activity type collected by the MiBand3 activity tracker.
      - Activity detected by your phone.
      - Your blood oxygen saturation and heart rate measured by a pulseoximeter.
      
      These data are needed to fulfil the aims of the research. Specifically, we want to understand how the
      disease spreads, what symptoms are common among patients and if it is possible to identify a link
      between physical activity data, as collected by your phone and the activity tracker, with clinical
      symptoms, as collected by the questionnaire and the pulseoximeter.
      
      All these data will be stored on the Mobistudy servers, which are managed by the Malmö University 
      in Sweden. Your phone will keep your profile and data about your participation in the studies only.
      
      
      For how long will this data be kept?
      
      Your profile and participation in the study will be kept for as long as you will keep an account on Mobistudy.
      Data collected within the tasks assigned in this study will be kept on the Mobistudy servers until the 
      end of the study, on 2021-12-31.
      Technical logs will be deleted after 1 year they are produced.
      Researchers of Malmö University will keep the data for 5 years.
      
      
      Who will have access to this data?
      
      - Personnel from the Malmö University for technical maintenance and auditing (Malmö University is the processor of your personal information).
      - Malmö University, in order to analyse the data (Malmö University is also the controller of your personal information).
      
      What are my rights?
      
      - You can withdraw from this study whenever you want by accessing the “studies” section of this app. 
      The data you have produced so far within the study will be kept, but if you want them to be removed contact mobistudy@mau.se.
      - You can remove your account from Mobistudy by accessing the “profile” section of this app. 
      This will remove all your data collected by Mobistudy except the technical logs, which will be deleted after 1 year. Be aware that data already downloaded by institutions involved in this or past studies may still keep your data after you have removed your account. If you want these data to be deleted, please contact mobistudy@mau.se.
      - You can ask the processing of your data to be stopped or restricted (even without deleting your account). 
      In this case contact mobistudy@mau.se.
      - You can find out what has been registered about you and download the data in a machine-readable format by contacting mobistudy@mau.se.
      - You can ask errors in your data to be corrected. In this case write to mobistudy@mau.se.
      - If you have complaints that cannot be resolved with Malmö University you may submit these to Datainspektionen.
      
      For questions about how data is processed by each institution involved in the study please contact:
      - Malmö University, at: dataskyddsombud@mau.se`,
      sv: `För att genomföra denna studie behöver vi samla in data från dig genom app:en Mobistudy.

      Vilken personlig data samlas in?

      - Din allmänna profil med mejladress, för- och efternamn, födelsedatum, kön, land, språk, huvudsakliga
      besvär du har, långtidsbehandlingar, vikt och längd. Dessa behövs för att identifiera dig samt för att
      skapa statistik om de som deltar i studien.
      - Ditt deltagande i studien och de tidpunkter du gjort klart uppgifter. Dessa behövs för att avgöra
      din nivå av engagemang i studien.
      - Teknisk information såsom tillgång till server vid inloggning. Detta behövs för säkerhet och vid 
      granskningar av vår säkerhet.

      Data samlas in genom uppgifter som ska göras i studien, specifikt:
      - Svar på enkät om COVID-19-symptom.
      - Din puls, aktivitetsnivå, typ av aktivitet och steg insamlade av MiBand3 aktivitetsband.
      - Aktiviteter din telefon identifierat.
      - Din syremättnadsgrad i blodet och puls mätt av en pulsoximeter.

      Denna data behövs för att nå forskningens mål. Specifikt vill vi förstå hur sjukdomen sprider sig,
      vilka symptom som är vanliga bland smittade, samt om det är möjligt att se en koppling mellan fysisk
      aktivitetsdata insamlat av telefon och aktivitetsband, med kliniska symptom insamlade av enkät och
      pulsoximeter.

      All data sparas på Mobistudys server som hanteras av Malmö Universitet i Sverige. Din telefon kommer
      enbart spara din användarprofil och vilka studier du deltar i.

      Hur länge sparas denna data?

      Din profil och deltagande i studien sparas så länge du har kvar ett konto på Mobistudy. Data samlas in
      genom de uppgifter studien ger dig och sparas på Mobistudys server till slutet på studien, 2021-12-31. 
      Tekniska loggar tas bort 1 år efter de skapas. Forskare på Malmö Universitet sparar datan i 5 år.
      
      Vem har tillgång till denna data?
      - Personal från Malmö Universitet för tekniskt underhåll och granskningar (Malmö Universitet är den som
      formellt behandlar din personliga information).
      - Malmö Universitet, för att kunna analysera data (Malmö Universitet är även den som formellt kontrollerar 
      din personliga information).

      Vilka är mina rättigheter?
      - Du kan gå ur studien när du vill genom att gå till den del som heter "studier" på app:en. Den data du
      skapat fram till det att du går ur studien sparas, men om du vill att även den tas bort vänligen mejla
      mobistudy@mau.se.
      - Du kan ta bort ditt konto på Mobistudy genom att gå till den del som heter "profil" i app:en. Detta
      tar bort all data som samlats in av Mobistudy, förutom tekniska loggar vilka tas bort efter 1 år. Vänligen
      var medveten att data som redan laddats ned av parter som deltar i studien eller tidigare studier du varit
      med i kan spara din data efter du tagit bort ditt konto. Om du önskar att sådan data tas bort, vänligen
      kontakta mobistudy@mau.se.
      - Du kan begära att processande av din data avslutas eller begränsas (även utan att ta bort ditt konto).
      Om du önskar detta, kontakta mobistudy@mau.se.
      - Du kan be att felaktigheter i din data korrigeras. Vänligen kontakta mobistudy@mau.se.
      - Om du har klagomål som inte kan lösas med Malmö Universitet kan du skicka dessa till Datainspektionen.

      För frågor om hur data processas av deltagande parter i en studie, vänligen kontakta:
      - Malmö Universitet på dataskyddsombud@mau.se`
    },
    taskItems: [
      {
        description: {
          en: 'I agree to share my answers to the COVID-19 Symptoms questionnaire every day.',
          sv: 'Jag accepterar att dela mina svar på COVID-19-symptom via enkät varje dag.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to send the data collected by the activty tracker every day.',
          sv: 'Jag accepterar att skicka data insamlat av aktivitetsbandet varje dag.'
        },
        taskId: 2
      },
      {
        description: {
          en: 'I agree to send the data about my physical activity collected by my phone every week.',
          sv: 'Jag accepterar att skicka data om mina fysiska aktiviteter insamlat av min telefon varje vecka.'
        },
        taskId: 3
      },
      {
        description: {
          en: 'I agree to send the readings of the pulseoximeter at least once a day.',
          sv: 'Jag accepterar att skicka mätningar med pulsoximetern minst en gång om dagen.'
        },
        taskId: 4
      }
    ]
  }
}
