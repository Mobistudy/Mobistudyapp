'use strict'

export default {
  email: 'Email',
  emailRequiredError: 'Email addressen är inte giltig.',
  password: 'Lösenord',
  passwordRequiredError: 'Lösenordet är inte giltigt',
  confirmPassword: 'Bekräfta lösenordet',
  confirmPasswordError: 'Lösenorden måste matcha',
  register: 'Registrera',
  deleteAccount: 'Ta bort konto',
  deleteShort: 'Du kan ta bort ditt konto permanent, Mobistudy kommer inte fortsätta samla data om du inte installerar appen igen.',
  login: {
    login: 'Logga in',
    logout: 'Logga ut',
    logoutConfirmation: 'Är du säker på att du vill logga ut?',
    logoutShort: 'Om du loggar ut från Mobistudy så kommer ingen data att samlas.',
    lostpw: 'Glömt lösenord?',
    noAcc: 'Inget konto ännu? Registrera med 3 steg!',
    loginError: 'Kan inte logga in',
    loginErrorCredentials: 'Kan inte logga in, fel inloggnings information.'
  },
  resetPassword: {
    resetPassword: 'Återställ lösenordet',
    resetPasswordError: 'Kan inte återställa lösenordet',
    newPassword: 'Nytt lösenord',
    resetPasswordShort: 'När du ändrar ditt lösenord kommer du att få ett mail med en återställningskod, skriv in koden på nästa skärm och välj ett nytt lösenord. Varning! det här kommer också att logga ut dig.',
    newPasswordExplanation: 'Om du är registrerad i systemet, borde du snart få ett email. Var god att kopiera och klistra in återställningskoden från emailet i det här formuläret. Om du har bytat lösenordet på Mobistudys hemsida istället, tryck då på avbryt och logga in med ditt nya lösenord istället.',
    token: 'Återställningskod',
    tokenHint: 'Mottagen i din email.',
    tokenError: 'Återställningskod krävs.',
    confirmPwd: 'Bekräftsa lösenordet',
    pwdMustMatch: 'Lösenordet matchar inte',
    changePassword: 'Byta lösenord',
    changePasswordError: 'Kan inte byta lösenord',
    passwordChanged: 'Nytt lösenord bekräftat',
    passwordChangedExplanation: 'Nu kan du logga in med ditt nya lösenord.'
  },
  registration: {
    signUp: 'Registrera',
    createAccount: 'Skapa konto',
    createProfile: 'Skapa profil',
    privacyPolicy: 'Integritetspolicy',
    registrationError: 'Registrering misslyckades',
    registrationErrorUserExists: 'Användare existerar redan',
    registrationErrorWrongEmail: 'E-postadressen kan inte verifieras'
  },
  profile: {
    profile: 'Profil',
    firstName: 'Förnamn',
    firstNameError: 'Förnamn krävs.',
    surname: 'Efternamn',
    surnameError: 'Efternamn krävs.',
    language: 'Språk',
    languageError: 'Språk krävs.',
    languages: {
      en: 'English',
      sv: 'Swedish'
    },
    country: 'Land',
    countryError: 'Land krävs.',
    countries: {
      gb: 'United Kingdom',
      se: 'Sweden'
    },
    sex: 'Kön',
    sexes: {
      male: 'Man',
      female: 'Kvinna',
      other: 'Annat'
    },
    sexError: 'Var god och välj ett alternativ.',
    dateOfBirth: 'Födelsedatum',
    dateOfBirthError: 'Födelsedatum krävs.',
    weight: 'Vikt (kg)',
    weightError: 'Vikten måste vara en positiv siffra',
    height: 'Längd (cm)',
    heightError: 'Längden måste vara en positiv siffra',
    conditions: 'Långtidsproblem',
    conditionsSearch: 'Skriv ett ord för att söka efter problem',
    conditionSearchError: 'Kan inte hitta sjukdom',
    noResults: 'Inga resultat',
    medications: 'Långtidsmediciner',
    medicationSearchError: 'Kan inte hitta medicin',
    studiesSuggestions: 'Föreslå nya studier som matchar min profil'
  }
}
