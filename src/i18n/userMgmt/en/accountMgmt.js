'use strict'

export default {
  email: 'Email',
  emailRequiredError: 'A valid email address is required',
  password: 'Password',
  passwordRequiredError: 'Password is required',
  confirmPassword: 'Confirm Password',
  confirmPasswordError: 'Passwords must match',
  server: 'Institution',
  serverRequiredError: 'An institution must be specified',
  participantOnly: 'You can only login as participant in this app!',
  register: 'Register',
  deleteAccount: 'Delete Account',
  deleteShort: "You can permanently delete your account, Mobistudy won't ever collect anymore data unless you create a new account.",
  deleteWarning: 'Deleting your account will delete all the data permanently for all studies. Are you sure you want to continue?',
  login: {
    login: 'Login',
    logout: 'Logout',
    logoutConfirmation: 'Are you sure you want to logout?',
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
    createAccount: 'Create Account',
    createProfile: 'Create Profile',
    privacyPolicy: 'Privacy Policy',
    registrationError: 'Registration failed',
    registrationErrorUserExists: 'User already exists',
    registrationErrorWrongEmail: 'Email address cannot be verified'
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
      sv: 'Swedish',
      es: 'Spanish',
      it: 'Italian'
    },
    country: 'Country',
    countryError: 'Country is required.',
    countries: {
      gb: 'United Kingdom',
      se: 'Sweden',
      es: 'Spain',
      it: 'Italy'
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
    weight: 'Weight (kg)',
    weightError: 'Weight must be a positive number',
    height: 'Height (cm)',
    heightError: 'Height must be a positive number',
    conditions: 'Long-term conditions',
    conditionsSearch: 'Type a word to search for a condition',
    conditionSearchError: 'Cannot find disease',
    noResults: 'No results',
    medications: 'Long-term medications',
    medicationSearchError: 'Cannot find medication',
    studiesSuggestions: 'Suggest new studies that match my profile'
  }
}
