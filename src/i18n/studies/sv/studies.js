import smwtTask from './tasks/smwt'
import qcstTask from './tasks/qcst'
import miband3Task from './tasks/miband3'
import dataQueryTask from './tasks/dataQuery'
import po60Task from './tasks/po60'
import positionTask from './tasks/position'
import peakflowTask from './tasks/peakflow'
import fingerTappingTask from './tasks/tapping'
import holdphoneTask from './tasks/holdphone'

let studies = {
  studies: {
    newStudy: 'Ny studie',
    insertInvitationCode: 'Ange inbjudningskoden här',
    newStudyAvailable: 'Ny studie tillgänglig',
    checkNewStusy: 'Se den',
    newStudyInvite: 'Du är inbjuden till en ny studie!',
    newStudyExtraCriteria: 'Svara på följande för att ta reda på om du är behörig',
    notEligible: 'Du har inte behörighet till den här studien',
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
      cancelTaskLabel: 'Avbryt',
      quitTaskLabel: 'Avsluta uppgift',
      pendingTasks: 'Dagens pågående uppgifter',
      missedTasks: 'Missade uppgifter',
      alwaysOnTasks: 'Uppgifter som alltid är tillgängliga',
      noMissedTasks: 'Inga uppgifter missade',
      instructionsNote: 'Var god läs instruktionerna noga. Noggranheten av testet beror på hur väl instruktionerna följs.',
      capTestComplete: 'Grattis!',
      capTestCompleteSubtext: 'Du avslutade uppgiften!',
      taskCompleted: 'Uppgiften har nu blivit avslutat och resultatet har blivit skickad till servern. Tack!',
      due: 'Väntad',
      daysAgo: 'igår | {count} dagar sedan',
      hoursAgo: '1 timme sedan | {count} timmar sedan',
      minsAgo: '1 minut sedan | {count} minuter sedan',
      form: {
        title: '{formname} formulär',
        shortDescription: 'Besvara några frågor',
        formCompleted: 'Formulär slutförd. Tack.',
        freeTextExplanation: 'Skriv ditt svar',
        removeAnswer: 'Ta bort svar',
        numberTooSmall: 'För litet',
        numberTooBig: 'För stort'
      }
    },
    consent: {
      itemsExplanation: 'Du kan samtycka till dessa villkor när du än vill',
      OSpermission: 'Den här tillåtelsen kräver att appen har tillgång till några av din telefons funktionaliteter.',
      giveOSPermission: 'Ge tillåtelse till den gär appen',
      OSPermissionGivenSeeking: 'Få Tillåtelse',
      OSPermissionGiven: 'Tillåtelse given',
      OSPermissionNotGiven: 'Kan inte få tillåtelse',
      remindersConsent: 'Jag vill få påminnelser om den här studiens uppgifter.',
      giveRemindersOSPermission: 'Tillåt påminnelser',
      informedConsent: 'Informerat samtyckte',
      consentExplanation: 'Samtyck till det följande för att gå med i studien. Du behöver inte samtycka till allt, däremot kan det vara så att vissa villkor krävs för att gå med i studien. När ett villkot kräver tillgång till telefonens funktionalitet kan du trycka på knappen för att ge tillgång till appen.',
      updateConsent: 'Uppdatera samtycket',
      consentUpdated: 'Samtyckesuppdatering',
      joinStudy: 'Gå med i studien',
      accepted: 'Du har precis gått med!',
      contactReminder: 'Kom ihåg, om du behöver, kan du alltid kontakta huvudutredarna genom:',
      withdraw: 'Upphäv',
      withdrawalConfirm: 'Är du säker på att du vill dra dig ur den här studien? Om ja, ange varför'
    }
  }
}

studies.studies.tasks.smwt = smwtTask
studies.studies.tasks.qcst = qcstTask
studies.studies.tasks.miband3 = miband3Task
studies.studies.tasks.dataQuery = dataQueryTask
studies.studies.tasks.po60 = po60Task
studies.studies.tasks.position = positionTask
studies.studies.tasks.peakflow = peakflowTask
studies.studies.tasks.fingerTapping = fingerTappingTask
studies.studies.tasks.holdPhone = holdphoneTask

export default studies
