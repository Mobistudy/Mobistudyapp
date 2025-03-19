import formTask from './tasks/form'
import smwtTask from './tasks/smwt'
import qcstTask from './tasks/qcst'
import miband3Task from './tasks/miband3'
import dataQueryTask from './tasks/dataQuery'
import po60Task from './tasks/po60'
import positionTask from './tasks/position'
import peakflowTask from './tasks/peakflow'
import fingerTappingTask from './tasks/tapping'
import tugtTask from './tasks/tugt'
import holdphoneTask from './tasks/holdphone'
import vocalizationTask from './tasks/vocalization'
import drawingTask from './tasks/drawing'

let studies = {
  studies: {
    newStudy: 'Nuovo studio',
    insertInvitationCode: 'Inserisci qui il codice di invito',
    newStudyAvailable: 'Nuovo studio disponibile',
    checkNewStusy: 'Verifica',
    newStudyInvite: 'Sei stato invitato a un nuovo studio!',
    newStudyExtraCriteria: 'Rispondi alle seguenti domande per sapere se sei idoneo',
    notEligible: 'Non sei idoneo per questo studio',
    noStudies: 'Attualmente non stai partecipando a nessuno studio.',
    joinStudy: 'Partecipa',
    discardStudy: 'Scarta',
    discardStudyConfirm: 'Sei sicuro di voler scartare questo studio?',
    privacyPolicy: 'Informativa sulla privacy',
    activeStudies: 'Studi attivi',
    noActiveStudies: 'Nessuno studio attivo trovato.',
    previousStudies: 'Studi precedenti',
    studyCompletedHeadline: 'Hai completato uno studio',
    studyCompletedText: 'Hai completato tutti i compiti per lo studio {studyname}.<br><br>Grazie mille per il tuo contributo!<br><br>Ricorda che alcuni studi potrebbero richiedere ulteriori azioni, controlla la descrizione dello studio nel menu "Gestisci studi".',
    principalInvestigators: 'Ricercatori principali',
    investigatorName: 'Nome',
    institution: 'Istituzione',
    institutions: 'Istituzioni coinvolte',
    contact: 'Contatti',
    studyDetails: 'Dettagli dello studio',
    studyTitle: 'Titolo dello studio',
    dataAccess: {
      anonymised: 'Questa istituzione accederà ai tuoi dati in forma anonima',
      noAccess: 'Questa istituzione non accederà ai tuoi dati',
      full: 'Questa istituzione accederà ai tuoi dati',
      reason: 'Motivo dell\'accesso ai dati'
    },
    scheduling: {
      due: 'Compito Mobistudy in scadenza!',
      start: 'Tocca qui per iniziare il compito'
    },
    tasks: {
      cancelTask: 'Questa azione terminerà il compito corrente e verrai reindirizzato alla pagina iniziale. Nessun dato verrà salvato. Vuoi davvero uscire?',
      noPendingTasks: 'Nessun compito in sospeso',
      cancelTaskLabel: 'Annulla',
      quitTaskLabel: 'Esci dal compito',
      pendingTasks: 'Compiti in sospeso per oggi',
      missedTasks: 'Compiti mancati',
      alwaysOnTasks: 'Compiti sempre disponibili',
      noMissedTasks: 'Nessun compito mancato',
      instructionsNote: 'Leggi attentamente le istruzioni. L\'accuratezza del test dipende dal rispetto delle indicazioni fornite.',
      capTestComplete: 'Congratulazioni!',
      capTestCompleteSubtext: 'Hai completato il test!',
      taskCompleted: 'Il compito è stato completato e il risultato è stato inviato al server. Grazie!',
      due: 'Scadenza',
      daysAgo: 'ieri | {count} giorni fa',
      hoursAgo: '1 ora fa | {count} ore fa',
      minsAgo: '1 minuto fa | {count} minuti fa'
    },
    consent: {
      itemsExplanation: 'Puoi attivare o disattivare queste opzioni quando vuoi',
      OSpermission: 'Questa opzione richiede che l\'app acceda ad alcune funzionalità del telefono.',
      giveOSPermission: 'Concedi i permessi a questa app',
      OSPermissionGivenSeeking: 'Richiesta di permesso in corso',
      OSPermissionGiven: 'Permesso concesso',
      OSPermissionNotGiven: 'Impossibile ottenere il permesso',
      remindersConsent: 'Voglio ricevere promemoria riguardo ai compiti di questo studio',
      giveRemindersOSPermission: 'Consenti i promemoria',
      informedConsent: 'Consenso informato',
      consentExplanation: 'Presta il consenso ai seguenti elementi per partecipare allo studio. Non è necessario acconsentire a tutti, tuttavia alcuni potrebbero essere obbligatori per aderire. Alcuni elementi potrebbero richiedere l\'accesso alle funzioni del telefono.',
      consentAll: 'Acconsenti a tutti gli elementi',
      updateConsent: 'Aggiorna consenso',
      consentUpdated: 'Consenso aggiornato',
      joinStudy: 'Partecipa allo studio',
      accepted: 'Hai appena aderito',
      contactReminder: 'Ricorda, se hai bisogno puoi sempre contattare i ricercatori principali a:',
      withdraw: 'Ritirati',
      withdrawalConfirm: 'Sei sicuro di voler ritirarti da questo studio? Se sì, specifica il motivo'
    }
  }
}

studies.studies.tasks.form = formTask
studies.studies.tasks.smwt = smwtTask
studies.studies.tasks.qcst = qcstTask
studies.studies.tasks.miband3 = miband3Task
studies.studies.tasks.dataQuery = dataQueryTask
studies.studies.tasks.po60 = po60Task
studies.studies.tasks.position = positionTask
studies.studies.tasks.peakflow = peakflowTask
studies.studies.tasks.fingerTapping = fingerTappingTask
studies.studies.tasks.tugt = tugtTask
studies.studies.tasks.holdPhone = holdphoneTask
studies.studies.tasks.vocalization = vocalizationTask
studies.studies.tasks.drawing = drawingTask

export default studies
