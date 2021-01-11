'use strict'

import { mergeDeep } from 'modules/tools'
import smwtTask from './tasks/smwt'
import qcstTask from './tasks/qcst'
import miband3Task from './tasks/miband3'
import formTask from './tasks/form.js'
import dataQueryTask from './tasks/dataQuery.js'

let studies = {
  studies: {
    newStudy: 'Ny studie tillgänglig',
    checkNewStusy: 'Se den',
    newStudyInvite: 'Du är inbjuden till en ny studie!',
    newStudyExtraCriteria: 'Svara på följande för att ta reda på om du är behörig',
    notEligible: 'Du har inte behörighet till den här studien',
    foundNoStudies: 'Fann inga behöriga studier',
    searchingForStudies: 'Letar efter nya studie',
    noStudies: 'Du deltar för nuvarande inte i en studie',
    joinStudy: 'Delta',
    discardStudy: 'Kassera',
    discardStudyConfirm: 'Är du säker på att du vill kassera den här studien?',
    privacyPolicy: 'Integritetspolicy',
    activeStudies: 'Aktiva studier',
    noActiveStudies: 'Inga aktiva studier hittade.',
    previousStudies: 'Tidigare studier',
    studyCompletedHeadline: 'Du har avslutat en studie',
    studyCompletedText: 'Du har slutfört alla uppgifter för {studyname}.<br><br>Tack så mycket!<br><br>Var medveten om att vissa studier kräver ytterligare engagemang för slutförande, läs studiebeskrivningen i "Hantera Studier" menyn.',
    principalInvestigators: 'Huvudutredare',
    investigatorName: 'Namn',
    institution: 'Instutition',
    institutions: 'Involverade instutitioner',
    contact: 'Kontakt detaljer',
    studyDetails: 'Studie detaljer',
    studyTitle: 'Studie titel',
    dataAccess: {
      anonymised: 'Den här instutitionen vill ha tillgång till din data på ett anonymiserat sätt.',
      noAccess: 'Den här instutitionen vill inte ha tillgång till din data.',
      full: 'Den här instutitionen kommer ha tillgång till din data',
      reason: 'Anledning för dataåtkomst'
    },
    scheduling: {
      due: 'Mobistudy uppgift väntad!',
      start: 'Tryck här för att starta uppgiften'
    },
    tasks: {
      cancelTask: 'Det här kommer att avsluta nuvarande uppgift och du kommer bli omdirigerad till startsidan. Ingen data kommer bli sparad. Är du säker på att du vill avsluta?',
      noPendingTasks: 'Ingen uppgift pågående',
      cancelTaskLabel: 'Avsluta',
      quitTaskLabel: 'Avsluta uppgift',
      pendingTasks: 'Dagens pågående uppgifter',
      missedTasks: 'Missade uppgifter',
      noMissedTasks: 'Inga uppgifter missade',
      instructionsNote: 'Var god läs instruktionerna noga. Noggranheten av testet beror på hur väl instruktionerna följs.',
      capTestComplete: 'Grattis!',
      capTestCompleteSubtext: 'Du avslutade uppgiften!',
      taskCompleted: 'Uppgiften har nu blivit avslutat och resultatet har blivit skickad till servern. Tack!',
      dataQuery: {
        title: 'Data query',
        shortTitle: 'Data query',
        shortDescription: 'Extrahera data från din telefon',
        dataQueryExplanation: 'Den här datan kommer bli extraherad från din telefon. Om du samtycker att skicka den, tryck på skicka.'
      },
      form: {
        title: '{formname} formulär',
        shortDescription: 'Besvara några frågor',
        formCompleted: 'Formulär slutförd. Tack.',
        freeTextExplanation: 'Skriv ditt svar'
      }
    },
    consent: {
      itemsExplanation: 'Du kan samtycka till dessa villkor när du än vill',
      OSpermission: 'Den här tillåtelsen kräver add appen har tillgång till några av din telefons funktionaliteter.',
      giveOSPermission: 'Ge tillåtelse till den gär appen',
      OSPermissionGiven: 'Tillåtelse given',
      OSPermissionNotGiven: 'Kan inte få tillåtelse',
      remindersConsent: 'Jag vill gå påminnelser om den här studiens uppgifter.',
      remindersOSPermission: 'Du måste tillåta den här appen för att skicka påminnelser.',
      giveRemindersOSPermission: 'Tillåt påminnelser',
      informedConsent: 'Informerat samtyckte',
      consentExplanation: 'Samtyck till det följande för att gå med i studien. Du behöver inte samtycka till allt, däremot kan det vara så att vissa villkor krävs för att gå med i studien. När ett villkot kräver tillgång till telefonens funktionalitet kan du trycka på knappen för att ge tillgång till appen.',
      updateConsent: 'Uppdatera samtycket',
      consentUpdated: 'Samtyckesuppdatering',
      withdraw: 'Upphäv deltagandet i studien',
      joinStudy: 'Gå med i studien',
      accepted: 'Du har precis gått med!',
      contactReminder: 'Kom ihåg, om du behöver, kan du alltid kontakta huvudutredarna genom:'
    }
  }
}

studies = mergeDeep(studies, smwtTask)
studies = mergeDeep(studies, qcstTask)
studies = mergeDeep(studies, miband3Task)
studies = mergeDeep(studies, formTask)
studies = mergeDeep(studies, dataQueryTask)
export default studies
