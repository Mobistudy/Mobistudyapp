export default {
  generalError: 'The app is experiencing an unexpected error, please make sure that you have an Internet connection and retry.',
  common: {
    next: 'Next',
    cancel: 'Cancel',
    accept: 'Accept',
    close: 'Close',
    update: 'Update',
    delete: 'Delete'
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
      noAcc: 'No account yet? Register in 3 steps!'
    },
    resetPassword: {
      resetPassword: 'Reset Password',
      newPassword: 'New password',
      resetPasswordShort: "To change your password you'll get a mail with a verification token, enter the token on the next screen and choose a new password. Warning! this will also log you out.",
      newPasswordExplanation: 'If you\'re registered in the system, you should receive an email shortly. Please copy/paste the token from your email onto this form. If you change your password on the Mobistudy web page instead, then tap on cancel and login with your new password.',
      token: 'Token',
      tokenHint: 'As received on your email.',
      tokenError: 'A token is required.',
      newPw: 'New Password',
      confPw: 'Confirm Password',
      pwdMustMatch: 'Passwords do not match',
      changePw: 'Change Password'
    },
    registration: {
      signUp: 'Sign up',
      termsAndConditions: 'Terms and Condtions',
      createAccount: 'Create Account',
      createProfile: 'Create Profile',
      termsAndConditionsFull: `This app is meant to be used only by citizens of the United Kingdom and Sweden.
The user of this app must be able to read and understand English or Swedish.`,
      privacyPolicy: 'Privacy Policy',
      privacyPolicyFull: `<p>
            If you download Mobistudy to your phone, the app will collect the following information
            from you, regardless of whether you have joined any research study or not:
            <ul>
              <li>
                Your email address.
                This is needed to identify you, allow you to login and to recover your password.
              </li>
              <li>
                Your date of birth.
                This is needed to match your profile with the inclusion criteria of available studies.
              </li>
              <li>
                Your gender.
                This is also needed to match your profile with the inclusion criteria of available studies.
              </li>
              <li>
                Technical logs indicating the time you have accessed the system and what data you have sent.
                These are needed for security reasons and will be kept for 1 year in all circumstances, also if you decide to delete your account.
              </li>
            </ul>
          </p>
          <p>
            These data will be securely transferred (via HTTPS) and stored on a server
            hosted and managed by the University of Oxford. Personnel from the University
            of Oxford may access the server and your data for technical maintenance, but
            will not download or analyse any of these data.
          </p>
          <p>
            We use Gmail for managing the emails sent by Mobistudy.
            This means that your email address, together with the content of the email sent
            by us will be managed by Google according to their Privacy Policy (https://policies.google.com/privacy?hl=en-US).
          </p>
          <p>
            If you decide to join a research study, further study-specific conditions will
            apply, which will be clearly shown to you when consenting to participate in the study.
          </p>
          <p>
            Under no circumstances other than the ones specified above, will your data be shared with other parties or individuals.
          </p>
          <p>
            You can remove your profile from Mobistudy whenever you want. This will remove all your data, except the technical logs.
          </p>
          <p>
            You can download the data in a machine-readable format. Contact carmelo.velardo@eng.ox.ac.uk if you need to.
          </p>
          <p>
            All your data will be removed after 3 years from your registration or from the
            end of any study you joined while using the Mobistudy app, whichever is the latest.
          </p>`
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
      noResults: 'No results',
      medications: 'Long-term medications',
      smoke: 'Do you smoke?',
      lifestyle: 'Do you have an active lifestyle?'
    }
  },
  studies: {
    newStudy: 'New study available',
    checkNewStusy: 'Check it',
    noStudies: 'You are currently not participating in any study.',
    studyCompletedHeadline: 'You have completed a study',
    studyCompletedText: 'You have completed all the tasks for the {studyname}.<br><br>Thanks very much for this!<br><br>Please, be aware that some studies may require some further action, check the study description in the "Manage Studies" menu.',
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
    }
  },
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