'use strict'

import { mergeDeep } from 'modules/tools'
import smwtTask from './tasks/smwt'
import qcstTask from './tasks/qcst'

let studies = {
  studies: {
    newStudy: 'New study available',
    checkNewStusy: 'Check it',
    newStudyInvite: 'You are invited to a new study!',
    newStudyExtraCriteria: 'Answer the following to know if you are eligible',
    notEligible: 'You are not eligible for this study',
    foundNoStudies: 'Found no eligible studies',
    searchingForStudies: 'Searching for new studies',
    noStudies: 'You are currently not participating in any study.',
    joinStudy: 'Join',
    discardStudy: 'Discard',
    discardStudyConfirm: 'Are you sure you want to discard this study?',
    privacyPolicy: 'Privacy Policy',
    activeStudies: 'Active studies',
    noActiveStudies: 'No active studies found.',
    previousStudies: 'Previous studies',
    studyCompletedHeadline: 'You have completed a study',
    studyCompletedText: 'You have completed all the tasks for the {studyname}.<br><br>Thanks very much for this!<br><br>Please, be aware that some studies may require some further action, check the study description in the "Manage Studies" menu.',
    principalInvestigators: 'Principal investigators',
    investigatorName: 'Name',
    institution: 'Institution',
    institutions: 'Involved institutions',
    contact: 'Contact details',
    studyDetails: 'Study details',
    studyTitle: 'Study title',
    dataAccess: {
      anonymised: 'This institution will access your data in an anonymised way',
      noAccess: 'This institution will not access your data',
      full: 'This institution will access your data',
      reason: 'Reason for data access'
    },
    scheduling: {
      due: 'Mobistudy task due!',
      start: 'Tap here to start the task'
    },
    tasks: {
      cancelTask: 'This will terminate the current task and you will be redirected to the start page. No data will be saved. Do you really want to quit?',
      noPendingTasks: 'No tasks pending',
      pendingTasks: "Today's pending tasks",
      missedTasks: 'Missed tasks',
      noMissedTasks: 'No tasks missed',
      instructionsNote: 'Please read the instructions carefully. The accuracy of the test depends on the instructions being followed as closely as possible.',
      capTestComplete: 'Congratulations!',
      capTestCompleteSubtext: 'You completed the test!',
      taskCompleted: 'The task has been completed and the result has been sent to the server. Thank you!',
      dataQuery: {
        title: 'Data query',
        shortDescription: 'Extract data from your phone',
        dataQueryExplanation: 'This data has been extracted from your phone. If you agree to send it, tap on Send.'
      },
      form: {
        title: '{formname} form',
        shortDescription: 'Answer a few questions',
        formCompleted: 'Form completed. Thank you.',
        freeTextExplanation: 'Type your answer'
      }
    },
    consent: {
      itemsExplanation: 'You can opt-in or opt-out of these items whenever you want',
      OSpermission: 'This item requires the app to access some functionalities on the phone.',
      giveOSPermission: 'Give permission to this app',
      OSPermissionGiven: 'Permission given',
      OSPermissionNotGiven: 'Could not get permission',
      remindersConsent: 'I want to receive reminders about the tasks of this study',
      remindersOSPermission: 'You need to allow the app to send reminders.',
      giveRemindersOSPermission: 'Allow reminders',
      informedConsent: 'Informed consent',
      consentExplanation: 'Consent to the following items to join the study. You do not have to consent to all of them, however some items may be required to join the study. When an item requires access to the phone\'s functions, you can tap the button to grant access to this app.',
      updateConsent: 'Update consent',
      consentUpdated: 'Consent updated',
      withdraw: 'Withdraw from the study',
      joinStudy: 'Join study',
      accepted: 'You have just joined',
      contactReminder: 'Remember, if you need to, you can always contact the principal investigators at:'
    }
  }
}

studies = mergeDeep(studies, smwtTask)
studies = mergeDeep(studies, qcstTask)

export default studies
