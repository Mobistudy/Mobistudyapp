// This is just an example,
// so you can safely delete all default props below

export default {
  layoutPages: {
    consent: {},
    home: {},
    registration: {},
    task: {}
  },
  accountMgmt: {
    changePw: {
      hint: "If you're registered in the system, you should receive an email shortly. Please copy/paste the token from your email to this form. If you fill the form and change your password on the Mobistudy web page, please tap on Cancel.",
      token: 'Token',
      tokenHint: 'As received on your email.',
      tokenError: 'A token is required.',
      newPw: 'New Password',
      confPw: 'Confirm Password',
      pwError: 'Passwords do not match',
      cancel: 'Cancel',
      changePw: 'Change Password'
    },
    loginPage: {
      login: 'Login',
      email: 'Email',
      password: 'Password',
      register: 'Register',
      lostpw: 'Lost Password',
      noAcc: 'No account yet? Register in 3 steps!'
    },
    privacy: {
      privacyPol: 'Privacy Policy'
    },
    profile: {},
    signUp: {},
    tAndC: {},
    register: {},
    resetPw: {}
  },
  consent: {
    accepted: {},
    consentItems: {},
    invitation: {},
    privacy: {},
    studyDetails: {}
  },
  home: {
    about: {},
    dataQuery: {},
    form: {},
    profile: {},
    studies: {},
    studyConfig: {},
    tasker: {}
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
