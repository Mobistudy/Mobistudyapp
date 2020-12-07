import { mergeDeep } from 'modules/tools'
import acMgmtEn from './accountMgmt'
import studiesEn from './studies'
import ppEn from './privacyPolicy'
import tcEn from './termsAndConditions'

let en = {
  errors: {
    error: 'Error',
    generalError: 'The app is experiencing an unexpected error, please make sure that you have an Internet connection and retry.',
    connectionError: 'Cannot contact server',
    correctFields: 'Please correct the indicated fields'
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
    info: 'Info',
    privacy: 'Privacy',
    consent: 'Consent',
    retry: 'Retry',
    start: 'Start',
    complete: 'Complete',
    send: 'Send',
    back: 'Back',
    introduction: 'Introduction',
    instructions: 'Instructions'
  },
  layouts: {
    consent: 'New study',
    home: 'Mobistudy',
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
  about: {
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
    center, Malmö University.`,
    privacyPolicy: 'Privacy Policy',
    acknowledgements: 'Acknowledgements',
    acknowledgementsFull: `A lot of acknowledgement text... \
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute \
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f`,
    contact: 'Contact',
    contactEmail: 'notArealEmail@notreal.com'
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

en = mergeDeep(en, acMgmtEn)
en = mergeDeep(en, studiesEn)
en = mergeDeep(en, ppEn)
en = mergeDeep(en, tcEn)

export default en
