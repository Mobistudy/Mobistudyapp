import { mergeDeep } from '../../modules/tools.mjs'
import acMgmtEn from './accountMgmt.mjs'
import studiesEn from './studies.mjs'
<<<<<<< HEAD
import ppEn from './privacyPolicy.mjs'
=======
import aboutEn from './about/about.mjs'
import privacyPolicyFull from './privacyPolicy'
>>>>>>> f2fbe2881635f15bf6abe1da6e176ec3f99ff74f

let en = {
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
    clear: 'Clear answer',
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
  healthDataTypes: {
    steps: 'steps',
    weight: 'weight',
    height: 'height',
    activity: 'activity',
    heart_rate: 'heart rate',
    heart_rate_variability: 'heart rate variability',
    calories: 'calories',
    distance: 'distance'
  },
  pin: {
    pinNotSetTitle: 'Your phone is not protected',
    pinNotSet: 'In order for this app to work correctly, your phone must be protected with a pin code or equivalent. Please, configure a locking mechanism and restart this app. Please be aware that setting the pincode and then removing it may corrupt the app and force you to restart it.',
    dbCorruptedTitle: 'Oops!',
    dbCorrupted: 'Removing the pin protection makes the apps secure storage unusable. Please, set the pin protection back and restart the app.'
  },
  privacyPolicyFull
}

en = mergeDeep(en, acMgmtEn)
en = mergeDeep(en, studiesEn)
<<<<<<< HEAD
en = mergeDeep(en, ppEn)
=======
en.about = aboutEn
>>>>>>> f2fbe2881635f15bf6abe1da6e176ec3f99ff74f

export default en
