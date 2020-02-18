export default {
  errors: {
    generalError: 'The app is experiencing an unexpected error, please make sure that you have an Internet connection and retry.',
    connectionError: 'Cannot contact server',
    correctFields: 'Please correct the indicated fields'
  },
  common: {
    next: 'Next',
    cancel: 'Cancel',
    accept: 'Accept',
    close: 'Close',
    update: 'Update',
    delete: 'Delete',
    yes: 'Yes',
    no: 'No',
    info: 'Info',
    privacy: 'Privacy',
    consent: 'Consent'
  },
  layouts: {
    consent: 'New study',
    home: 'Mobistudy',
    registration: 'Register',
    task: 'Task'
  },
  passwordCheck: {
    ok: 'All OK',
    tooShort: 'Password is too short.',
    tooSimple: 'The password is too simple.',
    noEmail: 'Password cannot contain email.',
    minChars: 'Password must contain at least {minLength} characters.',
    maxChars: 'Password must contain less than {maxLength} characters.',
    noRepeat: 'Password may not contain sequences of three or more repeated characters.',
    lowerCase: 'The password must contain at least one lowercase letter.',
    upperCase: 'The password must contain at least one uppercase letter.',
    number: 'The password must contain at least one number',
    specialChar: 'The password must contain at least one special character.',
    noKeysRow: 'Straight rows of keys are easy to guess.',
    noShortPattern: 'Short keyboard patterns are easy to guess.',
    noRepeat2: 'Repeats like "aaa" are easy to guess.',
    noRepeat3: 'Repeats like "abcabcabc" are only slightly harder to guess than "abc".',
    noSequence: 'Sequences like abc or 6543 are easy to guess.',
    noRecentYear: 'Recent years are easy to guess.',
    noDate: 'Dates are often easy to guess.',
    noTop10: 'This is a top-10 common password.',
    noTop100: 'This is a top-100 common password.',
    noCommonPwd: 'This is a very common password.',
    noCommonPwdSimilar: 'This is similar to a commonly used password.',
    no1Word: 'A word by itself is easy to guess.',
    noNames: 'Names and surnames by themselves are easy to guess.'
  },
  accountMgmt: {
    email: 'Email',
    emailRequiredError: 'A valid email address is required.',
    password: 'Password',
    passwordRequiredError: 'Password is required',
    confirmPassword: 'Confirm Password',
    confirmPasswordError: 'Passwords must match',
    register: 'Register',
    deleteAccount: 'Delete Account',
    deleteShort: "You can permanently delete your account, Mobistudy won't ever collect anymore data unless you create a new account.",
    login: {
      login: 'Login',
      logout: 'Logout',
      logoutShort: 'If you logout from the Mobistudy App no data will be collected.',
      lostpw: 'Lost Password',
      noAcc: 'No account yet? Register in 3 steps!',
      loginError: 'Cannot login',
      loginErrorCredentials: 'Cannot login, wrong credentials.'
    },
    resetPassword: {
      resetPassword: 'Reset Password',
      resetPasswordError: 'Cannot reset password',
      newPassword: 'New password',
      resetPasswordShort: "To change your password you'll get a mail with a verification token, enter the token on the next screen and choose a new password. Warning! this will also log you out.",
      newPasswordExplanation: 'If you\'re registered in the system, you should receive an email shortly. Please copy/paste the token from your email onto this form. If you change your password on the Mobistudy web page instead, then tap on cancel and login with your new password.',
      token: 'Token',
      tokenHint: 'As received on your email.',
      tokenError: 'A token is required.',
      confirmPwd: 'Confirm Password',
      pwdMustMatch: 'Passwords do not match',
      changePassword: 'Change Password',
      changePasswordError: 'Cannot change password',
      passwordChanged: 'New password set',
      passwordChangedExplanation: 'Now you can login with your new password.'
    },
    registration: {
      signUp: 'Sign up',
      termsAndConditions: 'Terms and Condtions',
      createAccount: 'Create Account',
      createProfile: 'Create Profile',
      privacyPolicy: 'Privacy Policy',
      registrationError: 'Registration failed',
      registrationErrorUserExists: 'User already exists'
    },
    profile: {
      profile: 'Profile',
      firstName: 'First Name',
      firstNameError: 'First name is required.',
      surname: 'Surname',
      surnameError: 'Surname is required.',
      language: 'Language',
      languageError: 'Language is required.',
      languages: {
        en: 'English',
        sv: 'Swedish'
      },
      country: 'Country',
      countryError: 'Country is required.',
      countries: {
        gb: 'United Kingdom',
        se: 'Sweden'
      },
      sex: 'Sex',
      sexes: {
        male: 'Male',
        female: 'Female',
        other: 'Other'
      },
      sexError: 'Please select one option.',
      dateOfBirth: 'Date of Birth',
      dateOfBirthError: 'Date of birth is required',
      conditions: 'Long-term conditions',
      conditionsSearch: 'Type a word to search for a condition',
      conditionSearchError: 'Cannot find disease',
      noResults: 'No results',
      medications: 'Long-term medications',
      medicationSearchError: 'Cannot find medication',
      smoke: 'Do you smoke?',
      lifestyle: 'Do you have an active lifestyle?'
    }
  },
  studies: {
    newStudy: 'New study available',
    checkNewStusy: 'Check it',
    newStudyInvite: 'You are invited to a new study!',
    newStudyExtraCriteria: 'Answer the following to know if you are eligible',
    notEligible: 'You are not eligible for this study',
    noStudies: 'You are currently not participating in any study.',
    joinStudy: 'Join',
    discardStudy: 'Discard',
    activeStudies: 'Active studies',
    noActiveStudies: 'No active studies found.',
    previousStudies: 'Previous studies',
    studyCompletedHeadline: 'You have completed a study',
    studyCompletedText: 'You have completed all the tasks for the {studyname}.<br><br>Thanks very much for this!<br><br>Please, be aware that some studies may require some further action, check the study description in the "Manage Studies" menu.',
    principalInvestigators: 'Principal investigators',
    investigatorName: 'Name',
    institution: 'Institution',
    contact: 'Contact details',
    tasks: {
      noPendingTasks: 'No tasks pending',
      pendingTasks: "Today's pending tasks",
      missedTasks: 'Missed tasks',
      noMissedTasks: 'No tasks missed',
      dataQuery: {
        title: 'Data query',
        shortDescription: 'Extract data from your phone'
      },
      form: {
        title: '{formname} form',
        shortDescription: 'Answer a few questions'
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
      updateConsent: 'Update consent',
      consentUpdated: 'Consent updated',
      withdraw: 'Withdraw from the study'
    }
  },
  info: {
    about: 'About',
    introduction: 'Introduction',
    introductionFull: `Mobistudy is an open iniative that allows citizens to help \
    health research with their data. Participants download an app (iOS or Android) \
    and, after registering and filling-in a short profile, they are proposed with \
    research studies. If they find a study they may be interested in, they are \
    guided through an easy-to-understand informed consent process. Upon acceptance, \
    participants are then proposed "tasks", such as filling forms and questionnaires \
    and provide their health data through Google Fit or Apple HealthKit.<br><br>
    Mobistudy is currently managed by the Internet Of Things and People research\
    center, Malmö University.`
  },
  consent: {
    accepted: {
      joined: "You've just joined",
      reminder: 'Remember, you can always contact the principal investigators at:',
      name: 'Name:',
      institution: 'Institution:',
      contact: 'Contact details:',
      buttonNext: 'Next'
    },
    consentItems: {
      headline: 'Consent to these items',
      buttonPermissions: 'Give permission to this app',
      remindersText: 'I want to receive reminders about the tasks of this study',
      remindersText2: 'You need to allow the app to send reminders.',
      buttonReminders: 'Allow reminders',
      buttonBack: 'Deny',
      buttonNext: 'Join the study'
    },
    invitation: {
      buttonNext: 'Next'
    },
    privacy: {
      headline: 'Privacy Policy',
      buttonBack: 'Deny',
      buttonNext: 'Accept'
    },
    studyDetails: {
      headline: 'Study details',
      studyHeadline: 'Title of this study',
      investigatorListHeadline: 'Principle investigators',
      name: 'Name',
      institution: 'Institution',
      contact: 'Contact details',
      involvedInstitutions: 'Involved institutions',
      institutionName: 'Name',
      institutionContact: 'Contact details',
      dataAccess: {
        anonymised: 'This institution will have access to your data in an anonymised way.',
        no: 'This institution will not have access to your data.',
        full: 'This institution will have full access to your data.',
        reasonHeadline: 'Reason For Data Access'
      },
      buttonNext: 'Next'
    }
  },
  home: {
    form: {
      buttonStart: 'Start',
      freeTextLabel: 'Type your answer',
      buttonBack: 'Back',
      buttonNext: 'Next',
      completedText: 'Form completed. Thank you.',
      buttonSend: 'Send'
    }
  },
  healthDataTypes: {
    steps: 'steps',
    weight: 'weight',
    height: 'height',
    activity: 'activity',
    heart_rate: 'heart rate',
    heart_rate_variability: 'heart rate variability',
    calories: 'calories',
    distance: 'distance'
  }
}
