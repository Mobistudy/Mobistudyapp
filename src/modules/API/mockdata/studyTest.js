export default {
  _key: '1978',
  teamKey: '1608',
  invitationCode: '696174',
  invitational: true,
  numberOfParticipants: 1000,
  createdTS: '2021-02-08T14:25:00.741Z',
  updatedTS: '2021-02-11T16:47:58.945Z',
  publishedTS: '2021-02-11T16:47:58.863Z',
  generalities: {
    languages: ['en', 'sv', 'es'],
    title: {
      en: 'Example research study',
      sv: 'Exempel forskningsstudie',
      es: 'Estudio de ejemplo'
    },
    shortDescription: {
      en: `An example research study to showcase Mobistudy's functionalities.`,
      sv: `Ett exempel på en forskningsstudie för att visa Mobistudys funktioner.`,
      es: 'Un estudio de ejemplo para mostrar las funcionalidades de Mobistudy'
    },
    longDescription: {
      en: 'This example study showcases all the functionalities included in the app. It proposes a set of data collection tasks with no particular purpose. The data collected within this study may be used for technical analysis and debugging of the software.',
      sv: 'Denna exempelstudie visar alla funktioner som ingår i appen. Det föreslår en uppsättning uppgifter för datainsamling utan något särskilt syfte. Data som samlas in i denna studie kan användas för teknisk analys och felsökning av programvaran.',
      es: 'Este estudio muestra todas las funcionalidades incluidas en el app. Propone una serie de tareas de recopilcación de datos para ninguna razón en concreto. Los datos recopilados a traves de este estudio podrían ser usados para análisis técnica y solución de errores en el software.'
    },
    startDate: new Date(new Date().getTime() - 1296000000).toISOString(), // 15 days ago
    endDate: new Date(new Date().getTime() + 5184000000).toISOString(), // 60 days from now
    principalInvestigators: [
      {
        name: 'Dario Salvi',
        contact: 'dario@mau.se',
        institution: 'Malmö University'
      }
    ],
    institutions: [
      {
        name: 'Malmö University',
        contact: 'Nordenskiöldsgatan 1, 211 19 Malmö',
        dataAccess: 'full',
        reasonForDataAccess: {
          en: 'Malmö University may use the data for technical analysis and for improving the app.',
          sv: 'Malmö universitet kan använda informationen för teknisk analys och för att förbättra appen.',
          es: 'La universidad de Malmo podría utilizar estos datos para el análisis tecnica y para mejorar el app.'
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
          en: 'Do you satisfy this example inclusion criterium?',
          sv: 'Uppfyller du detta exempel införande kriterium?',
          es: '¿Cumples con este criterio de inclusión de ejemplo?'
        },
        answer: 'yes'
      }
    ],
    diseases: [],
    medications: []
  },
  tasks: [
    {
      id: 1,
      type: 'form',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        untilSecs: 60 * 60 * 24 * 7, // 1 week
        interval: 1,
        months: [],
        monthDays: [],
        weekDays: []
      },
      formKey: '3507',
      formName: {
        en: 'Example questionnaire',
        sv: 'Exempel formulär',
        es: 'Formulario de ejemplo'
      }
    },
    {
      id: 2,
      type: 'dataQuery',
      scheduling: {
        startEvent: 'consent',
        intervalType: 'd',
        interval: 1,
        occurrences: 5,
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
      type: 'miband3',
      hrInterval: 1,
      scheduling: {
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7, // 1 week
        intervalType: 'd',
        interval: 1
      }
    },
    {
      id: 4,
      type: 'smwt',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7 // 1 week
      },
      dataType: 'distance'
    },
    {
      id: 5,
      type: 'qcst',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7 // 1 week
      },
      dataType: 'steps'
    },
    {
      id: 6,
      type: 'po60',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7 // 1 week
      }
    },
    {
      id: 7,
      type: 'position',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7 // 1 week
      }
    },
    {
      id: 8,
      type: 'peakFlow',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7 // 1 week
      }
    },
    {
      id: 9,
      type: 'fingerTapping',
      scheduling: {
        alwaysOn: true,
        startEvent: 'consent',
        untilSecs: 60 * 60 * 24 * 7 // 1 week
      }
    }
  ],
  consent: {
    invitation: {
      en: `You have been invited to an example research study! You are probably testing the Mobsitudy app and you want to understand how it works. This study will allow you to see all the app's functionalities. Thank you for your interest!`,
      sv: `Du har blivit inbjuden till ett exempel på en forskningsstudie! Du testar förmodligen Mobsitudy-appen och du vill förstå hur den fungerar. Denna studie gör att du kan se alla appens funktioner. Tack för ditt intresse!`,
      es: `¡Has sido invitado a un estudio de investigaciòn de ejemplo! Probablemente estás probando la aplicación Mobsitudy y quieres comprender cómo funciona. Este estudio te permitirá ver todas las funcionalidades de la aplicación. ¡Gracias por tu interés!`
    },
    privacyPolicy: {
      en: `To conduct this study, we need to collect some data from you using the Mobistudy app.

      What personal data will be collected?

      - Your general profile information like email address, name, surname, date of birth, sex, country, language, main health conditions, long-term treatments, weight and height. These are needed to identify you and to create statistics about those who participate in this study.
      - Your participation in the study and the times you complete a task. These are needed to assess your level of involvement into the study.
      - Technical information about access to the server (like logins). These are needed for security and auditing.

      Data collected within the tasks assigned in this study, concretely:
      - Answers given to the Example Questionnaire form.
      - Steps measured from your phone through Google Fit.
      - Heart rate and steps collected during a Queens College Step Test.
      - Your geographical position, distance and steps during the Six-minute Walk Test.
      - Your heart rate, activity level, steps and activity type collected by the MiBand3 fitness tracker.
      - Your blood oxygen saturation and heart rate measured by a pulseoximeter.
      - Your geographical location during the positioning task.
      - Your peak flow rate measurements.
      - The time you tap the screen during the finger tapping exercise.

      These data are not really needed for anything in particular, as this is just an example, but they may be useful for finding bugs and improving Mobistudy.

      All these data will be stored on the Mobistudy servers, which are managed by the Malmö University in Sweden. Your phone will keep your profile and data about your participation in the studies only.


      For how long will this data be kept?

      Your profile and participation in the study will be kept for as long as you will keep an account on Mobistudy.
      Data collected within the tasks assigned in this study will be kept on the Mobistudy servers until the end of the study, on 2021-12-31.
      Technical logs will be deleted after 1 year they are produced.

      Who will have access to this data?

      - Personnel from the Malmö University for technical maintenance and auditing (Malmö University is the processor of your personal information).

      What are my rights?

      You can withdraw from this study whenever you want by accessing the “studies” section of this app. The data you have produced so far within the study will be kept, but if you want them to be removed contact mobistudy@mau.se.
      You can remove your account from Mobistudy by accessing the “profile” section of this app. This will remove all your data collected by Mobistudy except the technical logs, which will be deleted after 1 year. Be aware that data already downloaded by institutions involved in this or past studies may still keep your data after you have removed your account. If you want these data to be deleted, please contact mobistudy@mau.se.
      You can ask the processing of your data to be stopped or restricted (even without deleting your account). In this case contact mobistudy@mau.se.
      You can find out what has been registered about you and download the data in a machine-readable format by contacting mobistudy@mau.se.
      You can ask errors in your data to be corrected. In this case write to mobistudy@mau.se.
      If you have complaints that cannot be resolved with Malmö University you may submit these to Datainspektionen.

      For questions about how data is processed by each institution involved in the study please contact:
      - Malmö University, at: dataskyddsombud@mau.se`,
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
      - Din geografiska plats under positioneringsuppgiften.
      - Dina toppflödesmätningar.
      - Den tid du trycker på skärmen under fingertryckningen.

      Dessa data behövs egentligen inte för något särskilt, eftersom detta bara är ett exempel, men de kan vara användbara för att hitta buggar och förbättra Mobistudy.

      Alla dessa data kommer att lagras på Mobistudy-servrarna, som hanteras av Malmö universitet. Din telefon behåller endast din profil och data om ditt deltagande i studierna.


      Hur länge kommer dessa uppgifter att sparas?

      Din profil och ditt deltagande i studien kommer att behållas så länge du kommer att ha ett konto på Mobistudy.
      Data som samlas in inom de uppgifter som tilldelats i denna studie kommer att sparas på Mobistudy-servrarna till slutet av studien, 2021-12-31.
      Tekniska loggar raderas efter det att de har producerats ett år.

      Vem har tillgång till dessa uppgifter?

      - Personal från Malmö universitet för tekniskt underhåll och revision (Malmö universitet är databehandlaren av din personliga information).

      Vilka är mina rättigheter?

      Du kan dra dig ur den här studien när du vill genom att gå till avsnittet "studier" i den här appen. De uppgifter du hittills har producerat inom studien kommer att sparas, men om du vill att de ska tas bort, kontakta mobistudy@mau.se.
      Du kan ta bort ditt konto från Mobistudy genom att öppna avsnittet "profil" i den här appen. Detta tar bort all din data som samlats in av Mobistudy utom de tekniska loggarna, som kommer att raderas efter ett år. Tänk på att data som redan hämtats av institutioner som är involverade i denna eller tidigare studier fortfarande kan behålla dina uppgifter efter att du har tagit bort ditt konto. Om du vill att dessa uppgifter ska raderas, kontakta mobistudy@mau.se.
      Du kan be behandlingen av dina uppgifter att stoppas eller begränsas (även utan att ta bort ditt konto). I så fall kontakta mobistudy@mau.se.
      Du kan ta reda på vad som har registrerats om dig och ladda ner data i ett maskinläsbart format genom att kontakta mobistudy@mau.se.
      Du kan be att fel i dina data ska korrigeras. Skriv i så fall till mobistudy@mau.se.
      Om du har klagomål som inte kan lösas med Malmö universitet kan du skicka dem till Datainspektionen.

      För frågor om hur data behandlas av varje institution som är inblandad i studien, vänligen kontakta:
      - Malmö universitet, på: dataskyddsombud@mau.se`,
      es: `Para realizar este estudio, necesitamos recopilar algunos datos suyos utilizando la aplicación Mobistudy.

      ¿Qué datos personales se recopilarán?
      \u2022 Tu información general de perfil como dirección de correo electrónico, nombre, apellido, fecha de nacimiento, sexo, país, idioma, principales condiciones de salud, tratamientos a largo plazo, peso y altura.
      Estos son necesarios para identificarte y crear estadísticas sobre quienes participan en este estudio.
      \u2022 Tu participación en el estudio y las veces que completas una tarea.
      Estos son necesarios para evaluar el nivel de participación en el estudio.
      \u2022 Información técnica relacionada con el acceso al servidor (como inicios de sesión).
      Estos son necesarios para la seguridad y la auditoría.

      Datos recogidos dentro de las tareas asignadas en este estudio, específicamente:
      \u2022 Respuestas dadas al formulario de ejemplo
      \u2022 Pasos desde GoogleFit (Android phones) o HealthKit (iPhones)
      \u2022 Frecuencia cardíaca y pasos recopilados durante el Queens College Step Test
      \u2022 Tu posición geográfica, distancia y pasos durante el 6-minute Walk Test
      \u2022 Tu frecuencia cardíaca, nivel de actividad, pasos y tipo de actividad recopilados por el monitor de actividad
      \u2022 Tu saturación de oxígeno en sangre y frecuencia cardíaca medida por el oxímetro de pulso.
      \u2022 Tu ubicación geográfica durante la tarea de posicionamiento.
      \u2022 Tu flujo espiratorio máximo.
      \u2022 Tu saturación de oxígeno en sangre y frecuencia cardíaca medida por el oxímetro de pulso.
      \u2022 El tiempo que toca la pantalla durante el ejercicio de tocar con el dedo.

      Estos datos no son realmente necesarios para nada en particular, ya que esto es solo un ejemplo, pero pueden ser útiles para encontrar errores y mejorar Mobistudy.
      Todos estos datos se almacenarán en el servidor de Mobistudy, gestionado por la Universidad de Malmö en Suecia. Su teléfono solo conservará su perfil y datos sobre los estudios en los que está participando.

      ¿Durante cuánto tiempo se conservarán estos datos?
      Su perfil y participación en un estudio se mantendrán mientras mantenga una cuenta en Mobistudy.
      Los datos recopilados dentro de las tareas asignadas en este estudio se mantendrán en el servidor de Mobistudy hasta el final del estudio, en 2021-12-31.
      Los registros técnicos se eliminarán después de 1 año de su producción.


      ¿Quién tendrá acceso a estos datos?
      \u2022 Personal de la Universidad de Malmö para mantenimiento técnico y auditoría (la Universidad de Malmö es el procesador de su información personal).

      ¿Cuáles son mis derechos?
      \u2022 Puedes retirarte de este estudio cuando lo desee desde la sección "estudios" de la aplicación. Los datos que hayas producido hasta ahora dentro del estudio se conservarán, pero si deseas que también se eliminen, comuníquese con mobistudy@mau.se.
      \u2022 Puedes eliminar tu cuenta de Mobistudy desde la sección "perfil" de la aplicación. Esto eliminará todos tus datos recopilados por Mobistudy, excepto los registros técnicos, que se eliminarán después de 1 año. Ten en cuenta que los datos ya descargados por las instituciones involucradas en este o en estudios anteriores aún pueden conservar sus datos después de haber eliminado tu cuenta. Si deseas que también se eliminen estos datos, póngase en contacto con mobistudy@mau.se.
      \u2022 Puedes solicitar que se detenga o restrinja el procesamiento de sus datos (incluso sin eliminar su cuenta). En este caso, pónte en contacto con mobistudy@mau.se.
      \u2022 Puedes averiguar qué se ha registrado sobre usted y descargar los datos en un formato legible por ordenadores poniéndose en contacto con mobistudy@mau.se.
      \u2022 Puedes solicitar la corrección de errores en tus datos. En este caso, pónte en contacto con mobistudy@mau.se.
      \u2022 Si tienes quejas que no se pueden resolver con la Universidad de Malmö, puede enviarlas a Datainspektionen.

      Si tiene preguntas sobre cómo procesa los datos cada institución involucrada en el estudio, ponte en comunicación con:
      \u2022 Responsable de protección de datos de la Universidad de Malmö en dataskyddsombud@mau.se`
    },
    taskItems: [
      {
        description: {
          en: 'I agree to answer the sample questionnaire, every day.',
          sv: 'Jag accepterar att besvara Exempel formulär, varje dag.',
          es: 'Acepto contestar el Formulario de ejemplo, cada día, por una semana.'
        },
        taskId: 1
      },
      {
        description: {
          en: 'I agree to send my data about steps, every day for 1 week.',
          sv: 'Jag accepterar att skicka min information om steg varje dag i 1 vecka.',
          es: 'Acepto enviar datos sobre mis pasos, cada día, por una semana.'
        },
        taskId: 2
      },
      {
        description: {
          en: 'I agree to wear the fitness tracker and share the data it collects every day for 1 week.',
          sv: 'Jag samtycker till att bära fitnessspåraren och dela informationen som samlas varje dag i 1 vecka.',
          es: 'Acepto llevar una pulsera monitor de actividad y compartir los datos que esa produce cada día por una semana.'
        },
        taskId: 3
      },
      {
        description: {
          en: 'I agree to perform the six-minute walk test at least once in a week.',
          sv: 'Jag accepterar att utföra sex minuters promenadtest minst en gång i en vecka.',
          es: 'Acepto hacer el test de caminata de 6 minutos por lo menos una vez en una semana.'
        },
        taskId: 4
      },
      {
        description: {
          en: 'I agree to perform the Queen\'s College Step Test at least once in a week',
          sv: 'Jag accepterar att utföra Queen\'s College Step Test minst en gång i en vecka.',
          es: 'Acepto hacer el Queen\'s College Step Test por lo menos una vez en una semana.'
        },
        taskId: 5
      },
      {
        description: {
          en: 'I agree to measure my blood oxygen saturation at least once in a week.',
          sv: 'Jag går med på att mäta min syremättnad i blodet minst en gång i en vecka.',
          es: 'Acepto medir la satuarción de oxigeno en mi sangre una vez en una semana.'
        },
        taskId: 6
      },
      {
        description: {
          en: 'I agree to share my location every day for 1 week.',
          sv: 'Jag samtycker till att dela min plats varje dag i en vecka.',
          es: 'Acepto compartir mi ubicación todos los días durante 1 semana.'
        },
        taskId: 7
      },
      {
        description: {
          en: 'I agree to measure my peak flow rate for 1 week.',
          sv: 'Jag går med på att mäta min toppflöde i 1 vecka.',
          es: 'Acepto medir mi flujo espiratorio máximo durante 1 semana.'
        },
        taskId: 8
      },
      {
        description: {
          en: 'I agree to perform a finger tapping exercise per day for 1 week.',
          sv: 'Jag går med på att utföra en fingeravtryckningsövning per dag i en vecka.',
          es: 'Acepto realizar un ejercicio de golpeteo con los dedos por día durante 1 semana.v'
        },
        taskId: 9
      }
    ],
    extraItems: []
  }
}
