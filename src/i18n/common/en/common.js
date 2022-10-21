export default {
  errors: {
    error: 'Error',
    generalError: 'The app is experiencing an unexpected error, please make sure that you have an Internet connection and retry.',
    connectionError: 'Cannot contact server',
    correctFields: 'Please correct the indicated fields',
    invitationalStudyNotFound: 'Study was not found.',
    invitationalStudyAlreadyAdded: 'You have already added this invitational study.',
    invitationalStudyAlreadyParticipated: 'You have already participated in this invitational study.'
  },
  common: {
    next: 'Next',
    cancel: 'Cancel',
    accept: 'Accept',
    reject: 'Reject',
    close: 'Close',
    update: 'Update',
    delete: 'Delete',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    info: 'Info',
    privacy: 'Privacy',
    consent: 'Consent',
    retry: 'Retry',
    start: 'Start',
    complete: 'Complete',
    redo: 'Redo',
    send: 'Send',
    discard: 'Discard',
    skip: 'Skip',
    back: 'Back',
    introduction: 'Introduction',
    instructions: 'Instructions',
    prerequisites: 'Prerequisites',
    warning: 'Warning'
  },
  layouts: {
    consent: 'New study',
    home: 'Home',
    registration: 'Register',
    task: 'Task',
    close: 'Close',
    about: 'About',
    homeMenu: {
      dailyTasks: 'Tasks',
      dailyTasksAction: 'See upcoming tasks',
      profile: 'Profile',
      profileAction: 'Edit your profile',
      studies: 'Studies',
      studiesAction: 'Add or withdraw from studies',
      about: 'About',
      aboutAction: 'About Mobistudy'
    }
  },
  pin: {
    pinNotSetTitle: 'Your phone is not protected',
    pinNotSet: `In order for this app to work correctly, your phone must be protected with a pin code or equivalent.
    Please, configure a locking mechanism and restart this app.
    Please be aware that setting the pincode and then removing it may corrupt the app's secure storage and force you to restart it.`,
    dbCorruptedTitle: 'Oops!',
    dbCorrupted: `Removing the pin protection makes the app's secure storage unusable.
    Please, set the pin protection back and restart the app.`
  }
}
