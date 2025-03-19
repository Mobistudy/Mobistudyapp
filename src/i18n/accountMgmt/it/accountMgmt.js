'use strict'

export default {
  email: 'Email',
  emailRequiredError: 'È richiesta un\'email valida.',
  password: 'Password',
  passwordRequiredError: 'La password è obbligatoria.',
  confirmPassword: 'Conferma Password',
  confirmPasswordError: 'Le password devono coincidere.',
  register: 'Registrati',
  deleteAccount: 'Elimina Account',
  deleteShort: 'Puoi eliminare definitivamente il tuo account, Mobistudy non raccoglierà più alcun dato a meno che tu non crei un nuovo account.',
  deleteWarning: 'Eliminando il tuo account, tutti i dati saranno cancellati in modo permanente per tutti gli studi. Sei sicuro di voler continuare?',
  login: {
    login: 'Accedi',
    logout: 'Disconnetti',
    logoutConfirmation: 'Sei sicuro di voler effettuare il logout?',
    logoutShort: 'Se esci dall\'app Mobistudy non verranno più raccolti dati.',
    lostpw: 'Password dimenticata',
    noAcc: 'Non hai ancora un account? Registrati in 3 passaggi!',
    loginError: 'Impossibile accedere',
    loginErrorCredentials: 'Impossibile accedere, credenziali errate.'
  },
  resetPassword: {
    resetPassword: 'Reimposta Password',
    resetPasswordError: 'Impossibile reimpostare la password',
    newPassword: 'Nuova password',
    resetPasswordShort: 'Per cambiare la tua password riceverai un\'email con un codice di verifica, inserisci il codice nella schermata successiva e scegli una nuova password. Attenzione! Questo ti disconnetterà anche dall\'app.',
    newPasswordExplanation: 'Se sei registrato nel sistema, dovresti ricevere un\'email a breve. Copia e incolla il codice ricevuto nella tua email in questo modulo. Se preferisci cambiare la password dalla pagina web di Mobistudy, premi su annulla ed effettua l\'accesso con la nuova password.',
    token: 'Codice',
    tokenHint: 'Come ricevuto via email.',
    tokenError: 'È richiesto un codice di verifica.',
    confirmPwd: 'Conferma Password',
    pwdMustMatch: 'Le password non corrispondono.',
    changePassword: 'Cambia Password',
    changePasswordError: 'Impossibile cambiare la password',
    passwordChanged: 'Nuova password impostata',
    passwordChangedExplanation: 'Ora puoi accedere con la nuova password.'
  },
  registration: {
    signUp: 'Registrati',
    createAccount: 'Crea Account',
    createProfile: 'Crea Profilo',
    privacyPolicy: 'Informativa sulla Privacy',
    registrationError: 'Registrazione fallita',
    registrationErrorUserExists: 'Utente già esistente',
    registrationErrorWrongEmail: 'Impossibile verificare l\'indirizzo email'
  },
  profile: {
    profile: 'Profilo',
    firstName: 'Nome',
    firstNameError: 'Il nome è obbligatorio.',
    surname: 'Cognome',
    surnameError: 'Il cognome è obbligatorio.',
    language: 'Lingua',
    languageError: 'La lingua è obbligatoria.',
    languages: {
      en: 'Inglese',
      sv: 'Svedese',
      es: 'Spagnolo'
    },
    country: 'Paese',
    countryError: 'Il paese è obbligatorio.',
    countries: {
      gb: 'Regno Unito',
      se: 'Svezia',
      es: 'Spagna'
    },
    sex: 'Sesso',
    sexes: {
      male: 'Maschio',
      female: 'Femmina',
      other: 'Altro'
    },
    sexError: 'Seleziona un\'opzione.',
    dateOfBirth: 'Data di nascita',
    dateOfBirthError: 'La data di nascita è obbligatoria.',
    weight: 'Peso (kg)',
    weightError: 'Il peso deve essere un numero positivo.',
    height: 'Altezza (cm)',
    heightError: 'L\'altezza deve essere un numero positivo.',
    conditions: 'Patologie croniche',
    conditionsSearch: 'Digita una parola per cercare una patologia',
    conditionSearchError: 'Impossibile trovare la malattia',
    noResults: 'Nessun risultato',
    medications: 'Farmaci a lungo termine',
    medicationSearchError: 'Impossibile trovare il farmaco',
    studiesSuggestions: 'Suggerisci nuovi studi che corrispondono al mio profilo'
  }
}
