export default {
  common: {
    next: 'Next',
    cancel: 'Cancel',
    accept: 'Accept',
    email: 'Email'
  },
  layoutPages: {
    consent: {
      headline: 'New study'
    },
    home: {
      headline: 'Mobistudy'
    },
    registration: {
      headline: 'Register'
    },
    task: {
      headline: 'Task'
    }
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
    login: {
      login: 'Login',
      password: 'Password',
      register: 'Register',
      lostpw: 'Lost Password',
      noAcc: 'No account yet? Register in 3 steps!'
    },
    resetPassword: {
      resetPassword: 'Reset Password',
      newPassword: 'New password',
      emailPlaceholder: 'e.g. email@email.com',
      emailError: 'An email address is required.',
      newPasswordExplanation: "If you're registered in the system, you should receive an email shortly. Please copy/paste the token from your email to this form. If you change your password on the Mobistudy web page instead, then tap on Cancel and login with your new password.",
      token: 'Token',
      tokenHint: 'As received on your email.',
      tokenError: 'A token is required.',
      newPw: 'New Password',
      confPw: 'Confirm Password',
      pwdMustMatch: 'Passwords do not match',
      changePw: 'Change Password'
    },
    privacy: {
      headline: 'Privacy Policy',
      buttonCancel: 'Cancel',
      buttonNext: 'Accept'
    },
    profile: {
      headline: 'Create Profile',
      firstName: 'First Name',
      firstNameError: 'First Name required',
      surname: 'Surname',
      surnameError: 'Surname required',
      sex: 'Sex',
      sexError: 'Required',
      dateOfBirth: 'Date of Birth',
      dateOfBirthError: 'Required',
      conditions: 'Conditions',
      conditionsHint: 'Do you suffer from any long-term medical condition?',
      medications: 'Medications',
      medicationsHint: 'Are you on any long-term medication?',
      smoke: 'Do you smoke?',
      lifestyle: 'Do you have an active lifestyle?',
      buttonNext: 'Next'
    },
    signUp: {
      headline: 'Sign up',
      email: 'Email',
      emailError: 'Please type a valid email',
      password: 'Password',
      confirmPW: 'Confirm Password',
      confirmPWError: 'Passwords must match',
      buttonCancel: 'Cancel',
      buttonNext: 'Create Account'
    },
    tAndC: {
      headline: 'Terms and Condtions',
      tAndCText: `This app is meant to be used only by citizens of the United Kingdom and Sweden.
The user of this app must be able to read and understand English or Swedish.`,
      buttonCancel: 'Cancel',
      buttonNext: 'Accept'
    }
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
    about: {
      headline: 'About',
      introHeadline: 'Introduction',
      introText: 'Mobistudy is an open iniative that allows citizens to help health research with their data. Participants download an app (iOS or Android) and, after registering and filling-in a short profile, they are proposed with research studies. If they find a study they may be interested in, they are guided through an easy-to-understand informed consent process. Upon acceptance, participants are then proposed "tasks", such as filling forms and questionnaires and provide their health data through Google Fit or Apple HealthKit.',
      managedByText: 'Mobistudy is currently managed by the Internet Of Things and People research center, Malmö University.',
      tAndCHeadline: 'Terms and Conditions',
      tAndCText: 'This is an alpha version of Mobistudy and is meant to be used for technical testing only. Please do not use this app unless you are a member of the development team of Mobistudy.',
      privacyHeadline: 'Privacy policy'
    },
    form: {
      buttonStart: 'Start',
      freeTextLabel: 'Type your answer',
      buttonBack: 'Back',
      buttonNext: 'Next',
      completedText: 'Form completed. Thank you.',
      buttonSend: 'Send'
    },
    profile: {
      headline: 'Your profile',
      firstNameLabel: 'First Name',
      firstNameError: 'First Name required',
      surnameLabel: 'Surname',
      surnameError: 'Surname required',
      sexLabel: 'Sex',
      sexError: 'Required',
      dateOfBirthLabel: 'Date of Birth',
      dateOfBirthError: 'Required',
      dateOfBirthTitle: 'Date of Birth',
      buttonUpdate: 'Update',
      buttonCancel: 'Cancel',
      changePwHeadline: 'Change your Password',
      changePwText: "To change your password you'll get a mail with a verification token, enter the token on the next screen and choose a new password.",
      buttonChangePw: 'Change Password',
      logoutHeadline: 'Logout',
      logoutText: "You can temporarily logout of your Mobistudy App, please take note, that Mobistudy won't collect any data while you are logged out and thus won't submit any data to the studies you are participating in.",
      buttonLogout: 'Logout',
      deleteHeadline: 'Delete your Account',
      deleteText: "You can permanently delete your account, Mobistudy won't ever collect anymore data if you don't create a new account.",
      buttonDelete: 'Delete Account'
    },
    studies: {
      headline: 'You are invited to join',
      questionsHeadline: 'Answer the following to know if you are eligible',
      questionYes: 'Yes',
      questionNo: 'No',
      notEligible: 'You are not eligible for this study',
      buttonJoin: 'Join',
      buttonDiscard: 'Discard',
      activeStudies: 'Active studies',
      noActiveStudies: 'No active studies found.',
      previousStudies: 'Previous studies'
    },
    studyConfig: {
      tabs: {
        info: {
          title: 'Info',
          investigatorListHeadline: 'Principal investigators',
          name: 'Name',
          institution: 'Institution',
          contact: 'Contact details'
        },
        privacy: {
          title: 'Privacy'
        },
        consent: {
          title: 'Consent',
          subtitle: 'You can opt-in or opt-out of these items whenever you want',
          permissionsText: 'This item requires the app to access some functionalities on the phone.',
          buttonPermissions: 'Give permission to this app',
          remindersText: 'I want to receive reminders about the tasks of this study',
          remindersText2: 'You need to allow the app to send reminders.',
          buttonReminders: 'Allow reminders',
          buttonUpdate: 'Update consent',
          buttonWithdraw: 'Withdraw from the study'
        }
      }
    },
    tasker: {
      newStudy: 'New study available',
      buttonNewStudy: 'Check it',
      noStudies: 'You are currently not participating in any study.',
      tasksHeadline: "Today's pending tasks",
      noTasks: 'No tasks pending',
      pastDayMissedTasks: 'Past days missed tasks',
      noTasksMissed: 'No tasks missed',
      studyCompletedHeadline: 'You have completed a study',
      studyCompletedText: 'You have completed all the tasks for the',
      studyCompletedThanks: 'Thanks very much for this',
      studyCompletedReminder: 'Please, be aware that some studies may require some further action, check the study description in the "Manage Studies" menu.',
      buttonCloseStudyCompleted: 'Close'
    }
  },
  error404: {},
  failed: 'Action failed',
  success: 'Action was successful',
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
